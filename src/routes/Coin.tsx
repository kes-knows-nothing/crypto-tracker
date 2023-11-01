import { useQuery } from 'react-query';
import { useParams, useNavigate } from 'react-router';
import styled from 'styled-components';
import { axiosCoinData, axiosCoinPriceData } from '../api';
import Navbar from '../components/Navbar';

const ContentContainer = styled.div`
  margin-left: 20vw;
  height: 100%;
  background-color: #1a0f0f;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  gap: 10px;
`;

const HomeBtnContainer = styled.div`
  cursor: pointer;
  width: 100%;
`;

const MetaInfoHeadline = styled.div`
  width: 100%;
  padding: 20px 40px;
`;

const SimpleInfoBox = styled.div`
  width: 100%;
  display: flex;
  gap: 12px;
  span {
    background-color: rgb(33, 40, 65);
    color: rgb(129, 145, 197);
    border-radius: 4px;
    padding: 8px 12px;
  }
`;
const MainDataBox = styled.div`
  width: 100%;
  height: 12vh;
  display: flex;
  gap: 40px;
  align-items: center;
  font-size: 36px;
  span {
    display: flex;
    align-items: center;
    gap: 7px;
  }
`;

export interface CoinInfo {
  id: string;
  symbol: string;
  name: string;
  asset_platform_id: null;
  platforms: Platforms;
  detail_platforms: DetailPlatforms;
  block_time_in_minutes: number;
  hashing_algorithm: string;
  categories: string[];
  preview_listing: boolean;
  public_notice: null;
  additional_notices: any[];
  description: Description;
  links: Links;
  image: Image;
  country_origin: string;
  genesis_date: Date;
  sentiment_votes_up_percentage: number;
  sentiment_votes_down_percentage: number;
  watchlist_portfolio_users: number;
  market_cap_rank: number;
  coingecko_rank: number;
  coingecko_score: number;
  developer_score: number;
  community_score: number;
  liquidity_score: number;
  public_interest_score: number;
  public_interest_stats: PublicInterestStats;
  status_updates: any[];
  last_updated: Date;
}

export interface Description {
  en: string;
}

export interface DetailPlatforms {
  '': Class;
}

export interface Class {
  decimal_place: null;
  contract_address: string;
}

export interface Image {
  thumb: string;
  small: string;
  large: string;
}

export interface Links {
  homepage: string[];
  blockchain_site: string[];
  official_forum_url: string[];
  chat_url: string[];
  announcement_url: string[];
  twitter_screen_name: string;
  facebook_username: string;
  bitcointalk_thread_identifier: null;
  telegram_channel_identifier: string;
  subreddit_url: string;
  repos_url: ReposURL;
}

export interface ReposURL {
  github: string[];
  bitbucket: any[];
}

export interface Platforms {
  '': string;
}

export interface PublicInterestStats {
  alexa_rank: number;
  bing_matches: null;
}
export interface CoinPriceInfo {
  1: number;
  2: number;
  3: number;
  4: number;
}

function Coin() {
  const { coinId } = useParams();
  const navigate = useNavigate();
  const { isLoading: coinInfoLoading, data: coinInfo } = useQuery<CoinInfo>(
    ['coinData', coinId],
    () => axiosCoinData(coinId as string),
  );
  const { isLoading: coinPriceLoading, data: coinPrice } = useQuery<CoinInfo>(
    ['coinPriceData', coinId],
    () => axiosCoinPriceData(coinId as string),
  );
  console.log(coinPrice);

  // const openTimeUnix = 1698624000;
  // const date = new Date(openTimeUnix * 1000);

  const navigateHome = () => {
    navigate('/');
  };

  return (
    <>
      <Navbar>{coinId}</Navbar>
      <ContentContainer>
        <HomeBtnContainer onClick={navigateHome}></HomeBtnContainer>
        {coinInfoLoading ? (
          <span>Hold on!</span>
        ) : (
          <MetaInfoHeadline>
            <SimpleInfoBox>
              <span>Market Cap Rank: #{coinInfo?.market_cap_rank}</span>
              <span>{coinInfo?.symbol.toUpperCase()}</span>
            </SimpleInfoBox>
            <MainDataBox>
              <span>
                <img src={coinInfo?.image.small} alt="logo" />
                {coinInfo?.name}
              </span>
              <span>$ {coinPrice?.[0][4]}</span>
            </MainDataBox>
          </MetaInfoHeadline>
        )}
      </ContentContainer>
    </>
  );
}
export default Coin;
