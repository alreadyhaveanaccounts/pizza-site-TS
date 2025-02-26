import React from "react";
import cls from "./NotFoundBlock.module.scss";

const NotFoundBlock: React.FC = () => {
  return (
    <div className={cls.main}>
      <h1>Ничего не найдено</h1>
      <p className={cls.description}>
        К сожалению в нашем интернет-магазине отсутствует данная страница
      </p>
    </div>
  );
};
export default NotFoundBlock;
