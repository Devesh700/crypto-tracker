import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cron from "node-cron";
import cryptoRoutes from "./routes/crypto.route.js";
import { fetchAndStoreData } from "./services/crypto.service.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/cryptos", cryptoRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));
 
cron.schedule("*/10 * * * *", fetchAndStoreData);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
