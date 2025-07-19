import React, { useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import { config } from '../config/environment';
import { ArrowLeft, MapPin, User, Calendar, MessageCircle, Phone, Mail, Filter, Search } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useForm } from '../hooks/useForm';
import { useModal } from '../hooks/useModal';

// Mock donation requests data (moved outside component)
const mockDonationRequests = [
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

export const DonationRequestsPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { modalState, openModal, closeModal } = useModal();
  const [donationRequests, setDonationRequests] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  
  const { formData: filters, handleInputChange } = useForm({
    searchQuery: '',
  });

  const locations = useMemo(() => 
    ['All', ...Array.from(new Set(donationRequests.map(req => req.location)))],
    [donationRequests]
  );

  const filteredRequests = useMemo(() => {
    const searchQuery = filters.searchQuery.toLowerCase();
    return donationRequests.filter(request => 
      request.bookTitle.toLowerCase().includes(searchQuery)
    );
  }, [donationRequests, filters]);

  const handleContactRequest = useCallback((request) => {
    if (!isAuthenticated) {
      openModal('authPrompt');
      return;
    }
    openModal('contactModal', request);
  }, [isAuthenticated, openModal]);

  const clearFilters = useCallback(() => {
    handleInputChange('searchQuery', '');
  }, [handleInputChange]);

  // Fetch donations on component mount
  React.useEffect(() => {
    const fetchDonations = async () => {
      try {
        setLoading(true);
        if (config.USE_BACKEND) {
          const response = await apiService.getDonations();
          setDonationRequests(response.donations || response);
        } else {
          // Use mock data when backend is disabled
          setDonationRequests(mockDonationRequests);
        }
      } catch (err) {
        setError(err.message);
        // Fallback to mock data
        setDonationRequests(mockDonationRequests);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading donations...</p>
        </div>
      </div>
    );
  }

  if (error && donationRequests.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading donations: {error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Daftar Donasi Buku</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Terhubung dengan anggota komunitas yang berbagi buku dengan sesama pembaca
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cari Buku</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={filters.searchQuery}
                  onChange={(e) => handleInputChange('searchQuery', e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Cari berdasarkan judul buku..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredRequests.length} donasi tersedia
            {filters.searchQuery && ` untuk "${filters.searchQuery}"`}
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
                      <p className="text-gray-600 mb-2">oleh {request.bookAuthor}</p>
                      <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                        {request.notes}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleContactRequest(request)}
                    className="w-full flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Hubungi Donatur</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Donasi tidak ditemukan
            </h3>
            <p className="text-gray-600 mb-4">
              Coba sesuaikan pencarian Anda untuk menemukan buku yang tersedia.
            </p>
            <button
              onClick={() => {
                clearFilters();
              }}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Hapus pencarian
            </button>
          </div>
        )}
      </div>

      {/* Contact Modal */}
      {modalState.contactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-semibold mb-4">Hubungi {modalState.contactModal.donorName}</h3>
            <div className="space-y-4 mb-6">
              <div className="flex items-start space-x-3">
                <img
                  src={modalState.contactModal.bookCover}
                  alt={modalState.contactModal.bookTitle}
                  className="w-12 h-18 object-cover rounded"
                />
                <div>
                  <h4 className="font-medium text-gray-900">{modalState.contactModal.bookTitle}</h4>
                  <p className="text-sm text-gray-600">oleh {modalState.contactModal.bookAuthor}</p>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Informasi Kontak:</h4>
                <div className="space-y-2">
                  {modalState.contactModal.contactMethod === 'email' ? (
                    <div className="flex items-center space-x-2 text-blue-800">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">{modalState.contactModal.donorContact}</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 text-blue-800">
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">{modalState.contactModal.phoneNumber}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="text-sm text-gray-600">
                <p className="font-medium mb-1">Tips menghubungi:</p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>Bersikap sopan dan perkenalkan diri</li>
                  <li>Sebutkan buku yang Anda minati</li>
                  <li>Sarankan lokasi pertemuan yang nyaman</li>
                  <li>Fleksibel dengan waktu</li>
                </ul>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => closeModal('contactModal')}
                className={`${modalState.contactModal.contactMethod === 'phone' ? 'w-full' : 'flex-1'} px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200`}
              >
                Tutup
              </button>
              {modalState.contactModal.contactMethod === 'email' && (
                <button
                  onClick={() => {
                    window.open(`mailto:${modalState.contactModal.donorContact}?subject=Minat pada "${modalState.contactModal.bookTitle}"&body=Halo ${modalState.contactModal.donorName},%0D%0A%0D%0ASaya tertarik dengan buku "${modalState.contactModal.bookTitle}" yang Anda donasikan. Bisakah kita mengatur waktu untuk bertemu?%0D%0A%0D%0ATerima kasih!`);
                    closeModal('contactModal');
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Kirim Email
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Auth Prompt Modal */}
      {modalState.authPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-semibold mb-4">Login Diperlukan</h3>
            <p className="text-gray-600 mb-6">
              Silakan login untuk menghubungi donatur dan meminta donasi buku.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => closeModal('authPrompt')}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Batal
              </button>
              <button 
                onClick={() => closeModal('authPrompt')}
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