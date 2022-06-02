import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../interface';

const initialState: Array<Todo> = [];

// action 타입
const CREATE_TODO = 'TODO/CREATE_TODO';
const DELETE_TODO = 'TODO/DELETE_TODO';
const TOGGLE_TODO = 'TODO/TOGGLE_TODO';

// createAction: 주어진 액션 타입 문자열로 액션 크리에이터 함수를 생성
// createAction의 첫번째 인자는 type
export const createTodo = createAction(CREATE_TODO, (data: Todo) => ({
  payload: data
}));

export const deleteTodo = createAction(DELETE_TODO, (data: number) => ({
  payload: data
}));

export const toggleTodo = createAction(TOGGLE_TODO, (data: number) => ({
  payload: data
}));

// slice (initialState, actionTypes, actions, reducer를 하나의 모듈로 묶어서 관리)
export const todos = createSlice({
  name: 'todo',
  initialState,
  // reducer 함수 (현재 상태와 액션 객체를 받아, 필요하다면 새로운 상태를 리턴하는 함수)
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.unshift({ id: state.length + 1, ...action.payload });
      return state;
    },
    removeTodo: (state, action: PayloadAction<{ id: number }>) => {
      state = state.filter((todo) => todo.id !== action.payload.id);
      return state;
    },
    toggleTodo: (state, action: PayloadAction<{ id: number }>) => {
      const todo = state[action.payload.id];
      // "mutate" the object by overwriting a field
      todo.finished = !todo.finished;
    },
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state = action.payload;
      return state;
    }
  }
});

export const { addTodo, removeTodo, setTodos } = todos.actions;
export default todos.reducer;
