import  { useEffect, useState } from "react";
import { getCryptoHistory } from "../services/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function CryptoChart({ id }: { id: string }) {
  const [history, setHistory] = useState([]);


//     useEffect(() => {
//     getCryptoHistory(id).then((res: any) => {
//       const formatted = res.data
//         .map((item: any) => ({
//           price: `₹${item.current_price}`,
//           time: new Date(item.snapshotTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//         }))
//         .reverse();
//       setHistory(formatted);
//     });
//   }, [id]);


  useEffect(() => {
    getCryptoHistory(id).then((res: any) => {
      const formatted = res.data
        .map((item: any) => ({
          price: item.current_price,
          time: new Date(item.snapshotTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }))
        .reverse();
      setHistory(formatted);
    });
  }, [id]);

  return (
    <div className="w-full bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Price trend (Last 24h)
      </h2>

      {history.length === 0 ? (
        <p className="text-gray-500 text-sm">Loading chart...</p>
      ) : (
        <div className="w-full h-72">
          <ResponsiveContainer>
            <LineChart data={history} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.7} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0.1} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="time"
                tick={{ fontSize: 12, fill: "#6b7280" }}
                interval="preserveStartEnd"
              />
              <YAxis
                dataKey="price"
                domain={['dataMin - 5', 'dataMax + 5']}
                tickFormatter={(val) => `₹${val.toFixed(0)}`}
                tick={{ fontSize: 12, fill: "#6b7280" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "none",
                  borderRadius: "6px",
                  color: "#fff",
                }}
                formatter={(val: number) => [`₹${val.toLocaleString()}`, "Price"]}
                labelStyle={{ color: "#cbd5e1", fontSize: "0.75rem" }}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="url(#colorPrice)"
                strokeWidth={3}
                dot={false}
                animationDuration={500}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
