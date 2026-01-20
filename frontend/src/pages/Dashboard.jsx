import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { LayoutDashboard } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-dark-900">
      <Navbar />
      <main className="flex-1 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <LayoutDashboard className="w-16 h-16 text-primary-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Admin Dashboard
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Manage platform content and users
            </p>
            <div className="mt-8 card max-w-2xl mx-auto">
              <p className="text-gray-600 dark:text-gray-300">
                Admin panel for managing resources, quizzes, reviews, users, and social media links.
                Includes statistics and analytics.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
