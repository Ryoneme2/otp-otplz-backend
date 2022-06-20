"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.getList = exports.getOne = exports.addUser = void 0;
const addUser_1 = require("../services/userService/addUser");
const getUser_1 = require("../services/userService/getUser");
const httpStatus_1 = require("../configs/httpStatus");
const endePassword_1 = require("../utils/endePassword");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const addUser = async (req, res) => {
    const { name, email, username, password } = req.body;
    const data = {
        name,
        email,
        username,
        password,
    };
    const result = await (0, addUser_1.addUserService)(data);
    if (!result.isSuccess) {
        res.send({
            status: httpStatus_1.httpStatus.InternalServerError,
            data: null,
            message: result.message,
        });
        return;
    }
    res.send({
        status: httpStatus_1.httpStatus.created,
        data: result.data,
        message: result.message,
    });
};
exports.addUser = addUser;
const getOne = async (req, res) => {
    try {
        const { id } = req.params;
        console.log({ id });
        const result = await (0, getUser_1.getUser)(id);
        if (!result) {
            res.send({
                status: httpStatus_1.httpStatus.InternalServerError,
                data: null,
                message: "Error on get user",
            });
            return;
        }
        if (!result.isSuccess) {
            res.send({
                status: httpStatus_1.httpStatus.InternalServerError,
                data: null,
                message: result.message,
            });
            return;
        }
        res.send({
            status: httpStatus_1.httpStatus.ok,
            data: result.data,
            message: result.message,
        });
    }
    catch (error) {
        console.log(error);
        res.send({
            status: httpStatus_1.httpStatus.InternalServerError,
            data: null,
            message: "Error on get user",
        });
    }
};
exports.getOne = getOne;
const getList = async (_req, res) => {
    try {
        console.log("req get list");
        const result = await (0, getUser_1.getListUser)();
        if (!result) {
            res.send({
                status: httpStatus_1.httpStatus.InternalServerError,
                data: null,
                message: "Error on get listUser",
            });
            return;
        }
        if (!result.isSuccess) {
            res.send({
                status: httpStatus_1.httpStatus.InternalServerError,
                data: null,
                message: result.message,
            });
            return;
        }
        res.send({
            status: httpStatus_1.httpStatus.ok,
            data: result.data,
            message: result.message,
        });
    }
    catch (error) {
        console.log(error);
        res.send({
            status: httpStatus_1.httpStatus.InternalServerError,
            data: null,
            message: "Error on get listUser",
        });
    }
};
exports.getList = getList;
const login = async (req, res) => {
    const { username, password } = req.body;
    console.log({ username, password });
    const result = await (0, getUser_1.getUserByUsername)(username);
    console.log({ result });
    if (!result.data) {
        res.send({
            status: httpStatus_1.httpStatus.forbidden,
            data: null,
            message: "Username not found",
        });
        return;
    }
    if (!result.isSuccess) {
        res.send({
            status: httpStatus_1.httpStatus.InternalServerError,
            data: null,
            message: result.message,
        });
        return;
    }
    if (!result.data.password)
        console.log("password are undefined");
    if (!await (0, endePassword_1.decodePassword)(password, result.data.password || "")) {
        res.send({
            status: httpStatus_1.httpStatus.forbidden,
            data: null,
            message: "Password not match",
        });
        return;
    }
    const secret = process.env.SECRET_KEY;
    if (!secret) {
        res.send({
            status: httpStatus_1.httpStatus.InternalServerError,
            data: null,
            message: "the key is not found",
        });
        return;
    }
    const token = jsonwebtoken_1.default.sign({
        id: result.data.id,
        username: result.data.username,
        email: result.data.email,
    }, secret || "x##A7Nzam1LoIWP90Ubp8c50gi&v7@N8@HcT9TwWXiWfi", { expiresIn: '48h' });
    res.send({
        status: httpStatus_1.httpStatus.ok,
        data: token,
        message: "Success",
    });
};
exports.login = login;
//# sourceMappingURL=userController.js.map