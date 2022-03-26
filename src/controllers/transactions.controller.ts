import httpStatus from "http-status";
import api from "api/";
import catchAsync from "utils/catchAsync";

const createTransaction = catchAsync(async (req, res) => {
    const result = await api.service("transactions").create(req.body);
    res.status(httpStatus.CREATED).send(result);
});

const createTransactions = catchAsync(async (req, res) => {
    const result = await api.service("transactions").create(req.body);
    res.status(httpStatus.CREATED).send(result);
});

const getTransactions = catchAsync(async (req, res) => {
    const accounts = await api.service("accounts").find();

    const transactions = accounts.reduce((acc, accountData) => {
        for (const transaction of accountData.transactions) {
            acc[transaction.id] = transaction;
        }

        return acc;
    }, {});

    res.send(Object.values(transactions));
});

const getTransaction = catchAsync(async (req, res) => {
    const transaction = await api.service("transactions").get(req.params.id);
    res.send(transaction);
});

const updateTransaction = catchAsync(async (req, res) => {
    const result = await api.service("transactions").update(req.params.id, req.body);
    res.send(result);
});

const deleteTransaction = catchAsync(async (req, res) => {
    await api.service("transactions").remove(req.params.id);
    res.status(httpStatus.NO_CONTENT).send();
});

export default {
    createTransaction,
    createTransactions,
    getTransactions,
    getTransaction,
    updateTransaction,
    deleteTransaction
};
