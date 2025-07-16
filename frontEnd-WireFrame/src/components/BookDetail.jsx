import React, { useState } from 'react';
import { StarRating } from './StarRating';
import { ArrowLeft, Heart, Share2, Gift, MapPin, Calendar, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const BookDetail = ({ book, reviews, onBack }) => {
  const { isAuthenticated } = useAuth();
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setShowAuthPrompt(true);
      return;
    }
    // Handle review submission
    console.log('New review:', newReview);
    setNewReview({ rating: 0, comment: '' });
  };

  const handleDonationRequest = () => {
    if (!isAuthenticated) {
      setShowAuthPrompt(true);
      return;
    }
    setShowDonationModal(true);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Books</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Book Cover and Info */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <img
                src={book.coverUrl}
                alt={book.title}
                className="w-full max-w-sm mx-auto rounded-lg shadow-lg"
              />
              
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-center space-x-4">
                  <button 
                    onClick={() => !isAuthenticated && setShowAuthPrompt(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    <Heart className="w-4 h-4" />
                    <span>Add to Wishlist</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                </div>

                {book.isAvailableForDonation && (
                  <button
                    onClick={handleDonationRequest}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                  >
                    <Gift className="w-5 h-5" />
                    <span>Request Donation</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Book Details and Reviews */}
          <div className="lg:col-span-2 space-y-8">
            {/* Book Info */}
            <div>
              <div className="mb-4">
                <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-medium">
                  {book.genre}
                </span>
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{book.title}</h1>
              <p className="text-xl text-gray-600 mb-4">by {book.author}</p>
              
              <div className="flex items-center space-x-4 mb-6">
                <StarRating rating={book.averageRating} size="lg" />
                <span className="text-lg font-medium">{book.averageRating}</span>
                <span className="text-gray-500">({book.totalReviews} reviews)</span>
                <span className="text-gray-500">• Published {book.publishedYear}</span>
              </div>

              <p className="text-gray-700 text-lg leading-relaxed">{book.description}</p>

              {book.donatedBy && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2 text-green-800">
                    <Gift className="w-5 h-5" />
                    <span className="font-medium">This book was donated by {book.donatedBy}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Reviews Section */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Reviews</h2>
              
              {/* Add Review Form */}
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
                {!isAuthenticated && (
                  <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-blue-800 text-sm">
                      Please sign in to write a review.
                    </p>
                  </div>
                )}
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Rating
                    </label>
                    <StarRating
                      rating={newReview.rating}
                      interactive={isAuthenticated}
                      onRatingChange={(rating) => setNewReview({ ...newReview, rating })}
                      size="lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Review
                    </label>
                    <textarea
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      rows={4}
                      disabled={!isAuthenticated}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder={isAuthenticated ? "Share your thoughts about this book..." : "Please sign in to write a review"}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!isAuthenticated}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    Submit Review
                  </button>
                </form>
              </div>

              {/* Reviews List */}
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-6">
                    <div className="flex items-start space-x-4">
                      <img
                        src={review.userAvatar || `https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg`}
                        alt={review.userName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold text-gray-900">{review.userName}</h4>
                          <span className="text-gray-500 text-sm">•</span>
                          <span className="text-gray-500 text-sm">{review.date}</span>
                        </div>
                        <StarRating rating={review.rating} size="sm" />
                        <p className="text-gray-700 mt-3 leading-relaxed">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Donation Modal */}
      {showDonationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-semibold mb-4">Request Book Donation</h3>
            <p className="text-gray-600 mb-6">
              Contact the donor to request this book. They will reach out to you directly.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-gray-700">
                <User className="w-4 h-4" />
                <span>Donated by {book.donatedBy}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700">
                <MapPin className="w-4 h-4" />
                <span>Location will be shared upon contact</span>
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowDonationModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Auth Prompt Modal */}
      {showAuthPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-semibold mb-4">Sign In Required</h3>
            <p className="text-gray-600 mb-6">
              Please sign in to access this feature and interact with the BookShare community.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowAuthPrompt(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setShowAuthPrompt(false);
                  // This would trigger the auth modal in the header
                }}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};