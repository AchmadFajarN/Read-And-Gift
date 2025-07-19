import React, { useCallback } from 'react';
import { BookOpen, Mail, Lock, User, Eye, EyeOff, X } from 'lucide-react';
import { useForm } from '../hooks/useForm';
import { useModal } from '../hooks/useModal';
import { getFormErrors } from '../utils/validation';
import { Modal } from './ui/Modal';
import { Input } from './ui/Input';
import { Button } from './ui/Button';

/**
 * Komponen AuthModal
 * 
 * Modal dialog yang menangani autentikasi pengguna (login dan daftar).
 * Fitur:
 * - Toggle antara mode login dan daftar
 * - Validasi form untuk email, password, dan nama
 * - Toggle visibilitas password
 * - Desain responsif dengan header gradient
 * - Fungsi tombol tutup
 * 
 * Props:
 * - isOpen: Boolean untuk mengontrol visibilitas modal
 * - onClose: Fungsi untuk menutup modal
 * - onLogin: Fungsi untuk menangani submit login
 * - onSignup: Fungsi untuk menangani submit daftar
 */
export const AuthModal = ({ isOpen, onClose, onLogin, onSignup }) => {
  // Dapatkan state modal untuk menentukan apakah kita dalam mode login atau daftar
  const { modalState, openModal, closeModal } = useModal();
  const isLoginMode = !modalState.authSignupMode;
  
  // Manajemen state form dengan validasi
  const { formData, errors, handleInputChange, setErrors, resetForm } = useForm({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  /**
   * Memvalidasi data form berdasarkan mode saat ini (login/daftar)
   * Mengembalikan true jika form valid, false jika tidak
   */
  const validateForm = useCallback(() => {
    const newErrors = getFormErrors(formData, !isLoginMode);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, isLoginMode, setErrors]);

  /**
   * Menangani submit form untuk login dan daftar
   * Memvalidasi form sebelum memanggil handler yang sesuai
   */
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (isLoginMode) {
      onLogin(formData.email, formData.password);
    } else {
      onSignup(formData.name, formData.email, formData.password);
    }
  }, [formData, isLoginMode, onLogin, onSignup, validateForm]);

  /**
   * Toggle antara mode login dan daftar
   * Reset data form saat berganti mode
   */
  const toggleMode = useCallback(() => {
    isLoginMode ? openModal('authSignupMode', true) : closeModal('authSignupMode');
    resetForm();
  }, [isLoginMode, openModal, closeModal, resetForm]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      {/* Header Modal dengan branding dan tombol tutup */}
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 text-white rounded-t-2xl -m-6 mb-6 relative">
        {/* Tombol tutup diposisikan di sudut kanan atas */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors duration-200"
        >
          <X className="w-6 h-6" />
        </button>
        {/* Branding aplikasi dan pesan selamat datang */}
        <div className="flex items-center justify-center space-x-3 mb-2">
          <BookOpen className="w-8 h-8" />
          <h2 className="text-2xl font-bold">Read&Give</h2>
        </div>
        <p className="text-blue-100 text-center">
          {isLoginMode ? 'Selamat datang kembali!' : 'Bergabung dengan komunitas kami'}
        </p>
      </div>

      {/* Tampilan pesan error */}
      {/* Form */}
      {errors.general && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{errors.general}</p>
        </div>
      )}
      
      {/* Form autentikasi utama */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Field nama - hanya ditampilkan dalam mode daftar */}
        {!isLoginMode && (
          <Input
            label="Nama Lengkap"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Masukkan nama lengkap Anda"
            icon={User}
            error={errors.name}
            required
          />
        )}

        {/* Field email - ditampilkan di kedua mode */}
        <Input
          label="Alamat Email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          placeholder="Masukkan email Anda"
          icon={Mail}
          error={errors.email}
          required
        />

        {/* Field password dengan toggle visibilitas */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={modalState.showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Masukkan password Anda"
            />
            {/* Tombol toggle visibilitas password */}
            <button
              type="button"
              onClick={() => modalState.showPassword ? closeModal('showPassword') : openModal('showPassword')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {modalState.showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Field konfirmasi password - hanya ditampilkan dalam mode daftar */}
        {!isLoginMode && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Konfirmasi Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={modalState.showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Konfirmasi password Anda"
              />
              {/* Tombol toggle visibilitas konfirmasi password */}
              <button
                type="button"
                onClick={() => modalState.showConfirmPassword ? closeModal('showConfirmPassword') : openModal('showConfirmPassword')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {modalState.showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>
        )}

        {/* Tombol submit - teks berubah berdasarkan mode */}
        <Button type="submit" className="w-full">
          {isLoginMode ? 'Masuk' : 'Buat Akun'}
        </Button>
      </form>

      {/* Bagian toggle mode - beralih antara login dan daftar */}
      {/* Toggle Mode */}
      <div className="mt-6 text-center">
        <p className="text-gray-600">
          {isLoginMode ? "Belum punya akun?" : "Sudah punya akun?"}
          <button
            onClick={toggleMode}
            className="ml-2 text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200"
          >
            {isLoginMode ? 'Daftar' : 'Masuk'}
          </button>
        </p>
      </div>

      {/* Link lupa password - hanya ditampilkan dalam mode login */}
      {isLoginMode && (
        <div className="mt-4 text-center">
          <button className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200">
            Lupa password Anda?
          </button>
        </div>
      )}
    </Modal>
  );
};