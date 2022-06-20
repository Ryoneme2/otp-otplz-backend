"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByUsername = exports.getListUser = exports.getUser = void 0;
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
const getUser = async (id) => {
    try {
        if (typeof id === 'string')
            id = parseInt(id);
        const allUsers = await prisma.user.findUnique({
            where: {
                id: id
            }
        });
        if (!!allUsers) {
            return {
                isSuccess: true,
                data: {
                    id: allUsers.id,
                    name: allUsers.name,
                    email: allUsers.email,
                    username: allUsers.username,
                    role: allUsers.role,
                    createdAt: allUsers.createdAt,
                },
                message: 'User has been found'
            };
        }
        return {
            isSuccess: false,
            data: null,
            message: 'user not found'
        };
    }
    catch (error) {
        return {
            isSuccess: false,
            data: null,
            message: 'Error on find user'
        };
    }
};
exports.getUser = getUser;
const getListUser = async () => {
    try {
        const allUsers = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                username: true,
                role: true,
                createdAt: true,
            }
        });
        if (!!allUsers) {
            return {
                isSuccess: true,
                data: allUsers,
                message: 'List of user has been found'
            };
        }
        return {
            isSuccess: false,
            data: null,
            message: 'List of user not found'
        };
    }
    catch (error) {
        console.log(error);
        return {
            isSuccess: false,
            data: null,
            message: 'Error on find user'
        };
    }
};
exports.getListUser = getListUser;
const getUserByUsername = async (username) => {
    try {
        const allUsers = await prisma.user.findUnique({
            where: {
                username: username
            }
        });
        if (!!allUsers) {
            return {
                isSuccess: true,
                data: {
                    id: allUsers.id,
                    name: allUsers.name,
                    email: allUsers.email,
                    username: allUsers.username,
                    password: allUsers.password,
                    apiKey: allUsers.apiKey,
                    apiKeyCreateTime: allUsers.apiKeyCreateTime,
                    role: allUsers.role,
                    createdAt: allUsers.createdAt,
                },
                message: 'User has been found'
            };
        }
        return {
            isSuccess: false,
            data: null,
            message: 'user not found'
        };
    }
    catch (error) {
        return {
            isSuccess: false,
            data: null,
            message: 'Error on find user'
        };
    }
};
exports.getUserByUsername = getUserByUsername;
//# sourceMappingURL=getUser.js.map