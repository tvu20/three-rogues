import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";

import { apiSlice } from "./api/apiSlice";
import characterReducer from "./character/characterSlice";
import snackbarReducer from "./snackbar/snackbarSlice";

const isLocal = process.env.NODE_ENV === "development";

const reduxLoggerOptions = {
  collapsed: true,
  duration: true,
  // predicate: (_: any, action: any) => !action.type.includes('api/'),
};

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    character: characterReducer,
    snackbar: snackbarReducer,
  },
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(apiSlice.middleware); // RTK Query API middleware
    if (isLocal) {
      return middleware.concat(createLogger(reduxLoggerOptions));
    }
    return middleware;
  },
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
