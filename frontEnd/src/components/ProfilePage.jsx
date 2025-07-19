import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import { ArrowLeft, User, Star, Gift, Edit2, Calendar, BookOpen, Heart, MessageCircle, ChevronDown } from 'lucide-react';
import { formatDate, formatInterestedUsers } from '../utils/formatters';
import { getStatusColor } from '../utils/styles';
import { DONATION_STATUS } from '../constants';
import { useAuth } from '../hooks/useAuth';
import { StarRating } from './StarRating';

// Mock user reviews (moved outside component)
const mockUserReviews = [
  {
    id: '1',
    bookId: '1',
    bookTitle: 'The Midnight Library',
    bookAuthor: 'Matt Haig',
    bookCover: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg',
    rating: 5,
    comment: 'Absolutely beautiful and thought-provoking. Haig has created something truly special that makes you think about life\'s infinite possibilities.',
    date: '2024-01-15',
    likes: 12,
    helpful: 8
  },
  {
    id: '2',
    bookId: '2',
    bookTitle: 'Atomic Habits',
    bookAuthor: 'James Clear',
    bookCover: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg',
    rating: 5,
    comment: 'Life-changing! Clear\'s approach to habit formation is backed by science and incredibly practical. Highly recommend.',
    date: '2024-01-10',
    likes: 18,
    helpful: 15
  },
  {
    id: '3',
    bookId: '3',
    bookTitle: 'The Seven Husbands of Evelyn Hugo',
    bookAuthor: 'Taylor Jenkins Reid',
    bookCover: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg',
    rating: 4,
    comment: 'Captivating story with complex characters. Reid\'s writing is engaging and the plot twists kept me hooked.',
    date: '2024-01-05',
    likes: 9,
    helpful: 6
  }
];

export const ProfilePage = () => {
  const { tab } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const currentTab = tab || 'profile';
  const [donations, setDonations] = useState([
    {
      id: '1',
      bookTitle: 'The Midnight Library',
      bookAuthor: 'Matt Haig',
      bookCover: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg',
      datePosted: '2024-01-14',
      status: 'Available',
      interestedUsers: 3,
      notes: 'Beautiful hardcover edition, read only once.'
    },
    {
      id: '2',
      bookTitle: 'Educated',
      bookAuthor: 'Tara Westover',
      bookCover: 'https://images.pexels.com/photos/1560632/pexels-photo-1560632.jpeg',
      datePosted: '2024-01-08',
      status: 'Claimed',
      claimedBy: 'Sarah M.',
      claimedDate: '2024-01-12',
      notes: 'Powerful memoir, some wear on cover but pages are perfect.'
    },
    {
      id: '3',
      bookTitle: 'The Silent Patient',
      bookAuthor: 'Alex Michaelides',
      bookCover: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg',
      datePosted: '2024-01-01',
      status: 'Available',
      interestedUsers: 1,
      notes: 'Thrilling psychological novel in excellent condition.'
    }
  ]);

  const [userReviews, setUserReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (donationId, newStatus) => {
    // Update local state immediately
    const updateLocalState = () => {
      setDonations(prev =>
        prev.map(donation =>
          donation.id === donationId ? { ...donation, status: newStatus } : donation
        )
      );
    };

    updateLocalState();

    // Sync with backend
    try {
      await apiService.updateDonationStatus(donationId, newStatus);
    } catch (error) {
      console.error('Failed to update donation status:', error);
      // Could revert local state here if needed
    }
  };

  const displayReviews = userReviews.length > 0 ? userReviews : mockUserReviews;

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'reviews', label: 'My Reviews', icon: Star },
    { id: 'donations', label: 'My Donations', icon: Gift }
  ];

  // Fetch user data when component mounts or tab changes
  React.useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        if (currentTab === 'reviews') {
          const reviews = await apiService.getUserReviews();
          setUserReviews(reviews);
        } else if (currentTab === 'donations') {
          const userDonations = await apiService.getUserDonations();
          setDonations(userDonations);
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        // Keep using mock data on error
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [currentTab, user]);

  // Mock user data with more details
  const userProfile = {
    ...user,
    bio: 'Passionate reader who loves sharing great books with the community. Always looking for my next great read!',
    totalReviews: 23,
    totalDonations: 7,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-start space-x-6">
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              className="w-24 h-24 rounded-full object-cover shadow-lg"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{userProfile.name}</h1>
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <Edit2 className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              </div>
              
              <p className="text-gray-700 mb-4">{userProfile.bio}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{userProfile.totalReviews}</div>
                  <div className="text-sm text-yellow-800">Reviews</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{userProfile.totalDonations}</div>
                  <div className="text-sm text-green-800">Donations</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => navigate(`/profile/${tab.id}`)}
                    className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      currentTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {currentTab === 'profile' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <p className="text-gray-900">{userProfile.email}</p>
                </div>
              </div>
            </div>
          )}

          {currentTab === 'reviews' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">My Reviews ({displayReviews.length})</h3>
              </div>
              
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading reviews...</p>
                </div>
              ) : (
              <div className="space-y-6">
                {displayReviews.map((review) => (
                  <div key={review.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-start space-x-4">
                      <img
                        src={review.bookCover}
                        alt={review.bookTitle}
                        className="w-16 h-24 object-cover rounded-lg shadow-sm"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">{review.bookTitle}</h4>
                            <p className="text-gray-600">by {review.bookAuthor}</p>
                          </div>
                          <div className="text-right">
                            <StarRating rating={review.rating} size="sm" />
                            <p className="text-sm text-gray-500 mt-1">{formatDate(review.date)}</p>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 mb-4 leading-relaxed">{review.comment}</p>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Heart className="w-4 h-4" />
                            <span>{review.likes} likes</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="w-4 h-4" />
                            <span>{review.helpful} found helpful</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              )}
            </div>
          )}

          {currentTab === 'donations' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                  onClick={() => navigate('/donate')}
                <h3 className="text-lg font-semibold text-gray-900">My Donations ({donations.length})</h3>
                <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
                  <Gift className="w-4 h-4" />
                  <span>Donate New Book</span>
                </button>
              </div>
              
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading donations...</p>
                </div>
              ) : (
              <div className="space-y-6">
                {donations.map((donation) => (
                  <div key={donation.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-start space-x-4">
                      <img
                        src={donation.bookCover}
                        alt={donation.bookTitle}
                        className="w-16 h-24 object-cover rounded-lg shadow-sm"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">{donation.bookTitle}</h4>
                            <p className="text-gray-600">by {donation.bookAuthor}</p>
                          </div>
                          <div className="text-right">
                            <div className="relative">
                              <select
                                value={donation.status}
                                onChange={(e) => handleStatusChange(donation.id, e.target.value)}
                                className={`appearance-none px-3 py-1 pr-8 rounded-full text-xs font-medium border-0 cursor-pointer ${getStatusColor(donation.status)}`}
                              >
                                <option value={DONATION_STATUS.AVAILABLE}>{DONATION_STATUS.AVAILABLE}</option>
                                <option value={DONATION_STATUS.PENDING}>{DONATION_STATUS.PENDING}</option>
                                <option value={DONATION_STATUS.CLAIMED}>{DONATION_STATUS.CLAIMED}</option>
                                <option value={DONATION_STATUS.COMPLETED}>{DONATION_STATUS.COMPLETED}</option>
                              </select>
                              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 pointer-events-none" />
                            </div>
                            <p className="text-sm text-gray-500 mt-1">Posted {formatDate(donation.datePosted)}</p>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 mb-4">{donation.notes}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-600">
                            {donation.status === DONATION_STATUS.AVAILABLE ? (
                              <span>{formatInterestedUsers(donation.interestedUsers)}</span>
                            ) : (
                              <span>
                                {donation.claimedBy && donation.claimedDate 
                                  ? `Claimed by ${donation.claimedBy} on ${formatDate(donation.claimedDate)}`
                                  : `Status: ${donation.status}`
                                }
                              </span>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                              Edit
                            </button>
                            {donation.status === DONATION_STATUS.AVAILABLE && (
                              <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                                Remove
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};