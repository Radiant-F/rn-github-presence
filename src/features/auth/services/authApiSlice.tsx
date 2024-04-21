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
    user: builder.query({
      query: () => '/profile',
      async onQueryStarted(args, {queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;
          console.log('SUCCESS:', data);
        } catch (error) {
          console.log('ERROR:', error);
        }
      },
    }),
  }),
});

export const {useUserQuery, useSignInMutation} = authApiSlice;
