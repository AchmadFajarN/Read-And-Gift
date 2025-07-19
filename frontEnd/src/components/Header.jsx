import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BookOpen, User, LogOut, Home, Gift, List } from 'lucide-react';
import { APP_CONFIG } from '../constants';
import { useAuth } from '../hooks/useAuth';
import { useModal } from '../hooks/useModal';
import { AuthModal } from './AuthModal';

/**
 * Komponen Header
 * 
 * Header navigasi utama aplikasi yang berisi:
 * - Logo dan nama aplikasi
 * - Menu navigasi (Home, Browse Books, Donations, Donate)
 * - Sistem autentikasi pengguna (login/logout)
 * - Dropdown menu pengguna untuk akses profil
 * 
 * Fitur:
 * - Navigasi responsif dengan highlight halaman aktif
 * - Modal autentikasi terintegrasi
 * - Menu dropdown pengguna dengan avatar
 * - Redirect otomatis setelah login/signup
 */
export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, login, signup, logout, isAuthenticated } = useAuth();
  const { modalState, openModal, closeModal } = useModal();

  /**
   * Menangani proses login pengguna
   * Menutup modal dan redirect jika ada path yang disimpan
   */
  const handleLogin = async (email, password) => {
    const result = await login(email, password);
    if (result.success) {
      closeModal('authModal');
      // Cek apakah pengguna perlu diredirect setelah login
      const redirectPath = sessionStorage.getItem('redirectAfterLogin');
      if (redirectPath) {
        sessionStorage.removeItem('redirectAfterLogin');
        navigate(redirectPath);
      }
    }
  };

  /**
   * Menangani proses pendaftaran pengguna baru
   * Menutup modal dan redirect jika ada path yang disimpan
   */
  const handleSignup = async (name, email, password) => {
    const result = await signup(name, email, password);
    if (result.success) {
      closeModal('authModal');
      // Cek apakah pengguna perlu diredirect setelah signup
      const redirectPath = sessionStorage.getItem('redirectAfterLogin');
      if (redirectPath) {
        sessionStorage.removeItem('redirectAfterLogin');
        navigate(redirectPath);
      }
    }
  };

  /**
   * Menangani proses logout pengguna
   * Membersihkan session dan menutup menu
   */
  const handleLogout = () => {
    logout();
    closeModal('userMenu');
  };

  /**
   * Mengecek apakah path saat ini adalah halaman aktif
   * Digunakan untuk highlight menu navigasi
   */
  const isCurrentPath = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo dan nama aplikasi */}
            <div 
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => navigate('/')}
            >
              <BookOpen className="w-8 h-8 text-blue-700" />
              <h1 className="text-2xl font-bold text-gray-900">{APP_CONFIG.NAME}</h1>
            </div>

            {/* Link navigasi utama */}
            <div className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => navigate('/')}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors duration-200 ${
                  isCurrentPath('/') 
                    ? 'text-blue-700 bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-700'
                }`}
              >
                <Home className="w-5 h-5" />
                <span>Beranda</span>
              </button>
              <button
                onClick={() => navigate('/books')}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors duration-200 ${
                  isCurrentPath('/books') 
                    ? 'text-blue-700 bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-700'
                }`}
              >
                <BookOpen className="w-5 h-5" />
                <span>Jelajahi Buku</span>
              </button>
              <button
                onClick={() => navigate('/donations')}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors duration-200 ${
                  isCurrentPath('/donations') 
                    ? 'text-green-700 bg-green-50' 
                    : 'text-gray-700 hover:text-green-700'
                }`}
              >
                <List className="w-5 h-5" />
                <span>Donasi</span>
              </button>
              <button
                onClick={() => navigate('/donate')}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors duration-200 ${
                  isCurrentPath('/donate') 
                    ? 'text-green-700 bg-green-50' 
                    : 'text-gray-700 hover:text-green-700'
                }`}
              >
                <Gift className="w-5 h-5" />
                <span>Donasikan</span>
              </button>
            </div>

            {/* Aksi pengguna (login/profile menu) */}
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  {/* Menu dropdown pengguna yang sudah login */}
                  <div className="relative">
                    <button
                      onClick={() => modalState.userMenu ? closeModal('userMenu') : openModal('userMenu')}
                      className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-blue-700 transition-colors duration-200"
                    >
                      <img
                        src={user?.avatar}
                        alt={user?.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="hidden sm:inline font-medium">{user?.name}</span>
                    </button>

                    {/* Dropdown menu pengguna */}
                    {modalState.userMenu && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                          <p className="text-sm text-gray-500">{user?.email}</p>
                        </div>
                        <button 
                          onClick={() => {
                            navigate('/profile');
                            closeModal('userMenu');
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        >
                          <div className="flex items-center space-x-2">
                            <User className="w-4 h-4" />
                            <span>Profil Saya</span>
                          </div>
                        </button>
                        <button 
                          onClick={() => {
                            navigate('/profile/reviews');
                            closeModal('userMenu');
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        >
                          <div className="flex items-center space-x-2">
                            <BookOpen className="w-4 h-4" />
                            <span>Ulasan Saya</span>
                          </div>
                        </button>
                        <button 
                          onClick={() => {
                            navigate('/profile/donations');
                            closeModal('userMenu');
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        >
                          <div className="flex items-center space-x-2">
                            <Gift className="w-4 h-4" />
                            <span>Donasi Saya</span>
                          </div>
                        </button>
                        <div className="border-t border-gray-100 mt-2 pt-2">
                          <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 flex items-center space-x-2"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Keluar</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {/* Tombol login untuk pengguna yang belum login */}
                  <button
                    onClick={() => openModal('authModal')}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    <User className="w-5 h-5" />
                    <span>Masuk</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Modal autentikasi */}
      <AuthModal
        isOpen={modalState.authModal}
        onClose={() => closeModal('authModal')}
        onLogin={handleLogin}
        onSignup={handleSignup}
      />
    </>
  );
};