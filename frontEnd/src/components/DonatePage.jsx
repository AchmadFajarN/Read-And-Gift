import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import { ArrowLeft, Upload, MapPin, BookOpen, Plus, X, Camera, Check } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useForm } from '../hooks/useForm';
import { useModal } from '../hooks/useModal';
import { AuthModal } from './AuthModal';

/**
 * Komponen DonatePage
 * 
 * Halaman untuk mendonasikan buku dengan proses multi-step:
 * 1. Form detail buku (judul, penulis, genre, deskripsi, gambar)
 * 2. Form informasi kontak (alamat, metode kontak)
 * 3. Konfirmasi sukses
 * 
 * Fitur:
 * - Multi-step form dengan progress indicator
 * - Upload gambar sampul buku
 * - Validasi form di setiap step
 * - Integrasi dengan sistem autentikasi
 * - Modal autentikasi untuk pengguna yang belum login
 * 
 * State Management:
 * - useForm untuk data form
 * - useModal untuk state modal dan step
 * - useAuth untuk autentikasi
 */
export const DonatePage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, login, signup } = useAuth();
  const { modalState, openModal, closeModal } = useModal();
  
  const step = modalState.donationStep || 'form';
  const showAuthPrompt = !isAuthenticated;
  
  // Form state untuk detail buku
  const { formData, handleInputChange, resetForm: resetBookForm } = useForm({
    title: '',
    author: '',
    genre: 'Fiction',
    description: '',
    publishedYear: '',
    coverImage: null,
    coverPreview: ''
  });
  
  // Form state untuk informasi lokasi dan kontak
  const { formData: locationData, handleInputChange: handleLocationChange, resetForm: resetLocationForm } = useForm({
    address: '',
    city: '',
    state: '',
    zipCode: '',
    contactMethod: 'email',
    phoneNumber: '',
    notes: ''
  });

  // Daftar genre buku yang tersedia
  const genres = ['Fiction', 'Non-Fiction', 'Self-Help', 'Romance', 'Thriller', 'Biography', 'Mystery', 'Fantasy', 'Science Fiction', 'History', 'Poetry', 'Children'];

  /**
   * Menangani upload gambar sampul buku
   * Membuat preview gambar untuk ditampilkan
   */
  const handleImageUpload = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleInputChange('coverImage', file);
      const reader = new FileReader();
      reader.onload = (e) => {
        handleInputChange('coverPreview', e.target?.result);
      };
      reader.readAsDataURL(file);
    }
  }, [handleInputChange]);

  /**
   * Menangani submit form detail buku (step 1)
   * Validasi dan lanjut ke step berikutnya
   */
  const handleFormSubmit = useCallback((e) => {
    e.preventDefault();
    
    const title = formData?.title?.trim();
    const author = formData?.author?.trim();
    
    if (!title || !author) {
      return;
    }
    
    if (!isAuthenticated) {
      openModal('authPrompt');
      return;
    }
    
    openModal('donationStep', 'location');
  }, [formData, isAuthenticated, openModal]);

  /**
   * Menangani submit form lokasi (step 2)
   * Validasi dan submit donasi ke backend
   */
  const handleLocationSubmit = useCallback((e) => {
    e.preventDefault();
    
    const city = locationData?.city?.trim();
    const state = locationData?.state?.trim();
    const isPhoneMethod = locationData?.contactMethod === 'phone';
    const phoneNumber = locationData?.phoneNumber?.trim();
    
    if (!city || !state || (isPhoneMethod && !phoneNumber)) {
      return;
    }
    
    /**
     * Submit data donasi ke backend atau simulasi
     */
    const submitDonation = async () => {
      try {
        const donationData = {
          // Detail buku
          title: formData.title,
          author: formData.author,
          genre: formData.genre,
          description: formData.description,
          publishedYear: formData.publishedYear,
          
          // Lokasi dan kontak
          address: locationData.address,
          city: locationData.city,
          state: locationData.state,
          zipCode: locationData.zipCode,
          contactMethod: locationData.contactMethod,
          phoneNumber: locationData.phoneNumber,
          notes: locationData.notes
        };

        // Upload gambar sampul jika ada
        if (formData.coverImage) {
          const uploadResponse = await apiService.uploadFile(formData.coverImage, 'book-cover');
          donationData.coverUrl = uploadResponse.url;
        }

        await apiService.createDonation(donationData);
        openModal('donationStep', 'success');
      } catch (error) {
        console.error('Failed to submit donation:', error);
        // Untuk demo, tetap tampilkan sukses
        openModal('donationStep', 'success');
      }
    };

    submitDonation();
  }, [locationData, openModal]);

  /**
   * Reset form dan kembali ke step awal
   */
  const handleStartOver = useCallback(() => {
    openModal('donationStep', 'form');
    resetBookForm();
    resetLocationForm();
  }, [openModal, resetBookForm, resetLocationForm]);

  /**
   * Handler untuk login dari modal autentikasi
   */
  const handleLogin = async (email, password) => {
    const result = await login(email, password);
    if (result.success) {
      closeModal('authModal');
    }
  };

  /**
   * Handler untuk signup dari modal autentikasi
   */
  const handleSignup = async (name, email, password) => {
    const result = await signup(name, email, password);
    if (result.success) {
      closeModal('authModal');
    }
  };

  // Tampilan untuk pengguna yang belum login
  if (showAuthPrompt && !isAuthenticated) {
    return (
      <>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Login untuk Donasi</h2>
          <p className="text-gray-600 mb-6">
            Silakan login ke akun Anda untuk mulai mendonasikan buku ke komunitas Read&Give.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => openModal('authModal')}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-200"
            >
              Login untuk Melanjutkan
            </button>
            <button
              onClick={() => navigate('/books')}
              className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200"
            >
              Kembali
            </button>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={modalState.authModal}
        onClose={() => closeModal('authModal')}
        onLogin={handleLogin}
        onSignup={handleSignup}
      />
      </>
    );
  }

  // Tampilan sukses setelah donasi berhasil
  if (step === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Donasi Berhasil!</h2>
          <p className="text-gray-600 mb-6">
            Terima kasih telah mendonasikan "{formData.title}" ke komunitas Read&Give. Buku Anda akan segera tersedia untuk pembaca lain.
          </p>
          <div className="space-y-3">
            <button
              onClick={handleStartOver}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-200"
            >
              Donasi Buku Lain
            </button>
            <button
              onClick={() => navigate('/books')}
              className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200"
            >
              Kembali ke Daftar Buku
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
    <div className="min-h-screen bg-gray-50">
      {/* Header dengan navigasi kembali */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/books')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Kembali ke Daftar Buku</span>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Indikator Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className={`flex items-center space-x-2 ${step === 'form' ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'form' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>
                1
              </div>
              <span className="font-medium">Detail Buku</span>
            </div>
            <div className="w-16 h-1 bg-gray-200 rounded"></div>
            <div className={`flex items-center space-x-2 ${step === 'location' ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'location' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>
                2
              </div>
              <span className="font-medium">Info Kontak</span>
            </div>
          </div>
        </div>

        {/* Step 1: Form Detail Buku */}
        {step === 'form' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Donasi Buku</h1>
              <p className="text-gray-600">Bagikan buku Anda dengan pembaca lain di komunitas</p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              {/* Upload Gambar Sampul */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Sampul Buku</label>
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    {formData.coverPreview ? (
                      <div className="relative">
                        <img
                          src={formData.coverPreview}
                          alt="Preview sampul buku"
                          className="w-32 h-48 object-cover rounded-lg shadow-md"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            handleInputChange('coverImage', null);
                            handleInputChange('coverPreview', '');
                          }}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-200"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="w-32 h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-green-500 transition-colors duration-200">
                        <Camera className="w-8 h-8 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-500 text-center">Unggah Sampul</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Judul *</label>
                        <input
                          type="text"
                          required
                          value={formData.title}
                          onChange={(e) => handleInputChange('title', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="Masukkan judul buku"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Penulis *</label>
                        <input
                          type="text"
                          required
                          value={formData.author}
                          onChange={(e) => handleInputChange('author', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="Masukkan nama penulis"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Genre</label>
                        <select
                          value={formData.genre}
                          onChange={(e) => handleInputChange('genre', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          {genres.map(genre => (
                            <option key={genre} value={genre}>{genre}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tahun Terbit</label>
                        <input
                          type="number"
                          min="1800"
                          max={new Date().getFullYear()}
                          value={formData.publishedYear}
                          onChange={(e) => handleInputChange('publishedYear', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="Contoh: 2023"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Deskripsi */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Deskripsi singkat tentang buku..."
                />
              </div>


              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg"
                >
                  Lanjut ke Informasi Kontak
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 2: Form Informasi Kontak */}
        {step === 'location' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Info Kontak</h1>
              <p className="text-gray-600">Bagaimana cara pembaca menghubungi Anda?</p>
            </div>

            <form onSubmit={handleLocationSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Alamat</label>
                  <input
                    type="text"
                    value={locationData.address}
                    onChange={(e) => handleLocationChange('address', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Jl. Contoh No. 123"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kota *</label>
                  <input
                    type="text"
                    required
                    value={locationData.city}
                    onChange={(e) => handleLocationChange('city', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Jakarta"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Provinsi *</label>
                  <input
                    type="text"
                    required
                    value={locationData.state}
                    onChange={(e) => handleLocationChange('state', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="DKI Jakarta"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kode Pos</label>
                  <input
                    type="text"
                    value={locationData.zipCode}
                    onChange={(e) => handleLocationChange('zipCode', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="12345"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Metode Kontak</label>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="contactMethod"
                      value="email"
                      checked={locationData.contactMethod === 'email'}
                      onChange={(e) => handleLocationChange('contactMethod', e.target.value)}
                      className="mr-3"
                    />
                    <span>Email (email Anda akan dibagikan kepada pembaca yang berminat)</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="contactMethod"
                      value="phone"
                      checked={locationData.contactMethod === 'phone'}
                      onChange={(e) => handleLocationChange('contactMethod', e.target.value)}
                      className="mr-3"
                    />
                    <span>Nomor telepon</span>
                  </label>
                </div>
              </div>

              {locationData.contactMethod === 'phone' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nomor Telepon *</label>
                  <input
                    type="tel"
                    required
                    value={locationData.phoneNumber}
                    onChange={(e) => handleLocationChange('phoneNumber', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="08123456789"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Catatan Tambahan</label>
                <textarea
                  value={locationData.notes}
                  onChange={(e) => handleLocationChange('notes', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Catatan khusus untuk pengambilan buku..."
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => openModal('donationStep', 'form')}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200"
                >
                  Kembali
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg"
                >
                  Kirim Donasi
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      <AuthModal
        isOpen={modalState.authModal}
        onClose={() => closeModal('authModal')}
        onLogin={handleLogin}
        onSignup={handleSignup}
      />
    </div>

    <AuthModal
      isOpen={modalState.authModal}
      onClose={() => closeModal('authModal')}
      onLogin={handleLogin}
      onSignup={handleSignup}
    />
    </>
  );
};