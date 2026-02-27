'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

type ConnectionState = 'disconnected' | 'connecting' | 'needs_setup' | 'ready' | 'thinking'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface ServerMessage {
  type: 'token' | 'done' | 'error' | 'status' | 'setup_needed'
  content?: string
  state?: string
  message?: string
  providers?: { id: string; name: string; env_var: string | null; free: boolean }[]
}

const WS_URL = 'ws://127.0.0.1:8712'

export default function AmplifierWebChat() {
  const [state, setState] = useState<ConnectionState>('disconnected')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [streamingContent, setStreamingContent] = useState('')
  const [setupInfo, setSetupInfo] = useState<ServerMessage | null>(null)

  const wsRef = useRef<WebSocket | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, streamingContent, scrollToBottom])

  // Try connecting on mount
  useEffect(() => {
    connect()
    return () => {
      wsRef.current?.close()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function connect() {
    setState('connecting')

    const ws = new WebSocket(WS_URL)
    wsRef.current = ws

    ws.onopen = () => {
      // Connected — wait for server status message
    }

    ws.onmessage = (event) => {
      const msg: ServerMessage = JSON.parse(event.data)

      switch (msg.type) {
        case 'status':
          if (msg.state === 'ready') setState('ready')
          if (msg.state === 'thinking') setState('thinking')
          break

        case 'setup_needed':
          setState('needs_setup')
          setSetupInfo(msg)
          break

        case 'token':
          setStreamingContent(prev => prev + (msg.content || ''))
          break

        case 'done':
          // Move streaming content into messages
          setStreamingContent(prev => {
            if (prev) {
              setMessages(msgs => [...msgs, { role: 'assistant', content: prev }])
            }
            return ''
          })
          setState('ready')
          break

        case 'error':
          setMessages(msgs => [...msgs, {
            role: 'assistant',
            content: `Error: ${msg.content || 'Something went wrong'}`,
          }])
          setState('ready')
          break
      }
    }

    ws.onclose = () => {
      setState('disconnected')
      wsRef.current = null
    }

    ws.onerror = () => {
      setState('disconnected')
      ws.close()
    }
  }

  function sendMessage(content: string) {
    if (!wsRef.current || state !== 'ready' || !content.trim()) return

    setMessages(msgs => [...msgs, { role: 'user', content }])
    setInput('')
    wsRef.current.send(JSON.stringify({ type: 'message', content }))
  }

  function newSession() {
    if (!wsRef.current) return
    setMessages([])
    setStreamingContent('')
    wsRef.current.send(JSON.stringify({ type: 'new_session' }))
  }

  // -- Render --

  return (
    <div className="amplifier-chat-widget">

      {/* Disconnected state — show install instructions */}
      {state === 'disconnected' && (
        <div className="chat-install">
          <p className="chat-install-title">Try it live</p>
          <p className="chat-install-desc">
            Run a local Amplifier agent and ask questions right here.
          </p>
          <div className="chat-install-steps">
            <div className="chat-install-step">
              <span className="chat-step-number">1</span>
              <div>
                <p className="chat-step-label">Install</p>
                <code className="chat-step-code">
                  uv tool install amplifier-app-web
                </code>
              </div>
            </div>
            <div className="chat-install-step">
              <span className="chat-step-number">2</span>
              <div>
                <p className="chat-step-label">Set your API key</p>
                <code className="chat-step-code">
                  export ANTHROPIC_API_KEY=sk-...
                </code>
              </div>
            </div>
            <div className="chat-install-step">
              <span className="chat-step-number">3</span>
              <div>
                <p className="chat-step-label">Start the server</p>
                <code className="chat-step-code">amplifier-web</code>
              </div>
            </div>
          </div>
          <button className="chat-connect-btn" onClick={connect}>
            Connect
          </button>
        </div>
      )}

      {/* Connecting */}
      {state === 'connecting' && (
        <div className="chat-status">
          <div className="chat-spinner" />
          <p>Connecting to local Amplifier agent...</p>
        </div>
      )}

      {/* Needs setup */}
      {state === 'needs_setup' && setupInfo && (
        <div className="chat-install">
          <p className="chat-install-title">Almost there</p>
          <p className="chat-install-desc">{setupInfo.message}</p>
          <p className="chat-install-desc" style={{ marginTop: '8px' }}>
            Set one of these environment variables and restart <code>amplifier-web</code>:
          </p>
          <ul className="chat-provider-list">
            {setupInfo.providers?.map(p => (
              <li key={p.id}>
                <strong>{p.name}</strong>
                {p.env_var
                  ? <> &mdash; <code>export {p.env_var}=...</code></>
                  : <> &mdash; install and run Ollama</>
                }
              </li>
            ))}
          </ul>
          <button className="chat-connect-btn" onClick={() => {
            wsRef.current?.send(JSON.stringify({ type: 'new_session' }))
          }}>
            Retry
          </button>
        </div>
      )}

      {/* Ready / Thinking — show chat */}
      {(state === 'ready' || state === 'thinking') && (
        <div className="chat-active">
          {/* Messages */}
          <div className="chat-messages">
            {messages.length === 0 && !streamingContent && (
              <p className="chat-empty">
                Ask about the kernel, modules, or foundation.
              </p>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`chat-msg chat-msg-${msg.role}`}>
                <div className="chat-msg-content">{msg.content}</div>
              </div>
            ))}
            {streamingContent && (
              <div className="chat-msg chat-msg-assistant">
                <div className="chat-msg-content">{streamingContent}</div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            className="chat-input-row"
            onSubmit={(e) => {
              e.preventDefault()
              sendMessage(input)
            }}
          >
            <input
              className="chat-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about the kernel, modules, or foundation..."
              disabled={state === 'thinking'}
            />
            <button
              className="chat-send-btn"
              type="submit"
              disabled={state === 'thinking' || !input.trim()}
            >
              {state === 'thinking' ? '...' : 'Send'}
            </button>
          </form>

          {/* Controls */}
          <div className="chat-controls">
            <button className="chat-control-btn" onClick={newSession}>
              New conversation
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
