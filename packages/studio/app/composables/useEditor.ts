/* eslint-disable regexp/no-useless-assertions */
import { loader } from '@guolao/vue-monaco-editor'

export const MONACO_EDITOR_OPTIONS = {
  automaticLayout: true,
  formatOnType: true,
  formatOnPaste: true,
}

export function configureMonacoLoader() {
  if (import.meta.client) {
    loader.config({
      paths: {
        vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@latest/min/vs',
      },
    })
  }
}

export function configurePrismaLanguage(monaco: any) {
  monaco.languages.register({ id: 'prisma' })
  monaco.languages.setMonarchTokensProvider('prisma', {
    tokenizer: {
      root: [
        [/\b(?:autoincrement|uuid|cuid|env)\b\(\)/, 'function'],
        [/\b\w+\b\([^)]*\)/, 'function.highlighted'],
        [/@\b(?:relation|id|default|unique|map|updatedAt)\b/, 'annotation'],
        [/\b(?:Int|String|Boolean|DateTime|Float|Json|Bytes|BigInt|Decimal|enum|model)\b/, 'keyword'],
        [/\b[A-Z]\w*\[\]/, 'type.identifier.relation'],
        [/\b[A-Z]\w*\b/, 'type.identifier'],
        [/\b[a-z_]\w*\b(?=\s+\b(?:Int|String|Boolean|DateTime|Float|Json|Bytes|BigInt|Decimal)\b)/, 'variable'],
        [/\b(?:\w*Id|\w*IDs)\b/, 'variable.id'],
        [/#.*$/, 'comment'],
        [/\/\/.*$/, 'comment'],
        [/"(?:[^"\\]|\\.)*"/, 'string'],
        [/'(?:[^'\\]|\\.)*'/, 'string'],
        [/[[\]{}().,;]+/, 'delimiter'],
        [/@\w+/, 'annotation'],
        [/\b\d+\b/, 'number'],
      ],
    },
  })

  monaco.editor.defineTheme('prisma-theme', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'keyword', foreground: 'C586C0' },
      { token: 'type', foreground: '4EC9B0' },
      { token: 'annotation', foreground: 'D4D4D4' },
      { token: 'type.identifier', foreground: '569CD6' },
      { token: 'type.identifier.relation', foreground: 'FFCB6B', fontStyle: 'italic' },
      { token: 'function.highlighted', foreground: 'C2B280', fontStyle: 'bold' },
      { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
      { token: 'string', foreground: 'CE9178' },
      { token: 'number', foreground: 'B5CEA8' },
    ],
    colors: {
      'editor.background': '#1E1E1E',
    },
  })
}
