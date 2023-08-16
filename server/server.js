import express from "express";
import cors from "cors";
import morgan from "morgan";
import connect from "./database/connection.js";
import dotenv from "dotenv";
import authRoute from "./routes/Auth.routes.js";
import userRoute from "./routes/User.routes.js";

const app = express();

/** Middlewares */
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-by");
dotenv.config();

const port = "8080";

/**HTTP get request */
app.get("/", (req, res) => {
  res.status(200).json({ message: "App is running" });
});

/** api routes */
app.use("/api", authRoute);
app.use("/api", userRoute);

connect()
  .then(() => {
    try {
      /** Start server */
      app.listen(port, () => {
        console.log(`Server connected to http://localhost:${port}`);
      });
    } catch (error) {
      console.log(error);
    }
  })
  .catch((error) => console.log(error));
