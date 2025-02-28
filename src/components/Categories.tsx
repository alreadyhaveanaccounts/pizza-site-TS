import React, { useMemo } from "react";

type CategoriesProps = {
  categoryId: number;
  onClickChangeCategory: (i: number) => void;
};
export const Categories: React.FC<CategoriesProps> = React.memo(
  ({ categoryId, onClickChangeCategory }) => {
    const types = [
      "Все",
      "Мясные",
      "Вегетарианская",
      "Гриль",
      "Острые",
      "Закрытые",
    ];
    return (
      <div className="categories">
        <ul>
          {types.map((elem, i) => (
            <li
              key={elem}
              onClick={() => onClickChangeCategory(i)}
              className={categoryId === i ? "active" : ""}
            >
              {elem}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);
