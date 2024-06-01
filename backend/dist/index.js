"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userroutes_1 = __importDefault(require("./routes/userroutes"));
const approutes_1 = __importDefault(require("./routes/approutes"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/user", userroutes_1.default);
app.use("/dexchange", approutes_1.default);
app.listen(PORT, () => {
    console.log("App is listening at port " + PORT);
});
