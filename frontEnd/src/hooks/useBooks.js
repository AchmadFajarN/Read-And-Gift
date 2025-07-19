import { useState, useEffect, useMemo } from 'react';
import { apiService } from '../services/api';
import { mockBooks } from '../data/mockData';

export const useBooks = (searchQuery, selectedGenre, selectedRating, showDonationsOnly, useBackend = false) => {
  const [books, setBooks] = useState(mockBooks);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!useBackend) return;

    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = {};
        if (searchQuery) params.search = searchQuery;
        if (selectedGenre !== 'All') params.genre = selectedGenre;
        if (selectedRating > 0) params.minRating = selectedRating;
        if (showDonationsOnly) params.donationsOnly = true;

        const response = await apiService.getBooks(params);
        setBooks(response.books || response);
      } catch (err) {
        setError(err.message);
        // Fallback to mock data on error
        setBooks(mockBooks);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [searchQuery, selectedGenre, selectedRating, showDonationsOnly, useBackend]);

  const filteredBooks = useMemo(() => {
    if (useBackend) {
      // Backend handles filtering
      return books;
    }

    // Client-side filtering for mock data
    return books.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesGenre = selectedGenre === 'All' || book.genre === selectedGenre;
      const matchesRating = book.averageRating >= selectedRating;
      const matchesDonation = !showDonationsOnly || book.isAvailableForDonation;
      
      return matchesSearch && matchesGenre && matchesRating && matchesDonation;
    });
  }, [books, searchQuery, selectedGenre, selectedRating, showDonationsOnly, useBackend]);

  return {
    books,
    filteredBooks,
    loading,
    error,
    refetch: useBackend ? () => {
      // Trigger refetch logic here
    } : null
  };
};