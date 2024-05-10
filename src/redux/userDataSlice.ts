import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState, store } from "./store";
import { budgetInterface, sourceInterface } from "@/types";
import axios from "axios";
import dayjs from "dayjs";
import Cookies from "js-cookie";
interface userDataSliceInterface {
  username: string | null;
  balances: {
    netBalance: number;
    grossBalance: number;
  };
  todayProfit: string;

  sources: sourceInterface[];
  budgets: budgetInterface[];
}

export const getAllSources = createAsyncThunk("userData/getAllSources", async () => {
  const response = await axios.get(`${import.meta.env.VITE_BASE_API}/sources`);
  return response.data;
});

export const getAllBudgets = createAsyncThunk("userData/getAllBudgets", async () => {
  const response = await axios.get(`${import.meta.env.VITE_BASE_API}/budgets`, {
    withCredentials: true,
  });
  return response.data;
});

export interface submittingBudgetInterface {
  start: string;
  end: string;
  categories: {
    name: string;
    scheduled: number;
    color: string;
  }[];
}

export const submitNewBudget = createAsyncThunk(
  "userData/budgets/new",
  async (budgetData: submittingBudgetInterface) => {
    const response = await axios.post(`${import.meta.env.VITE_BASE_API}/budgets`, budgetData, {
      withCredentials: true,
    });
    return response.data;
  }
);

const initialState: userDataSliceInterface = {
  username: null,
  balances: {
    netBalance: 235.23,
    grossBalance: 1234.13,
  },
  todayProfit: "123$ (4%)",
  sources: [],
  budgets: [],
};

const userDataSlice = createSlice({
  name: "userData",
  initialState,

  reducers: {
    updateNetBalance(state, action: PayloadAction<number>) {
      state.balances.grossBalance = action.payload;
    },
    login(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllSources.fulfilled, (state, action) => {
      state.sources = action.payload;
    });
    builder.addCase(getAllBudgets.fulfilled, (state, action) => {
      state.budgets = action.payload;
    });
    builder.addCase(submitNewBudget.fulfilled, (state, action) => {
      state.budgets.push(action.payload);
    });
  },
});

export const userDataReducer = userDataSlice.reducer;

export const { updateNetBalance, login } = userDataSlice.actions;

export const getBalancesSelector = (state: RootState) => state.userData.balances;
export const getTodaysProfitSelector = (state: RootState) => state.userData.todayProfit;
export const getAllSourcesSelector = (state: RootState) => state.userData.sources;

export const getAllBudgetsSelector = (state: RootState) => state.userData.budgets;

export const getCurrentBudget = (state: RootState) => {
  const now = dayjs();
  const budgetFound = state.userData.budgets.find((budget) => {
    dayjs(budget.start).isBefore(now) && dayjs(budget.end).isAfter(now);
  });
  if (!budgetFound) {
    return state.userData.budgets[0];
  } else {
    return budgetFound;
  }
};

export const getUsernameSelector = (state: RootState) => state.userData.username;
