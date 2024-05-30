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
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
const PORT = 3000;
const dbclient = new client_1.PrismaClient();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
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
                });
                const statusresult = yield dbclient.userStatus.create({
                    data: {
                        UserName: body.UserName,
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
                        Id: true,
                        UserName: true,
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
app.post("/Signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const result = yield User(body);
    if (result != undefined && result != null) {
        res.status(200).json({ message: "User has successfully registered" });
    }
}));
app.post("/SignIn", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const result = yield SignInUser(body);
    if (result) {
        res
            .status(200)
            .json({
            message: "User SignIn Successfully",
            UserName: result.UserName,
            LoggedIn: true,
        });
    }
    else {
        res.status(400).json({ message: "Invalid Credentials" });
    }
}));
app.post("/ChangePassword", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
app.get("/logout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.query.username;
    if (username) {
        const result = yield LogoutUser(username);
        if (result) {
            res.status(200).json({ message: "User Logged Out Successfully!" });
        }
    }
}));
app.listen(PORT, () => {
    console.log("App is listening at port " + PORT);
});
