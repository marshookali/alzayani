import { differenceInCalendarDays } from 'date-fns';

const VAT_RATE = 0.10;

export const calculatePrice = (pickupDate, returnDate, dailyRate) => {
  if (!pickupDate || !returnDate || !dailyRate) return null;

  const pickup = new Date(pickupDate);
  const ret = new Date(returnDate);

  if (ret <= pickup) return null;

  const days = differenceInCalendarDays(ret, pickup);
  const totalDays = Math.max(days, 1);
  const subtotal = totalDays * dailyRate;
  const vat = subtotal * VAT_RATE;
  const total = subtotal + vat;

  return {
    dailyRate,
    totalDays,
    subtotal: +subtotal.toFixed(2),
    vat: +vat.toFixed(2),
    total: +total.toFixed(2),
  };
};

export const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-BH', { style: 'currency', currency: 'BHD', minimumFractionDigits: 2 }).format(amount / 3.75);
  // Using BHD — 1 USD ≈ 0.376 BHD. Display in USD for simplicity:

export const formatUSD = (amount) =>
  `$${Number(amount).toFixed(2)}`;

export const generateBookingRef = () => {
  const prefix = 'AZ';
  const num = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}-${num}`;
};
