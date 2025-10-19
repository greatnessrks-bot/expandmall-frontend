import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Business } from './businessSlice';

interface SelectedBusinessState {
  currentBusiness: Business | null;
}

const initialState: SelectedBusinessState = {
  currentBusiness: null,
};

const selectedBusinessSlice = createSlice({
  name: 'selectedBusiness',
  initialState,
  reducers: {
    selectBusiness: (state, action: PayloadAction<Business>) => {
      state.currentBusiness = action.payload;
    },
    clearSelectedBusiness: (state) => {
      state.currentBusiness = null;
    },
  },
});

export const { selectBusiness, clearSelectedBusiness } = selectedBusinessSlice.actions;
export default selectedBusinessSlice.reducer;