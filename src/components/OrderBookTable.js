const OrderBookTable = ({ type, orders }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  return (
    <table className="w-full text-left border-collapse border border-gray-300">
      <thead>
        <tr>
          <th className="p-2 border-b-2 border-gray-200 text-gray-600">
            Side
          </th>
          <th className="p-2 border-b-2 border-gray-200 text-gray-600">
            Price (USDT)
          </th>
          <th className="p-2 border-b-2 border-gray-200 text-gray-600">
            Amount (BTC)
          </th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order, index) => (
          <tr
            key={index}
            className={`text-gray-700 ${
              index % 2 === 0 ? "bg-gray-100" : "bg-white"
            }`}
          >
            <td
              className={`p-2 border-b border-gray-200 font-bold ${
                type === "bid" ? "text-green-600" : "text-red-600"
              }`}
            >
              {type === "bid" ? `Buy ${index + 1}` : `Sell ${index + 1}`}
            </td>
            <td className="p-2 border-b border-gray-200">
              {formatPrice(parseFloat(order[0]).toFixed(2))}
            </td>
            <td className="p-2 border-b border-gray-200">
              {parseFloat(order[1]).toFixed(5)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderBookTable;
