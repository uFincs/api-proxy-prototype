import api from "api/";

const refreshBackendAuth = () => async (req, res, next) => {
    if (!api.isAuthenticated()) {
        await api.reAuthenticate();
    }

    next();
};

export default refreshBackendAuth;
