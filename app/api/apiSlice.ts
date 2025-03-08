// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Use the `Post` type we've already defined in `postsSlice`,
// and then re-export it for ease of use
import type { Character } from "../character/characterDefs";

// Define our single API slice object
export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: "api",
  // All of our requests will have URLs starting with '/fakeApi'
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  // The "endpoints" represent operations and requests for this server
  tagTypes: ["Character"],
  endpoints: (builder) => ({
    // The `getPosts` endpoint is a "query" operation that returns data.
    // The return value is a `Post[]` array, and it takes no arguments.
    getCharacters: builder.query<Character[], void>({
      // The URL for the request is '/characters'
      query: () => "/characters",
      providesTags: ["Character"],
    }),
    getCharacter: builder.query<Character, string>({
      query: (id) => `/character/${id}`,
      //   async onQueryStarted(modelId, { dispatch, queryFulfilled }) {
      //     try {
      //       const { data } = await queryFulfilled;
      //       console.log("Character fetched", data);
      //     } catch (err) {
      //       console.log("Error fetching character", err);
      //     }
      //   },
    }),
  }),
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetCharactersQuery, useGetCharacterQuery } = apiSlice;
