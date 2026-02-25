import express from "express";
import cors from "cors";

const app = express();

// basic middleware configuration
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: "true", limit: "16kb" }));
app.use(express.static("public"));

// cors configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// import the routes : this things are done after cors and middleware configuration
//since the export type is default from heathche.router.js file, so we can name anything while importing
import healthcheckRouter from "./routes/healthcheck.routes.js";
app.use("/api/v1/healthcheck", healthcheckRouter);

app.get("/", (req, res) => {
  res.send("welcome to basecampy!!");
});

export default app;
