import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { apiService } from '../services/api';
import { Search } from 'lucide-react';
import { BookCard } from './BookCard';
import { useBooks } from '../hooks/useBooks';

/**
 * Komponen BooksPage
 * 
 * Halaman untuk menjelajahi dan mencari buku.
 * Fitur:
 * - Search bar untuk mencari buku berdasarkan judul
 * - Grid layout untuk menampilkan kartu buku
 * - Filter aktif dengan kemampuan clear
 * - Loading dan error states
 * - Navigasi ke detail buku
 * 
 * Menggunakan:
 * - useBooks hook untuk data dan filtering
 * - URL search params untuk state management
 * - BookCard component untuk display
 */
export const BooksPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [useBackend] = useState(false); // Toggle ini untuk beralih antara data mock dan real

  const { filteredBooks, loading, error } = useBooks(searchQuery, 'All', 0, false, useBackend);

  /**
   * Menangani perubahan query pencarian
   * Update state lokal dan URL params
   */
  const handleSearchChange = (query) => {
    setSearchQuery(query);
    updateSearchParams({ search: query });
  };

  /**
   * Update URL search parameters
   * Menghapus parameter yang kosong atau default
   */
  const updateSearchParams = (updates) => {
    const newParams = new URLSearchParams(searchParams);
    
    Object.entries(updates).forEach(([key, value]) => {
      (value === null || value === '' || value === 'All') 
        ? newParams.delete(key) 
        : newParams.set(key, value);
    });
    
    setSearchParams(newParams);
  };

  /**
   * Membersihkan semua filter dan pencarian
   */
  const clearFilters = () => {
    setSearchQuery('');
    setSearchParams({});
  };

  /**
   * Navigasi ke halaman detail buku
   */
  const handleBookClick = (book) => {
    navigate(`/books/${book.id}`);
  };

  // Loading state
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat buku...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">Error memuat buku: {error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div>
        {/* Konten Utama */}
        <div>
          {/* Bar Pencarian */}
          <div className="mb-8">
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Cari judul buku..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
                />
              </div>
            </div>
          </div>

          {/* Header Hasil */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Temukan Buku
              </h2>
              <p className="text-gray-600 mt-1">
                {filteredBooks.length} buku ditemukan
                {searchQuery && ` for "${searchQuery}"`}
              </p>
            </div>
          </div>

          {/* Filter Aktif */}
          {searchQuery && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-blue-900">Filter aktif:</span>
                  {searchQuery && (
                    <span className="px-2 py-1 bg-blue-200 text-blue-800 rounded text-sm">
                      Pencarian: "{searchQuery}"
                    </span>
                  )}
                </div>
                <button
                  onClick={clearFilters}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Hapus semua
                </button>
              </div>
            </div>
          )}

          {/* Grid Buku */}
          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onBookClick={handleBookClick}
                />
              ))}
            </div>
          ) : (
            <>
              {/* State kosong saat tidak ada buku */}
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📚</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Tidak ada buku ditemukan
                </h3>
                <p className="text-gray-600 mb-4">
                  Coba sesuaikan pencarian atau filter Anda untuk menemukan lebih banyak buku.
                </p>
                <button
                  onClick={clearFilters}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Hapus semua filter
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};