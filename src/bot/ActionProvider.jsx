import React from "react";

const ActionProvider = ({
  createChatBotMessage,
  setState,
  state,
  children,
}) => {
  const getSelectedExchange = () => {
    return state.selectedExchange;
  };

  const getViewingStockPrices = () => {
    return state.viewingStockPrices;
  };

  const handleStockExchange = (selectedCode) => {
    const botMessage = createChatBotMessage("Please select a stock", {
      widget: "stocksWidget",
    });

    setState((prev) => ({
      ...prev,
      selectedExchange: selectedCode,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleDisplayPrice = (stock) => {
    let stockBotMessage = "";
    if (stock.price) {
      stockBotMessage = createChatBotMessage(
        `Stock Price of ${stock.stockName} is ${stock.price}`
      );
    } else {
      stockBotMessage = createChatBotMessage(
        `No price information is availaboe for ${stock.stockName} at the moment`
      );
    }

    const navBotMessage = createChatBotMessage("Please select an option", {
      widget: "navWidget",
      delay: 1000,
    });
    setState((prev) => ({
      ...prev,
      viewingStockPrices: true,
      messages: [...prev.messages, stockBotMessage, navBotMessage],
    }));
  };

  const handleMainMenu = () => {
    const botMessage = createChatBotMessage("Please select a Stock Exchange", {
      widget: "stockExchangeWidget",
    });

    setState((prev) => ({
      ...prev,
      selectedExchange: "",
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleGoBack = () => {
    const botMessage = createChatBotMessage("Please select a Stock", {
      widget: "stocksWidget",
    });

    setState((prev) => ({
      ...prev,
      viewingStockPrices: false,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleUnknown = () => {
    const botMessage = createChatBotMessage(
      "I did not understand that message. Please select any of the displayed options, or write Main Menu if you want to go to the start"
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleStockExchange,
            handleDisplayPrice,
            handleMainMenu,
            handleGoBack,
            handleUnknown,
            getSelectedExchange,
            getViewingStockPrices,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
