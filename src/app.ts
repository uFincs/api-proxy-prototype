import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import httpStatus from "http-status";
import xss from "xss-clean";

import {errorLogger, successLogger} from "config/requestLogger";
import apiKeyAuth from "middlewares/apiKeyAuth";
import {errorConverter, errorHandler} from "middlewares/error";
import refreshBackendAuth from "middlewares/refreshBackendAuth";
import routes from "routes/v1";
import ApiError from "utils/ApiError";

const app = express();

// Setup request loggers.
app.use(errorLogger);
app.use(successLogger);

// Setup security.
app.use(helmet());

// Parse json request body.
app.use(express.json());

// Parse urlencoded request bodies.
app.use(express.urlencoded({extended: true}));

// Sanitize request data.
app.use(xss());

// Setup compression.
app.use(compression());

// Setup CORS.
app.use(cors());

// @ts-ignore
app.options("*", cors());

// API key authentication.
app.use(apiKeyAuth());

// Backend authentication.
app.use(refreshBackendAuth());

// v1 API routes.
app.use("/v1", routes);

// Send back a 404 error for any unknown API requests.
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// Convert error to ApiError, if needed.
app.use(errorConverter);

// Handle errors.
app.use(errorHandler);

export default app;
