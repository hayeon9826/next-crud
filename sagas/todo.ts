import { put, call } from 'redux-saga/effects';
import * as API from '../lib/api';
import { AxiosResponse } from 'axios';
import { addTodo, setTodos, removeTodo } from '../slices/todo';
import { Todo } from '../interface';
import { PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

// todo 데이터 가져오기
export function* getTodosSaga() {
  try {
    // api 통신 시 call (동기 함수 호출)
    const result: AxiosResponse = yield call(API.getTodos);
    // put은 특정 액션을 바로 dispatch함
    yield put(setTodos(result.data));
  } catch (e) {
    yield console.log(e);
  }
}

//  todo 데이터 생성하기
export function* createTodoSaga({ payload }: PayloadAction<Todo>) {
  try {
    const response: AxiosResponse = yield call(API.createTodo, payload);
    if (response != null && (response.status == 201 || response.status == 200)) {
      // 아래와 같이 api 결과를 핸들링하여 dispatch 가능
      yield put(addTodo(response.data));
      yield toast.success('Todo 리스트를 생성했습니다.', {
        autoClose: 1000
      });
    }
  } catch (e) {
    yield console.log(e);
    yield toast.error('문제가 발생했습니다. 다시 시도해주세요.', {
      autoClose: 1000
    });
  }
}

// todo 데이터 삭제하기
export function* removeTodoSaga({ payload: id }: PayloadAction<number>) {
  try {
    const response: AxiosResponse = yield call(API.deleteTodo, id);
    if (response.status == 200) {
      yield put(removeTodo({ id }));
      yield toast.success('To-do 리스트를 삭제하였습니다.', {
        autoClose: 1000
      });
    }
  } catch (e) {
    yield console.log(e);
    yield toast.error('문제가 발생했습니다. 다시 시도해주세요.', {
      autoClose: 1000
    });
  }
}

// todo 토글
export function* toggleTodoSaga({ payload: id }: PayloadAction<number>) {
  try {
    const response: AxiosResponse = yield call(API.getTodo, id);
    const todo = response.data;
    if (response.status == 200 && todo) {
      yield call(API.toggleTodo, {
        id: id,
        finished: !todo.finished,
        title: todo.title
      });
    }
    const result: AxiosResponse = yield call(API.getTodos);
    // update 리스트 화면에 보여주기
    yield put(setTodos(result.data));
    yield toast.success('To-do 상태를 변경했습니다.', {
      autoClose: 1000
    });
  } catch (e) {
    yield console.log(e);
    yield toast.error('문제가 발생했습니다. 다시 시도해주세요.', {
      autoClose: 1000
    });
  }
}
