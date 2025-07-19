import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Homepage } from './components/Homepage';
import { BooksPage } from './components/BooksPage';
import { BookDetail } from './components/BookDetail';
import { DonatePage } from './components/DonatePage';
import { DonationRequestsPage } from './components/DonationRequestsPage';
import { ProfilePage } from './components/ProfilePage';
import { mockReviews } from './data/mockData';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/books/:id" element={<BookDetail reviews={mockReviews} />} />
        <Route path="/donate" element={<DonatePage />} />
        <Route path="/donations" element={<DonationRequestsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/:tab" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;