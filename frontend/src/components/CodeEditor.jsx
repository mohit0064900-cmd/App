import Editor from '@monaco-editor/react';

const CodeEditor = ({ language, value, onChange, theme = 'vs-dark', height = '100%' }) => {
  const languageMap = {
    c: 'c',
    cpp: 'cpp',
    python: 'python',
    java: 'java',
    javascript: 'javascript',
    csharp: 'csharp'
  };

  return (
    <Editor
      height={height}
      language={languageMap[language] || 'javascript'}
      value={value}
      onChange={onChange}
      theme={theme}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: 'on',
        scrollBeyondLastLine: false,
        automaticLayout: true,
        tabSize: 2,
        wordWrap: 'on'
      }}
    />
  );
};

export default CodeEditor;
