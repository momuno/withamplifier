export interface Token {
  type: string
  text: string
}

// Group 8 excludes quotes from punct; group 9 catches lone quotes
const YAML_RE = /(#[^\n]*)|("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*')|(\b(?:true|false|null|yes|no)\b)|(\b\d+(?:\.\d+)?\b)|(^[ \t]*[\w][\w.\-]*(?=\s*:))|(---|\.\.\.)|([\-:>|])|([^\w\s#"'\-:>|]+)|(["'])|(\b\w+\b)|(\s+)/gm

export function tokenizeYaml(code: string): Token[] {
  const tokens: Token[] = []
  let match: RegExpExecArray | null

  const re = new RegExp(YAML_RE.source, 'gm')

  while ((match = re.exec(code)) !== null) {
    const text = match[0]
    let type: string

    if (match[1] != null) type = 'comment'
    else if (match[2] != null) {
      const inner = text.slice(1, -1)
      type = /\w/.test(inner) ? 'string' : 'punct'
    }
    else if (match[3] != null) type = 'builtin-const'
    else if (match[4] != null) type = 'number'
    else if (match[5] != null) type = 'keyword'
    else if (match[6] != null) type = 'decorator'
    else if (match[7] != null) type = 'punct'
    else if (match[8] != null) type = 'punct'
    else if (match[9] != null) type = 'punct'  // lone quote
    else if (match[10] != null) type = 'plain'
    else type = 'plain'

    tokens.push({ type, text })
  }

  return tokens
}
