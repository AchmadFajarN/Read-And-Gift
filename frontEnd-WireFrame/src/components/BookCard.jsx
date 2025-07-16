import React from 'react';
import { StarRating } from './StarRating';
import { Heart, Gift } from 'lucide-react';

export const BookCard = ({ book, onBookClick }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
      onClick={() => onBookClick(book)}
    >
      <div className="relative">
        <img
          src={book.coverUrl}
          alt={book.title}
          className="w-full h-64 object-cover rounded-t-lg"
        />
        {book.isAvailableForDonation && (
          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
            <Gift className="w-3 h-3" />
            <span>Donatable</span>
          </div>
        )}
        <button className="absolute top-2 left-2 p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all duration-200">
          <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
        </button>
      </div>
      
      <div className="p-6">
        <div className="mb-2">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
            {book.genre}
          </span>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
          {book.title}
        </h3>
        
        <p className="text-gray-600 mb-3 font-medium">
          by {book.author}
        </p>
        
        <p className="text-gray-700 text-sm mb-4 line-clamp-3">
          {book.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <StarRating rating={book.averageRating} />
            <span className="text-sm text-gray-600">
              {book.averageRating} ({book.totalReviews})
            </span>
          </div>
          
          {book.donatedBy && (
            <div className="text-xs text-green-600 font-medium">
              Donated by {book.donatedBy}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};