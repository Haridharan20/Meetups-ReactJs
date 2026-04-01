import { ChevronLeft, Pencil, Plus, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

function About() {
  const features = [
    {
      icon: Plus,
      title: 'Create',
      description: 'Schedule meetups with all the details your attendees need.',
    },
    {
      icon: Pencil,
      title: 'Manage',
      description: 'Edit details anytime as plans evolve and change.',
    },
    {
      icon: Search,
      title: 'Discover',
      description: 'Search and filter to find the meetups that interest you.',
    },
  ];

  return (
    <div>
      <div className="card overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            About Meetupz
          </h1>
        </div>

        <div className="px-6 py-6 space-y-4">
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Meetupz is a modern web application for organizing and managing
            developer meetups. Create events, share details with your community,
            and keep track of all your upcoming gatherings in one clean, simple
            interface.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                  {title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {description}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Built with React 18, Tailwind CSS, React Router 6, and Lucide
              icons.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <Link to="/" className="btn-primary">
          <ChevronLeft className="w-4 h-4" />
          Back to Meetups
        </Link>
      </div>
    </div>
  );
}

export default About;
