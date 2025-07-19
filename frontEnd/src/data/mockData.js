export const mockBooks = [
  {
    id: '1',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    genre: 'Fiction',
    coverUrl: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg',
    description: 'Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.',
    averageRating: 4.5,
    totalReviews: 1247,
    isAvailableForDonation: true,
    publishedYear: 2020
  },
  {
    id: '2',
    title: 'Atomic Habits',
    author: 'James Clear',
    genre: 'Self-Help',
    coverUrl: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg',
    description: 'An Easy & Proven Way to Build Good Habits & Break Bad Ones. Tiny changes, remarkable results.',
    averageRating: 4.8,
    totalReviews: 2891,
    isAvailableForDonation: false,
    publishedYear: 2018
  },
  {
    id: '3',
    title: 'The Seven Husbands of Evelyn Hugo',
    author: 'Taylor Jenkins Reid',
    genre: 'Romance',
    coverUrl: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg',
    description: 'A reclusive Hollywood icon finally tells her story to a young journalist, revealing shocking secrets.',
    averageRating: 4.7,
    totalReviews: 3456,
    isAvailableForDonation: true,
    donatedBy: 'Sarah M.',
    publishedYear: 2017
  },
  {
    id: '4',
    title: 'Educated',
    author: 'Tara Westover',
    genre: 'Memoir',
    coverUrl: 'https://images.pexels.com/photos/1261180/pexels-photo-1261180.jpeg',
    description: 'A memoir about a young girl who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge.',
    averageRating: 4.6,
    totalReviews: 1987,
    isAvailableForDonation: false,
    publishedYear: 2018
  },
  {
    id: '5',
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    genre: 'Thriller',
    coverUrl: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg',
    description: 'A woman refuses to speak after allegedly murdering her husband. A psychotherapist becomes obsessed with treating her.',
    averageRating: 4.3,
    totalReviews: 2156,
    isAvailableForDonation: true,
    publishedYear: 2019
  },
  {
    id: '6',
    title: 'Becoming',
    author: 'Michelle Obama',
    genre: 'Biography',
    coverUrl: 'https://images.pexels.com/photos/1036808/pexels-photo-1036808.jpeg',
    description: 'Former First Lady Michelle Obama shares her story with candor and wit in this deeply personal memoir.',
    averageRating: 4.9,
    totalReviews: 4521,
    isAvailableForDonation: true,
    donatedBy: 'Michael K.',
    publishedYear: 2018
  }
];

export const mockReviews = [
  {
    id: '1',
    bookId: '1',
    userName: 'Emma Thompson',
    rating: 5,
    comment: 'Absolutely beautiful and thought-provoking. Haig has created something truly special that makes you think about life\'s infinite possibilities.',
    date: '2024-01-15',
    userAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    likes: 12
  },
  {
    id: '2',
    bookId: '1',
    userName: 'David Chen',
    rating: 4,
    comment: 'A unique concept executed well. Some parts felt a bit repetitive, but overall a meaningful read that stays with you.',
    date: '2024-01-12',
    likes: 8
  },
  {
    id: '3',
    bookId: '2',
    userName: 'Sarah Williams',
    rating: 5,
    comment: 'Life-changing! Clear\'s approach to habit formation is backed by science and incredibly practical. Highly recommend.',
    date: '2024-01-10',
    userAvatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
    likes: 15
  }
];

export const mockUser = {
  id: '1',
  name: 'Alex Reader',
  avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
  reviewsCount: 23,
  donationsCount: 7
};

export const mockDonations = [
  {
    id: '1',
    bookId: '1',
    donorName: 'Sarah M.',
    donorContact: 'sarah.m@email.com',
    location: 'San Francisco, CA',
    condition: 'Like New',
    notes: 'Beautiful hardcover edition, read only once.',
    datePosted: '2024-01-14'
  },
  {
    id: '2',
    bookId: '3',
    donorName: 'Michael K.',
    donorContact: 'mike.k@email.com',
    location: 'Portland, OR',
    condition: 'Good',
    notes: 'Some minor wear on cover but pages are perfect.',
    datePosted: '2024-01-12'
  }
];