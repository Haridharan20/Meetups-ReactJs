import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MeetupProvider, ToastProvider, ThemeProvider } from './Context';
import Navbar from './components/Navbar';
import Meetups from './components/Meetups';
import MeetupDetails from './components/MeetupDetails';
import AddMeetup from './components/AddMeetup';
import EditMeetup from './components/EditMeetup';
import About from './components/About';
import ToastContainer from './components/ToastContainer';

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <MeetupProvider>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <Navbar />
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <Routes>
                <Route path="/" element={<Meetups />} />
                <Route path="/about" element={<About />} />
                <Route path="/meetups/add" element={<AddMeetup />} />
                <Route path="/meetups/edit/:id" element={<EditMeetup />} />
                <Route path="/meetups/:id" element={<MeetupDetails />} />
              </Routes>
            </main>
            <ToastContainer />
          </div>
        </MeetupProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
