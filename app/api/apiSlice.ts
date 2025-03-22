// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// Use the `Post` type we've already defined in `postsSlice`,
// and then re-export it for ease of use
import type {
  Character,
  Creature,
  LiveStats,
} from "../character/characterDefs";
import { setSnackbar } from "../snackbar/snackbarSlice";

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
      onQueryStarted: (_, { dispatch, queryFulfilled }) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        queryFulfilled.catch((err: any) => {
          dispatch(
            setSnackbar({
              message:
                "Error fetching characters: " +
                (err.error.data?.message ||
                  err.error.message ||
                  "Unknown error"),
              severity: "error",
            })
          );
        });
      },
    }),
    getCharacter: builder.query<Character, string>({
      query: (id) => `/character/${id}`,
      providesTags: (result, error, id) => [{ type: "Character", id }],
      onQueryStarted: (_, { dispatch, queryFulfilled }) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        queryFulfilled.catch((err: any) => {
          dispatch(
            setSnackbar({
              message:
                "Error fetching character: " +
                (err.error.data?.message ||
                  err.error.message ||
                  "Unknown error"),
              severity: "error",
            })
          );
        });
      },
    }),
    updateLiveStats: builder.mutation<
      Character,
      { id: string; liveStats: LiveStats; creatures: Creature[] }
    >({
      query: ({ id, liveStats, creatures }) => ({
        url: `/liveStats/${id}`,
        method: "POST",
        body: {
          trackedFeatures: liveStats.trackedFeatures,
          liveStats: {
            ...liveStats,
            trackedFeatures: undefined,
          },
          creatures,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        "Character",
        { type: "Character", id: arg.id },
      ],
    }),
  }),
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const {
  useGetCharactersQuery,
  useGetCharacterQuery,
  useUpdateLiveStatsMutation,
} = apiSlice;
