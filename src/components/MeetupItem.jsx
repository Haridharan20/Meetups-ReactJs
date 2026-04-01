import { Calendar, ChevronRight, Home, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

function MeetupItem({ meetup }) {
  const { id, name, city, address, date, description } = meetup;

  const formattedDate = date
    ? new Date(date + 'T00:00:00').toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : null;

  return (
    <Link
      to={`/meetups/${id}`}
      className="card group hover:shadow-md hover:border-primary-200 dark:hover:border-primary-800 p-5 block">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors truncate">
            {name}
          </h3>

          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              {city}
            </span>
            <span className="flex items-center gap-1.5">
              <Home className="w-4 h-4 flex-shrink-0" />
              {address}
            </span>
            {formattedDate && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 flex-shrink-0" />
                {formattedDate}
              </span>
            )}
          </div>

          {description && (
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
              {description}
            </p>
          )}
        </div>

        <ChevronRight
          className="w-5 h-5 text-gray-400 group-hover:text-primary-500 transition-all duration-200
                     group-hover:translate-x-0.5 flex-shrink-0 mt-1"
        />
      </div>
    </Link>
  );
}

export default MeetupItem;
