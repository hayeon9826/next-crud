import React from 'react';
import List from '../components/List';
import 'react-toastify/dist/ReactToastify.css';
import { AxiosResponse } from 'axios';
import { Post } from 'interface';
import * as API from '../lib/api';

const Home: React.FC<{ posts: Post[] }> = ({ posts }) => (
  <>
    <List posts={posts} />
  </>
);

export async function getServerSideProps() {
  const response: AxiosResponse = await API.getPosts();
  const posts: Post = response.data;

  // Pass post data to the page via props
  return { props: { posts } };
}

export default Home;
