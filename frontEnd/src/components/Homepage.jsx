import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Gift, ArrowRight, Star, Heart } from 'lucide-react';

/**
 * Komponen Homepage
 * 
 * Halaman utama aplikasi yang menampilkan:
 * - Hero section dengan judul dan deskripsi aplikasi
 * - Tombol navigasi ke halaman utama (Browse Books, Donate)
 * - Galeri gambar buku dengan efek visual
 * - Call-to-action section untuk mendorong engagement
 * 
 * Fitur:
 * - Desain responsif dengan gradient background
 * - Animasi hover dan transform pada elemen
 * - Layout grid untuk showcase buku
 * - Floating elements untuk visual appeal
 */
export const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Bagian Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Konten teks hero */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Temukan
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Bacaan Hebat Berikutnya</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Bergabunglah dengan ribuan pecinta buku yang berbagi ulasan, menemukan cerita baru, dan menyebarkan kegembiraan membaca melalui platform donasi kami.
                </p>
              </div>

              {/* Tombol aksi utama */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate('/books')}
                  className="flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  <BookOpen className="w-5 h-5" />
                  <span>Jelajahi Buku</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => navigate('/donate')}
                  className="flex items-center justify-center space-x-2 px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-200"
                >
                  <Gift className="w-5 h-5" />
                  <span>Donasikan Buku</span>
                </button>
              </div>
            </div>

            {/* Galeri gambar buku dengan efek visual */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img
                    src="https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg"
                    alt="Sampul buku"
                    className="w-full h-64 object-cover rounded-2xl shadow-lg transform rotate-3"
                  />
                  <img
                    src="https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg"
                    alt="Sampul buku"
                    className="w-full h-48 object-cover rounded-2xl shadow-lg transform -rotate-2"
                  />
                </div>
                <div className="space-y-4 mt-8">
                  <img
                    src="https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg"
                    alt="Sampul buku"
                    className="w-full h-48 object-cover rounded-2xl shadow-lg transform -rotate-3"
                  />
                  <img
                    src="https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg"
                    alt="Sampul buku"
                    className="w-full h-64 object-cover rounded-2xl shadow-lg transform rotate-2"
                  />
                </div>
              </div>
              
              {/* Elemen floating untuk dekorasi */}
              <div className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-lg">
                <Star className="w-8 h-8 text-yellow-500 fill-current" />
              </div>
              <div className="absolute bottom-4 -left-4 bg-white rounded-full p-4 shadow-lg">
                <Heart className="w-8 h-8 text-red-500 fill-current" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bagian Call-to-Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Siap Memulai Perjalanan Membaca Anda?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Bergabunglah dengan ribuan penggemar buku yang telah menemukan bacaan hebat berikutnya melalui Read & Give.
          </p>
          {/* Tombol aksi sekunder */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/books')}
              className="flex items-center justify-center space-x-2 px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              <BookOpen className="w-5 h-5" />
              <span>Jelajahi Buku Sekarang</span>
            </button>
            <button 
              onClick={() => navigate('/donate')}
              className="flex items-center justify-center space-x-2 px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200"
            >
              <Gift className="w-5 h-5" />
              <span>Donasikan Buku</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};