import axios from "axios";

export const axiosCoins = async () => {
  const response = await axios(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&locale=ar"
  );
  const coinlist = response.data;
  console.log(coinlist)
  return coinlist;
};
