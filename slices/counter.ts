import { createSlice } from '@reduxjs/toolkit';
import { Counter } from '../interface';
import { HYDRATE } from 'next-redux-wrapper';

const initialState: Counter = {
  num: 0
};

export const counter = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.num += 1;
    },
    decrement: (state) => {
      state.num -= 1;
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log('HYDRATE', action.payload);
      return {
        ...state,
        ...action.payload.counter
      };
    }
  }
});
export const { increment, decrement } = counter.actions;

export default counter.reducer;
