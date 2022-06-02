import { put, call } from 'redux-saga/effects';
import * as API from '../lib/api';
import { AxiosResponse } from 'axios';
import { addPost, setPosts, editPost, removePost } from '../slices/post';
import { setFormSlice } from '../slices/form';
import { updatePostProps, Post } from '../interface';
import { PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

// post 데이터 가져오기
export function* getPostsSaga() {
  try {
    // api 통신 시 call (동기 함수 호출)
    const result: AxiosResponse = yield call(API.getPosts);
    // put은 특정 액션을 바로 dispatch함
    yield put(setPosts(result.data));
  } catch (e) {
    yield console.log(e);
  }
}

//  post 데이터 생성하기
export function* createPostSaga({ payload }: PayloadAction<Post>) {
  try {
    const response: AxiosResponse = yield call(API.createPost, payload);
    if (response != null && (response.status == 201 || response.status == 200)) {
      // 아래와 같이 api 결과를 핸들링하여 dispatch 가능
      yield put(addPost(response.data));
      yield toast.success('후기를 작성했습니다.', {
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

// post 데이터 수정하기
export function* updatePostSaga({ payload }: PayloadAction<updatePostProps>) {
  try {
    const response: AxiosResponse = yield call(API.updatePost, payload);
    if (response != null && (response.status == 201 || response.status == 200)) {
      yield put(editPost(response.data));
      yield toast.success('후기를 수정했습니다.', {
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

// post 데이터 삭제하기
export function* removePostSaga({ payload: id }: PayloadAction<number>) {
  try {
    const response: AxiosResponse = yield call(API.deletePost, id);
    if (response.status == 200) {
      yield put(removePost({ id }));
      yield toast.success('후기를 삭제하였습니다.', {
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

// form 리셋
export function* resetFormSaga() {
  try {
    yield put(setFormSlice({ id: 0, user: '', title: '', body: '', date: '' }));
  } catch (e) {
    yield console.log(e);
  }
}
