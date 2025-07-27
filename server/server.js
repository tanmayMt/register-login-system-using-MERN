import connectDB from './config/db.js';
import userRoutes from "./routes/userRoutes.js";

import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';

// express application
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// MongoDB connection
connectDB();

// Routes
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`✅Server is running at http://localhost:${PORT}`);
});