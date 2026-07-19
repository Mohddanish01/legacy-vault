// import dotenv from "dotenv";
// dotenv.config();
// import app from "./src/app.js";
// import connectDB from "./src/config/database.js";
import "dotenv/config";

import app from "./src/app.js";
import connectDB from "./src/config/database.js";

console.log("RESEND:", process.env.RESEND_API_KEY);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
  }
};

startServer();