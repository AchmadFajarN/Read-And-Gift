import React, { useState, useMemo } from "react";
import { Header } from "./components/Header";
import { BookCard } from "./components/BookCard";
import { BookDetail } from "./components/BookDetail";
import { Homepage } from "./components/Homepage";
import { DonatePage } from "./components/DonatePage";
import { DonationRequestsPage } from "./components/DonationRequestsPage";
import { mockBooks, mockReviews } from "./data/mockData";
import { Gift } from "lucide-react";

function App() {
  const [currentView, setCurrentView] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedRating, setSelectedRating] = useState(0);
  const [showDonationsOnly, setShowDonationsOnly] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  // Filter books based on search and filters
  const filteredBooks = useMemo(() => {
    return mockBooks.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.genre.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesGenre =
        selectedGenre === "All" || book.genre === selectedGenre;
      const matchesRating = book.averageRating >= selectedRating;
      const matchesDonation = !showDonationsOnly || book.isAvailableForDonation;

      return matchesSearch && matchesGenre && matchesRating && matchesDonation;
    });
  }, [searchQuery, selectedGenre, selectedRating, showDonationsOnly]);

  const handleClearFilters = () => {
    setSelectedGenre("All");
    setSelectedRating(0);
    setShowDonationsOnly(false);
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const handleBackToBooks = () => {
    setSelectedBook(null);
  };

  const handleNavigateToBooks = () => {
    setCurrentView("books");
    setSelectedBook(null);
  };

  const handleNavigateHome = () => {
    setCurrentView("home");
    setSelectedBook(null);
    setSearchQuery("");
    handleClearFilters();
  };

  const handleNavigateToDonate = () => {
    setCurrentView("donate");
    setSelectedBook(null);
  };

  const handleNavigateToDonations = () => {
    setCurrentView("donations");
    setSelectedBook(null);
  };

  const handleBackFromDonate = () => {
    setCurrentView("books");
  };

  const handleBackFromDonations = () => {
    setCurrentView("books");
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    if (query && currentView === "home") {
      setCurrentView("books");
    }
  };

  // Get reviews for selected book
  const bookReviews = selectedBook
    ? mockReviews.filter((review) => review.bookId === selectedBook.id)
    : [];

  // Show book detail if a book is selected
  if (selectedBook) {
    return (
      <BookDetail
        book={selectedBook}
        reviews={bookReviews}
        onBack={handleBackToBooks}
      />
    );
  }

  // Show donate page
  if (currentView === "donate") {
    return <DonatePage onBack={handleBackFromDonate} />;
  }

  // Show donation requests page
  if (currentView === "donations") {
    return <DonationRequestsPage onBack={handleBackFromDonations} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onSearchChange={handleSearchChange}
        searchQuery={searchQuery}
        currentView={currentView}
        onNavigateHome={handleNavigateHome}
        onNavigateToBooks={handleNavigateToBooks}
        onNavigateToDonate={handleNavigateToDonate}
        onNavigateToDonations={handleNavigateToDonations}
      />

      {currentView === "home" ? (
        <Homepage
          onNavigateToBooks={handleNavigateToBooks}
          onSearchChange={handleSearchChange}
        />
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            {/* <div className="lg:col-span-1">
              <FilterSidebar
                selectedGenre={selectedGenre}
                selectedRating={selectedRating}
                showDonationsOnly={showDonationsOnly}
                onGenreChange={setSelectedGenre}
                onRatingChange={setSelectedRating}
                onDonationsToggle={setShowDonationsOnly}
                onClearFilters={handleClearFilters}
              />
            </div> */}

            {/* Books Grid */}
            <div className="lg:col-span-4">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Discover Books
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {filteredBooks.length} books found
                    {searchQuery && ` for "${searchQuery}"`}
                  </p>
                </div>

                <button
                  onClick={handleNavigateToDonate}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                  <Gift className="w-5 h-5" />
                  <span>Donate Book</span>
                </button>
              </div>

              {/* Active Filters */}
              {(searchQuery ||
                selectedGenre !== "All" ||
                selectedRating > 0 ||
                showDonationsOnly) && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-medium text-blue-900">
                        Active filters:
                      </span>
                      {searchQuery && (
                        <span className="px-2 py-1 bg-blue-200 text-blue-800 rounded text-sm">
                          Search: "{searchQuery}"
                        </span>
                      )}
                      {selectedGenre !== "All" && (
                        <span className="px-2 py-1 bg-blue-200 text-blue-800 rounded text-sm">
                          Genre: {selectedGenre}
                        </span>
                      )}
                      {selectedRating > 0 && (
                        <span className="px-2 py-1 bg-blue-200 text-blue-800 rounded text-sm">
                          Rating: {selectedRating}+ stars
                        </span>
                      )}
                      {showDonationsOnly && (
                        <span className="px-2 py-1 bg-green-200 text-green-800 rounded text-sm">
                          Donations only
                        </span>
                      )}
                    </div>
                    <button
                      onClick={handleClearFilters}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Clear all
                    </button>
                  </div>
                </div>
              )}

              {/* Books Grid */}
              {filteredBooks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredBooks.map((book) => (
                    <BookCard
                      key={book.id}
                      book={book}
                      onBookClick={handleBookClick}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">📚</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No books found
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your search or filters to find more books.
                  </p>
                  <button
                    onClick={handleClearFilters}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
