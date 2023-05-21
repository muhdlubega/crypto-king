import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import { CoinList } from "../config/api";
import axios from "axios";
import { numbersWithCommas } from "./Carousel";

const useStyles = ( )=> ({
  row: {
    height: "50%",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    fontFamily: "Montserrat",
    padding: 20,
    "&:hover": {
      backgroundColor: "grey",
    },
  },
  pagination: {
      color: "rgb(179,71,252)",
  },
});

const Table = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { currency, symbol } = CryptoState();

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    console.log(data);
    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
      <div style={{ textAlign: "center" }}>
        <h4
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
          Cryptocurrencies Prices by Market Cap
        </h4>
        <input
        type="text"
        placeholder="Search for a Crypto Currency"
        style={{ marginBottom: 20, width: "100%" }}
        onChange={(e) => setSearch(e.target.value)}
      />
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <table
              style={{
                padding: 20,
                width: "100%",
                backgroundColor: "darkorchid",
              }}
            >
              <tr>
                <th
                  style={{
                    paddingLeft: 35,
                    fontWeight: 700,
                    fontFamily: "Montserrat",
                  }}
                >
                  Coin
                </th>
                <th
                  style={{
                    fontWeight: 700,
                    fontFamily: "Montserrat",
                    textAlign: "right",
                  }}
                >
                  Price
                </th>
                <th
                  style={{
                    fontWeight: 700,
                    fontFamily: "Montserrat",
                    textAlign: "right",
                  }}
                >
                  24hr Change
                </th>
                <th
                  style={{
                    fontWeight: 700,
                    fontFamily: "Montserrat",
                    textAlign: "right",
                  }}
                >
                  Market Cap
                </th>
              </tr>
            </table>
            <table
              style={{
                paddingTop: 20,
                width: "100%",
              }}
            >
              <tr>
                <td>
                  {handleSearch()
                    .slice((page - 1) * 10, (page - 1) * 10 + 10)
                    .map((row) => {
                      const profit = row.price_change_percentage_24h > 0;
                      return (
                        <tr
                          onClick={() => navigate(`/coins/${row.id}`)}
                          className={classes.row}
                          key={row.name}
                        >
                          <td width={"100%"}>
                            <img
                              src={row?.image}
                              alt={row.name}
                              height="50"
                              style={{ marginBottom: 10 }}
                            />
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <span
                                style={{
                                  textTransform: "uppercase",
                                  fontSize: 22,
                                }}
                              >
                                {row.symbol}
                              </span>
                              <span style={{ color: "rgb(237, 211, 252)" }}>
                                {row.name}
                              </span>
                            </div>
                          </td>
                          <td width={"100%"}>
                            {symbol}{" "}
                            {numbersWithCommas(row.current_price.toFixed(2))}
                          </td>
                          <td
                            width={"100%"}
                            style={{ color: profit > 0 ? "green" : "red" }}
                          >
                            {profit && "+"}{" "}
                            {row?.price_change_percentage_24h?.toFixed(2)}%
                          </td>
                          <td width={"100%"} align="right">
                            {symbol}{" "}
                            {numbersWithCommas(
                              row.market_cap.toString().slice(0, -6)
                            )}{" "}
                            M
                          </td>
                        </tr>
                      );
                    })}
                </td>
              </tr>
            </table>
          </div>
        )}
        <ul className={classes.pagination}>
          {Array.from(
            { length: Math.ceil(handleSearch()?.length / 10) },
            (_, index) => (
              <li
                key={index}
                onClick={() => {
                  setPage(index + 1);
                  window.scroll(0, 450);
                }}
              >
                {index + 1}
              </li>
            )
          )}
        </ul>
      </div>
  );
};

export default Table;