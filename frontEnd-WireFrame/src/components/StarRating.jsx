import React from 'react';
import { Star } from 'lucide-react';

export const StarRating = ({ 
  rating, 
  maxRating = 5, 
  size = 'md',
  interactive = false,
  onRatingChange 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const [hoverRating, setHoverRating] = React.useState(0);

  const handleMouseEnter = (starIndex) => {
    if (interactive) {
      setHoverRating(starIndex);
    }
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setHoverRating(0);
    }
  };

  const handleClick = (starIndex) => {
    if (interactive && onRatingChange) {
      onRatingChange(starIndex);
    }
  };

  return (
    <div className="flex items-center space-x-1">
      {[...Array(maxRating)].map((_, index) => {
        const starIndex = index + 1;
        const isActive = starIndex <= (hoverRating || rating);
        
        return (
          <Star
            key={index}
            className={`${sizeClasses[size]} ${
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