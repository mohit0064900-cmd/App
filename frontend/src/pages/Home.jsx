import { Link } from 'react-router-dom';
import { Code, Zap, Shield, Clock, Cpu, Terminal } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
  const features = [
    {
      icon: Code,
      title: 'Multi-Language Support',
      description: 'Support for C, C++, Java, Python, JavaScript, and C# with syntax highlighting'
    },
    {
      icon: Zap,
      title: 'Lightning Fast Execution',
      description: 'Real-time code compilation and execution with instant feedback'
    },
    {
      icon: Shield,
      title: 'Secure Environment',
      description: 'Sandboxed execution ensures your code runs safely and securely'
    },
    {
      icon: Terminal,
      title: 'VS Code-like Editor',
      description: 'Professional code editor with auto-indentation, error highlighting, and IntelliSense'
    }
  ];

  const stats = [
    { icon: Code, value: '6+', label: 'Programming Languages' },
    { icon: Cpu, value: '< 2s', label: 'Average Execution Time' },
    { icon: Shield, value: '100%', label: 'Secure Execution' },
    { icon: Clock, value: '24/7', label: 'Available' }
  ];

  const languages = [
    { name: 'C', icon: '🔧', description: 'Low-level systems programming' },
    { name: 'C++', icon: '⚡', description: 'Object-oriented programming' },
    { name: 'Java', icon: '☕', description: 'Platform-independent development' },
    { name: 'Python', icon: '🐍', description: 'Rapid development & scripting' },
    { name: 'JavaScript', icon: '🟨', description: 'Web development & Node.js' },
    { name: 'C#', icon: '💜', description: 'Microsoft\'s .NET framework' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-6 animate-fade-in">
                POLO
              </h1>
              <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
                Programming Online Language Organizer
              </h2>
              <p className="text-xl text-blue-200 mb-8 max-w-3xl mx-auto">
                A modern, secure, and high-performance online compiler designed for students, educators, and professional developers. 
                Write, compile, and execute code in multiple programming languages directly from your browser.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/compiler" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition transform hover:scale-105 flex items-center gap-2">
                <Code className="w-6 h-6" />
                Start Coding Now
              </Link>
              <Link to="/about" className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/20 transition">
                Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* Supported Languages */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-white mb-12">
              Supported Programming Languages
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {languages.map((lang, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 text-center hover:bg-white/20 transition">
                  <div className="text-4xl mb-3">{lang.icon}</div>
                  <h3 className="text-white font-semibold mb-2">{lang.name}</h3>
                  <p className="text-blue-200 text-sm">{lang.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 px-4 bg-white/5 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-white mb-12">
              Why Choose POLO?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 hover:bg-white/20 transition">
                  <feature.icon className="w-12 h-12 text-blue-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-blue-200">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-white mb-12">
              Platform Statistics
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-blue-200">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Start Coding?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of developers who trust POLO for their coding needs
            </p>
            <Link to="/compiler" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition inline-block transform hover:scale-105">
              Launch Compiler
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
