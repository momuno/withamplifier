'use client'

import { useEffect, useRef, useCallback } from 'react'
import * as THREE from 'three'
import { SECTION_PATTERNS, type ExtendedPatternConfig } from '@/lib/chladni'

// Inline shaders to avoid import issues with static export
const vertexShader = `
// Chladni Pattern Vertex Shader
uniform float uTime;
uniform float uN1;
uniform float uM1;
uniform float uN2;
uniform float uM2;
uniform float uTransition;
uniform float uForceStrength;
uniform float uDamping;
uniform vec2 uMouse;
uniform float uMouseRadius;
uniform float uMouseForce;
uniform float uChaos;

attribute vec3 velocity;

varying float vDistance;

const float PI = 3.14159265359;

float chladniValue(vec2 pos, float n, float m) {
    return cos(n * PI * pos.x) * cos(m * PI * pos.y) - 
           cos(m * PI * pos.x) * cos(n * PI * pos.y);
}

vec2 chladniGradient(vec2 pos, float n, float m) {
    float h = 0.001;
    float val = chladniValue(pos, n, m);
    float valX = chladniValue(pos + vec2(h, 0.0), n, m);
    float valY = chladniValue(pos + vec2(0.0, h), n, m);
    
    vec2 grad = vec2(-(valX - val) / h, -(valY - val) / h);
    float strength = abs(val);
    grad *= strength;
    
    float mag = length(grad);
    if (mag > 0.0) {
        grad /= mag;
    }
    
    return grad;
}

vec2 chladniForce(vec2 pos, float n, float m, float strength) {
    float val = chladniValue(pos, n, m);
    vec2 grad = chladniGradient(pos, n, m);
    float forceMag = abs(val) * strength;
    return grad * forceMag;
}

vec2 interpolatedForce(vec2 pos, float n1, float m1, float n2, float m2, float t, float strength) {
    vec2 force1 = chladniForce(pos, n1, m1, strength);
    vec2 force2 = chladniForce(pos, n2, m2, strength);
    
    float eased = t < 0.5 
        ? 4.0 * t * t * t 
        : 1.0 - pow(-2.0 * t + 2.0, 3.0) / 2.0;
    
    return mix(force1, force2, eased);
}

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
    vec3 pos = position;
    vec3 vel = velocity;
    
    vec2 normalizedPos = pos.xy * 0.5 + 0.5;
    
    vec2 force = interpolatedForce(
        normalizedPos, 
        uN1, uM1, 
        uN2, uM2, 
        uTransition, 
        uForceStrength
    );
    
    if (uMouseRadius > 0.0) {
        vec2 toMouse = normalizedPos - uMouse;
        float dist = length(toMouse);
        
        if (dist < uMouseRadius && dist > 0.001) {
            float repelStrength = (1.0 - dist / uMouseRadius) * uMouseForce;
            force += (toMouse / dist) * repelStrength;
        }
    }
    
    if (uChaos > 0.0) {
        vec2 randomForce = vec2(
            random(normalizedPos + uTime) - 0.5,
            random(normalizedPos.yx + uTime) - 0.5
        );
        force += randomForce * uChaos * 0.01;
    }
    
    float deltaTime = 0.016;
    vel.xy = (vel.xy + force * deltaTime) * uDamping;
    pos.xy += vel.xy * deltaTime;
    pos.xy = fract((pos.xy * 0.5 + 0.5)) * 2.0 - 1.0;
    
    float val1 = chladniValue(normalizedPos, uN1, uM1);
    float val2 = chladniValue(normalizedPos, uN2, uM2);
    vDistance = abs(mix(val1, val2, uTransition));
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = 2.5; // Increased for visibility
}
`

const fragmentShader = `
// Chladni Pattern Fragment Shader
uniform vec3 uColor;
uniform float uOpacity;
uniform float uGlowIntensity;

varying float vDistance;

void main() {
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);
    float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
    
    float nodal = 1.0 - smoothstep(0.0, 0.15, vDistance);
    float glow = nodal * uGlowIntensity;
    
    alpha *= (uOpacity + glow);
    vec3 finalColor = uColor * (1.0 + glow * 0.3);
    
    if (alpha < 0.01) discard;
    
    gl_FragColor = vec4(finalColor, alpha);
}
`

interface SectionConfig {
  id: string
  pattern: ExtendedPatternConfig
  isDark: boolean
}

const SECTIONS: SectionConfig[] = [
  { id: 'hero', pattern: SECTION_PATTERNS.hero, isDark: false },
  { id: 'problem', pattern: SECTION_PATTERNS.problem, isDark: true },
  { id: 'differentiation', pattern: SECTION_PATTERNS.differentiation, isDark: true },
  { id: 'platform', pattern: SECTION_PATTERNS.platform, isDark: false },
  { id: 'demo', pattern: SECTION_PATTERNS.demo, isDark: false },
  { id: 'bundles', pattern: SECTION_PATTERNS.bundles, isDark: false },
  { id: 'impact', pattern: SECTION_PATTERNS.impact, isDark: false },
  { id: 'why', pattern: SECTION_PATTERNS.why, isDark: true },
  { id: 'ecosystem', pattern: SECTION_PATTERNS.ecosystem, isDark: false },
  { id: 'cta', pattern: SECTION_PATTERNS.cta, isDark: false },
]

export default function ChladniWebGL() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const particlesRef = useRef<THREE.Points | null>(null)
  const materialRef = useRef<THREE.ShaderMaterial | null>(null)
  const animationFrameRef = useRef<number>()
  const mouseRef = useRef({ x: 0, y: 0, isActive: false })
  const currentSectionRef = useRef<string>('hero')
  const transitionRef = useRef({ progress: 0, isTransitioning: false })

  // Initialize Three.js scene
  const initScene = useCallback(() => {
    if (!containerRef.current) return

    console.log('[ChladniWebGL] Initializing scene...')

    const width = window.innerWidth
    const height = window.innerHeight
    const aspect = width / height

    // Scene
    const scene = new THREE.Scene()

    // Camera
    const camera = new THREE.OrthographicCamera(-aspect, aspect, 1, -1, 0.1, 10)
    camera.position.z = 1

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: false,
      powerPreference: 'high-performance'
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)

    // Particle count based on device
    const isMobile = width < 768
    const particleCount = isMobile ? 5000 : 10000
    console.log(`[ChladniWebGL] Creating ${particleCount} particles (mobile: ${isMobile})`)

    // Particle geometry
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)

    // Initialize particles randomly scattered
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 2
      positions[i3 + 1] = (Math.random() - 0.5) * 2
      positions[i3 + 2] = 0
      velocities[i3] = 0
      velocities[i3 + 1] = 0
      velocities[i3 + 2] = 0
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3))

    // Shader material
    const heroPattern = SECTION_PATTERNS.hero
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uN1: { value: heroPattern.params.n },
        uM1: { value: heroPattern.params.m },
        uN2: { value: heroPattern.params.n },
        uM2: { value: heroPattern.params.m },
        uTransition: { value: 0 },
        uForceStrength: { value: heroPattern.forceStrength },
        uDamping: { value: heroPattern.damping },
        uChaos: { value: heroPattern.chaos },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uMouseRadius: { value: 0 },
        uMouseForce: { value: 0.5 },
        uColor: { value: new THREE.Color(0x666666) },
        uOpacity: { value: 0.6 },
        uGlowIntensity: { value: 0.4 },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    sceneRef.current = scene
    cameraRef.current = camera
    rendererRef.current = renderer
    particlesRef.current = particles
    materialRef.current = material

    console.log('[ChladniWebGL] Scene initialized successfully')
  }, [])

  // Animation loop
  const animate = useCallback(() => {
    if (!rendererRef.current || !sceneRef.current || !cameraRef.current || !materialRef.current) {
      return
    }

    const material = materialRef.current
    material.uniforms.uTime.value += 0.016

    // Update mouse
    if (mouseRef.current.isActive) {
      material.uniforms.uMouse.value.set(mouseRef.current.x, 1 - mouseRef.current.y)
      material.uniforms.uMouseRadius.value = 0.15
    } else {
      material.uniforms.uMouseRadius.value = 0
    }

    // Handle transitions
    if (transitionRef.current.isTransitioning) {
      transitionRef.current.progress += 0.008 // 2 second transition at 60fps
      if (transitionRef.current.progress >= 1) {
        transitionRef.current.progress = 1
        transitionRef.current.isTransitioning = false
        
        // Snap to new pattern
        material.uniforms.uN1.value = material.uniforms.uN2.value
        material.uniforms.uM1.value = material.uniforms.uM2.value
      }
      material.uniforms.uTransition.value = transitionRef.current.progress
    }

    rendererRef.current.render(sceneRef.current, cameraRef.current)
    animationFrameRef.current = requestAnimationFrame(animate)
  }, [])

  // Transition to pattern
  const transitionToPattern = useCallback((sectionId: string) => {
    if (!materialRef.current) return
    
    const section = SECTIONS.find(s => s.id === sectionId)
    if (!section) return

    console.log(`[ChladniWebGL] Transitioning to ${sectionId}`, section.pattern)

    const material = materialRef.current

    // Set target pattern
    material.uniforms.uN2.value = section.pattern.params.n
    material.uniforms.uM2.value = section.pattern.params.m
    material.uniforms.uForceStrength.value = section.pattern.forceStrength
    material.uniforms.uDamping.value = section.pattern.damping
    material.uniforms.uChaos.value = section.pattern.chaos

    // Update color for dark sections
    if (section.isDark) {
      material.uniforms.uColor.value.setHex(0xcccccc)
      material.uniforms.uOpacity.value = 0.5
    } else {
      material.uniforms.uColor.value.setHex(0x666666)
      material.uniforms.uOpacity.value = 0.6
    }

    // Start transition
    transitionRef.current.progress = 0
    transitionRef.current.isTransitioning = true
  }, [])

  // Intersection observer for section changes
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const sectionId = entry.target.getAttribute('data-section')
            if (sectionId && sectionId !== currentSectionRef.current) {
              currentSectionRef.current = sectionId
              transitionToPattern(sectionId)
            }
          }
        })
      },
      { threshold: [0.5] }
    )

    document.querySelectorAll('[data-section]').forEach((section) => {
      observer.observe(section)
    })

    return () => observer.disconnect()
  }, [transitionToPattern])

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX / window.innerWidth
      mouseRef.current.y = e.clientY / window.innerHeight
      mouseRef.current.isActive = true
    }

    const handleMouseLeave = () => {
      mouseRef.current.isActive = false
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  // Resize handler
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

  // Initialize and start animation
  useEffect(() => {
    initScene()
    
    // Start with scattered state, then transition to hero pattern after 500ms
    setTimeout(() => {
      transitionToPattern('hero')
    }, 500)
    
    animate()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (rendererRef.current) {
        rendererRef.current.dispose()
      }
    }
  }, [initScene, animate, transitionToPattern])

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none z-0"
      style={{ backgroundColor: 'transparent' }}
    />
  )
}
