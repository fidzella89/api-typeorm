import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "reflect-metadata";
import { AppDataSource } from "./typeorm/typeorm.config";
import userRoutes from "./routes/user.routes";
import { errorHandler } from "./_middleware/error_handler";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use(errorHandler);
// Routes
app.use("/users", userRoutes);

// Start the database and server
const PORT = process.env.PORT || 4924;

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
