import React, { useEffect, useState } from "react";

const StockExchangeWidget = (props) => {
  const [stockExchanges, setStockExchanges] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    try {
      const stockData = require("../stockdata.json");

      if (!Array.isArray(stockData) || stockData.length === 0) {
        throw new Error("No exchange data found. Please return later.");
      }

      const validExchanges = stockData.filter(
        (exchange) => exchange && exchange.code && exchange.stockExchange
      );

      if (validExchanges.length === 0) {
        throw new Error("No valid exchange data found.");
      }

      setStockExchanges(validExchanges);
    } catch (error) {
      setErrorMessage(error.message);
    }
  }, []);

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  return (
    <div>
      <ul className="stock-exchange-list">
        {stockExchanges.map((exchange) => (
          <li key={exchange.code}>{exchange.stockExchange}</li>
        ))}
      </ul>
    </div>
  );
};

export default StockExchangeWidget;
