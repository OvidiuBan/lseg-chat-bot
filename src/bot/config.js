import { createChatBotMessage } from "react-chatbot-kit";
import StockExchangeWidget from "./StockExchangeWidget";
import StockWidget from "./StockWidget";
import NavWidget from "./NavWidget";
const botName = "LSEG chatbot";

const config = {
  botName: botName,
  lang: "en",
  initialMessages: [
    createChatBotMessage("Hello! Welcome to LSEG. I'm here to help you."),
    createChatBotMessage("Please select a Stock Exchange", {
      widget: "stockExchangeWidget",
      delay: 1000,
    }),
  ],
  state: {
    selectedExchange: "",
    viewingStockPrices: false,
  },
  widgets: [
    {
      widgetName: "stockExchangeWidget",
      widgetFunc: (props) => <StockExchangeWidget {...props} />,
    },
    {
      widgetName: "stocksWidget",
      widgetFunc: (props) => <StockWidget {...props} />,
      mapStateToProps: ["selectedExchange"],
    },
    {
      widgetName: "navWidget",
      widgetFunc: (props) => <NavWidget {...props} />,
    },
  ],
};

export default config;
