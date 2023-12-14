import express, {json} from "express";
import {config} from "dotenv"
import {connectToDB} from "./config/db.connect.js";
import {userRoutes} from "./routes/users.routes.js";
import cors from "cors"
import cookieParser from "cookie-parser"

config();

const app = express();

app.use(json())
app.use(cors())
app.use(cookieParser())

connectToDB();

app.use("/user", userRoutes)

app.use((err, req, res, next) => {
    res.status(err.code || 500).json({
        answer: {
            code: err.code || 500,
            data: err.message || "Server Error"
        }
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on Port ${process.env.PORT}`)
})