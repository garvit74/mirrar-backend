import express from "express";
import connectDB from "./config/database.js";
import dotenv from "dotenv";
import cors from "cors";

import productRoutes from './routes/productRoutes.js';

dotenv.config();
connectDB();
const app = express();
app.use(express.json()); // to accept JSON data
app.use(cors());

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("API Running!");
});

app.use('/api', productRoutes);

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}...`);
});

export default app;
