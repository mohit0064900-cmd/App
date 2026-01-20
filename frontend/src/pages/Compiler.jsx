import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Play, RotateCcw } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CodeEditor from '../components/CodeEditor';
import { compilerService } from '../services/compilerService';
import { LANGUAGES } from '../utils/constants';

const Compiler = () => {
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState('# Write your code here\nprint("Hello, World!")');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const defaultCode = {
    python: '# Write your code here\nprint("Hello, World!")',
    javascript: '// Write your code here\nconsole.log("Hello, World!");',
    c: '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}',
    cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}',
    java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
    csharp: 'using System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello, World!");\n    }\n}'
  };

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    setCode(defaultCode[newLang] || '');
    setOutput('');
  };

  const handleRun = async () => {
    try {
      setLoading(true);
      setOutput('Running code...');
      const result = await compilerService.executeCode(language, code, input);
      setOutput(result.output || 'No output');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Execution failed');
      setOutput(error.response?.data?.message || 'Execution failed');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setCode(defaultCode[language]);
    setInput('');
    setOutput('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-dark-900">
      <Navbar />
      
      <main className="flex-1 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="card mb-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Online Code Compiler
              </h1>
              <div className="flex items-center gap-4">
                <select
                  value={language}
                  onChange={handleLanguageChange}
                  className="input-field"
                >
                  {LANGUAGES.map((lang) => (
                    <option key={lang.key} value={lang.key}>
                      {lang.icon} {lang.name}
                    </option>
                  ))}
                </select>
                <button onClick={handleReset} className="btn-secondary flex items-center gap-2">
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
                <button
                  onClick={handleRun}
                  disabled={loading}
                  className="btn-primary flex items-center gap-2 disabled:opacity-50"
                >
                  <Play className="w-4 h-4" />
                  {loading ? 'Running...' : 'Run Code'}
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="card p-0 overflow-hidden">
              <div className="bg-gray-800 text-white px-4 py-2 font-semibold">
                Code Editor
              </div>
              <div style={{ height: '500px' }}>
                <CodeEditor
                  language={language}
                  value={code}
                  onChange={(value) => setCode(value || '')}
                  height="500px"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="card p-0 overflow-hidden">
                <div className="bg-gray-800 text-white px-4 py-2 font-semibold">
                  Input
                </div>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full p-4 font-mono text-sm bg-white dark:bg-dark-800 border-0 resize-none focus:outline-none"
                  rows="6"
                  placeholder="Enter input here..."
                />
              </div>

              <div className="card p-0 overflow-hidden">
                <div className="bg-gray-800 text-white px-4 py-2 font-semibold">
                  Output
                </div>
                <pre className="w-full p-4 font-mono text-sm bg-white dark:bg-dark-800 border-0 overflow-auto" style={{ minHeight: '300px' }}>
                  {output || 'Output will appear here...'}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Compiler;
