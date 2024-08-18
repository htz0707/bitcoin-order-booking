import { useEffect, useState } from "react";
import axios from "axios";
import OrderBookTable from "./OrderBookTable";

const OrderBook = () => {
  const [bids, setBids] = useState([]);
  const [asks, setAsks] = useState([]);
  const [spread, setSpread] = useState(0);

  useEffect(() => {
    const calculateSpread = (bids, asks) => {
      if (bids.length > 0 && asks.length > 0) {
        return parseFloat(asks[0][0]) - parseFloat(bids[0][0]);
      }
      return 0;
    };

    const fetchInitialOrderBook = async () => {
      const response = await axios.get(
        "https://api.binance.com/api/v3/depth?symbol=BTCUSDT&limit=1000"
      );
      const bidsData = response.data.bids.slice(0, 15); // Display only top 15
      const asksData = response.data.asks.slice(0, 15); // Display only top 15
      setBids(bidsData);
      setAsks(asksData);
      setSpread(calculateSpread(bidsData, asksData));
    };

    const ws = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@depth");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // Parse and filter out bids with a quantity of 0
      const bidsData = data.b
        .map(([price, quantity]) => [parseFloat(price), parseFloat(quantity)])
        .filter(([price, quantity]) => quantity > 0) // Remove bids with zero quantity
        .sort((a, b) => b[0] - a[0]) // Sort by price in descending order
        .slice(0, 15); // Display only top 15

      // Parse and filter out asks with a quantity of 0
      const asksData = data.a
        .map(([price, quantity]) => [parseFloat(price), parseFloat(quantity)])
        .filter(([price, quantity]) => quantity > 0) // Remove asks with zero quantity
        .sort((a, b) => a[0] - b[0]) // Sort by price in ascending order
        .slice(0, 15); // Display only top 15

      setBids(bidsData);
      setAsks(asksData);
      setSpread(calculateSpread(bidsData, asksData));
    };

    fetchInitialOrderBook();

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="flex flex-col items-center p-4 sm:p-6 bg-white">
      <div className="w-full max-w-7xl">
        <div className="flex flex-col md:flex-row justify-center md:space-x-6 space-y-6 md:space-y-0">
          <div className="w-full md:w-1/2">
            <h3 className="text-center text-xl font-bold text-gray-700 mb-2">
              Buy Order - bid prices
            </h3>
            <div className="min-h-[37.5rem] overflow-x-auto">
              <OrderBookTable type="bid" orders={bids} />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <h3 className="text-center text-xl font-bold text-gray-700 mb-2">
              Sell Order - ask prices
            </h3>
            <div className="min-h-[37.5rem] overflow-x-auto">
              <OrderBookTable type="ask" orders={asks} />
            </div>
          </div>
        </div>
        <div className="text-center mt-4 text-lg text-gray-700">
          <p>Spread: ${spread}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderBook;
