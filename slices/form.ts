import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Form } from '../interface';
import { HYDRATE } from 'next-redux-wrapper';

const initialState: Form = {
  id: 0,
  user: '',
  title: '',
  body: '',
  date: ''
};

export const form = createSlice({
  name: 'form',
  initialState,
  reducers: {
    // form 값 변경 및 리셋
    setFormSlice: (state, action: PayloadAction<Form>) => {
      state = action.payload;
      return state;
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log('HYDRATE', action.payload);
      return {
        ...state,
        ...action.payload.form
      };
    }
  }
});

export const { setFormSlice } = form.actions;

export default form.reducer;
