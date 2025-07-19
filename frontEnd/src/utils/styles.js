/**
 * Style utility functions
 */

export const getConditionColor = (condition) => {
  const colorMap = {
    'Like New': 'bg-green-100 text-green-800',
    'Good': 'bg-blue-100 text-blue-800',
    'Fair': 'bg-yellow-100 text-yellow-800'
  };
  return colorMap[condition] || 'bg-gray-100 text-gray-800';
};

export const getStatusColor = (status) => {
  const colorMap = {
    'Available': 'bg-green-100 text-green-800',
    'Claimed': 'bg-blue-100 text-blue-800',
    'Pending': 'bg-yellow-100 text-yellow-800',
    'Completed': 'bg-gray-100 text-gray-800'
  };
  return colorMap[status] || 'bg-gray-100 text-gray-800';
};

export const getSizeClasses = (size) => {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };
  return sizeMap[size] || sizeMap.md;
};

export const getButtonVariant = (variant = 'primary') => {
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800',
    secondary: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
    success: 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800',
    danger: 'bg-red-600 text-white hover:bg-red-700'
  };
  return variants[variant] || variants.primary;
};