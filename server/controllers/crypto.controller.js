import CurrentCrypto from "../models/current-crypto.js";
import HistoricalCrypto from "../models/historical-crypto.js";

export const getCurrentCryptos = async (req, res) => {
  const data = await CurrentCrypto.find();
  res.json(data);
};

export const getHistoricalCrypto = async (req, res) => {
  const { id } = req.params;
  const history = await HistoricalCrypto.find({ id }).sort({ snapshotTime: -1 }).limit(144);
  res.json(history);
};
