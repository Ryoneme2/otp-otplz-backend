"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const getUser_1 = require("../services/userService/getUser");
const httpStatus_1 = require("../configs/httpStatus");
const generateToken_1 = require("services/tokenService/generateToken");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const generateToken = async (req, res) => {
    if (!req.user) {
        return {
            status: httpStatus_1.httpStatus.forbidden,
            data: null,
            message: 'Access denied.'
        };
    }
    const userObjJWT = JSON.parse(req.user.toString());
    const userData = await (0, getUser_1.getUserByUsername)(userObjJWT.username);
    if (!userData.isSuccess) {
        return {
            status: httpStatus_1.httpStatus.InternalServerError,
            data: null,
            message: userData.message
        };
    }
    if (userData.data?.apiKey) {
        return {
            status: httpStatus_1.httpStatus.badRequest,
            data: null,
            message: 'apiKey has been created'
        };
    }
    if (!userData.data?.id) {
        return {
            status: httpStatus_1.httpStatus.badRequest,
            data: null,
            message: 'UserId is undefined'
        };
    }
    const response = await (0, generateToken_1.generateTokenService)(userData.data?.id);
    if (!response.isSuccess) {
        return {
            status: httpStatus_1.httpStatus.InternalServerError,
            data: null,
            message: response.message
        };
    }
    return {
        status: httpStatus_1.httpStatus.ok,
        data: null,
        message: response.message
    };
};
exports.generateToken = generateToken;
//revoke token , refresh token 
//# sourceMappingURL=utilController.js.map