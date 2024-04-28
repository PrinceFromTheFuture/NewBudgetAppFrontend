import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { actionInteface } from "@/types";
import axios from "axios";

export const getAllTransactions = createAsyncThunk(
  "actions/getAll",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_API}/transactions`
    );
    return response.data;
  }
);
const initialState: actionInteface[] = [];

const actionsSlice = createSlice({
  name: "actions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllTransactions.fulfilled, (state, action) => {
      if (!state) {
        console.log("f");
      }
      return action.payload;
    });
  },
});

export const actionsReducer = actionsSlice.reducer;
export const getAllTransactionsSelector = (state: RootState) => state.actions;
