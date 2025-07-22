import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import eventRoutes from "./routes/event.routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS: Secure for Vercel
app.use(cors({
  origin: "https://your-frontend.vercel.app", // Replace with actual Vercel domain
  credentials: true,
}));

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅✅✅MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes with /api prefix
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);

app.get("/", (req, res) => {
  res.send("Kreapt API Running");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀🚀Server running on port ${PORT}`);
});
