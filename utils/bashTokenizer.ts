export interface Token {
  type: string
  text: string
}

const BASH_KEYWORDS = new Set([
  'if', 'then', 'else', 'elif', 'fi', 'for', 'while', 'do', 'done',
  'case', 'esac', 'in', 'function', 'return', 'exit', 'export',
  'source', 'local', 'readonly', 'declare', 'unset', 'set',
])

const BASH_BUILTINS = new Set([
  'echo', 'cd', 'pwd', 'ls', 'cat', 'grep', 'sed', 'awk', 'find',
  'mkdir', 'rm', 'cp', 'mv', 'chmod', 'chown', 'curl', 'wget',
  'git', 'pip', 'npm', 'uv', 'brew', 'sudo', 'apt', 'winget',
  'docker', 'python', 'python3', 'node', 'npx',
])

// Group 7 excludes quotes from punct; group 8 catches lone quotes
const BASH_RE = /(#[^\n]*)|("(?:[^"\\\n]|\\.)*")|('(?:[^'\\\n]|\\.)*')|(\$[\w{][\w}]*)|(\b\d+(?:\.\d+)?\b)|(\b[\w.+\-]+\b)|([|&;><(){}\[\]]+)|([^\w\s"']+)|(["'])|(\s+)/g

export function tokenizeBash(code: string): Token[] {
  const tokens: Token[] = []
  let match: RegExpExecArray | null

  const re = new RegExp(BASH_RE.source, 'g')

  while ((match = re.exec(code)) !== null) {
    const text = match[0]
    let type: string

    if (match[1] != null) type = 'comment'
    else if (match[2] != null) type = 'string'
    else if (match[3] != null) type = 'string'
    else if (match[4] != null) type = 'decorator'
    else if (match[5] != null) type = 'number'
    else if (match[6] != null) {
      if (BASH_KEYWORDS.has(text)) type = 'keyword'
      else if (BASH_BUILTINS.has(text)) type = 'builtin'
      else type = 'plain'
    }
    else if (match[7] != null) type = 'punct'
    else if (match[8] != null) type = 'punct'
    else if (match[9] != null) type = 'punct'  // lone quote
    else type = 'plain'

    tokens.push({ type, text })
  }

  return tokens
}
