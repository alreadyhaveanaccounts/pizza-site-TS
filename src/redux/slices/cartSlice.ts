import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PizzaBlockProps } from "../../components/PizzaBlock";
import { getCartFromLS, getPriceFromLS } from "../../utils/getDataFromLS";

interface IFInitialState {
  totalPrice: number;
  totalCount: number;
  items: PizzaBlockProps[];
}

const initialState: IFInitialState = {
  items: getCartFromLS(),
  totalPrice: getPriceFromLS(),
  totalCount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<PizzaBlockProps>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
    },
    setTotalPrice(state, action: PayloadAction<number>) {
      state.totalPrice = state.totalPrice + action.payload;
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },

    deletePizza(state, action: PayloadAction<PizzaBlockProps>) {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },

    plusPizza(state, action: PayloadAction<PizzaBlockProps>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
        state.totalPrice += findItem.price;
      }
      state.totalCount += 1;
      console.log(state.totalCount, state.items.length);
    },
    minusPizza(state, action: PayloadAction<PizzaBlockProps>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem && findItem.count > 1) {
        findItem.count--;
        state.totalPrice -= findItem.price;
        state.totalCount -= 1;
      } else if (findItem) {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
        state.totalPrice -= findItem.price;
      }
    },
  },
});

export const {
  setItems,
  setTotalPrice,
  clearItems,
  plusPizza,
  minusPizza,
  deletePizza,
} = cartSlice.actions;
export default cartSlice.reducer;
