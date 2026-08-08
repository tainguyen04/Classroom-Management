import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { initializeFirebase } from "./config/firebase.js";
import userRoutes from "./modules/user/user.route.js";
import authRoutes from "./modules/auth/auth.route.js";
import lessonRoutes from "./modules/lesson/lesson.route.js";

const app = express();

const db = initializeFirebase(
  JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY),
);

app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/lesson", lessonRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
