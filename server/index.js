import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { userRoute } from "./routes/userRoute.js";
import { residencyRoute } from "./routes/residencyRoute.js";

dotenv.config();

//initialize of app
const app = express();
const port = process.env.PORT || 5000;

//setting of middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//Listen the server on port 
app.listen(port, () => {
    console.log(`Server is running on PORT ${port}`);
});

//setting api endpoint middleware
app.use("/api/user", userRoute);
app.use("/api/residency", residencyRoute);
