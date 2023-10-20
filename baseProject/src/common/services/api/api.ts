import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Post } from './types/Post';

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com',
  }),
  tagTypes: ['Post'],
  endpoints: builder => ({
    getPosts: builder.query<Post, void>({
      query: () => '/posts',
    }),
  }),
});

export const { useGetPostsQuery } = postApi;
