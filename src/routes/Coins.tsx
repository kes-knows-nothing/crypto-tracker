import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { useQuery } from "react-query";
import { axiosCoins } from "../api";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 32px;
  color: ${(props) => props.theme.accentColor};
`;


const Nav = styled.nav`
  width: 20%;
  min-width: 360px;
  background-color: ${(props) => props.theme.navBgColor};
  height: 100%;
  position: fixed;
`;

const ContentContainer = styled.div`
  margin-left: 20%;
  width: 100%;
  height: 260%;
  min-width: 600px;
  background-color: #1a0f0f;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  gap: 10px;
`;

const ContentHeader = styled.header`
  width: 100%;
  height: 300px;
  background-color: #2c2626;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CoinList = styled.div`
  width: 100%;
  height: 100%;
  background-color: #1a0f0f;
  display: flex;
  flex-direction: column;
  gap: 5px;
  .coinlist_header {
    padding: 25px;
    font-size: 20px;
    background-color: #1f1e1e;
  }
  .coinlist {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 5px;
  }
`;

const LogoImg = styled.img`
  height: 80%;
  border-radius: 30px;
`;

const HeaderDiscriptionBox = styled.div`
  height: 80%;
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  .title {
    font-size: 40px;
    vertical-align: center;
    padding: 20px;
    color: #8cc63f;
  }

  .discription {
    width: 80%;
    font-size: 20px;
    text-align: center;
    padding-bottom: 10px;
    color: #8cc63f;
  }
`;

const CoinBox = styled.a`
  display: flex;
  flex-direction: column;
  padding: 20px;
  min-height: 200px;
  background-color: #1f1e1e;
  justify-content: space-between;
  cursor: pointer;
  &:hover {
    background-color: #522525;
    transition: background-color 0.5s;
  }
  .meta_data {
    min-height: 30px;
    display: flex;
    padding: 5px;
    display: flex;
    flex-direction: column;

    .coin_meta_data {
      display: flex;
      width: 100%;
    }

    .coin_name {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 4px;
    }

    .current_price {
      display: flex;
      justify-content: flex-start;
      font-size: 25px;
      padding: 5px;
      font-weight: 600;
    }
  }

  .logo_img {
    width: 28px;
    margin-right: 10px;
  }

  .price_change_info {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    .price_change {
      color: rgb(90, 97, 122);
      font-size: 15px;
    }
    .price_change_percent {
      font-size: 30px;
      font-weight: 600;
    }
  }
`;

export interface CoinInfo {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number | null;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number | null;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: Date;
  atl: number;
  atl_change_percentage: number;
  atl_date: Date;
  roi: Roi | null;
  last_updated: Date;
}

export interface Roi {
  times: number;
  currency: string;
  percentage: number;
}

function Coins() {
  function formatNumber(number: number) {
    const formattedNumber = Number(number).toLocaleString(undefined, {
      maximumFractionDigits: 2,
    });
    return formattedNumber;
  }

  const { isLoading, data } = useQuery<CoinInfo[]>("allCoins", axiosCoins);

  return (
    <>
    <Container>
      <Nav>
        <Header>
          <Title>Kestrel Coins</Title>
        </Header>
      </Nav>
      <ContentContainer>
        <ContentHeader>
          <LogoImg src={"/coingecko.png"} />
          <HeaderDiscriptionBox>
            <span className="title">CoinGecko</span>
            <span className="discription">
              CoinGecko provides a fundamental analysis of the crypto market. In
              addition to tracking price, volume and market capitalisation,
              CoinGecko tracks community growth, open-source code development,
              major events and on-chain metrics.
            </span>
          </HeaderDiscriptionBox>
        </ContentHeader>
        <CoinList>
          <span className="coinlist_header">Crypto List</span>
          <div className="coinlist">
            {isLoading ? (
              <span>Loading...</span>
            ) : (
              data?.map((coin) => (
                <CoinBox href="/${coin.id}">
                  <div className="meta_data">
                    <div className="coin_meta_data">
                      <img className="logo_img" src={coin.image} />
                      <span className="coin_name">{coin.id}</span>
                    </div>

                    <div>
                      <span className="current_price">
                        $ {formatNumber(coin.current_price)}
                      </span>
                    </div>
                  </div>

                  <div className="price_change_info">
                    <span className="price_change">
                      $ {formatNumber(coin.price_change_24h)}
                    </span>
                    <span
                      className="price_change_percent"
                      style={{
                        color:
                          coin.price_change_percentage_24h >= 0
                            ? "rgb(82, 180, 85)"
                            : "rgb(220, 79, 69)",
                      }}
                    >
                      {formatNumber(coin.price_change_percentage_24h)} %
                    </span>
                  </div>
                </CoinBox>
              ))
            )}
          </div>
        </CoinList>
      </ContentContainer>
    </Container>
    <Outlet />
    </>
  );
}

export default Coins;
