import mongoose from "mongoose";

const CurrentCryptoSchema = new mongoose.Schema({
  id: String,
  symbol: String,
  name: String,
  current_price: Number,
  market_cap: Number,
  price_change_percentage_24h: Number,
  image: String,
  last_updated: Date,
}, { timestamps: true });

export default mongoose.model("CurrentCrypto", CurrentCryptoSchema);
