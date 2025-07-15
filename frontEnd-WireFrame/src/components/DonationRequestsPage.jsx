import React, { useState } from 'react';
import { ArrowLeft, MapPin, User, Calendar, MessageCircle, Phone, Mail, Filter, Search } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const DonationRequestsPage = ({ onBack }) => {
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedCondition, setSelectedCondition] = useState('All');
  const [showContactModal, setShowContactModal] = useState(null);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);

  // Mock donation requests data
  const donationRequests = [
    {
      id: '1',
      bookTitle: 'The Midnight Library',
      bookAuthor: 'Matt Haig',
      bookCover: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg',
      donorName: 'Sarah M.',
      donorContact: 'sarah.m@email.com',
      location: 'San Francisco, CA',
      condition: 'Like New',
      notes: 'Beautiful hardcover edition, read only once. Happy to meet in downtown area.',
      datePosted: '2024-01-15',
      contactMethod: 'email'
    },
    {
      id: '2',
      bookTitle: 'Atomic Habits',
      bookAuthor: 'James Clear',
      bookCover: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg',
      donorName: 'Michael K.',
      donorContact: 'mike.k@email.com',
      location: 'Portland, OR',
      condition: 'Good',
      notes: 'Some highlighting but all pages intact. Great book for personal development!',
      datePosted: '2024-01-12',
      contactMethod: 'phone',
      phoneNumber: '(503) 555-0123'
    },
    {
      id: '3',
      bookTitle: 'The Seven Husbands of Evelyn Hugo',
      bookAuthor: 'Taylor Jenkins Reid',
      bookCover: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg',
      donorName: 'Emma L.',
      donorContact: 'emma.l@email.com',
      location: 'Seattle, WA',
      condition: 'Like New',
      notes: 'Paperback in excellent condition. Can ship if needed.',
      datePosted: '2024-01-10',
      contactMethod: 'email'
    },
    {
      id: '4',
      bookTitle: 'Educated',
      bookAuthor: 'Tara Westover',
      bookCover: 'https://images.pexels.com/photos/1560632/pexels-photo-1560632.jpeg',
      donorName: 'David R.',
      donorContact: 'david.r@email.com',
      location: 'Los Angeles, CA',
      condition: 'Good',
      notes: 'Powerful memoir, some wear on cover but pages are perfect.',
      datePosted: '2024-01-08',
      contactMethod: 'email'
    }
  ];

  const locations = ['All', ...Array.from(new Set(donationRequests.map(req => req.location)))];
  const conditions = ['All', 'Like New', 'Good', 'Fair'];

  const filteredRequests = donationRequests.filter(request => {
    const matchesSearch = request.bookTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.bookAuthor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = selectedLocation === 'All' || request.location === selectedLocation;
    const matchesCondition = selectedCondition === 'All' || request.condition === selectedCondition;
    
    return matchesSearch && matchesLocation && matchesCondition;
  });

  const handleContactRequest = (request) => {
    if (!isAuthenticated) {
      setShowAuthPrompt(true);
      return;
    }
    setShowContactModal(request);
  };

  const getConditionColor = (condition) => {
    switch (condition) {
      case 'Like New': return 'bg-green-100 text-green-800';
      case 'Good': return 'bg-blue-100 text-blue-800';
      case 'Fair': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
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
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Available Book Donations</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with generous community members who are sharing their books with fellow readers
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Books</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Search by title or author..."
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
              <select
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {conditions.map(condition => (
                  <option key={condition} value={condition}>{condition}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedLocation('All');
                  setSelectedCondition('All');
                }}
                className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredRequests.length} donation{filteredRequests.length !== 1 ? 's' : ''} available
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>

        {/* Donation Requests Grid */}
        {filteredRequests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRequests.map((request) => (
              <div key={request.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                <div className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <img
                      src={request.bookCover}
                      alt={request.bookTitle}
                      className="w-16 h-24 object-cover rounded-lg shadow-sm"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                        {request.bookTitle}
                      </h3>
                      <p className="text-gray-600 mb-2">by {request.bookAuthor}</p>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getConditionColor(request.condition)}`}>
                        {request.condition}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <User className="w-4 h-4" />
                      <span className="text-sm">Donated by {request.donorName}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{request.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">Posted {formatDate(request.datePosted)}</span>
                    </div>
                  </div>

                  {request.notes && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                        "{request.notes}"
                      </p>
                    </div>
                  )}

                  <button
                    onClick={() => handleContactRequest(request)}
                    className="w-full flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Contact Donor</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No donations found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filters to find available books.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedLocation('All');
                setSelectedCondition('All');
              }}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-semibold mb-4">Contact {showContactModal.donorName}</h3>
            <div className="space-y-4 mb-6">
              <div className="flex items-start space-x-3">
                <img
                  src={showContactModal.bookCover}
                  alt={showContactModal.bookTitle}
                  className="w-12 h-18 object-cover rounded"
                />
                <div>
                  <h4 className="font-medium text-gray-900">{showContactModal.bookTitle}</h4>
                  <p className="text-sm text-gray-600">by {showContactModal.bookAuthor}</p>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Contact Information:</h4>
                <div className="space-y-2">
                  {showContactModal.contactMethod === 'email' ? (
                    <div className="flex items-center space-x-2 text-blue-800">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">{showContactModal.donorContact}</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 text-blue-800">
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">{showContactModal.phoneNumber}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2 text-blue-800">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{showContactModal.location}</span>
                  </div>
                </div>
              </div>

              <div className="text-sm text-gray-600">
                <p className="font-medium mb-1">Tips for contacting:</p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>Be polite and introduce yourself</li>
                  <li>Mention the specific book you're interested in</li>
                  <li>Suggest a convenient meeting location</li>
                  <li>Be flexible with timing</li>
                </ul>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowContactModal(null)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Close
              </button>
              <button
                onClick={() => {
                  if (showContactModal.contactMethod === 'email') {
                    window.open(`mailto:${showContactModal.donorContact}?subject=Interest in "${showContactModal.bookTitle}"&body=Hi ${showContactModal.donorName},%0D%0A%0D%0AI'm interested in the copy of "${showContactModal.bookTitle}" you have available for donation. Could we arrange a time to meet?%0D%0A%0D%0AThank you!`);
                  } else {
                    window.open(`tel:${showContactModal.phoneNumber}`);
                  }
                  setShowContactModal(null);
                }}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                {showContactModal.contactMethod === 'email' ? 'Send Email' : 'Call Now'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Auth Prompt Modal */}
      {showAuthPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-semibold mb-4">Sign In Required</h3>
            <p className="text-gray-600 mb-6">
              Please sign in to contact donors and request book donations.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowAuthPrompt(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button 
                onClick={() => setShowAuthPrompt(false)}
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