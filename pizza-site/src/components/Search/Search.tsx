import React, { useCallback, useRef } from "react";
import cls from "./Search.module.scss";
import debounce from "lodash.debounce";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/slices/filterSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
const Search: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const onClickClear = () => {
    dispatch(setSearchValue(""));
    inputRef.current?.focus();
  };
  const { searchValue } = useSelector((state: RootState) => state.filter);

  const dispatch = useDispatch();

  const debounsedSearch = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 350),
    [setSearchValue]
  );

  return (
    <div className={cls.container}>
      <img
        className={cls.SearchIcon}
        src="/search-icon.svg"
        alt="Search icon"
      />
      <input
        className={cls.input}
        placeholder="Начните вводить..."
        onChange={(e) => debounsedSearch(e.target.value)}
        ref={inputRef}
      ></input>

      <img
        onClick={() => {
          onClickClear();
        }}
        className={searchValue ? cls.CloseIcon : cls.CloseIconZero}
        src="/close-icon.svg"
        alt="Close icon"
      />
    </div>
  );
};
export default Search;
