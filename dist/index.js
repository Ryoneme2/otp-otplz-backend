"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORTEXPRESS || 8080;
if (typeof process.env.PORTEXPRESS == "undefined") {
    console.log("PORTEXPRESS is not defined but set default is 8008");
}
// express config
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
if (process.env.NODE_ENV === "production") {
    app.use(express_1.default.static(__dirname + "/public/production"));
}
if (process.env.NODE_ENV === "development") {
    app.use(express_1.default.static(__dirname + '/public/development'));
}
app.get("/", (req, res) => {
    console.log("Hello World22");
    res.send("Hello World5!");
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map