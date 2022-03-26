import feathers from "@feathersjs/client";
import {BACKEND_URL} from "config/config";
import auth from "./auth";
import billing from "./billing";
import bindServices from "./bindServices";

// @ts-ignore
const api = feathers();
const rest = feathers.rest(BACKEND_URL).fetch(fetch);

api.configure(rest);
api.configure(auth(BACKEND_URL));

bindServices(api);

// Setup custom services.
api.configure(billing);

export default api;
