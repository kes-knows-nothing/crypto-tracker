import axios from "axios";

export const axiosCoins = async () => {
  const response = await axios("https://api.coinpaprika.com/v1/coins");
  const coinData = response.data.slice(0, 100)
  return coinData
};
