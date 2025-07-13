import  { useEffect, useState } from "react";
import { getCryptos } from "../services/api";
import { useNavigate } from "react-router-dom";
import { SmartImagePlaceholder, SmartTextPlaceholder } from 'smart-placeholder';
import 'smart-placeholder/dist/smart-placeholder.css';

export default function CryptoDashboard() {
  const [cryptos, setCryptos] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [showGainers, setShowGainers] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const res: any = await getCryptos();
      setCryptos(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error("Failed to fetch crypto data", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let data = [...cryptos];

    if (search.trim()) {
      data = data.filter((item: any) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.symbol.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (showGainers) {
      data = data.filter((item: any) => item.price_change_percentage_24h > 0);
    }

    setFiltered(data);
  }, [search, showGainers, cryptos]);

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        {loading ? 
        <SmartTextPlaceholder lines={2} style={{ width: '200px', height: '24px' }} /> :
        <h1 className="text-3xl font-semibold">Top 10 Cryptocurrencies</h1>}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search crypto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 border rounded-lg text-sm shadow-sm w-full sm:w-56"
          />
          <button
            onClick={fetchData}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
          <button
            onClick={() => setShowGainers(!showGainers)}
            className={`px-4 py-2 text-sm rounded-lg border ${showGainers
                ? "bg-green-100 text-green-700 border-green-300"
                : "bg-gray-100 text-gray-700 border-gray-300"
              } hover:shadow`}
          >
            {showGainers ? "Showing Gainers" : "Show Top Gainers"}
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        loading ?
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(() =>

              <div><SmartImagePlaceholder style={{ height: '100px' }} /></div>
            )}</div> : <p className="text-gray-500 text-sm">No cryptocurrences found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((crypto: any) => (
            <div
              key={crypto.id}
              onClick={() => navigate(`/details/${crypto.id}`)}
              className="cursor-pointer p-4 rounded-2xl border shadow-sm hover:shadow-md hover:border-gray-300 transition duration-200 bg-white dark:bg-gray-900 dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={crypto.image} alt={crypto.name} className="w-8 h-8" />
                  <div>
                    <h2 className="text-lg font-medium">{crypto.name}</h2>
                    <p className="text-sm text-gray-500 uppercase">{crypto.symbol}</p>
                  </div>
                </div>
                <div
                  className={`text-sm font-medium ${crypto.price_change_percentage_24h >= 0
                      ? "text-green-500"
                      : "text-red-500"
                    }`}
                >
                  {crypto.price_change_percentage_24h.toFixed(2)}%
                </div>
              </div>

              <div className="mt-4 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <div>
                  <span className="text-gray-500">Price:</span>{" "}
                  <span className="font-medium">
                    &#8377;{crypto.current_price.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Market Cap:</span>{" "}
                  <span className="font-medium">
                    &#8377;{crypto.market_cap.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
