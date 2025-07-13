import axios from "axios";
import dotenv from "dotenv";
import CurrentCrypto from "../models/current-crypto.js";
import HistoricalCrypto from "../models/historical-crypto.js";

dotenv.config();

export const fetchAndStoreData = async () => {
  try {
    console.log("Fetching crypto data...");
    const { data } = await axios.get(process.env.COINGECKO_API, {
      params: {
        vs_currency: "inr",
        order: "market_cap_desc",
        per_page: 10,
        page: 1,
        sparkline: false,
      },
    });

    console .log("Fetched crypto data:", data);

    await CurrentCrypto.deleteMany({});
    await CurrentCrypto.insertMany(data);

    const historicalData = data.map(item => ({
      ...item,
      snapshotTime: new Date(),
    }));

    await HistoricalCrypto.insertMany(historicalData);

    console.log("Saved crypto data.");
  } catch (error) {
    console.error("Fetch error:", error.message);
  }
};
