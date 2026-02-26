import { tokenizePython } from '@/utils/pythonTokenizer'

interface SyntaxHighlightProps {
  code: string
  language: string
}

export default function SyntaxHighlight({ code, language }: SyntaxHighlightProps) {
  if (language === 'python') {
    const tokens = tokenizePython(code)
    return (
      <>
        {tokens.map((token, i) =>
          token.type === 'plain' ? (
            token.text
          ) : (
            <span key={i} className={`sh-${token.type}`}>{token.text}</span>
          )
        )}
      </>
    )
  }

  // Unsupported language — return plain text
  return <>{code}</>
}
