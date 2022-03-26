import dotenv from "dotenv";
dotenv.config();

export const BACKEND_URL = "http://localhost:5000";

export default {
    apiKey: process.env.API_KEY || "",
    env: process.env.NODE_ENV || "development",
    port: process.env.PORT || 5001,
    email: process.env.UFINCS_EMAIL || "",
    password: process.env.UFINCS_PASSWORD || ""
};
