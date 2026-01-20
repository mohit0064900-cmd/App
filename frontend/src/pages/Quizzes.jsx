import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Brain } from 'lucide-react';

const Quizzes = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-dark-900">
      <Navbar />
      <main className="flex-1 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <Brain className="w-16 h-16 text-primary-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Interactive Quizzes
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Test your knowledge and compete on leaderboards
            </p>
            <div className="mt-8 card max-w-2xl mx-auto">
              <p className="text-gray-600 dark:text-gray-300">
                Browse available quizzes or join a quiz using a unique code.
                Features include timers, leaderboards, and instant results.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Quizzes;
