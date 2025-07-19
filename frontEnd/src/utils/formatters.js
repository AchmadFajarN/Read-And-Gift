/**
 * Utility functions for formatting data
 */

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  });
};

export const formatRating = (rating) => {
  return Number(rating).toFixed(1);
};

export const formatReviewCount = (count) => {
  if (count === 1) return '1 review';
  return `${count} reviews`;
};

export const formatInterestedUsers = (count) => {
  if (count === 1) return '1 interested reader';
  return `${count} interested readers`;
};

export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};