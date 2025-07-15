import React from 'react';
import { BookOpen, Users, Heart, Gift, Star, TrendingUp, ArrowRight, Search } from 'lucide-react';

export const Homepage = ({ onNavigateToBooks, onSearchChange }) => {
  const featuredBooks = [
    {
      id: '1',
      title: 'The Midnight Library',
      author: 'Matt Haig',
      coverUrl: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg',
      rating: 4.5,
      genre: 'Fiction'
    },
    {
      id: '2',
      title: 'Atomic Habits',
      author: 'James Clear',
      coverUrl: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg',
      rating: 4.8,
      genre: 'Self-Help'
    },
    {
      id: '3',
      title: 'The Seven Husbands of Evelyn Hugo',
      author: 'Taylor Jenkins Reid',
      coverUrl: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg',
      rating: 4.7,
      genre: 'Romance'
    }
  ];

  const stats = [
    { icon: BookOpen, label: 'Books Available', value: '10,000+', color: 'text-blue-600' },
    { icon: Users, label: 'Active Readers', value: '5,000+', color: 'text-green-600' },
    { icon: Heart, label: 'Reviews Written', value: '25,000+', color: 'text-red-600' },
    { icon: Gift, label: 'Books Donated', value: '2,500+', color: 'text-purple-600' }
  ];

  const handleQuickSearch = (query) => {
    onSearchChange(query);
    onNavigateToBooks();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Discover Your
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Next Great Read</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Join thousands of book lovers sharing reviews, discovering new stories, and spreading the joy of reading through our donation platform.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onNavigateToBooks}
                  className="flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  <BookOpen className="w-5 h-5" />
                  <span>Explore Books</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="flex items-center justify-center space-x-2 px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-200">
                  <Gift className="w-5 h-5" />
                  <span>Donate Books</span>
                </button>
              </div>

              {/* Quick Search Suggestions */}
              <div className="space-y-3">
                <p className="text-sm text-gray-500 font-medium">Popular searches:</p>
                <div className="flex flex-wrap gap-2">
                  {['Fiction', 'Self-Help', 'Romance', 'Thriller'].map((genre) => (
                    <button
                      key={genre}
                      onClick={() => handleQuickSearch(genre)}
                      className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-blue-600 hover:text-blue-600 transition-all duration-200 shadow-sm"
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img
                    src="https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg"
                    alt="Book cover"
                    className="w-full h-64 object-cover rounded-2xl shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300"
                  />
                  <img
                    src="https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg"
                    alt="Book cover"
                    className="w-full h-48 object-cover rounded-2xl shadow-lg transform -rotate-2 hover:rotate-0 transition-transform duration-300"
                  />
                </div>
                <div className="space-y-4 mt-8">
                  <img
                    src="https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg"
                    alt="Book cover"
                    className="w-full h-48 object-cover rounded-2xl shadow-lg transform -rotate-3 hover:rotate-0 transition-transform duration-300"
                  />
                  <img
                    src="https://images.pexels.com/photos/1560632/pexels-photo-1560632.jpeg"
                    alt="Book cover"
                    className="w-full h-64 object-cover rounded-2xl shadow-lg transform rotate-2 hover:rotate-0 transition-transform duration-300"
                  />
                </div>
              </div>
              
              {/* Floating elements */}
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

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-50 ${stat.color} mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trending This Week
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the books everyone's talking about and join the conversation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredBooks.map((book, index) => (
              <div
                key={book.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className="relative">
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-sm font-medium text-gray-700">#{index + 1}</span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium text-gray-700">{book.rating}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-2">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                      {book.genre}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-gray-600 font-medium mb-4">by {book.author}</p>
                  <button
                    onClick={onNavigateToBooks}
                    className="w-full flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={onNavigateToBooks}
              className="inline-flex items-center space-x-2 px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-200"
            >
              <span>View All Books</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose BookShare?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              More than just a book platform - we're building a community of passionate readers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 text-white mb-6 group-hover:scale-110 transition-transform duration-200">
                <Search className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Smart Discovery</h3>
              <p className="text-gray-600 leading-relaxed">
                Find your next favorite book with our intelligent recommendation system and advanced filtering options.
              </p>
            </div>

            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 text-white mb-6 group-hover:scale-110 transition-transform duration-200">
                <Users className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Community Reviews</h3>
              <p className="text-gray-600 leading-relaxed">
                Read authentic reviews from fellow book lovers and share your own thoughts to help others discover great reads.
              </p>
            </div>

            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 text-white mb-6 group-hover:scale-110 transition-transform duration-200">
                <Gift className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Book Donations</h3>
              <p className="text-gray-600 leading-relaxed">
                Give your books a second life by donating them to other readers, or find free books from generous community members.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Reading Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join thousands of book enthusiasts who have already discovered their next great read through BookShare.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onNavigateToBooks}
              className="flex items-center justify-center space-x-2 px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              <BookOpen className="w-5 h-5" />
              <span>Browse Books Now</span>
            </button>
            <button className="flex items-center justify-center space-x-2 px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200">
              <TrendingUp className="w-5 h-5" />
              <span>See What's Trending</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};