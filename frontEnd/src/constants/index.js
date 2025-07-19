// App-wide constants
export const APP_CONFIG = {
  NAME: 'Read&Give',
  DESCRIPTION: 'Book Review and Donation Platform'
};

export const BOOK_GENRES = [
  'All', 'Fiction', 'Non-Fiction', 'Self-Help', 'Romance', 'Thriller', 
  'Biography', 'Mystery', 'Fantasy', 'Science Fiction', 'History', 'Poetry', 'Children'
];

export const DONATION_STATUS = {
  AVAILABLE: 'Available',
  PENDING: 'Pending',
  CLAIMED: 'Claimed',
  COMPLETED: 'Completed'
};

export const CONTACT_METHODS = {
  EMAIL: 'email',
  PHONE: 'phone'
};

export const BOOK_CONDITIONS = {
  LIKE_NEW: 'Like New',
  GOOD: 'Good',
  FAIR: 'Fair'
};

export const RATING_FILTERS = [0, 3, 4, 4.5];

export const ROUTES = {
  HOME: '/',
  BOOKS: '/books',
  BOOK_DETAIL: '/books/:id',
  DONATE: '/donate',
  DONATIONS: '/donations',
  PROFILE: '/profile',
  PROFILE_TAB: '/profile/:tab'
};