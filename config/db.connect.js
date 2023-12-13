import mongoose from "mongoose";
import {config} from "dotenv";

config()

const {DB_USER, DB_PASS, DB_HOST, DB_NAME} = process.env;
const dbConnectionString = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

export const connectToDB = () => {
    mongoose
        .connect(dbConnectionString)
        .then(() => console.log("Connection to mongoDB successful! Database connected! 😍"))
        .catch(() => console.log("Connection to mongoDB failed! Database is not connected! ☹️"))
}