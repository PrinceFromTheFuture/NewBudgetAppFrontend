import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface userDataSliceInterface {
  balances: {
    netBalance: number;
    grossBalance: number;
  };
  todayProfit: string;
}

const initialState: userDataSliceInterface = {
  balances: {
    netBalance: 235.23,
    grossBalance: 1234.13,
  },
  todayProfit: "123$ (4%)",
};

const userDataSlice = createSlice({
  name: "userData",
  initialState,

  reducers: {
    updateNetBalance(state, action: PayloadAction<number>) {
      state.balances.grossBalance = action.payload;
    },
  },
});

export const userDataReducer = userDataSlice.reducer;

export const { updateNetBalance } = userDataSlice.actions;

export const getBalances = (state: RootState) => state.userData.balances;
export const getTodaysProfit = (state: RootState) => state.userData.todayProfit;
