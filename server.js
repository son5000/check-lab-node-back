import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./db/index.js";
import userRouter from "./src/routes/user.js";
import projectRouter from "./src/routes/project.js";
import { logger } from "./src/middlewares/logger.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// 미들웨어
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(logger);

// DB 연결 테스트용 API
app.get("/api/test-db", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT NOW() AS now");
    res.json({ success: true, now: rows[0].now });
  } catch (error) {
    console.error("DB 연결 오류:", error);
    res.status(500).json({ success: false, error: "DB 연결 실패" });
  }
});

app.use("/api/user", userRouter);
app.use("/api/project", projectRouter);

app.listen(PORT, () => {
  console.log(`✅ API 서버 실행 중: http://localhost:${PORT}`);
});
