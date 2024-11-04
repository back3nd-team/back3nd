export async function initializePrismaEditor(container: HTMLElement, initialContent: string) {
  const monaco = await import('monaco-editor/esm/vs/editor/editor.api')
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

  return monaco.editor.create(container, {
    value: initialContent,
    language: 'typescript',
    theme: 'prisma-theme',
    automaticLayout: true,
  })
}
