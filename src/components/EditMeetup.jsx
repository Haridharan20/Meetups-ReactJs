import { AlertTriangle, Check, ChevronLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMeetups, useToast } from '../Context';

function EditMeetup() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { meetups, dispatch } = useMeetups();
  const { addToast } = useToast();

  const meetup = meetups.find((m) => m.id === id);

  const [form, setForm] = useState({
    name: '',
    city: '',
    address: '',
    date: '',
    description: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (meetup) {
      setForm({
        name: meetup.name || '',
        city: meetup.city || '',
        address: meetup.address || '',
        date: meetup.date || '',
        description: meetup.description || '',
      });
    }
  }, [meetup]);

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

  const validate = (values) => {
    const errs = {};
    if (!values.name.trim()) errs.name = 'Name is required';
    if (!values.city.trim()) errs.city = 'City is required';
    if (!values.address.trim()) errs.address = 'Address is required';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const newErrors = validate({ ...form, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: newErrors[name] || '' }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const newErrors = validate(form);
    setErrors((prev) => ({ ...prev, [name]: newErrors[name] || '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    setTouched({ name: true, city: true, address: true });

    if (Object.keys(validationErrors).length > 0) {
      addToast('Please fill in all required fields', 'error');
      return;
    }

    const updatedMeetup = {
      id,
      ...form,
    };

    dispatch({ type: 'UPDATE_MEETUP', payload: updatedMeetup });
    addToast(`"${form.name}" has been updated`, 'success');
    navigate('/');
  };

  const inputClass = (fieldName) =>
    `input-field ${
      errors[fieldName] && touched[fieldName]
        ? 'border-red-500 dark:border-red-500 focus:ring-red-500 focus:border-red-500'
        : ''
    }`;

  return (
    <div>
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400
                   hover:text-primary-600 dark:hover:text-primary-400 transition-colors mb-6">
        <ChevronLeft className="w-4 h-4" />
        Back to all meetups
      </Link>

      <div className="card overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Edit Meetup
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Update the meetup details below.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Meetup Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputClass('name')}
            />
            {errors.name && touched.name && (
              <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                {errors.name}
              </p>
            )}
          </div>

          {/* City */}
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={form.city}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputClass('city')}
            />
            {errors.city && touched.city && (
              <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                {errors.city}
              </p>
            )}
          </div>

          {/* Address */}
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={form.address}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputClass('address')}
            />
            {errors.address && touched.address && (
              <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                {errors.address}
              </p>
            )}
          </div>

          {/* Date */}
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Date <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Description{' '}
              <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              placeholder="Tell people what this meetup is about..."
              className="input-field resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button type="submit" className="btn-primary">
              <Check className="w-4 h-4" />
              Save Changes
            </button>
            <Link to="/" className="btn-secondary">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditMeetup;
