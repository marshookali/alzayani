import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: [],
  transmission: '',
  fuelType: [],
  features: [],
  priceMin: 0,
  priceMax: 500,
  searchQuery: '',
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setTypeFilter: (state, action) => {
      state.type = action.payload;
    },
    setTransmissionFilter: (state, action) => {
      state.transmission = action.payload;
    },
    setFuelTypeFilter: (state, action) => {
      state.fuelType = action.payload;
    },
    setFeaturesFilter: (state, action) => {
      state.features = action.payload;
    },
    setPriceRange: (state, action) => {
      state.priceMin = action.payload.min;
      state.priceMax = action.payload.max;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    clearFilters: () => initialState,
  },
});

export const {
  setTypeFilter,
  setTransmissionFilter,
  setFuelTypeFilter,
  setFeaturesFilter,
  setPriceRange,
  setSearchQuery,
  clearFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
