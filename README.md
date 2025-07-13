# crypto-tracker

A full-stack MERN application that displays live cryptocurrency data using the CoinGecko API. The app fetches, stores, and displays the top 10 cryptocurrencies and includes hourly background sync with historical tracking.

# Live Demo
Frontend: https://crypto-trader-ddev.netlify.app/

Backend: https://crypto-trader-ddev.netlify.app/api


# TECH-STACK

--> Frontend (Vite + React + TypeScript)
Vite

React Router

Tailwind CSS

Axios

Recharts

--> Backend (Node.js + Express)
Express.js

MongoDB + Mongoose

Axios

Node-Cron

Dotenv

# Features
View top 10 cryptocurrencies (price, market cap, % change)

Search and filter by name/symbol

Toggle to show only top gainers

Auto-refresh and manual refresh options

Responsive, modern dashboard UI

View historical price trends (hourly data)

Cron job sync every 10 Minutes using node-cron


# SETUP INSUTRUCTION

git clone git@github.com:Devesh700/crypto-tracker.git
cd crypto-tracker

--> Backend Setup
cd server
npm install

Create a .env file 

MONGO_URI=your_mongodb_connection_string
COINGECKO_API=https://api.coingecko.com/api/v3/coins/markets

--start the backend 
    npm run start OR node index.js

--> Frontend Setup 

cd ../client
npm install

create a .env file
VITE_BACKEND_URL=http://localhost:5000/api

--start the frontend
npm run dev


# How the Cron Job Works
Located in: server/services/crypto.service.js

A node-cron job is scheduled using:

cron.schedule("*/10 * * * *", fetchAndStoreData);
Every 10 Minutes, it:

Fetches the top 10 coins from CoinGecko

Replaces current data in CurrentCrypto

Adds a timestamped entry to HistoricalCrypto


# Deployment
Frontend: Deployed on Netlify

Backend: Deployed on Render

MongoDB is hosted using MongoDB Atlas

Built with 💻 by Devesh Mishra