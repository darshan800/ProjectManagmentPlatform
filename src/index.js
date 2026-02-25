import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./db/index.js";

dotenv.config();

const port = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(port, () =>
      console.log(`Server is listening at port: http://localhost:${port}`),
    );
  })
  .catch((err) => {
    console.err("Mongod connection error", err);
    process.exit(1);
  });
