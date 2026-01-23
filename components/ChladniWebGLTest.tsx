'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface PatternParams {
  n: number
  m: number
  strength: number
  color: string
  opacity: number
  particleSize: number
}

interface ChladniWebGLTestProps {
  params: PatternParams
}

function chladniValue(x: number, y: number, n: number, m: number): number {
  const PI = Math.PI
  return Math.cos(n * PI * x) * Math.cos(m * PI * y) - 
         Math.cos(m * PI * x) * Math.cos(n * PI * y)
}

export default function ChladniWebGLTest({ params }: ChladniWebGLTestProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const pointsRef = useRef<THREE.Points | null>(null)
  const materialRef = useRef<THREE.PointsMaterial | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  
  // Use ref to store current params so animation loop always sees latest values
  const paramsRef = useRef<PatternParams>(params)

  const initScene = () => {
    if (!containerRef.current) return

    const container = containerRef.current
    const width = window.innerWidth
    const height = window.innerHeight
    const aspect = width / height

    console.log('[ChladniWebGLTest] Initializing scene...', width, 'x', height)

    // Scene
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera
    const camera = new THREE.OrthographicCamera(-aspect, aspect, 1, -1, 0.1, 1000)
    camera.position.z = 10
    cameraRef.current = camera

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Particles - significantly increased for better density
    const isMobile = width < 768
    const particleCount = isMobile ? 20000 : 50000
    console.log('[ChladniWebGLTest] Creating', particleCount, 'particles')

    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)

    // Random initial positions - aspect-aware
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 2 * aspect
      positions[i3 + 1] = (Math.random() - 0.5) * 2
      positions[i3 + 2] = 0
      velocities[i3] = 0
      velocities[i3 + 1] = 0
      velocities[i3 + 2] = 0
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3))

    const material = new THREE.PointsMaterial({
      size: paramsRef.current.particleSize,
      color: new THREE.Color(paramsRef.current.color),
      transparent: true,
      opacity: paramsRef.current.opacity,
      blending: THREE.AdditiveBlending,
    })
    materialRef.current = material

    const points = new THREE.Points(geometry, material)
    scene.add(points)
    pointsRef.current = points

    console.log('[ChladniWebGLTest] Scene initialized successfully')
  }

  // Refs for smooth transitions
  const targetParamsRef = useRef<PatternParams>(params)
  const currentNRef = useRef(params.n)
  const currentMRef = useRef(params.m)

  const animate = () => {
    animationFrameRef.current = requestAnimationFrame(animate)

    if (!pointsRef.current || !materialRef.current || !rendererRef.current || 
        !sceneRef.current || !cameraRef.current) return

    const geometry = pointsRef.current.geometry
    const positions = geometry.attributes.position.array as Float32Array
    const velocities = geometry.attributes.velocity.array as Float32Array

    // Smooth interpolation (lerp) between current and target params
    const lerpSpeed = 0.02 // Slow, pulsing transition
    currentNRef.current += (targetParamsRef.current.n - currentNRef.current) * lerpSpeed
    currentMRef.current += (targetParamsRef.current.m - currentMRef.current) * lerpSpeed

    const { strength } = targetParamsRef.current
    const n = currentNRef.current
    const m = currentMRef.current
    const damping = 0.95

    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i]
      const y = positions[i + 1]

      const chladni = chladniValue(x, y, n, m)
      const force = -chladni * strength * 0.01

      const dx = x === 0 ? 0 : (x > 0 ? 1 : -1)
      const dy = y === 0 ? 0 : (y > 0 ? 1 : -1)

      // Add subtle jitter to prevent harsh lines
      const jitterStrength = 0.0003
      const jitterX = (Math.random() - 0.5) * jitterStrength
      const jitterY = (Math.random() - 0.5) * jitterStrength

      velocities[i] += force * dx + jitterX
      velocities[i + 1] += force * dy + jitterY

      velocities[i] *= damping
      velocities[i + 1] *= damping

      positions[i] += velocities[i]
      positions[i + 1] += velocities[i + 1]
    }

    geometry.attributes.position.needsUpdate = true
    rendererRef.current.render(sceneRef.current, cameraRef.current)
  }

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return

      const width = window.innerWidth
      const height = window.innerHeight
      const aspect = width / height

      cameraRef.current.left = -aspect
      cameraRef.current.right = aspect
      cameraRef.current.updateProjectionMatrix()

      rendererRef.current.setSize(width, height)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Initialize scene once
  useEffect(() => {
    console.log('[ChladniWebGLTest] Component mounted, initializing scene')
    initScene()
    
    console.log('[ChladniWebGLTest] Starting animation loop')
    animate()

    return () => {
      console.log('[ChladniWebGLTest] Component unmounting, cleaning up')
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (rendererRef.current && containerRef.current) {
        if (containerRef.current.contains(rendererRef.current.domElement)) {
          containerRef.current.removeChild(rendererRef.current.domElement)
        }
        rendererRef.current.dispose()
      }
    }
  }, [])

  // Update target params and material when props change
  useEffect(() => {
    console.log('[ChladniWebGLTest] Params changed:', params)
    targetParamsRef.current = params
    
    if (!materialRef.current) return

    // Material properties change immediately (color, opacity, size)
    materialRef.current.color = new THREE.Color(params.color)
    materialRef.current.opacity = params.opacity
    materialRef.current.size = params.particleSize
    materialRef.current.needsUpdate = true
  }, [params])

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none"
      style={{ 
        backgroundColor: 'transparent',
        zIndex: 1
      }}
    />
  )
}
