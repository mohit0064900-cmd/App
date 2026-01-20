import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const QuizPlay = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-dark-900">
      <Navbar />
      <main className="flex-1 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="card text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Quiz Player
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Quiz playing interface with timer and question navigation.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default QuizPlay;
