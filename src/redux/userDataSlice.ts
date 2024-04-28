import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { budgetInterface, sourceInterface } from "@/types";
import axios from "axios";
import dayjs from "dayjs";

interface userDataSliceInterface {
  balances: {
    netBalance: number;
    grossBalance: number;
  };
  todayProfit: string;
  budgetTimeFrame: {
    from: string;
    to: string;
  };
  sources: sourceInterface[];
  budgets: budgetInterface[];
}

export const getAllSources = createAsyncThunk(
  "userData/getAllSources",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_API}/sources`
    );
    return response.data;
  }
);
export const getAllBudgets = createAsyncThunk(
  "userData/getAllBudgets",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_API}/budgets`
    );
    return response.data;
  }
);

const initialState: userDataSliceInterface = {
  balances: {
    netBalance: 235.23,
    grossBalance: 1234.13,
  },
  todayProfit: "123$ (4%)",
  sources: [],
  budgets: [],
  budgetTimeFrame: {
    from: dayjs().toString(),
    to: dayjs().add(30, "days").toString(),
  },
};

const userDataSlice = createSlice({
  name: "userData",
  initialState,

  reducers: {
    updateNetBalance(state, action: PayloadAction<number>) {
      state.balances.grossBalance = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllSources.fulfilled, (state, action) => {
      state.sources = action.payload;
    });
    builder.addCase(getAllBudgets.fulfilled, (state, action) => {
      state.budgets = action.payload;
    });
  },
});

export const userDataReducer = userDataSlice.reducer;

export const { updateNetBalance } = userDataSlice.actions;

export const getBalancesSelector = (state: RootState) =>
  state.userData.balances;
export const getTodaysProfitSelector = (state: RootState) =>
  state.userData.todayProfit;
export const getAllSourcesSelector = (state: RootState) =>
  state.userData.sources;

export const getAllBudgetsSelector = (state: RootState) =>
  state.userData.budgets;

export const getBudgetTimeFrameSelector = (state: RootState) =>
  state.userData.budgetTimeFrame;
