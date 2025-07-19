import React from 'react';

/**
 * Komponen Input
 * 
 * Input field yang dapat digunakan kembali dengan fitur:
 * - Label dan placeholder
 * - Icon di sebelah kiri
 * - Validasi error dengan styling
 * - Required field indicator
 * - Focus states dan transitions
 * 
 * Props:
 * - label: Label untuk input
 * - error: Pesan error untuk validasi
 * - icon: Komponen icon (dari lucide-react)
 * - className: CSS classes tambahan
 * - required: Apakah field wajib diisi
 * - ...props: Props HTML input lainnya
 */
export const Input = ({
  label,
  error,
  icon: Icon,
  className = '',
  required = false,
  ...props
}) => {
  // Styling input dengan kondisi error dan icon
  const inputClasses = `
    w-full px-3 py-2 border rounded-lg 
    focus:ring-2 focus:ring-blue-500 focus:border-transparent 
    transition-all duration-200
    ${Icon ? 'pl-10' : ''}
    ${error ? 'border-red-500' : 'border-gray-300'}
    ${className}
  `;

  return (
    <div>
      {/* Label dengan indikator required */}
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {/* Container input dengan icon */}
      <div className="relative">
        {/* Icon di sebelah kiri jika ada */}
        {Icon && (
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        )}
        {/* Input field */}
        <input
          className={inputClasses}
          {...props}
        />
      </div>
      {/* Pesan error */}
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};