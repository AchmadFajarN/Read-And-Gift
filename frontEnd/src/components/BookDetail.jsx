import React, { useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import { StarRating } from './StarRating';
import { ArrowLeft, Gift, MapPin, Calendar, User, Heart, MessageCircle, Send, ChevronDown, ChevronUp } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useForm } from '../hooks/useForm';
import { useModal } from '../hooks/useModal';
import { mockBooks } from '../data/mockData';
import { config } from '../config/environment';

export const BookDetail = ({ reviews }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { modalState, openModal, closeModal } = useModal();
  
  // Get the book first
  const book = mockBooks.find(book => book.id === id);
  
  // Get reviews for this book
  const bookReviews = reviews.filter(review => review.bookId === id);
  
  const { formData: newReview, handleInputChange, resetForm } = useForm({ rating: 0, comment: '' });
  const { formData: newComment, handleInputChange: handleCommentChange, resetForm: resetCommentForm } = useForm({ text: '' });
  const [expandedComments, setExpandedComments] = React.useState({});
  const [reviewComments, setReviewComments] = React.useState({});
  const [reviewLikes, setReviewLikes] = React.useState(() => 
    Object.fromEntries(bookReviews.map(review => [review.id, review.likes || 0]))
  );
  const [likedReviews, setLikedReviews] = React.useState(new Set());


  const handleLikeReview = useCallback((reviewId) => {
    if (!isAuthenticated) {
      openModal('authPrompt');
      return;
    }
    
    const isLiked = likedReviews.has(reviewId);
    
    const updateLocalState = () => {
      setLikedReviews(prev => {
        const newSet = new Set(prev);
        isLiked ? newSet.delete(reviewId) : newSet.add(reviewId);
        return newSet;
      });
      
      setReviewLikes(prev => ({
        ...prev,
        [reviewId]: isLiked 
          ? Math.max(0, (prev[reviewId] || 0) - 1)
          : (prev[reviewId] || 0) + 1
      }));
    };

    // Update local state immediately for better UX
    updateLocalState();

    // Sync with backend
    const syncWithBackend = async () => {
      if (!config.USE_BACKEND) {
        return; // Skip API call when backend is disabled
      }
      
      try {
        if (isLiked) {
          await apiService.unlikeReview(reviewId);
        } else {
          await apiService.likeReview(reviewId);
        }
      } catch (error) {
        console.error('Failed to sync like status:', error);
        // Revert local state on error
        updateLocalState();
      }
    };

    syncWithBackend();
  }, [isAuthenticated, likedReviews, openModal]);

  const handleCommentSubmit = useCallback((reviewId) => {
    if (!isAuthenticated) {
      openModal('authPrompt');
      return;
    }
    
    const commentText = newComment?.text?.trim();
    if (!commentText) {
      return;
    }
    
    const addCommentLocally = (comment) => {
      setReviewComments(prev => ({
        ...prev,
        [reviewId]: [...(prev[reviewId] || []), comment]
      }));
    };

    const submitComment = async () => {
      if (!config.USE_BACKEND) {
        // Handle locally when backend is disabled
        const localComment = {
          id: Date.now().toString(),
          text: commentText,
          userName: user.name,
          userAvatar: user.avatar,
          date: new Date().toLocaleDateString(),
          likes: 0
        };
        addCommentLocally(localComment);
        resetCommentForm();
        return;
      }
      
      try {
        const response = await apiService.addComment(reviewId, {
          text: commentText
        });
        
        addCommentLocally(response.comment);
        resetCommentForm();
      } catch (error) {
        console.error('Failed to submit comment:', error);
        // Fallback to local comment for demo
        const localComment = {
          id: Date.now().toString(),
          text: commentText,
          userName: user.name,
          userAvatar: user.avatar,
          date: new Date().toLocaleDateString(),
          likes: 0
        };
        addCommentLocally(localComment);
        resetCommentForm();
      }
    };

    submitComment();
  }, [isAuthenticated, newComment, user, openModal, resetCommentForm]);

  const toggleComments = useCallback((reviewId) => {
    setExpandedComments(prev => ({
      ...prev,
      [reviewId]: !prev[reviewId]
    }));
  }, []);
  
  if (!book) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Book not found</h2>
          <button
            onClick={() => navigate('/books')}
            className="text-blue-600 hover:text-blue-800"
          >
            Back to Books
          </button>
        </div>
      </div>
    );
  }

  const handleSubmitReview = useCallback((e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      openModal('authPrompt');
      return;
    }
    
    const rating = newReview?.rating;
    const comment = newReview?.comment?.trim();
    
    if (!rating || rating === 0 || !comment) {
      return;
    }
    
    const submitReview = async () => {
      if (!config.USE_BACKEND) {
        // Handle locally when backend is disabled
        resetForm();
        return;
      }
      
      try {
        await apiService.createReview(id, {
          rating,
          comment
        });
        resetForm();
        // TODO: Refresh reviews or add to local state
      } catch (error) {
        console.error('Failed to submit review:', error);
        // TODO: Show error message to user
      }
    };
    
    submitReview();
  }, [isAuthenticated, newReview, openModal, resetForm]);


  const handleRatingChange = useCallback((rating) => {
    handleInputChange('rating', rating);
  }, [handleInputChange]);

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/books')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Kembali ke Daftar Buku</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Book Details and Reviews */}
          <div className="lg:col-span-3 space-y-8">
            {/* Book Info */}
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{book.title}</h1>
              <p className="text-xl text-gray-600 mb-4">by {book.author}</p>
              
              {/* Book Cover */}
              <div className="mb-6">
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="w-64 h-96 object-cover rounded-lg shadow-lg mx-auto lg:mx-0"
                />
              </div>
              
              <div className="flex items-center space-x-4 mb-6">
                <StarRating rating={book.averageRating} size="lg" />
                <span className="text-lg font-medium">{book.averageRating}</span>
                <span className="text-gray-500">({book.totalReviews} ulasan)</span>
                <span className="text-gray-500">• Terbit {book.publishedYear}</span>
              </div>

              <p className="text-gray-700 text-lg leading-relaxed">{book.description}</p>

              {book.donatedBy && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2 text-green-800">
                    <Gift className="w-5 h-5" />
                    <span className="font-medium">Buku ini didonasikan oleh {book.donatedBy}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Reviews Section */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Ulasan</h2>
              
              {/* Add Review Form */}
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold mb-4">Tulis Ulasan</h3>
                {!isAuthenticated && (
                  <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-blue-800 text-sm">
                      Silakan login untuk menulis ulasan.
                    </p>
                  </div>
                )}
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rating Anda
                    </label>
                    <StarRating
                      rating={newReview?.rating || 0}
                      interactive={isAuthenticated}
                      onRatingChange={handleRatingChange}
                      size="lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ulasan Anda
                    </label>
                    <textarea
                      value={newReview?.comment || ''}
                      onChange={(e) => handleInputChange('comment', e.target.value)}
                      rows={4}
                      disabled={!isAuthenticated}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder={isAuthenticated ? "Bagikan pendapat Anda tentang buku ini..." : "Silakan login untuk menulis ulasan"}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!isAuthenticated}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    Kirim Ulasan
                  </button>
                </form>
              </div>

              {/* Reviews List */}
              <div className="space-y-6">
                {bookReviews.map((review) => (
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
                        <div className="mt-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <button
                                onClick={() => handleLikeReview(review.id)}
                                className={`flex items-center space-x-2 transition-colors duration-200 ${
                                  likedReviews.has(review.id) 
                                    ? 'text-red-500' 
                                    : 'text-gray-500 hover:text-red-500'
                                }`}
                              >
                                <Heart className={`w-4 h-4 ${likedReviews.has(review.id) ? 'fill-current' : ''}`} />
                                <span className="text-sm">Membantu</span>
                              </button>
                              <button
                                onClick={() => toggleComments(review.id)}
                                className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors duration-200"
                              >
                                <MessageCircle className="w-4 h-4" />
                                <span className="text-sm">Komentar</span>
                                {expandedComments[review.id] ? (
                                  <ChevronUp className="w-3 h-3" />
                                ) : (
                                  <ChevronDown className="w-3 h-3" />
                                )}
                              </button>
                            </div>
                            <span className="text-sm text-gray-400">
                              {reviewLikes[review.id] || 0} orang merasa terbantu
                            </span>
                          </div>

                          {/* Comments Section */}
                          {expandedComments[review.id] && (
                            <div className="ml-4 pl-4 border-l-2 border-gray-200 space-y-4">
                              {/* Existing Comments */}
                              {reviewComments[review.id]?.map((comment) => (
                                <div key={comment.id} className="flex items-start space-x-3">
                                  <img
                                    src={comment.userAvatar}
                                    alt={comment.userName}
                                    className="w-8 h-8 rounded-full object-cover"
                                  />
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-1">
                                      <span className="text-sm font-medium text-gray-900">{comment.userName}</span>
                                      <span className="text-xs text-gray-500">{comment.date}</span>
                                    </div>
                                    <p className="text-sm text-gray-700">{comment.text}</p>
                                  </div>
                                </div>
                              ))}

                              {/* Add Comment Form */}
                              <div className="flex items-start space-x-3">
                                {isAuthenticated ? (
                                  <>
                                    <img
                                      src={user?.avatar}
                                      alt={user?.name}
                                      className="w-8 h-8 rounded-full object-cover"
                                    />
                                    <div className="flex-1">
                                      <div className="flex space-x-2">
                                        <input
                                          type="text"
                                          value={newComment?.text || ''}
                                          onChange={(e) => handleCommentChange('text', e.target.value)}
                                          placeholder="Tambahkan komentar..."
                                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                          onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                              handleCommentSubmit(review.id);
                                            }
                                          }}
                                        />
                                        <button
                                          onClick={() => handleCommentSubmit(review.id)}
                                          className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                                        >
                                          <Send className="w-4 h-4" />
                                        </button>
                                      </div>
                                    </div>
                                  </>
                                ) : (
                                  <div className="flex-1 text-center py-3 bg-gray-50 rounded-lg">
                                    <p className="text-sm text-gray-600">
                                      <button
                                        onClick={() => openModal('authPrompt')}
                                        className="text-blue-600 hover:text-blue-800 font-medium"
                                      >
                                        Login
                                      </button>
                                      {' '}untuk menambahkan komentar
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Auth Prompt Modal */}
      {modalState.authPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-semibold mb-4">Login Diperlukan</h3>
            <p className="text-gray-600 mb-6">
              Silakan login untuk mengakses fitur ini dan berinteraksi dengan komunitas Read&Give.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => closeModal('authPrompt')}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Batal
              </button>
              <button 
                onClick={() => {
                  closeModal('authPrompt');
                  openModal('authModal');
                }}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};