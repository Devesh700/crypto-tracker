import mongoose from "mongoose";

const HistoricalCryptoSchema = new mongoose.Schema({
  id: String,
  symbol: String,
  name: String,
  current_price: Number,
  market_cap: Number,
  price_change_percentage_24h: Number,
  image: String,
  snapshotTime: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model("HistoricalCrypto", HistoricalCryptoSchema);
