import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  vehicle: null,
  pickupDate: null,
  returnDate: null,
  pickupLocation: '',
  returnLocation: '',
  totalDays: 0,
  subtotal: 0,
  vat: 0,
  total: 0,
  bookingId: null,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setBookingVehicle: (state, action) => {
      state.vehicle = action.payload;
    },
    setBookingDates: (state, action) => {
      state.pickupDate = action.payload.pickupDate;
      state.returnDate = action.payload.returnDate;
    },
    setBookingLocations: (state, action) => {
      state.pickupLocation = action.payload.pickupLocation;
      state.returnLocation = action.payload.returnLocation;
    },
    setBookingPrice: (state, action) => {
      state.totalDays = action.payload.totalDays;
      state.subtotal = action.payload.subtotal;
      state.vat = action.payload.vat;
      state.total = action.payload.total;
    },
    setBookingId: (state, action) => {
      state.bookingId = action.payload;
    },
    clearBooking: () => initialState,
  },
});

export const {
  setBookingVehicle,
  setBookingDates,
  setBookingLocations,
  setBookingPrice,
  setBookingId,
  clearBooking,
} = bookingSlice.actions;

export default bookingSlice.reducer;
