import "./App.css";
import "react-chatbot-kit/build/main.css";
import LsegChatBot from "./components/LsegChatBot.js";
import { useState, useEffect } from "react";

function App() {
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStockData = async () => {
      try {
        await import("./stockdata.json");
      } catch (err) {
        console.error("Error loading stock data:", err);
        setError("Failed to load stock data.");
      }
    };

    loadStockData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="App">
      <LsegChatBot />
    </div>
  );
}

export default App;
