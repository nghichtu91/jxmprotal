export const currencyFormat = (coin: number) => {
  const config = { style: 'currency', currency: 'VND' };
  const formated = new Intl.NumberFormat('vi-VN', config).format(coin);

  return formated;
};
