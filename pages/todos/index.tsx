import React, { useState, useEffect } from 'react';
import { Todo } from '../../interface';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store/store';
import { createTodo, deleteTodo, toggleTodo } from 'slices/todo';
import { sagaActions } from 'sagas/sagaActions';

const TodoPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const dispatch: AppDispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos);

  const onClickAdd = async () => {
    try {
      await dispatch(
        createTodo({
          title: title,
          finished: false
        })
      );
      setTitle('');
    } catch (e) {
      console.log(e);
    }
  };

  const onClickRemove = async (id: number) => {
    try {
      await dispatch(deleteTodo(id));
    } catch (e) {
      console.log(e);
    }
  };

  const onClickToggle = async (id: number) => {
    try {
      await dispatch(toggleTodo(id));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    dispatch({ type: sagaActions.FETCH_TODOS });
  }, []);

  return (
    <>
      <div className="screen_bg">
        <div className="screen_padding">
          <div className="flex_div">
            <h2 className="page_title">Todo 리스트</h2>
          </div>
          <div className="todo_div">
            <div className="p-6">
              <h1 className="text-grey-darkest font-semibold text-xl">
                {dayjs().format('YYYY년 MM월 DD일')}
              </h1>
              <div className="text-gray-400 text-sm mt-2">할일 목록</div>
              <div className="flex items-center mt-6">
                <label className="sr-only">Search</label>
                <div className="relative w-full">
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    className="todo_form_input"
                    placeholder="30자 이내로 입력"
                    required
                    maxLength={30}
                  />
                </div>
                <button onClick={() => onClickAdd()} className="todo_add_btn">
                  Add
                </button>
              </div>
            </div>
            <div className="p-6 border-t border-slate-200">
              {todos.length > 0 ? (
                todos.map((todo: Todo) => (
                  <div className="flex mb-2 items-center" key={todo.id}>
                    <p
                      className={`flex items-center w-full ${
                        todo.finished ? 'text-gray-400 line-through' : ''
                      }`}>
                      <input
                        onClick={() => onClickToggle(todo.id!!)}
                        className="appearance-none checkboxField"
                        type="checkbox"
                        defaultChecked={todo.finished}
                        value=""
                      />
                      <span className="ml-2">{todo.title}</span>
                    </p>
                    <button onClick={() => onClickRemove(todo.id!!)} className="todo_remove_btn">
                      Remove
                    </button>
                  </div>
                ))
              ) : (
                <div className="no_content">오늘의 할일이 없습니다.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoPage;
