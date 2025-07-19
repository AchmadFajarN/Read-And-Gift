import React, { useState } from "react";
import {
  ArrowLeft,
  Upload,
  MapPin,
  BookOpen,
  Plus,
  X,
  Camera,
  Check,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export const DonatePage = ({ onBack }) => {
  const { user, isAuthenticated } = useAuth();
  const [step, setStep] = useState(isAuthenticated ? "form" : "form");
  const [showAuthPrompt, setShowAuthPrompt] = useState(!isAuthenticated);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "Fiction",
    description: "",
    condition: "Good",
    publishedYear: "",
    coverImage: null,
    coverPreview: "",
  });
  const [locationData, setLocationData] = useState({
    address: "",
    city: "",
    state: "",
    zipCode: "",
    contactMethod: "email",
    phoneNumber: "",
    notes: "",
  });

  const genres = [
    "Fiction",
    "Non-Fiction",
    "Self-Help",
    "Romance",
    "Thriller",
    "Biography",
    "Mystery",
    "Fantasy",
    "Science Fiction",
    "History",
    "Poetry",
    "Children",
  ];
  const conditions = [
    { value: "Like New", description: "Minimal wear, looks almost new" },
    { value: "Good", description: "Some wear but pages are intact" },
    { value: "Fair", description: "Noticeable wear but still readable" },
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, coverImage: file }));
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prev) => ({ ...prev, coverPreview: e.target?.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setShowAuthPrompt(true);
      return;
    }
    setStep("location");
  };

  const handleLocationSubmit = (e) => {
    e.preventDefault();
    setStep("success");
  };

  const handleStartOver = () => {
    setStep("form");
    setFormData({
      title: "",
      author: "",
      genre: "Fiction",
      description: "",
      condition: "Good",
      publishedYear: "",
      coverImage: null,
      coverPreview: "",
    });
    setLocationData({
      address: "",
      city: "",
      state: "",
      zipCode: "",
      contactMethod: "email",
      phoneNumber: "",
      notes: "",
    });
  };

  if (showAuthPrompt && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Sign In to Donate
          </h2>
          <p className="text-gray-600 mb-6">
            Please sign in to your account to start donating books to the Read
            and Give community.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => setShowAuthPrompt(false)}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-200"
            >
              Sign In to Continue
            </button>
            <button
              onClick={onBack}
              className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === "success") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Donation Submitted!
          </h2>
          <p className="text-gray-600 mb-6">
            Thank you for donating "{formData.title}" to the Read and Give
            community. Your book will be reviewed and made available to other
            readers soon.
          </p>
          <div className="space-y-3">
            <button
              onClick={handleStartOver}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-200"
            >
              Donate Another Book
            </button>
            <button
              onClick={onBack}
              className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200"
            >
              Back to Books
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Books</span>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div
              className={`flex items-center space-x-2 ${
                step === "form" ? "text-green-600" : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === "form" ? "bg-green-600 text-white" : "bg-gray-200"
                }`}
              >
                1
              </div>
              <span className="font-medium">Book Details</span>
            </div>
            <div className="w-16 h-1 bg-gray-200 rounded"></div>
            <div
              className={`flex items-center space-x-2 ${
                step === "location" ? "text-green-600" : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === "location"
                    ? "bg-green-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                2
              </div>
              <span className="font-medium">Contact Info</span>
            </div>
          </div>
        </div>

        {step === "form" && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Donate a Book
              </h1>
              <p className="text-gray-600">
                Share your books with fellow readers in the community
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              {/* Cover Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Book Cover
                </label>
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    {formData.coverPreview ? (
                      <div className="relative">
                        <img
                          src={formData.coverPreview}
                          alt="Book cover preview"
                          className="w-32 h-48 object-cover rounded-lg shadow-md"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              coverImage: null,
                              coverPreview: "",
                            }))
                          }
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-200"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="w-32 h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-green-500 transition-colors duration-200">
                        <Camera className="w-8 h-8 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-500 text-center">
                          Upload Cover
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.title}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              title: e.target.value,
                            }))
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="Enter book title"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Author *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.author}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              author: e.target.value,
                            }))
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="Enter author name"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Genre
                        </label>
                        <select
                          value={formData.genre}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              genre: e.target.value,
                            }))
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          {genres.map((genre) => (
                            <option key={genre} value={genre}>
                              {genre}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Published Year
                        </label>
                        <input
                          type="number"
                          min="1800"
                          max={new Date().getFullYear()}
                          value={formData.publishedYear}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              publishedYear: e.target.value,
                            }))
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="e.g., 2023"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Brief description of the book..."
                />
              </div>

              {/* Condition */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Book Condition *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {conditions.map((condition) => (
                    <label key={condition.value} className="cursor-pointer">
                      <input
                        type="radio"
                        name="condition"
                        value={condition.value}
                        checked={formData.condition === condition.value}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            condition: e.target.value,
                          }))
                        }
                        className="sr-only"
                      />
                      <div
                        className={`p-4 border-2 rounded-lg transition-all duration-200 ${
                          formData.condition === condition.value
                            ? "border-green-500 bg-green-50"
                            : "border-gray-200 hover:border-green-300"
                        }`}
                      >
                        <div className="font-medium text-gray-900 mb-1">
                          {condition.value}
                        </div>
                        <div className="text-sm text-gray-600">
                          {condition.description}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg"
                >
                  Continue to Contact Info
                </button>
              </div>
            </form>
          </div>
        )}

        {step === "location" && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Contact Information
              </h1>
              <p className="text-gray-600">
                How should interested readers contact you?
              </p>
            </div>

            <form onSubmit={handleLocationSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address
                  </label>
                  <input
                    type="text"
                    value={locationData.address}
                    onChange={(e) =>
                      setLocationData((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="123 Main Street"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={locationData.city}
                    onChange={(e) =>
                      setLocationData((prev) => ({
                        ...prev,
                        city: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="San Francisco"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    required
                    value={locationData.state}
                    onChange={(e) =>
                      setLocationData((prev) => ({
                        ...prev,
                        state: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="CA"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    value={locationData.zipCode}
                    onChange={(e) =>
                      setLocationData((prev) => ({
                        ...prev,
                        zipCode: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="94102"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Preferred Contact Method
                </label>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="contactMethod"
                      value="email"
                      checked={locationData.contactMethod === "email"}
                      onChange={(e) =>
                        setLocationData((prev) => ({
                          ...prev,
                          contactMethod: e.target.value,
                        }))
                      }
                      className="mr-3"
                    />
                    <span>
                      Email (we'll share your email with interested readers)
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="contactMethod"
                      value="phone"
                      checked={locationData.contactMethod === "phone"}
                      onChange={(e) =>
                        setLocationData((prev) => ({
                          ...prev,
                          contactMethod: e.target.value,
                        }))
                      }
                      className="mr-3"
                    />
                    <span>Phone number</span>
                  </label>
                </div>
              </div>

              {locationData.contactMethod === "phone" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={locationData.phoneNumber}
                    onChange={(e) =>
                      setLocationData((prev) => ({
                        ...prev,
                        phoneNumber: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="(555) 123-4567"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes
                </label>
                <textarea
                  value={locationData.notes}
                  onChange={(e) =>
                    setLocationData((prev) => ({
                      ...prev,
                      notes: e.target.value,
                    }))
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Any special instructions for pickup or contact..."
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep("form")}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg"
                >
                  Submit Donation
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
