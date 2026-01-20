import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Play, RotateCcw, Save, Download, Moon, Sun, Clock, HardDrive, CheckCircle, XCircle } from 'lucide-react';
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
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [executionStats, setExecutionStats] = useState(null);
  const [executionStatus, setExecutionStatus] = useState(null);

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
    setExecutionStats(null);
    setExecutionStatus(null);
  };

  const handleRun = async () => {
    try {
      setLoading(true);
      setOutput('Executing code...');
      setExecutionStats(null);
      setExecutionStatus(null);

      const startTime = Date.now();
      const result = await compilerService.executeCode(language, code, input);
      const endTime = Date.now();

      setOutput(result.output || 'No output');
      
      // Set execution statistics
      setExecutionStats({
        time: result.executionTime || `${((endTime - startTime) / 1000).toFixed(2)}s`,
        memory: result.memory || 'N/A',
        language: result.language || LANGUAGES.find(l => l.key === language)?.name
      });

      // Set execution status
      setExecutionStatus({
        status: result.status || 'Completed',
        success: result.status?.toLowerCase().includes('accepted') || result.status?.toLowerCase().includes('success')
      });

      if (result.status?.toLowerCase().includes('accepted') || result.status?.toLowerCase().includes('success')) {
        toast.success('Code executed successfully!');
      } else {
        toast.error('Code execution completed with warnings or errors');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Execution failed';
      toast.error(errorMessage);
      setOutput(`Error: ${errorMessage}`);
      setExecutionStatus({
        status: 'Error',
        success: false
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setCode(defaultCode[language]);
    setInput('');
    setOutput('');
    setExecutionStats(null);
    setExecutionStatus(null);
  };

  const handleSave = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `polo-code.${language === 'cpp' ? 'cpp' : language}`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Code saved successfully!');
  };

  const getStatusIcon = () => {
    if (!executionStatus) return null;
    return executionStatus.success ? 
      <CheckCircle className="w-5 h-5 text-green-500" /> : 
      <XCircle className="w-5 h-5 text-red-500" />;
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Navbar />
      
      <main className="flex-1 p-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="card mb-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  POLO Code Compiler
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Write, compile, and execute code in multiple programming languages
                </p>
              </div>
              <div className="flex items-center gap-3">
                {/* Dark Mode Toggle */}
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                  title="Toggle Theme"
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>

                {/* Language Selector */}
                <select
                  value={language}
                  onChange={handleLanguageChange}
                  className="input-field min-w-[140px]"
                >
                  {LANGUAGES.map((lang) => (
                    <option key={lang.key} value={lang.key}>
                      {lang.icon} {lang.name}
                    </option>
                  ))}
                </select>

                {/* Action Buttons */}
                <button onClick={handleSave} className="btn-secondary flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Save
                </button>

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

          {/* Execution Status Bar */}
          {executionStatus && (
            <div className="card mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getStatusIcon()}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Status: {executionStatus.status}
                  </span>
                </div>
                {executionStats && (
                  <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>Time: {executionStats.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <HardDrive className="w-4 h-4" />
                      <span>Memory: {executionStats.memory}</span>
                    </div>
                    <div>
                      <span>Language: {executionStats.language}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Code Editor */}
            <div className="xl:col-span-2">
              <div className="card p-0 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 font-semibold flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="ml-2">Code Editor</span>
                </div>
                <div style={{ height: '500px' }}>
                  <CodeEditor
                    language={language}
                    value={code}
                    onChange={(value) => setCode(value || '')}
                    height="500px"
                    theme={isDarkMode ? 'vs-dark' : 'light'}
                  />
                </div>
              </div>
            </div>

            {/* Input/Output Panel */}
            <div className="space-y-4">
              {/* Input Section */}
              <div className="card p-0 overflow-hidden">
                <div className="bg-gray-800 text-white px-4 py-2 font-semibold">
                  Input (stdin)
                </div>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full p-4 font-mono text-sm bg-white dark:bg-gray-800 border-0 resize-none focus:outline-none"
                  rows="8"
                  placeholder="Enter input here..."
                />
              </div>

              {/* Output Section */}
              <div className="card p-0 overflow-hidden">
                <div className="bg-gray-800 text-white px-4 py-2 font-semibold flex items-center justify-between">
                  <span>Output</span>
                  {output && (
                    <button
                      onClick={() => navigator.clipboard.writeText(output)}
                      className="text-xs bg-gray-700 px-2 py-1 rounded hover:bg-gray-600"
                      title="Copy to clipboard"
                    >
                      Copy
                    </button>
                  )}
                </div>
                <pre className="w-full p-4 font-mono text-sm bg-white dark:bg-gray-800 border-0 overflow-auto whitespace-pre-wrap" style={{ minHeight: '250px' }}>
                  {output || 'Output will appear here...'}
                </pre>
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="card mt-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Quick Tips
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-300">
              <div>
                <strong>Language Selection:</strong> Choose from C, C++, Java, Python, JavaScript, or C#
              </div>
              <div>
                <strong>Input:</strong> Use the input section to provide data to your program via stdin
              </div>
              <div>
                <strong>Execution:</strong> Code runs in a secure sandboxed environment with time and memory limits
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
