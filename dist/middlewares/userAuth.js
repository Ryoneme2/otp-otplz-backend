"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const auth = (req, res, next) => {
    try {
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }
        console.log('auth middleware request');
        const token = req.header("Authorization");
        if (!token)
            return res.status(403).send({
                isLogin: false,
                errMsg: 'Access denied.'
            });
        console.log(process.env.JWT_SECRET);
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        console.log({ decoded });
        // collect user info
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(400).send("Invalid token");
    }
};
exports.auth = auth;
//# sourceMappingURL=userAuth.js.map