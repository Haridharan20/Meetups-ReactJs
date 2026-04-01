import React, { createContext, useContext, useReducer, useState, useEffect, useCallback } from 'react';
import { v4 as uuid } from 'uuid';

// ── Meetup Context ──────────────────────────────────────────────

const MeetupContext = createContext();

const initialMeetups = [
  {
    id: uuid(),
    name: 'React Developers Meetup',
    city: 'London',
    address: '42 Tech Lane, Shoreditch',
    date: '2026-04-15',
    description: 'Monthly gathering of React enthusiasts to share knowledge and network.',
  },
  {
    id: uuid(),
    name: 'JavaScript Innovators',
    city: 'San Francisco',
    address: '100 Market Street',
    date: '2026-04-22',
    description: 'Exploring the latest in JavaScript frameworks and tooling.',
  },
  {
    id: uuid(),
    name: 'Frontend Masters Guild',
    city: 'Bangalore',
    address: '4th Main Road, Indiranagar',
    date: '2026-05-01',
    description: 'A community for frontend developers to learn, build, and grow together.',
  },
];

function meetupReducer(state, action) {
  switch (action.type) {
    case 'ADD_MEETUP':
      return [action.payload, ...state];
    case 'DELETE_MEETUP':
      return state.filter((meetup) => meetup.id !== action.payload);
    case 'UPDATE_MEETUP':
      return state.map((meetup) =>
        meetup.id === action.payload.id ? action.payload : meetup
      );
    default:
      return state;
  }
}

export function MeetupProvider({ children }) {
  const [meetups, dispatch] = useReducer(meetupReducer, initialMeetups);

  return (
    <MeetupContext.Provider value={{ meetups, dispatch }}>
      {children}
    </MeetupContext.Provider>
  );
}

export function useMeetups() {
  const context = useContext(MeetupContext);
  if (!context) {
    throw new Error('useMeetups must be used within a MeetupProvider');
  }
  return context;
}

// ── Toast Context ───────────────────────────────────────────────

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success', duration = 3000) => {
    const id = uuid();
    setToasts((prev) => [...prev, { id, message, type, exiting: false }]);
    setTimeout(() => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, exiting: true } : t))
      );
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 300);
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, exiting: true } : t))
    );
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 300);
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

// ── Theme Context ───────────────────────────────────────────────

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => !prev);
  }, []);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
