import axios from 'axios';
import { Post, Todo, updatePostProps } from '../interface';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// json-server 호스트 url
export const BASE_URL = 'http://localhost:3000';

// axios header 세팅
const headerConfig = {
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Version': `v1`,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true
  }
};

const API = axios.create(headerConfig);

// rtk query 정의 (fetch)
export const getPostApi = createApi({
  reducerPath: 'getPostApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getPosts: builder.query<Post, string>({
      query: (query) => (query ? `post/${query}` : `post/?_sort=id&_order=DESC&_limit=100`)
    }),
    getPost: builder.query<Post, string>({
      query: (id: string) => `post/${id}`
    })
  })
});

// 기본 CRUD axios 정의
export const createPost = ({ title, body, user, date }: Post) =>
  API.post(`${BASE_URL}/post`, { title, body, user, date }); // 포스트를 생성한다

export const createTodo = ({ title, id, finished }: Todo) =>
  API.post(`${BASE_URL}/todo`, { title, id, finished }); // todo를 생성한다

// 역순으로 최근 작성된 포스트 20개를 불러온다.
export const getPosts = () => API.get(`${BASE_URL}/post/?_sort=id&_order=DESC&_limit=100`);
export const getTodos = () => API.get(`${BASE_URL}/todo/?_sort=id&_order=DESC&_limit=100`);
export const getTodo = (id: number) => API.get(`${BASE_URL}/todo/${id}`);
export const getFaqs = () => API.get(`${BASE_URL}/faq/?_sort=id&_order=ASC&_limit=100`);

export const updatePost = ({ id, post: { title, body, user, date } }: updatePostProps) =>
  API.put(`${BASE_URL}/post/${id}`, { title, body, user, date }); // 포스트를 업데이트한다
export const toggleTodo = ({ id, finished, title }: Todo) =>
  API.put(`${BASE_URL}/todo/${id}`, { finished, title }); // todo를 업데이트한다

export const deletePost = (id: number) => API.delete(`${BASE_URL}/post/${id}`); // 포스트를 제거한다
export const deleteTodo = (id: number) => API.delete(`${BASE_URL}/todo/${id}`); // todo를 제거한다
export const { useGetPostsQuery, useGetPostQuery } = getPostApi;
