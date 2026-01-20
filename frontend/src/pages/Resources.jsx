import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { BookOpen } from 'lucide-react';

const Resources = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-dark-900">
      <Navbar />
      <main className="flex-1 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <BookOpen className="w-16 h-16 text-primary-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Learning Resources
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Browse and download educational resources and e-books
            </p>
            <div className="mt-8 card max-w-2xl mx-auto">
              <p className="text-gray-600 dark:text-gray-300">
                This feature allows browsing and downloading educational PDFs and e-books.
                Implement resource cards with category filtering, search, and download functionality.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Resources;
