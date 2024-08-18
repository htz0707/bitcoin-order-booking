import OrderBook from '../components/OrderBook';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-center text-3xl font-bold py-6 text-gray-800">Bitcoin Order Book (BTC/USDT)</h1>
      <OrderBook />
    </div>
  );
};

export default Home;
