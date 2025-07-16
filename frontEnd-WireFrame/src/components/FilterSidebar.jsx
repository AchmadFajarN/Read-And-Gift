import React from 'react';
import { Filter, X } from 'lucide-react';

const genres = ['All', 'Fiction', 'Self-Help', 'Romance', 'Memoir', 'Thriller', 'Biography', 'Mystery', 'Fantasy', 'Science Fiction'];

export const FilterSidebar = ({
  selectedGenre,
  selectedRating,
  showDonationsOnly,
  onGenreChange,
  onRatingChange,
  onDonationsToggle,
  onClearFilters
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-fit sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
          <Filter className="w-5 h-5" />
          <span>Filters</span>
        </h3>
        <button
          onClick={onClearFilters}
          className="text-sm text-blue-600 hover:text-blue-800 flex items-center space-x-1"
        >
          <X className="w-4 h-4" />
          <span>Clear</span>
        </button>
      </div>

      {/* Genre Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Genre</h4>
        <div className="space-y-2">
          {genres.map((genre) => (
            <label key={genre} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="genre"
                value={genre}
                checked={selectedGenre === genre}
                onChange={(e) => onGenreChange(e.target.value)}
                className="sr-only"
              />
              <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                selectedGenre === genre
                  ? 'border-blue-600 bg-blue-600'
                  : 'border-gray-300'
              }`}>
                {selectedGenre === genre && (
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                )}
              </div>
              <span className={`text-sm ${
                selectedGenre === genre
                  ? 'text-blue-600 font-medium'
                  : 'text-gray-700'
              }`}>
                {genre}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Minimum Rating</h4>
        <div className="space-y-2">
          {[0, 3, 4, 4.5].map((rating) => (
            <label key={rating} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="rating"
                value={rating}
                checked={selectedRating === rating}
                onChange={(e) => onRatingChange(Number(e.target.value))}
                className="sr-only"
              />
              <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                selectedRating === rating
                  ? 'border-blue-600 bg-blue-600'
                  : 'border-gray-300'
              }`}>
                {selectedRating === rating && (
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                )}
              </div>
              <span className={`text-sm ${
                selectedRating === rating
                  ? 'text-blue-600 font-medium'
                  : 'text-gray-700'
              }`}>
                {rating === 0 ? 'Any Rating' : `${rating}+ Stars`}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Donation Filter */}
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-3">Availability</h4>
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={showDonationsOnly}
            onChange={(e) => onDonationsToggle(e.target.checked)}
            className="sr-only"
          />
          <div className={`w-4 h-4 rounded border-2 mr-3 flex items-center justify-center ${
            showDonationsOnly
              ? 'border-green-600 bg-green-600'
              : 'border-gray-300'
          }`}>
            {showDonationsOnly && (
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          <span className={`text-sm ${
            showDonationsOnly
              ? 'text-green-600 font-medium'
              : 'text-gray-700'
          }`}>
            Available for Donation
          </span>
        </label>
      </div>
    </div>
  );
};