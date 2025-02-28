import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../Store";
import { PizzaBlockProps } from "../../components/PizzaBlock";

type FetchPizzasType = {
  pageCurrent: number;
  categoryId: number;
  sortId: number;
  sortedTypes: { sortBy: string }[];
  sortDirection: string;
  search: string;
};

export enum Status {
  pending = "pending",
  ready = "ready",
  rejected = "rejected",
}
//асинхр функция в редаксе
const fetchPizzas = createAsyncThunk<PizzaBlockProps[], FetchPizzasType>(
  "pizza/fetchPizzasList",
  async ({
    pageCurrent,
    categoryId,
    sortId,
    sortedTypes,
    sortDirection,
    search,
  }: FetchPizzasType) => {
    const { data } = await axios.get<PizzaBlockProps[]>(
      `https://67a201eb409de5ed5253ea27.mockapi.io/items?page=${pageCurrent}&limit=4&${
        categoryId ? `category=${categoryId}` : ``
      }&sortBy=${
        sortedTypes[sortId].sortBy
      }&order=${sortDirection}&search=${search}`
    );
    return data;
  }
);
type initialState = {
  id: number;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
};

interface IFInitialState {
  pizzas: PizzaBlockProps[];
  status: Status;
}

const initialState: IFInitialState = {
  pizzas: [],
  status: Status.pending,
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setPizzas(state, action: PayloadAction<PizzaBlockProps[]>) {
      state.pizzas = action.payload;
    },
  },
  //наша асинхр ф fetchPizzas возвращает три статуса: фулфил,пендинг,режектед и выполняется код в зависимости от исхода функции. таким образом с помощью одной функции можем сделать три разных действия а не прописывать каждый раз новый редюсер. В этом плюс AsyncThunk. Экстраредюсер это замена try/catch в редаксе. Когда использовать thunk - когда хочешь сделать запрос на бекенд и еще что-то поменять в редаксе.
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.pizzas = action.payload;
        state.status = Status.ready;
      })
      .addCase(fetchPizzas.pending, (state) => {
        state.pizzas = [];
        state.status = Status.pending;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.pizzas = [];
        state.status = Status.rejected;
      });
  },
});

export const selectCart = (state: RootState) => state.cart;
export const selectCartPrice = (state: RootState) => state.cart.items;
export const { setPizzas } = pizzaSlice.actions;
export { fetchPizzas };
export default pizzaSlice.reducer;
