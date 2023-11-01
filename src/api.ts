import axios from 'axios';

export const axiosCoins = async () => {
  const response = await axios(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&locale=ar',
  );
  const coinlist = response.data;
  console.log(coinlist);
  return coinlist;
};

export const axiosCoinData = async (coinId: string) => {
  const response = await axios(
    `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`,
  );
  const coinInfo = response.data;
  return coinInfo;
};

export const axiosCoinPriceData = async (coinId: string) => {
  const response = await axios(
    `https://api.coingecko.com/api/v3/coins/${coinId}/ohlc?vs_currency=usd&days=1`,
  );
  const coinPriceInfo = response.data;
  return coinPriceInfo;
};
