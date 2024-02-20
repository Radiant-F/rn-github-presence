import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {RootState} from '../store';

import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://todo-api-omega.vercel.app/api/v1',
  credentials: 'include',
  prepareHeaders: (headers, {getState}) => {
    const token = (getState() as RootState).auth.token;
    if (token) headers.set('authorization', `Bearer ${token}`);
    return headers;
  },
});

const baseQueryReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extra) => {
  let result = await baseQuery(args, api, extra);

  if (result.error && result.error.data.message == 'jwt expired') {
    console.log('refresh token');
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryReauth,
  endpoints: builder => ({}),
});
