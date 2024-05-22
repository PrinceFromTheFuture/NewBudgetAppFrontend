import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { budgetInterface, sourceInterface } from "@/types";
import axios from "axios";
import dayjs from "dayjs";
interface userDataSliceInterface {
  username: string | null;

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
      `${import.meta.env.VITE_BASE_API}/budgets`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

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
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_API}/budgets`,
      budgetData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

const initialState: userDataSliceInterface = {
  username: null,

  sources: [],
  budgets: [],
};

const userDataSlice = createSlice({
  name: "userData",
  initialState,

  reducers: {
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

export const { login } = userDataSlice.actions;

export const getAllSourcesSelector = (state: RootState) =>
  state.userData.sources;

export const getAllBudgetsSelector = (state: RootState) =>
  state.userData.budgets;
export const getSingleBudgetByIdSelector = (
  state: RootState,
  budgetId: string
) => state.userData.budgets.find((budget) => budget._id === budgetId)!;

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

export const getUsernameSelector = (state: RootState) =>
  state.userData.username;
