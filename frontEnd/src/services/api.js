// API service layer for backend communication
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth endpoints
  async login(email, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async signup(name, email, password) {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  // Books endpoints
  async getBooks(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/books${queryString ? `?${queryString}` : ''}`);
  }

  async getBook(id) {
    return this.request(`/books/${id}`);
  }

  async searchBooks(query) {
    return this.request(`/books/search?q=${encodeURIComponent(query)}`);
  }

  // Reviews endpoints
  async getBookReviews(bookId) {
    return this.request(`/books/${bookId}/reviews`);
  }

  async createReview(bookId, reviewData) {
    return this.request(`/books/${bookId}/reviews`, {
      method: 'POST',
      body: JSON.stringify(reviewData),
    });
  }

  async likeReview(reviewId) {
    return this.request(`/reviews/${reviewId}/like`, {
      method: 'POST',
    });
  }

  async unlikeReview(reviewId) {
    return this.request(`/reviews/${reviewId}/like`, {
      method: 'DELETE',
    });
  }

  async addComment(reviewId, commentData) {
    return this.request(`/reviews/${reviewId}/comments`, {
      method: 'POST',
      body: JSON.stringify(commentData),
    });
  }

  // Donations endpoints
  async getDonations(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/donations${queryString ? `?${queryString}` : ''}`);
  }

  async createDonation(donationData) {
    return this.request('/donations', {
      method: 'POST',
      body: JSON.stringify(donationData),
    });
  }

  async updateDonationStatus(donationId, status) {
    return this.request(`/donations/${donationId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  async getUserDonations() {
    return this.request('/user/donations');
  }

  // User endpoints
  async getUserProfile() {
    return this.request('/user/profile');
  }

  async updateUserProfile(profileData) {
    return this.request('/user/profile', {
      method: 'PATCH',
      body: JSON.stringify(profileData),
    });
  }

  async getUserReviews() {
    return this.request('/user/reviews');
  }

  // File upload
  async uploadFile(file, type = 'book-cover') {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    return this.request('/upload', {
      method: 'POST',
      body: formData,
      headers: {}, // Remove Content-Type to let browser set it for FormData
    });
  }
}

export const apiService = new ApiService();