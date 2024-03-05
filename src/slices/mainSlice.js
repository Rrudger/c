import { createSlice } from '@reduxjs/toolkit';
import { merge } from 'lodash';


const initialState = {
  currList: {
    "EUR": '\u20ac',
    "USD": '\u0024',
    "BHD": '\u00A4',
    "CHF": '\u20a3',
    "GBP": '\u00A3',
    "GIP": '\u00A3',
    "JPY": '\u00A5',
    "OMR": '\ufdfc',
    "RUB": '\u20bd',
    "TRY": '\u20ba',
  },
  rates: {},
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setRates(state, { payload }) {
      return merge(state, { rates: Object.fromEntries(payload) });
    },
  },
});

export const { actions } = mainSlice;
export default mainSlice.reducer;
