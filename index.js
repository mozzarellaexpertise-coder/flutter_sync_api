import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import inventoryRoutes from "./routes/inventoryRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/items", inventoryRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));