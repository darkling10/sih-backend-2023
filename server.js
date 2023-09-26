import express from "express";
import connectDB from "./config/db.js";
import { config } from "dotenv";
import { fileURLToPath } from 'url';
import path,{ dirname } from 'path';
import { UserRoute } from "./routes/UserRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

const PORT = process.env.PORT || 8080;


config({
  path: path.join(__dirname, ".env"),
});

connectDB();
app.use(express.json({ extended: false }));


app.use("/user",UserRoute)


app.get("/", (req, res) => {
  console.log("Home dir");
  res.send("<h1>Hiiiii</h1>");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
