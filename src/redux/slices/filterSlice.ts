import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IFInitialState {
  searchValue: string;
  categoryId: number;
  sortId: number;
  sortDirection: string;
  pageCurrent: number;
}

const initialState: IFInitialState = {
  searchValue: "",
  categoryId: 0,
  sortId: 0,
  sortDirection: "desc",
  pageCurrent: 1,
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSortId(state, action: PayloadAction<number>) {
      state.sortId = action.payload;
    },
    setSortDirection(state, action: PayloadAction<string>) {
      state.sortDirection = action.payload;
    },
    setPageCurrent(state, action: PayloadAction<number>) {
      state.pageCurrent = action.payload;
    },
    setFilters(state, action: PayloadAction<IFInitialState>) {
      state.pageCurrent = Number(action.payload.pageCurrent);
      state.sortId = Number(action.payload.sortId);
      state.categoryId = Number(action.payload.categoryId);
      state.sortDirection = action.payload.sortDirection;
    },
  },
});

export const {
  setCategoryId,
  setSortId,
  setSortDirection,
  setPageCurrent,
  setFilters,
  setSearchValue,
} = filterSlice.actions;
export default filterSlice.reducer;
