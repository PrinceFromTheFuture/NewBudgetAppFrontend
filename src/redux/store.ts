import { configureStore } from "@reduxjs/toolkit";
import { userDataReducer } from "./userDataSlice";
import { trnsactionsReducer } from "./transactionsSlice";
import cardsReducer from "./cardsSlice";

export const store = configureStore({
  reducer: {
    userData: userDataReducer,
    transactions: trnsactionsReducer,
    cards: cardsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
