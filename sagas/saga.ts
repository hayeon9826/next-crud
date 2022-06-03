import { takeLatest, all } from 'redux-saga/effects';
import { sagaActions } from './sagaActions';
import * as PostSaga from './post';
import * as TodoSaga from './todo';

// 모든 Saga들을 한번에 시작하기 위한 단일 entry point
export default function* rootSaga() {
  // takeEvery -> 한번 실행되도, 이벤트 계속 리슨 (모든 request에 대해 태스크 실행)
  // takeLatest -> 클릭 실수로 2번 했을때, 앞 이벤트 무시 마지막 이벤트 실행
  yield all([
    takeLatest(sagaActions.FETCH_POSTS, PostSaga.getPostsSaga),
    takeLatest(sagaActions.CREATE_POST, PostSaga.createPostSaga),
    takeLatest(sagaActions.UPDATE_POST, PostSaga.updatePostSaga),
    takeLatest(sagaActions.DELETE_POST, PostSaga.removePostSaga),
    takeLatest(sagaActions.RESET_FORM, PostSaga.resetFormSaga),
    takeLatest(sagaActions.CREATE_TODO, TodoSaga.createTodoSaga),
    takeLatest(sagaActions.FETCH_TODOS, TodoSaga.getTodosSaga),
    takeLatest(sagaActions.DELETE_TODO, TodoSaga.removeTodoSaga),
    takeLatest(sagaActions.TOGGLE_TODO, TodoSaga.toggleTodoSaga)
  ]);
}
