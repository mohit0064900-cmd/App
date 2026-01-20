import { Link } from 'react-router-dom';
import { Code, BookOpen, Brain, Star, Award, Users } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
  const features = [
    {
      icon: Code,
      title: 'Online Code Compiler',
      description: 'Write and execute code in 6+ languages with our VS Code-like editor',
      link: '/compiler'
    },
    {
      icon: BookOpen,
      title: 'Learning Resources',
      description: 'Access curated e-books and materials for programming and development',
      link: '/resources'
    },
    {
      icon: Brain,
      title: 'Interactive Quizzes',
      description: 'Test your knowledge with category-based quizzes and compete on leaderboards',
      link: '/quizzes'
    },
    {
      icon: Star,
      title: 'Reviews & Feedback',
      description: 'Share your experience and help us improve the platform',
      link: '/reviews'
    }
  ];

  const stats = [
    { icon: Users, value: '1000+', label: 'Active Users' },
    { icon: Code, value: '10K+', label: 'Code Executions' },
    { icon: BookOpen, value: '100+', label: 'Resources' },
    { icon: Award, value: '50+', label: 'Quizzes' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50 dark:from-dark-900 dark:to-dark-800">
      <Navbar />
      
      <main className="flex-1">
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in">
              Welcome to Learning Platform
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Your all-in-one platform for coding, learning, and skill assessment. 
              Master programming languages, access quality resources, and test your knowledge.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/compiler" className="btn-primary px-8 py-3 text-lg">
                Try Compiler
              </Link>
              <Link to="/quizzes" className="btn-secondary px-8 py-3 text-lg">
                Take a Quiz
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-white dark:bg-dark-800">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              Platform Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Link
                  key={index}
                  to={feature.link}
                  className="card hover:shadow-xl transition transform hover:-translate-y-1"
                >
                  <feature.icon className="w-12 h-12 text-primary-600 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              Platform Statistics
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-primary-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-xl mb-8">
              Join thousands of developers improving their skills every day
            </p>
            <Link to="/register" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block">
              Get Started Free
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
