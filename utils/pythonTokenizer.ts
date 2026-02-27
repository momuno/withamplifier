const PYTHON_KEYWORDS = new Set([
  'def', 'class', 'if', 'else', 'elif', 'for', 'while', 'return',
  'import', 'from', 'as', 'with', 'async', 'await', 'try', 'except',
  'finally', 'raise', 'pass', 'break', 'continue', 'yield', 'lambda',
  'in', 'not', 'and', 'or', 'is', 'del', 'global', 'nonlocal', 'assert',
])

const PYTHON_BUILTIN_CONSTS = new Set(['True', 'False', 'None'])

const PYTHON_BUILTINS = new Set([
  'str', 'int', 'float', 'dict', 'list', 'tuple', 'set', 'bool', 'bytes',
  'type', 'object', 'range', 'enumerate', 'zip', 'map', 'filter', 'print',
  'len', 'isinstance', 'issubclass', 'getattr', 'setattr', 'hasattr',
  'property', 'staticmethod', 'classmethod', 'super', 'open',
  'Exception', 'ValueError', 'TypeError', 'KeyError', 'RuntimeError',
  'AttributeError', 'ImportError', 'StopIteration', 'OSError',
])

// Group 7 excludes quotes so they always go through the string matcher first.
// Group 8 catches lone unmatched quotes as punct.
const TOKEN_RE = /(#[^\n]*)|("""[\s\S]*?"""|'''[\s\S]*?''')|("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*')|(@\w+)|(\b\d+(?:\.\d+)?\b)|(\b\w+\b)|([^\w\s"']+)|(["'])|(\s+)/g

export interface Token {
  type: string
  text: string
}

function classifyWord(text: string): string {
  if (PYTHON_KEYWORDS.has(text)) return 'keyword'
  if (text === 'self' || text === 'cls') return 'self'
  if (PYTHON_BUILTIN_CONSTS.has(text)) return 'builtin-const'
  if (PYTHON_BUILTINS.has(text)) return 'builtin'
  return 'plain'
}

export function tokenizePython(code: string): Token[] {
  const tokens: Token[] = []
  let match: RegExpExecArray | null

  const re = new RegExp(TOKEN_RE.source, 'g')

  while ((match = re.exec(code)) !== null) {
    const text = match[0]
    let type: string

    if (match[1] != null) {
      type = 'comment'
    } else if (match[2] != null) {
      type = 'string'
    } else if (match[3] != null) {
      // Reject false strings: inner content must have a word character
      const inner = text.slice(1, -1)
      type = /\w/.test(inner) ? 'string' : 'punct'
    } else if (match[4] != null) {
      type = 'decorator'
    } else if (match[5] != null) {
      type = 'number'
    } else if (match[6] != null) {
      type = classifyWord(text)
    } else if (match[7] != null) {
      type = 'punct'
    } else if (match[8] != null) {
      type = 'punct'  // lone unmatched quote
    } else {
      type = 'plain'
    }

    tokens.push({ type, text })
  }

  // Post-pass: re-tag tokens after 'def' and 'class' keywords
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].type === 'keyword' && (tokens[i].text === 'def' || tokens[i].text === 'class')) {
      const targetType = tokens[i].text === 'def' ? 'func-name' : 'class-name'
      for (let j = i + 1; j < tokens.length; j++) {
        if (tokens[j].type !== 'plain' || tokens[j].text.trim() !== '') {
          if (tokens[j].type === 'plain') {
            tokens[j].type = targetType
          }
          break
        }
      }
    }
  }

  return tokens
}
