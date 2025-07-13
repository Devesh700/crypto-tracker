import express from "express";
import { getCurrentCryptos, getHistoricalCrypto } from "../controllers/crypto.controller.js";

const router = express.Router();

router.get("/", getCurrentCryptos);
router.get("/:id/history", getHistoricalCrypto);

export default router;
