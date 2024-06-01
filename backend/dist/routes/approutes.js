"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
const dbclient = new client_1.PrismaClient();
function InsertNewUser(userdata) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (userdata != undefined || userdata != null) {
                const result = yield dbclient.userBankBalance.create({
                    data: {
                        Branch: userdata.Branch,
                        username: userdata.username,
                        BankBalance: userdata.BankBalance,
                    },
                });
                return result.Id;
            }
        }
        catch (_a) { }
    });
}
function UpdateBankBalane(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const existingBalance = yield dbclient.userBankBalance.findFirst({
                where: { username: user.username },
                select: {
                    BankBalance: true,
                },
            });
            const newBalance = (existingBalance === null || existingBalance === void 0 ? void 0 : existingBalance.BankBalance) === undefined ||
                (existingBalance === null || existingBalance === void 0 ? void 0 : existingBalance.BankBalance) == null
                ? user.moneytoadd
                : existingBalance.BankBalance + user.moneytoadd;
            const result = yield dbclient.userBankBalance.update({
                where: {
                    username: user.username,
                },
                data: { BankBalance: newBalance },
                select: {
                    BankBalance: true,
                },
            });
            return result;
        }
        catch (_a) { }
    });
}
function GetUserBalance(username) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield dbclient.userBankBalance.findFirst({
                where: {
                    username,
                },
                select: {
                    BankBalance: true,
                },
            });
            return result === null || result === void 0 ? void 0 : result.BankBalance;
        }
        catch (_a) { }
    });
}
function GetWalletBalance(username) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield dbclient.userWallet.findFirst({
                where: {
                    username,
                },
                select: {
                    USDTBalance: true,
                    BTCBalance: true,
                },
            });
            return result;
        }
        catch (_a) { }
    });
}
// async function CreateWallet(username: string) {
//   try {
//     const result = await dbclient.userWallet.create({
//       data: { username: username, BTCBalance: 0, USDTBalance: 0.0 },
//     });
//   } catch {}
// }
function BuyAsset(datatoupdate) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const existingvalues = yield dbclient.userWallet.findFirst({
                where: {
                    username: datatoupdate.username,
                },
                select: {
                    BTCBalance: true,
                    USDTBalance: true,
                },
            });
            const result = yield dbclient.userWallet.update({
                where: {
                    username: datatoupdate.username,
                },
                data: {
                    BTCBalance: (existingvalues === null || existingvalues === void 0 ? void 0 : existingvalues.BTCBalance) === undefined
                        ? datatoupdate.BTC
                        : (existingvalues === null || existingvalues === void 0 ? void 0 : existingvalues.BTCBalance) + datatoupdate.BTC,
                    USDTBalance: (existingvalues === null || existingvalues === void 0 ? void 0 : existingvalues.USDTBalance) === undefined
                        ? existingvalues === null || existingvalues === void 0 ? void 0 : existingvalues.USDTBalance
                        : existingvalues.USDTBalance - datatoupdate.BTC * 100,
                },
            });
            return result;
        }
        catch (_a) { }
    });
}
function SellAsset(datatoupdate) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const existingvalues = yield dbclient.userWallet.findFirst({
                where: {
                    username: datatoupdate.username,
                },
                select: {
                    BTCBalance: true,
                    USDTBalance: true,
                },
            });
            const result = yield dbclient.userWallet.update({
                where: {
                    username: datatoupdate.username,
                },
                data: {
                    BTCBalance: (existingvalues === null || existingvalues === void 0 ? void 0 : existingvalues.BTCBalance) === undefined
                        ? existingvalues === null || existingvalues === void 0 ? void 0 : existingvalues.BTCBalance
                        : (existingvalues === null || existingvalues === void 0 ? void 0 : existingvalues.BTCBalance) - datatoupdate.BTC,
                    USDTBalance: (existingvalues === null || existingvalues === void 0 ? void 0 : existingvalues.USDTBalance) === undefined
                        ? existingvalues === null || existingvalues === void 0 ? void 0 : existingvalues.USDTBalance
                        : (existingvalues === null || existingvalues === void 0 ? void 0 : existingvalues.USDTBalance) + datatoupdate.BTC * 100,
                },
            });
            return result;
        }
        catch (_a) { }
    });
}
function AddMoneyToWallet(userdata) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const existingBalance = yield dbclient.userBankBalance.findFirst({
                where: {
                    username: userdata.username,
                },
                select: {
                    BankBalance: true,
                },
            });
            if ((existingBalance === null || existingBalance === void 0 ? void 0 : existingBalance.BankBalance) != undefined &&
                (existingBalance === null || existingBalance === void 0 ? void 0 : existingBalance.BankBalance) >= userdata.moneytoadd) {
                const existingwalletbalance = yield dbclient.userWallet.findFirst({
                    where: {
                        username: userdata.username,
                    },
                    select: {
                        USDTBalance: true,
                    },
                });
                const walletupdate = yield dbclient.userWallet.update({
                    where: {
                        username: userdata.username,
                    },
                    data: {
                        USDTBalance: (existingwalletbalance === null || existingwalletbalance === void 0 ? void 0 : existingwalletbalance.USDTBalance) === undefined
                            ? userdata.moneytoadd
                            : existingwalletbalance.USDTBalance + userdata.moneytoadd,
                    },
                });
                const bankbalanceupdate = yield dbclient.userBankBalance.update({
                    where: {
                        username: userdata.username,
                    },
                    data: {
                        BankBalance: existingBalance.BankBalance - userdata.moneytoadd,
                    },
                });
                return walletupdate;
            }
            else {
                return false;
            }
        }
        catch (_a) { }
    });
}
function Withdrawmoneyfromwallet(userdata) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const existingvalues = yield dbclient.userWallet.findFirst({
                where: {
                    username: userdata.username,
                },
                select: {
                    USDTBalance: true,
                },
            });
            const existinguserbankbalance = yield dbclient.userBankBalance.findFirst({
                where: {
                    username: userdata.username,
                },
                select: {
                    BankBalance: true,
                },
            });
            if ((existingvalues === null || existingvalues === void 0 ? void 0 : existingvalues.USDTBalance) != undefined &&
                (existinguserbankbalance === null || existinguserbankbalance === void 0 ? void 0 : existinguserbankbalance.BankBalance) != undefined &&
                existingvalues.USDTBalance >= userdata.moneytoadd) {
                const walletresult = yield dbclient.userWallet.update({
                    where: {
                        username: userdata.username,
                    },
                    data: {
                        USDTBalance: existingvalues.USDTBalance - userdata.moneytoadd,
                    },
                });
                const bankbalanceresult = yield dbclient.userBankBalance.update({
                    where: {
                        username: userdata.username,
                    },
                    data: {
                        BankBalance: existinguserbankbalance.BankBalance + userdata.moneytoadd,
                    },
                });
                return walletresult;
            }
        }
        catch (_a) { }
    });
}
router.post("/AddMoneyToBank", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const result = yield UpdateBankBalane(body);
    if (result) {
        res.status(200).json({
            message: "Money added to Bank Account",
            BankBalance: result.BankBalance,
        });
    }
    else {
        res.status(411).json({ message: "Adding Money Failed to Bank Account" });
    }
}));
router.post("/AddMoneyToWallet", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const result = yield AddMoneyToWallet(body);
    if (result) {
        res.status(200).json({
            message: "Added Money to Wallet from BankAccount",
            WalletUSDT: result.USDTBalance,
        });
    }
    else {
        res.status(200).json({ message: "Insufficient Balance" });
    }
}));
router.post("/Withdrawmoneyfromwallet", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const result = yield Withdrawmoneyfromwallet(body);
    if (result) {
        res.status(200).json({
            message: "Money withdrawn from balance",
            walletbalance: result.USDTBalance,
        });
    }
}));
router.post("/CreateBankAccount", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    yield InsertNewUser(body);
    // await CreateWallet(body.username);
    res.status(200).json({ message: "New User Created" });
}));
router.get("/getUserBalance", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.query.username;
    const result = yield GetUserBalance(username);
    res
        .status(200)
        .json({ message: "User Balance Fetched", BankBalance: result });
}));
router.get("/getwalletbalance", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.query.username;
    const result = yield GetWalletBalance(username);
    res.status(200).json({
        message: "User Wallet Usdt Fetched",
        WalletUsdt: result === null || result === void 0 ? void 0 : result.USDTBalance,
        walletBTC: result === null || result === void 0 ? void 0 : result.BTCBalance,
    });
}));
router.post("/BuyAsset", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const result = yield BuyAsset(body);
    res.status(200).send({
        message: "Assets Updated in db",
        BTC: result === null || result === void 0 ? void 0 : result.BTCBalance,
        USDT: result === null || result === void 0 ? void 0 : result.USDTBalance,
    });
}));
router.post("/SellAsset", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const result = yield SellAsset(body);
    res.status(200).send({
        message: "Assets Sold are updated in db",
        BTC: result === null || result === void 0 ? void 0 : result.BTCBalance,
        USDT: result === null || result === void 0 ? void 0 : result.USDTBalance,
    });
}));
exports.default = router;
