import { tokenizePython } from '@/utils/pythonTokenizer'
import { tokenizeYaml } from '@/utils/yamlTokenizer'
import { tokenizeBash } from '@/utils/bashTokenizer'

interface SyntaxHighlightProps {
  code: string
  language: string
}

export default function SyntaxHighlight({ code, language }: SyntaxHighlightProps) {
  let tokens: Array<{type: string, text: string}> | null = null

  switch (language) {
    case 'python':
      tokens = tokenizePython(code)
      break
    case 'yaml':
      tokens = tokenizeYaml(code)
      break
    case 'bash':
    case 'shell':
      tokens = tokenizeBash(code)
      break
  }

  if (tokens) {
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
