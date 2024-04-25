import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { dummyData } from "./dummyActions";
import { actionInteface } from "@/types";

const initialState: actionInteface[] = dummyData || [];

const actionsSlice = createSlice({
  name: "actions",
  initialState,
  reducers: {},
});

export const actionsReducer = actionsSlice.reducer;
export const getAllActions = (state: RootState) => state.actions;
