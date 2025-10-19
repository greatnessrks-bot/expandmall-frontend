import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'retailer' | 'wholesaler' | 'logistics' | 'manufacturer';
  businessName: string;
  location: string;
}

interface UserState {
  currentUser: User | null;
  isAuthenticated: boolean;
}

// Mock user for testing (you can remove this later when you add real authentication)
const mockUser: User = {
  id: 'USER001',
  name: 'John Retailer',
  email: 'john@retailstore.com',
  role: 'retailer',
  businessName: 'John\'s Retail Store',
  location: 'Lagos, Nigeria',
};

const initialState: UserState = {
  currentUser: mockUser, // Set to mockUser for testing, null for production
  isAuthenticated: true, // Set to true for testing, false for production
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
    },
    logoutUser: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
    },
    updateUserProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.currentUser) {
        state.currentUser = { ...state.currentUser, ...action.payload };
      }
    },
  },
});

export const { loginUser, logoutUser, updateUserProfile } = userSlice.actions;
export default userSlice.reducer;