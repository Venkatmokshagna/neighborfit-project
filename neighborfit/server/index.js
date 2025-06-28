import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import neighborhoodRoutes from './routes/neighborhoods.js';

dotenv.config();

const app = express(); // ✅ Initialize app before using it

app.use(cors());
app.use(express.json());

// ✅ Use routes *after* creating the app
app.use('/api/neighborhoods', neighborhoodRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(5000, () => console.log("🚀 Server running at http://localhost:5000"));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
