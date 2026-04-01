import { Check, Info, X } from 'lucide-react';
import { useToast } from '../Context';

const iconMap = {
  success: <Check className="w-5 h-5 text-green-500" />,
  error: <X className="w-5 h-5 text-red-500" />,
  info: <Info className="w-5 h-5 text-blue-500" />,
};

function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 px-5 py-3 rounded-lg shadow-lg border
            bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700`}>
          {iconMap[toast.type] || iconMap.info}
          <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
            {toast.message}
          </span>
          <button
            onClick={() => removeToast(toast.id)}
            className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default ToastContainer;
