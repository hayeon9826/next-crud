import React, { useEffect, useRef } from 'react';
import { GetServerSideProps } from 'next';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { BASE_URL } from '../../../lib/api';
import { toast } from 'react-toastify';
import axios, { AxiosResponse } from 'axios';
import { Post } from 'interface';
import { setFormSlice } from '../../../slices/form';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../store/store';
import { updatePost } from 'slices/post';
import { sagaActions } from 'sagas/sagaActions';

const PostEdit: React.FC<{ post: Post }> = ({ post }) => {
  // URL 인자들의 key/value(키/값) 짝들의 객체를 반환
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const router = useRouter();
  const form = useSelector((state: RootState) => state.form);
  const dispatch: AppDispatch = useDispatch();

  const handleChange =
    (prop: string) =>
    (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
      dispatch(setFormSlice({ ...form, [prop]: event.target.value }));
    };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (post?.id) {
      dispatch(setFormSlice({ ...post }));
    }
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, [post]);

  const handleSubmit = async () => {
    try {
      // form validation
      if (form.user && form.title && form.body) {
        await dispatch(
          updatePost({
            id: post?.id!,
            post: {
              user: form.user,
              title: form.title,
              body: form.body,
              date: dayjs().format('YYYY-MM-DD')
            }
          })
        );
        // 후기 수정 후 form 리셋
        await dispatch({ type: sagaActions.RESET_FORM });
        router.back();
      } else {
        await toast.warning('모든 필드를 채워주세요.', {
          autoClose: 1000
        });
      }
    } catch (e) {
      console.log(e);
      router.replace('/');
    }
  };

  return (
    <div className="screen_md">
      <div className="screen_padding">
        <div className="flex_div">
          <h2 className="page_title">후기 수정</h2>
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
                defaultValue={post?.user}
              />
            </div>
            <div className="w-100 form_group">
              <label className="block font-bold mb-1" htmlFor="label">
                제목
              </label>
              <input
                className="post_input"
                placeholder="제목을 입력해 주세요"
                defaultValue={post?.title}
                id="title-input"
                onChange={handleChange('title')}
              />
            </div>
            <div className="w-100 form_group">
              <label className="block font-bold mb-1">내용</label>
              <textarea
                className="post_textarea"
                placeholder="내용을 입력해 주세요"
                id="body-input"
                defaultValue={post?.body}
                onChange={handleChange('body')}
              />
            </div>
            <div className="mt-10 text-center">
              <button className="w-100 submit_btn" onClick={() => handleSubmit()}>
                수정하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const response: AxiosResponse = await axios({
    url: `${BASE_URL}/post/${params.id}`
  });

  const post: Post = response.data;
  // Pass post data to the page via props
  return { props: { post } };
};

export default PostEdit;
