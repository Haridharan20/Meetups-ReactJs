import {
  AlertTriangle,
  AlignLeft,
  Calendar,
  ChevronLeft,
  Home,
  MapPin,
  Pencil,
  Trash2,
} from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMeetups, useToast } from '../Context';

function MeetupDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { meetups, dispatch } = useMeetups();
  const { addToast } = useToast();
  const [showConfirm, setShowConfirm] = useState(false);

  const meetup = meetups.find((m) => m.id === id);

  if (!meetup) {
    return (
      <div className="card p-12 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
          <AlertTriangle className="w-8 h-8 text-red-500" strokeWidth={1.5} />
        </div>
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">
          Meetup not found
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
          This meetup may have been deleted.
        </p>
        <Link to="/" className="btn-primary">
          Back to Meetups
        </Link>
      </div>
    );
  }

  const handleDelete = () => {
    dispatch({ type: 'DELETE_MEETUP', payload: id });
    addToast(`"${meetup.name}" has been deleted`, 'success');
    navigate('/');
  };

  const formattedDate = meetup.date
    ? new Date(meetup.date + 'T00:00:00').toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : null;

  const details = [
    { icon: MapPin, label: 'City', value: meetup.city },
    { icon: Home, label: 'Address', value: meetup.address },
    { icon: Calendar, label: 'Date', value: formattedDate },
    { icon: AlignLeft, label: 'Description', value: meetup.description },
  ].filter((d) => d.value);

  return (
    <div>
      {/* Breadcrumb */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400
                   hover:text-primary-600 dark:hover:text-primary-400 transition-colors mb-6">
        <ChevronLeft className="w-4 h-4" />
        Back to all meetups
      </Link>

      {/* Detail Card */}
      <div className="card overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {meetup.name}
          </h1>
        </div>

        {/* Details */}
        <div className="px-6 py-5 space-y-4">
          {details.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-3">
              <div className="w-10 h-10 bg-primary-50 dark:bg-primary-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {label}
                </p>
                <p className="text-gray-900 dark:text-white">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <Link to={`/meetups/edit/${meetup.id}`} className="btn-primary">
            <Pencil className="w-4 h-4" />
            Edit Meetup
          </Link>

          {!showConfirm ? (
            <button onClick={() => setShowConfirm(true)} className="btn-danger">
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-sm text-red-600 dark:text-red-400 font-medium">
                Are you sure?
              </span>
              <button onClick={handleDelete} className="btn-danger">
                Yes, delete
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="btn-secondary">
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MeetupDetails;
