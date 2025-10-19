require("dotenv").config();
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const DB_URL = process.env.ATLASDB_URL;

async function main() {
  await mongoose.connect(DB_URL || MONGO_URL);
  console.log("✅ Connected to database");
}

main().catch((err) => console.log(err));

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "65fdb2e76e86a1e7a36a091c",
  }));
  await Listing.insertMany(initData.data);
  console.log("🌱 Data was initialized");
};

initDB();
