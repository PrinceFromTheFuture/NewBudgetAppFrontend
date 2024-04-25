import { configureStore } from "@reduxjs/toolkit";
import { userDataReducer } from "./userDataSlice";
import { actionsReducer } from "./actionsSlice";

export const store = configureStore({
  reducer: {
    userData: userDataReducer,
    actions: actionsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
