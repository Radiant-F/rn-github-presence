import {apiSlice} from '../../../redux/api/apiSlice';

const prayerApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: builder => ({
    prayer: builder.query({
      query: () => ({
        url: '',
      }),
      async onQueryStarted(args, {queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {usePrayerQuery} = prayerApiSlice;
