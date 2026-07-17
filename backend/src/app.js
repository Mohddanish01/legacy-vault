import express from "express";
import authRoutes from "./routes/auth.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";
import profileRoutes from "./routes/profile.routes.js";
import nomineeRoutes from "./routes/nominee.routes.js";
const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/nominees", nomineeRoutes);
app.use(errorHandler);

export default app;