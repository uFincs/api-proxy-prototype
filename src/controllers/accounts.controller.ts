import httpStatus from "http-status";
import api from "api/";
import catchAsync from "utils/catchAsync";

const createAccount = catchAsync(async (req, res) => {
    const result = await api.service("accounts").create(req.body);
    res.status(httpStatus.CREATED).send(result);
});

const getAccounts = catchAsync(async (req, res) => {
    const accounts = await api.service("accounts").find();
    res.send(accounts);
});

const getAccount = catchAsync(async (req, res) => {
    const account = await api.service("accounts").get(req.params.id);
    res.send(account);
});

const updateAccount = catchAsync(async (req, res) => {
    const result = await api.service("accounts").update(req.params.id, req.body);
    res.send(result);
});

const deleteAccount = catchAsync(async (req, res) => {
    await api.service("accounts").remove(req.params.id);
    res.status(httpStatus.NO_CONTENT).send();
});

export default {
    createAccount,
    getAccounts,
    getAccount,
    updateAccount,
    deleteAccount
};
