import { apiSlice } from "./apiSlice";

export const houseSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHouses: builder.query({
      query: () => ({ url: process.env.REACT_APP_ENDPOINT }),
      transformResponse: (response) => response.response,
      transformErrorResponse: (response) => response.error,
    }),
  }),
});

export const { useGetHousesQuery } = houseSlice;
