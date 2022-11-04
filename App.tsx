import * as React from 'react';
import Header from './components/Header/Header';
import Events from './components/Events/Events';
import BookEvent from './components/Events/BookEvent';
import { Routes, Route, Navigate } from 'react-router-dom';
import './style.scss';

export default function App() {
  return (
    <React.Fragment>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Navigate replace to="/events" />} />
          <Route path="/events" element={<Events />} />
          <Route path="/book-event/:eventId" element={<BookEvent />} />
        </Routes>
      </main>
    </React.Fragment>
  );
}
