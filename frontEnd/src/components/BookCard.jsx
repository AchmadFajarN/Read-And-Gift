import React from 'react';
import { StarRating } from './StarRating';
import { Heart } from 'lucide-react';

/**
 * Komponen BookCard
 * 
 * Kartu yang menampilkan informasi buku dalam format grid.
 * Menampilkan:
 * - Gambar sampul buku
 * - Judul dan penulis buku
 * - Deskripsi singkat
 * - Rating bintang dan jumlah ulasan
 * 
 * Props:
 * - book: Object berisi data buku (title, author, coverUrl, description, dll)
 * - onBookClick: Fungsi callback saat kartu diklik
 * 
 * Fitur:
 * - Hover effects dengan transform dan shadow
 * - Responsive design
 * - Truncated text untuk konsistensi layout
 */
export const BookCard = ({ book, onBookClick }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
      onClick={() => onBookClick(book)}
    >
      {/* Container gambar sampul */}
      <div className="relative">
        <img
          src={book.coverUrl}
          alt={book.title}
          className="w-full h-64 object-cover rounded-t-lg"
        />
      </div>
      
      {/* Konten informasi buku */}
      <div className="p-6">
        {/* Judul buku dengan line clamp untuk konsistensi */}
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
          {book.title}
        </h3>
        
        {/* Nama penulis */}
        <p className="text-gray-600 mb-3 font-medium">
          oleh {book.author}
        </p>
        
        {/* Deskripsi buku yang dipotong */}
        <p className="text-gray-700 text-sm mb-4 line-clamp-3">
          {book.description}
        </p>
        
        {/* Rating dan jumlah ulasan */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <StarRating rating={book.averageRating} />
            <span className="text-sm text-gray-600">
              {book.averageRating} ({book.totalReviews})
            </span>
          </div>
          
        </div>
      </div>
    </div>
  );
};