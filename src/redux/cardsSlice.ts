import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./store";

export const getAllCards = createAsyncThunk("cards/getAll", async () => {
  const response = await axios.get(`${import.meta.env.VITE_BASE_API}/cards`, {
    withCredentials: true,
  });
  return response.data;
});

interface Card {
  amountUsed: number;
  name: string;
  associatedSource: string;
  resetDay: number;
  limit: number;
  _id: string;
}
const initialState: Card[] = [];

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getAllCards.fulfilled,
      (_, action: PayloadAction<Card[]>) => {
        return action.payload;
      }
    );
  },
});

const cardsReducer = cardsSlice.reducer;

export const allCardsSelector = (state: RootState) => state.cards;
export default cardsReducer;
