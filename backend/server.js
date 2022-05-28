import app from "./app.js";
import dotenv from "dotenv";
import connectDatabase from "./config/database.js";

// config
dotenv.config({ path: "backend/config/config.env" });

//catch Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to unhandled promise rejection.");
  process.exit(1);
});

// connect database
connectDatabase();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on PORT= ${PORT}`);
});

//catch Unhandled Promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to unhandled promise rejection.");

  server.close(() => {
    process.exit(1);
  });
});
