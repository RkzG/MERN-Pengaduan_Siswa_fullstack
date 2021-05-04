import path from "path";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import siswaRouter from "./routes/siswaRouter.js";
import pengaduanRouter from "./routes/pengaduanRouter.js";
import petugasRouter from "./routes/petugasRouter.js";
import tanggapanRouter from "./routes/tanggapanRouter.js";
import uploadRouter from "./routes/uploadRouter.js";

dotenv.config();
connectDB();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use("/api/siswa", siswaRouter);
app.use("/api/pengaduan", pengaduanRouter);
app.use("/api/petugas", petugasRouter);
app.use("/api/tanggapan", tanggapanRouter);
app.use("/api/upload", uploadRouter);

app.get("/", (req, res) => {
  res.send("Api Is Running");
});

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
