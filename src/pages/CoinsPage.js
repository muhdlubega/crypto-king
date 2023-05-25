import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useParams } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { SingleCoin } from '../config/api';
import CoinInfo from '../components/CoinInfo';

const useStyles = () => ({
  description: {
    width: '100%',
    fontFamily: 'Montserrat',
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: 'justify'
  },
  marketData: {
    alignSelf: 'start',
    padding: 25,
    paddingTop: 10,
    width: '100%',
  }
});

export function numbersWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinsPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency , symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
  }, []);

  const classes = useStyles();

  if (!coin) return(<div>Loading...</div>);

  return (
    <div>
      <Header/>
      <div style={{display: 'flex', flexGrow: 1}}>
        <div style={{width: '30%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 25,
    borderRight: '2px solid grey',}}>
          <img src={coin?.image.large} alt={coin?.name} height='200' style={{marginBottom : 20}}></img>
          <h3 style={{fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Montserrat'}}>{coin?.name}</h3>
          <h6 style={{width: '100%',
    fontFamily: 'Montserrat',
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: 'justify'}}>
            {coin?.description.en.split('. ')[0]}.
          </h6>
          <div style={{alignSelf: 'start',
    padding: 25,
    paddingTop: 10,
    width: '100%',}}>
          <span style={{display: 'flex'}}>
            <h5 style={{fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Montserrat'}}>
              Rank:
            </h5>
            &nbsp; &nbsp;
            <h5
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {coin?.market_cap_rank}
            </h5>
          </span>
          <span style={{ display: 'flex' }}>
            <h5 style={{fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Montserrat'}}>
              Current Price:
            </h5>
            &nbsp; &nbsp;
            <h5
              style={{
                fontFamily: 'Montserrat',
              }}
            >
              {symbol}{' '}
              {
                coin?.market_data.current_price[currency.toLowerCase()]
              }
            </h5>
          </span>
          <span style={{ display: 'flex' }}>
            <h5 style={{fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Montserrat'}}>
              Market Cap:
            </h5>
            &nbsp; &nbsp;
            <h5
              style={{
                fontFamily: 'Montserrat',
              }}
            >
              {symbol}{' '}
              {
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              }
              M
            </h5>
          </span>
        </div>
        </div>
      <CoinInfo coin={coin}></CoinInfo>
      </div>
    </div>
  )
}

export default CoinsPage