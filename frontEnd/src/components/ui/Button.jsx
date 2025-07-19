import React from 'react';
import { getButtonVariant } from '../../utils/styles';

/**
 * Komponen Button
 * 
 * Tombol yang dapat digunakan kembali dengan fitur:
 * - Berbagai varian (primary, secondary, success, danger)
 * - Berbagai ukuran (sm, md, lg)
 * - Loading state dengan spinner
 * - Disabled state
 * - Styling yang konsisten
 * 
 * Props:
 * - children: Konten tombol
 * - variant: Varian styling ('primary', 'secondary', 'success', 'danger')
 * - size: Ukuran tombol ('sm', 'md', 'lg')
 * - disabled: Apakah tombol disabled
 * - loading: Apakah dalam state loading
 * - className: CSS classes tambahan
 * - onClick: Handler untuk klik
 * - type: Tipe tombol HTML
 * - ...props: Props HTML button lainnya
 */
export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  loading = false,
  className = '',
  onClick,
  type = 'button',
  ...props 
}) => {
  // Mapping ukuran tombol
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };

  // Styling dasar tombol
  const baseClasses = 'font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  const variantClasses = getButtonVariant(variant);
  const sizeClass = sizeClasses[size];

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${sizeClass} ${className}`}
      {...props}
    >
      {/* Tampilkan loading spinner atau konten normal */}
      {loading ? (
        <div className="flex items-center space-x-2">
          {/* Spinner loading */}
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span>Memuat...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};