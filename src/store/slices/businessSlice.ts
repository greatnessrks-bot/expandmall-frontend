import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import mockData from '../../../data/mockData.json';

export interface Business {
  id: string;
  name: string;
  type: string;
  category: string;
  location: string;
  address: string;
  description: string;
  services: string[];
  email: string;
  phone: string;
  website: string;
  rating: number;
  reviewCount: number;
  image: string;
  gallery: string[];
  minimumOrder: string;
  deliveryTime: string;
  verified: boolean;
  certifications: string[];
  businessHours: string;
  productsOffered: string[];
  paymentMethods: string[];
  established: string;
}

interface BusinessState {
  allBusinesses: Business[];
  filteredBusinesses: Business[];
  searchQuery: string;
  selectedType: string;
  selectedCategory: string;
}

const initialState: BusinessState = {
  allBusinesses: mockData.businesses,
  filteredBusinesses: mockData.businesses,
  searchQuery: '',
  selectedType: '',
  selectedCategory: '',
};

const businessSlice = createSlice({
  name: 'businesses',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      businessSlice.caseReducers.applyFilters(state);
    },
    setSelectedType: (state, action: PayloadAction<string>) => {
      state.selectedType = action.payload;
      businessSlice.caseReducers.applyFilters(state);
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
      businessSlice.caseReducers.applyFilters(state);
    },
    applyFilters: (state) => {
      let filtered = state.allBusinesses;

      // Filter by search query
      if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase();
        filtered = filtered.filter(
          (business) =>
            business.name.toLowerCase().includes(query) ||
            business.description.toLowerCase().includes(query) ||
            business.location.toLowerCase().includes(query) ||
            business.category.toLowerCase().includes(query)
        );
      }

      // Filter by type
      if (state.selectedType) {
        filtered = filtered.filter((business) => business.type === state.selectedType);
      }

      // Filter by category
      if (state.selectedCategory) {
        filtered = filtered.filter((business) => business.category === state.selectedCategory);
      }

      state.filteredBusinesses = filtered;
    },
    resetFilters: (state) => {
      state.searchQuery = '';
      state.selectedType = '';
      state.selectedCategory = '';
      state.filteredBusinesses = state.allBusinesses;
    },
  },
});

export const { setSearchQuery, setSelectedType, setSelectedCategory, resetFilters } = businessSlice.actions;
export default businessSlice.reducer;