import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';
import { sagaActions } from 'sagas/sagaActions';
import { Post, updatePostProps } from '../interface';

const initialState: Array<Post> = [];

// createAction: 주어진 액션 타입 문자열로 액션 크리에이터 함수를 생성
// createAction의 첫번째 인자는 type
export const createPost = createAction(sagaActions.CREATE_POST, (data: Post) => ({
  payload: data
}));

export const updatePost = createAction(sagaActions.UPDATE_POST, (data: updatePostProps) => ({
  payload: data
}));

export const deletePost = createAction(sagaActions.DELETE_POST, (data: number) => ({
  payload: data
}));

// slice (initialState, actionTypes, actions, reducer를 하나의 모듈로 묶어서 관리)
export const posts = createSlice({
  name: 'post',
  initialState,
  // reducer 함수 (현재 상태와 액션 객체를 받아, 필요하다면 새로운 상태를 리턴하는 함수)
  reducers: {
    addPost: (state, action: PayloadAction<Post>) => {
      state.push({ id: state.length + 1, ...action.payload });
      return state;
    },
    editPost: (state, action: PayloadAction<Post>) => {
      state = state.map((post) => (post.id == action.payload.id ? action.payload : post));
      return state;
    },
    removePost: (state, action: PayloadAction<{ id: number }>) => {
      state = state.filter((post) => post.id !== action.payload.id);
      return state;
    },
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state = action.payload;
      return state;
    }
  }
});

export const { addPost, editPost, removePost, setPosts } = posts.actions;
export default posts.reducer;
