import React, { useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { setFormSlice } from '../../slices/form';
import { createPost } from 'slices/post';
import { sagaActions } from 'sagas/sagaActions';

const PostNew: React.FC = () => {
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const router = useRouter();
  const form = useSelector((state: RootState) => state.form);
  // dispatchs는 액션 객체를 넘겨줘서 상태를 업데이트 하는 유일한 방법 (= 이벤트 트리거)
  const dispatch: AppDispatch = useDispatch();

  const handleChange =
    (prop: string) =>
    (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
      dispatch(setFormSlice({ ...form, [prop]: event.target.value }));
    };

  const handleSubmit = async () => {
    try {
      // form validation
      if (form.user && form.title && form.body) {
        await dispatch(
          createPost({
            user: form.user,
            title: form.title,
            body: form.body,
            date: dayjs().format('YYYY-MM-DD')
          })
        );
        // 후기 생성 후 form 리셋
        await dispatch({ type: sagaActions.RESET_FORM });
        router.replace('/');
      } else {
        // form validation
        await toast.warning('모든 필드를 채워주세요.', {
          autoClose: 1000
        });
      }
    } catch (e) {
      console.log(e);
      router.replace('/');
    }
  };

  useEffect(() => {
    // scroll to top
    window.scrollTo(0, 0);
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="screen_md">
      <div className="screen_padding">
        <div className="flex_div">
          <h2 className="page_title">후기 작성</h2>
        </div>
        <div className="mt-16">
          <div className="w-100 form_div">
            <div className="w-100 form_group">
              <label className="block font-bold mb-1" htmlFor="label">
                사용자
              </label>
              <input
                className="post_input"
                placeholder="사용자 이름을 입력해 주세요"
                ref={inputRef}
                id="user-input"
                onChange={handleChange('user')}
              />
            </div>
            <div className="w-100 form_group">
              <label className="block font-bold mb-1" htmlFor="label">
                제목
              </label>
              <input
                className="post_input"
                placeholder="제목을 입력해 주세요"
                onChange={handleChange('title')}
                id="title-input"
              />
            </div>
            <div className="w-100 form_group">
              <label className="block font-bold mb-1">내용</label>
              <textarea
                className="post_textarea"
                placeholder="내용을 입력해 주세요"
                id="body-input"
                onChange={handleChange('body')}
              />
            </div>
            <div className="mt-10 text-center">
              <button className="w-100 submit_btn" onClick={() => handleSubmit()}>
                작성하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostNew;
