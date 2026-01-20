import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Star } from 'lucide-react';

const Reviews = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-dark-900">
      <Navbar />
      <main className="flex-1 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <Star className="w-16 h-16 text-primary-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Reviews & Feedback
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              See what others say and share your experience
            </p>
            <div className="mt-8 card max-w-2xl mx-auto">
              <p className="text-gray-600 dark:text-gray-300">
                View platform reviews with star ratings and written feedback.
                Users can submit their own reviews after logging in.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Reviews;
