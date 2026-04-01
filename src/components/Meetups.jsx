import { MapPin, Plus, Search, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMeetups } from '../Context';
import MeetupItem from './MeetupItem';

function Meetups() {
  const { meetups } = useMeetups();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMeetups = useMemo(() => {
    if (!searchTerm.trim()) return meetups;
    const term = searchTerm.toLowerCase();
    return meetups.filter(
      (meetup) =>
        meetup.name.toLowerCase().includes(term) ||
        meetup.city.toLowerCase().includes(term) ||
        meetup.address.toLowerCase().includes(term),
    );
  }, [meetups, searchTerm]);

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Meetups
          </h1>
          <p className="mt-1 text-gray-500 dark:text-gray-400 text-sm">
            {meetups.length} meetup{meetups.length !== 1 ? 's' : ''} scheduled
          </p>
        </div>
        <Link to="/meetups/add" className="btn-primary">
          <Plus className="w-5 h-5" />
          New Meetup
        </Link>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search by name, city, or address..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input-field pl-12"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Meetup List */}
      {filteredMeetups.length === 0 ? (
        <div className="card p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <MapPin className="w-8 h-8 text-gray-400" strokeWidth={1.5} />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">
            {searchTerm ? 'No matches found' : 'No meetups yet'}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
            {searchTerm
              ? `No meetups match "${searchTerm}". Try a different search.`
              : 'Get started by creating your first meetup.'}
          </p>
          {!searchTerm && (
            <Link to="/meetups/add" className="btn-primary">
              <Plus className="w-5 h-5" />
              Create Meetup
            </Link>
          )}
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredMeetups.map((meetup) => (
            <MeetupItem key={meetup.id} meetup={meetup} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Meetups;
