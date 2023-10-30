import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

export interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  tags: Tag[];
  team: Team[];
  description: string;
  message: string;
  open_source: boolean;
  started_at: Date;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  links: Links;
  links_extended: LinksExtended[];
  whitepaper: Whitepaper;
  first_data_at: Date;
  last_data_at: Date;
}

export interface Links {
  explorer: string[];
  facebook: string[];
  reddit: string[];
  source_code: string[];
  website: string[];
  youtube: string[];
}

export interface LinksExtended {
  url: string;
  type: string;
  stats?: Stats;
}

export interface Stats {
  subscribers?: number;
  contributors?: number;
  stars?: number;
  followers?: number;
}

export interface Tag {
  id: string;
  name: string;
  coin_counter: number;
  ico_counter: number;
}

export interface Team {
  id: string;
  name: string;
  position: string;
}

export interface Whitepaper {
  link: string;
  thumbnail: string;
}

export interface PriceData {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

function Coin() {
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams();
  const [info, setInfo] = useState<InfoData>();
  const [priceInfo, setPriceInfo] = useState<PriceData[]>();
  const openTimeUnix = 1698624000;
const date = new Date(openTimeUnix * 1000);


  useEffect(() => {
    (async () => {
      const infoData = await axios(
        `https://api.coinpaprika.com/v1/coins/${coinId}`
      );
      const priceData = await axios(
        `https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`
      );
      setInfo(infoData.data);
      setPriceInfo(priceData.data);
      console.log(infoData.data);
      console.log(priceData.data);
      setLoading(false);
    })();
  }, [coinId]);

  return (
    <Container>
      <Header>
        <Img src={info?.logo} alt="logo" />
        <Title>{info?.name}</Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank</span>
              <span>{info?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol</span>
              <span>{info?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Open Source</span>
              <span>{info?.open_source ? "Yes" : "No"}</span>
            </OverviewItem>
          </Overview>
          <Description>{info?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>hash algorithm</span>
              <span>{info?.hash_algorithm}</span>
            </OverviewItem>
            <OverviewItem>
              <span>hardware wallet</span>
              <span>{info?.hardware_wallet ? "Yes" : "No"}</span>
            </OverviewItem>
          </Overview>

          <Link to="price">Price</Link>
          <Link to="chart">Chart</Link>
          <Outlet />
        </>
      )}
    </Container>
  );
}
export default Coin;
