import { Link } from 'react-router-dom';
import { Code, Zap, Shield, Target, Users, Globe, Award, Heart } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  const features = [
    {
      icon: Code,
      title: 'Multi-Language Support',
      description: 'Support for C, C++, Java, Python, JavaScript, and C# with industry-standard compilers and interpreters.'
    },
    {
      icon: Zap,
      title: 'Lightning Fast Execution',
      description: 'Optimized code execution with real-time feedback and instant results for enhanced productivity.'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Sandboxed execution environment ensuring complete security and protection against malicious code.'
    },
    {
      icon: Target,
      title: 'Developer-Focused',
      description: 'Built by developers, for developers. Every feature designed with the coding workflow in mind.'
    }
  ];

  const values = [
    {
      icon: Users,
      title: 'Accessibility',
      description: 'Making programming education and tools accessible to everyone, everywhere.'
    },
    {
      icon: Globe,
      title: 'Innovation',
      description: 'Continuously evolving with the latest technologies and programming trends.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Commitment to providing the highest quality coding environment and user experience.'
    },
    {
      icon: Heart,
      title: 'Community',
      description: 'Building a supportive community of learners, educators, and professional developers.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">POLO</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Programming Online Language Organizer - Revolutionizing how developers learn, code, and collaborate.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                <p className="text-lg text-gray-600 mb-6">
                  POLO was born from a simple yet powerful vision: to democratize programming education and development tools. 
                  We believe that every aspiring developer, student, and professional should have access to a world-class coding 
                  environment without barriers.
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  Our platform bridges the gap between learning and doing, providing a seamless experience from writing your 
                  first "Hello World" to building complex applications. With POLO, coding becomes more accessible, collaborative, and efficient.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/compiler" className="btn-primary">
                    Start Coding Now
                  </Link>
                  <Link to="/contact" className="btn-secondary">
                    Get in Touch
                  </Link>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Why POLO?</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>No software installation required</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Multi-language support out of the box</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Secure, sandboxed execution</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Real-time collaboration features</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Professional-grade development tools</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Platform Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="card hover:shadow-xl transition">
                  <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Built with Modern Technology
            </h2>
            <p className="text-lg text-gray-600 mb-12">
              POLO leverages cutting-edge technologies to deliver a seamless coding experience:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Code className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Monaco Editor</h3>
                <p className="text-sm text-gray-600">VS Code's editor</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Docker Containers</h3>
                <p className="text-sm text-gray-600">Secure execution</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Cloud Infrastructure</h3>
                <p className="text-sm text-gray-600">Scalable & fast</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Globe className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Web Technologies</h3>
                <p className="text-sm text-gray-600">Modern web standards</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Target className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Performance First</h3>
                <p className="text-sm text-gray-600">Optimized for speed</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Users className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-gray-900">User Experience</h3>
                <p className="text-sm text-gray-600">Intuitive design</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Experience POLO?
            </h2>
            <p className="text-xl mb-8">
              Join thousands of developers who have already discovered the power of online coding
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/compiler" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block">
                Start Coding Now
              </Link>
              <Link to="/register" className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition">
                Create Free Account
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;