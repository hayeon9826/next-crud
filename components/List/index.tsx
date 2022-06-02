import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { Post } from '../../interface';
import { useDispatch, useSelector } from 'react-redux';
import { sagaActions } from '../../sagas/sagaActions';
import { AppDispatch, RootState } from '../../store/store';
import * as API from '../../lib/api';
import { AxiosResponse } from 'axios';

const List: React.FC<{ posts: Post[] }> = ({ posts }) => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    // page mount시 post 데이터 fetching. reducer로 post 세팅
    dispatch({ type: sagaActions.FETCH_POSTS });
  }, []);

  return (
    <>
      <div className="screen_bg">
        <div className="screen_padding">
          <div className="flex_div">
            <h2 className="page_title">전체 후기</h2>
            <Link href="/posts/new" id="post-new-btn">
              <button className="main_btn" id="post-new-btn">
                후기 작성하기
              </button>
            </Link>
          </div>
          <div className="grid_div">
            {posts && posts.length ? (
              posts.map((data: Post) => (
                <div
                  className="shadow-md hover:shadow-xl cursor-pointer bg-white rounded-lg relative flex p-6 items-start flex-col md:w-[380px] lg:w-[380px] xl:w-[380px] w-full h-[300px]"
                  key={data.id}>
                  <div className="flex_div">
                    <h2 className="post-user user_text">{data.user}</h2>
                    <span className="date_text post-date">{data.date}</span>
                    <Link href={`/posts/${data.id}`} className="post-show-btn">
                      <div className="absolute items-center flex text-gray-500 text-xs underline right-5 top-5">
                        더보기
                      </div>
                    </Link>
                  </div>
                  <div className="text-gray-600 mt-2 post-title">{data.title}</div>
                  <div className="mt-4 overflow-hidden post-body leading-7">{data.body}</div>
                </div>
              ))
            ) : (
              <div className="shadow-md col-span-3 w-100 cursor-pointer bg-white rounded-lg relative block p-6">
                <div className="no_content">등록된 후기가 없습니다.</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  // const response: AxiosResponse = await API.getPosts();
  // const posts: Post = response.data;
  const posts = useSelector((state: RootState) => state.posts);

  // Pass post data to the page via props
  return { props: { posts } };
};

export default List;
