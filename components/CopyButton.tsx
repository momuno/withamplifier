'use client'

import { useState } from 'react'
import SyntaxHighlight from './SyntaxHighlight'

interface CopyButtonProps {
  text: string
  className?: string
}

export function CopyButton({ text, className = '' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }
  
  return (
    <button
      onClick={handleCopy}
      className={`copy-button tap-target ${copied ? 'copied' : ''} ${className}`}
      aria-label={copied ? 'Copied!' : 'Copy to clipboard'}
    >
      {copied ? (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )}
    </button>
  )
}

interface CodeBlockProps {
  code: string
  className?: string
  language?: string
}

export function CodeBlock({ code, className = '', language }: CodeBlockProps) {
  return (
    <div className={`code-block-wrapper ${className}`}>
      <code className="code-block pr-12 block">
        {language ? <SyntaxHighlight code={code} language={language} /> : code}
      </code>
      <CopyButton text={code} />
    </div>
  )
}

export default CopyButton
