import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { userRoute } from "./routes/userRoute.js";
import { residencyRoute } from "./routes/residencyRoute.js";

import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

//initialize of app
const app = express();
const port = process.env.PORT || 5000;

/**
 * swagger Start
 */

const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Real State or Hotel Booking Express API with Swagger Documentation",
            version: "0.1.0",
            description: "This is real state or hotel booking service website ",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "Shaheb Ali",
                url: "https://www.linkedin.com/in/md-shaheb-ali-wwwdon/",
                email: "wwwdonus@email.com",
            },
        },
        servers: [
            {
                url: `http://localhost:${port}`,
            },
        ],
    },
    apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, {
        explorer: true,
        customCssUrl:
            "https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-newspaper.css",
    })
);

app.get("/", (req, res) => {
    res.send(
        `<h3>Hello Friends Click here to see the <a href="/api-docs">API Documentation</a></h3>`
    );
});

/**
 * swagger End
 */

dotenv.config();

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
