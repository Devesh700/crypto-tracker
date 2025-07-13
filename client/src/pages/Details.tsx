import React from "react";
import { useParams } from "react-router-dom";
import CryptoChart from "../components/CryptoChart";

export default function Details() {
  const { id } = useParams();
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Price Trend - {id}</h1>
      <CryptoChart id={id!} />
    </div>
  );
}
