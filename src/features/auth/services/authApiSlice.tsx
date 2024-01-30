import {apiSlice} from '../../../redux/api/apiSlice';

const authApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: builder => ({
    signIn: builder.mutation({
      query: args => ({
        url: '/auth/login',
        body: args.credential,
        method: 'POST',
      }),
    }),
  }),
});
