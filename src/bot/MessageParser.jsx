
import React from 'react';
import stockData from "../stockdata.json";

const MessageParser = ({ children, actions }) => {
  
  const parse = (message) => {

    if (message.toLowerCase().includes("main menu")){
      actions.handleMainMenu();
      return;
    }

    if (message.toLowerCase().includes("go back")){
      if(actions.getViewingStockPrices()){
      actions.handleGoBack();
      return;
      }
      else {
        actions.handleUnknown();
        return;
      }
    }
   
     const selectedExchange = actions.getSelectedExchange();

     if (!selectedExchange) {
       const foundExchange = stockData.find((exchange) =>
         message.toLowerCase().includes(exchange.stockExchange.toLowerCase())
       );
 
       if (foundExchange) {
         actions.handleStockExchange(foundExchange.code);
         return; 
       }
     }
 
     if (selectedExchange) {
       const exchangeData = stockData.find(
         (exchange) => exchange.code === selectedExchange
       );
 
       if (exchangeData) {
         const foundStock = exchangeData.topStocks.find((stock) =>
          message.toLowerCase().includes(stock.stockName.toLowerCase())
         );
 
         if (foundStock) {
           actions.handleDisplayPrice(foundStock);
           return; 
         }
       }
     }

     actions.handleUnknown();

  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions: {},
        });
      })}
    </div>
  );
};

export default MessageParser;