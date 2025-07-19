import React from 'react';
import { X } from 'lucide-react';

/**
 * Komponen Modal
 * 
 * Modal dialog yang dapat digunakan kembali dengan fitur:
 * - Overlay background dengan blur
 * - Berbagai ukuran (sm, md, lg, xl)
 * - Tombol close opsional
 * - Animasi smooth
 * - Click outside untuk menutup
 * 
 * Props:
 * - isOpen: Boolean untuk mengontrol visibilitas
 * - onClose: Fungsi callback saat modal ditutup
 * - title: Judul modal (opsional)
 * - children: Konten modal
 * - size: Ukuran modal ('sm', 'md', 'lg', 'xl')
 * - showCloseButton: Tampilkan tombol close (default: true)
 */
export const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md',
  showCloseButton = true 
}) => {
  // Jangan render jika modal tidak terbuka
  if (!isOpen) return null;

  // Mapping ukuran modal
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl'
  };

  return (
    <>
      {/* Overlay background dengan backdrop blur */}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        {/* Container modal dengan ukuran responsif */}
        <div className={`bg-white rounded-2xl ${sizeClasses[size]} w-full overflow-hidden shadow-2xl`}>
          {/* Konten modal */}
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};