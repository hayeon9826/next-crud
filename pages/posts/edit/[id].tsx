import React, { useEffect, useRef, useState } from 'react';
import { GetServerSideProps } from 'next';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { BASE_URL } from '../../../lib/api';
import { toast } from 'react-toastify';
import { useStores } from '../../../store/rootContext';
import axios, { AxiosResponse } from 'axios';
import { Post } from 'interface';

const PostEdit: React.FC<{ post: Post }> = ({ post }) => {
  // URL 인자들의 key/value(키/값) 짝들의 객체를 반환
  const [form, setForm] = useState({
    title: '',
    body: '',
    user: '',
    date: dayjs().format('YYYY-MM-DD')
  });

  const { postStore } = useStores();
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const router = useRouter();

  const handleChange =
    (prop: string) =>
    (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
      setForm({ ...form, [prop]: event.target.value });
    };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (post?.id) {
      setForm({ ...post });
    }
    // scroll to top
    window.scrollTo(0, 0);
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, [post]);

  const handleSubmit = async () => {
    try {
      // form validation
      if (form.user && form.title && form.body) {
        await postStore.updatePost(post?.id!!, {
          title: form.title,
          body: form.body,
          user: form.user,
          date: dayjs().format('YYYY-MM-DD')
        });
        toast.success('후기를 수정했습니다.', {
          autoClose: 1000
        });
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

// export const getStaticPaths: GetStaticPaths = async () => {
//   const response = await axios({ url: `${BASE_URL}/post` });
//   const data = await response.data;

//   const paths = data.map(({ id }: Post) => ({
//     params: { id: String(id) }
//   }));

//   return { paths, fallback: false };
// };

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const response: AxiosResponse = await axios({
//     url: `${BASE_URL}/post/${params.id}`
//   });

//   const post: Post = response.data;

//   // Pass post data to the page via props
//   return { props: { post } };
// };

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const response: AxiosResponse = await axios({
    url: `${BASE_URL}/post/${params.id}`
  });

  const post: Post = response.data;
  // Pass post data to the page via props
  return { props: { post } };
};

export default PostEdit;
