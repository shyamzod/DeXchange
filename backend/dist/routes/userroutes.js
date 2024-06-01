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
const router = express_1.default.Router();
const client_1 = require("@prisma/client");
const dbclient = new client_1.PrismaClient();
function User(body) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield dbclient.$transaction((dbclient) => __awaiter(this, void 0, void 0, function* () {
                const result = yield dbclient.user.create({
                    data: {
                        UserName: body.UserName,
                        FullName: body.FullName,
                        Email: body.Email,
                        PhoneNo: body.PhoneNo,
                        Password: body.Password,
                    },
                    select: {
                        UserId: true,
                    },
                });
                const statusresult = yield dbclient.userStatus.create({
                    data: {
                        UserId: result.UserId,
                        UserName: body.UserName,
                    },
                });
                const userwalletresult = yield dbclient.userWallet.create({
                    data: {
                        UserId: result.UserId,
                        username: body.UserName,
                        BTCBalance: 0,
                        USDTBalance: 0,
                    },
                });
                return result;
            }));
            if (res != undefined && res != null) {
                return res;
            }
        }
        catch (e) {
            console.log(e);
        }
    });
}
function ChangePassword(body) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield dbclient.user.update({
                where: {
                    UserName: body.UserName,
                    Password: body.OldPassword,
                },
                data: {
                    Password: body.NewPassword,
                },
                select: {
                    UserName: true,
                },
            });
            if (result != undefined && result != null) {
                return result;
            }
        }
        catch (e) { }
    });
}
function SignInUser(body) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield dbclient.$transaction((dbclient) => __awaiter(this, void 0, void 0, function* () {
                const result = yield dbclient.user.findFirst({
                    where: {
                        UserName: body.UserName,
                        Password: body.Password,
                    },
                    select: {
                        UserId: true,
                        UserName: true,
                        Email: true,
                    },
                });
                const statusresult = yield dbclient.userStatus.update({
                    where: {
                        UserName: body.UserName,
                    },
                    data: {
                        Status: true,
                    },
                });
                return result;
            }));
            if (res != undefined && res != null) {
                return res;
            }
        }
        catch (e) { }
    });
}
function LogoutUser(UserName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield dbclient.userStatus.update({
                where: {
                    UserName,
                },
                data: {
                    Status: false,
                },
            });
            return result;
        }
        catch (e) { }
    });
}
router.post("/Signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const result = yield User(body);
    if (result != undefined && result != null) {
        res.status(200).json({ message: "User has successfully registered" });
    }
}));
router.post("/SignIn", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const result = yield SignInUser(body);
    if (result) {
        res.status(200).json({
            message: "User SignIn Successfully",
            UserName: result.UserName,
            Email: result.Email,
            LoggedIn: true,
        });
    }
    else {
        res.status(400).json({ message: "Invalid Credentials" });
    }
}));
router.post("/ChangePassword", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const result = yield ChangePassword(body);
    if (result != undefined && result != null) {
        res.status(200).json({
            message: "Password Changed Successfully",
            UserName: result.UserName,
        });
    }
    else {
        res
            .status(400)
            .json({ message: "Password not changed", UserName: body.UserName });
    }
}));
router.get("/logout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.query.username;
    if (username) {
        const result = yield LogoutUser(username);
        if (result) {
            res.status(200).json({ message: "User Logged Out Successfully!" });
        }
        else {
            res.status(400).json({ message: "User Not Logged Out" });
        }
    }
}));
exports.default = router;
