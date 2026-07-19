import express from "express";
import authRoutes from "./routes/auth.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";
import profileRoutes from "./routes/profile.routes.js";
import nomineeRoutes from "./routes/nominee.routes.js";
import willRoutes from "./routes/will.routes.js";
import vaultRoutes from "./routes/vault.routes.js";

const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/nominees", nomineeRoutes);
app.use("/api/v1/wills", willRoutes);
app.use("/api/v1/vaults", vaultRoutes);
app.use(errorHandler);

export default app;