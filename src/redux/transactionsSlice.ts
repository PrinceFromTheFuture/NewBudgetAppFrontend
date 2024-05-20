import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { actionInteface } from "@/types";
import axios from "axios";

export const getAllTransactions = createAsyncThunk(
  "actions/getAll",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_API}/transactions`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);
const initialState: actionInteface[] = [];

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllTransactions.fulfilled, (state, action) => {
      if (!state) {
      }
      return action.payload;
    });
  },
});

export const trnsactionsReducer = transactionsSlice.reducer;
export const getAllTransactionsSelector = (state: RootState) =>
  state.transactions;
