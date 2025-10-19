"use client";

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { setSearchQuery, setSelectedType, setSelectedCategory, resetFilters } from '@/store/slices/businessSlice';
import { selectBusiness } from '@/store/slices/selectedBusinessSlice';
import { Business } from '@/store/slices/businessSlice';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Star, Verified } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DiscoverPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { filteredBusinesses, searchQuery, selectedType, selectedCategory } = useSelector(
    (state: RootState) => state.businesses
  );

  const businessTypes = ['Wholesaler', 'Logistics', 'Manufacturer'];
  const categories = [
    'Fashion & Apparel',
    'Electronics & Gadgets',
    'Food & Agriculture',
    'Home Appliances',
    'Beauty & Cosmetics',
    'Building Materials',
    'Office Supplies',
    'Healthcare & Medical',
    'Sports & Fitness',
    'Packaging & Printing',
    'Automotive',
    'Transportation & Delivery',
  ];

  const handleViewProfile = (business: Business) => {
    dispatch(selectBusiness(business));
    router.push(`/business/${business.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-500 to-teal-700 text-white py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4">
            Discover Business Partners
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl opacity-90">
            Connect with wholesalers, logistics providers, and manufacturers across Nigeria
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 md:mb-8">
          {/* Search Bar */}
          <div className="relative mb-4 sm:mb-6">
            <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder="Search businesses..."
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm sm:text-base"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {/* Business Type Filter */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                Business Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => dispatch(setSelectedType(e.target.value))}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm sm:text-base"
              >
                <option value="">All Types</option>
                {businessTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => dispatch(setSelectedCategory(e.target.value))}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm sm:text-base"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Reset Button */}
            <div className="flex items-end sm:col-span-2 lg:col-span-1">
              <button
                onClick={() => dispatch(resetFilters())}
                className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium text-sm sm:text-base"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-600">
            Showing <span className="font-semibold">{filteredBusinesses.length}</span> businesses
          </div>
        </div>

        {/* Business Grid */}
        {filteredBusinesses.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <p className="text-lg sm:text-xl text-gray-500 mb-2">
              No businesses found matching your criteria
            </p>
            <button
              onClick={() => dispatch(resetFilters())}
              className="mt-4 text-amber-600 hover:text-amber-700 font-medium text-sm sm:text-base"
            >
              Clear filters and try again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredBusinesses.map((business, index) => (
              <motion.div
                key={business.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
                onClick={() => handleViewProfile(business)}
              >
                {/* Business Image */}
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <img
                    src={business.image}
                    alt={business.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {business.verified && (
                    <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <Verified className="w-3 h-3" />
                      <span className="hidden sm:inline">Verified</span>
                      <span className="sm:hidden">✓</span>
                    </div>
                  )}
                  <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 bg-amber-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-semibold">
                    {business.type}
                  </div>
                </div>

                {/* Business Info */}
                <div className="p-4 sm:p-5">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 group-hover:text-amber-600 transition-colors line-clamp-1">
                    {business.name}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2">
                    {business.description}
                  </p>

                  <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600 mb-2">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600 flex-shrink-0" />
                    <span className="truncate">{business.location}</span>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-500 text-amber-500" />
                      <span className="font-semibold text-gray-800 text-sm sm:text-base">
                        {business.rating}
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-500">
                      ({business.reviewCount})
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                    {business.services.slice(0, 2).map((service) => (
                      <span
                        key={service}
                        className="px-2 py-0.5 sm:py-1 bg-teal-50 text-teal-700 text-xs rounded-full truncate max-w-full"
                      >
                        {service}
                      </span>
                    ))}
                    {business.services.length > 2 && (
                      <span className="px-2 py-0.5 sm:py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{business.services.length - 2}
                      </span>
                    )}
                  </div>

                  <button className="w-full bg-gradient-to-r from-amber-600 to-orange-500 text-white py-2 sm:py-2.5 rounded-lg font-semibold hover:from-amber-700 hover:to-orange-600 transition-all text-sm sm:text-base">
                    View Profile
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}