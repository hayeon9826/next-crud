import { createSlice } from '@reduxjs/toolkit';
import { Counter } from '../interface';

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
  }
});
export const { increment, decrement } = counter.actions;

export default counter.reducer;
