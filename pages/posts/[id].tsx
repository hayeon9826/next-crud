import React from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { BASE_URL } from '../../lib/api';
import axios, { AxiosResponse } from 'axios';
import { Post } from 'interface';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../slices/post';
import { AppDispatch } from 'store/store';

const PostShow: React.FC<{ post: Post }> = ({ post }) => {
  // URL 인자들의 key/value(키/값) 짝들의 객체를 반환
  // const params = useParams();
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  const handleDelete = async () => {
    try {
      // sagas.ts의 removePostSaga 호출
      post && post.id !== 0 && (await dispatch(deletePost(post.id!!)));
      router.replace('/');
    } catch (e) {
      router.replace('/');
    }
  };

  return (
    <div className="screen_md">
      <div className="pb-14 screen_padding">
        <div className="flex_div">
          <h2 className="page_title">후기 상세</h2>
        </div>
        <div className="mt-16">
          <div className="w-100 post_show_box">
            {post ? (
              <>
                <div className="flex_div">
                  <div className="post-user user_text">{post?.user}</div>
                  <span className="date_text font-normal post-date">{post?.date}</span>
                  <div className="absolute items-center flex text-gray-500 text-xs right-5 top-5">
                    <Link href={`/posts/edit/${post?.id}`} id="post-edit-btn">
                      <u>수정</u>
                    </Link>
                    ·
                    <u onClick={() => handleDelete()} id="post-delete-btn">
                      삭제
                    </u>
                  </div>
                </div>
                <div className="text-gray-600 mt-2 post-title">{post?.title}</div>
                <div className="mt-4 overflow-hidden pb-5 leading-7 post-body">{post?.body}</div>
                <></>
              </>
            ) : (
              <>
                <div className="no_content">후기가 없습니다. 다시 시도해주세요.</div>
              </>
            )}
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

export default PostShow;
