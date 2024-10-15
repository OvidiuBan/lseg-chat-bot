import React from "react";
import stockData from "../stockdata.json";

const StocksWidget = ({ selectedExchange }) => {
  const exchangeData = stockData.find((exchange) => exchange.code === selectedExchange);

  if (!exchangeData) {
    return <p>No exchange data found.</p>;
  }

  return (
    <div>
      <ul className="stock-exchange-list">
      {exchangeData.topStocks.map((stock) => (
          <li key={stock.code}>
            {stock.stockName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StocksWidget;
