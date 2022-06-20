"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTokenService = void 0;
const generateUniqueStr_1 = __importDefault(require("../../utils/generateUniqueStr"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const generateTokenService = async (userId) => {
    try {
        const token = (0, generateUniqueStr_1.default)();
        await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                apiKey: token,
                apiKeyCreateTime: new Date(),
            }
        });
        return {
            isSuccess: true,
            data: null,
            message: "Token has been created"
        };
    }
    catch {
        return {
            isSuccess: false,
            data: null,
            message: "Error on generate token",
        };
    }
};
exports.generateTokenService = generateTokenService;
//# sourceMappingURL=generateToken.js.map