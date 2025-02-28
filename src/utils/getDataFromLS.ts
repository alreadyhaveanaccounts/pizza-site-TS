export const getCartFromLS = () => {
  const data1 = localStorage.getItem("cart");
  return data1 ? JSON.parse(data1) : [];
};
export const getPriceFromLS = () => {
  const data2 = localStorage.getItem("price");
  return Number(data2 ? JSON.parse(data2) : []);
};
