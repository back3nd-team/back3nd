import { ref } from 'vue'

export async function initializePrismaEditor(container: HTMLElement, initialContent: string) {
  const monaco = await import('monaco-editor')

  // Define um tema customizado (opcional, pode manter o padrão do Monaco)
  monaco.editor.defineTheme('prisma-theme', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'keyword', foreground: 'c586c0', fontStyle: 'bold' },
      { token: 'type', foreground: '4EC9B0' },
      { token: 'annotation', foreground: 'dcdcaa', fontStyle: 'italic' },
      { token: 'string', foreground: 'ce9178' },
      { token: 'comment', foreground: '6a9955', fontStyle: 'italic' },
    ],
    colors: {
      'editor.background': '#1e1e1e',
    },
  })

  // Cria o editor com a linguagem TypeScript para facilitar o syntax highlighting e autocompletar
  return monaco.editor.create(container, {
    value: initialContent,
    language: 'typescript', // Usando TypeScript como base
    theme: 'prisma-theme', // Aplicando o tema customizado (opcional)
    automaticLayout: true,
  })
}
