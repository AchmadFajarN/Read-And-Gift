import React, { useState, useCallback } from 'react';
import { Star } from 'lucide-react';
import { getSizeClasses } from '../utils/styles';

/**
 * Komponen StarRating
 * 
 * Menampilkan rating dalam bentuk bintang dengan fitur:
 * - Tampilan rating read-only atau interaktif
 * - Berbagai ukuran (sm, md, lg)
 * - Hover effects untuk mode interaktif
 * - Callback untuk perubahan rating
 * 
 * Props:
 * - rating: Nilai rating saat ini (0-5)
 * - maxRating: Jumlah maksimal bintang (default: 5)
 * - size: Ukuran bintang ('sm', 'md', 'lg')
 * - interactive: Apakah bintang dapat diklik
 * - onRatingChange: Callback saat rating berubah
 */
export const StarRating = ({ 
  rating, 
  maxRating = 5, 
  size = 'md',
  interactive = false,
  onRatingChange 
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  /**
   * Menangani hover pada bintang (mode interaktif)
   */
  const handleMouseEnter = useCallback((starIndex) => {
    if (interactive) {
      setHoverRating(starIndex);
    }
  }, [interactive]);

  /**
   * Menangani saat mouse meninggalkan area bintang
   */
  const handleMouseLeave = useCallback(() => {
    if (interactive) {
      setHoverRating(0);
    }
  }, [interactive]);

  /**
   * Menangani klik pada bintang (mode interaktif)
   */
  const handleClick = useCallback((starIndex) => {
    if (interactive && onRatingChange) {
      onRatingChange(starIndex);
    }
  }, [interactive, onRatingChange]);

  return (
    <div className="flex items-center space-x-1">
      {/* Render bintang sesuai maxRating */}
      {[...Array(maxRating)].map((_, index) => {
        const starIndex = index + 1;
        const isActive = starIndex <= (hoverRating || rating);
        
        return (
          <Star
            key={index}
            className={`${getSizeClasses(size)} ${
              isActive 
                ? 'text-yellow-400 fill-current' 
                : 'text-gray-300'
            } ${
              interactive 
                ? 'cursor-pointer hover:text-yellow-400 transition-colors duration-150' 
                : ''
            }`}
            onMouseEnter={() => handleMouseEnter(starIndex)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(starIndex)}
          />
        );
      })}
    </div>
  );
};