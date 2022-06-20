"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUserService = void 0;
const endePassword_1 = require("../../utils/endePassword");
const client_1 = require("@prisma/client");
const userSchema_1 = require("../../models/userSchema");
const ajv_1 = __importDefault(require("ajv"));
const prisma = new client_1.PrismaClient();
const ajv = new ajv_1.default({ allErrors: true });
const addUserService = async (data) => {
    try {
        const { name, email, username, password } = data;
        const validate = ajv.compile(userSchema_1.schema);
        const valid = validate(data);
        if (!valid) {
            console.log(validate.errors);
            const errMsg = validate.errors?.toString();
            return {
                isSuccess: false,
                data: null,
                message: errMsg || "Schema validation failed",
            };
        }
        if (!password) {
            return {
                isSuccess: false,
                data: null,
                message: "password is required",
            };
        }
        const resHashed = await (0, endePassword_1.hashString)(password);
        const usr = await prisma.user.create({
            data: {
                name,
                email,
                username,
                password: resHashed.hash,
                saltPassword: resHashed.salt.toString(),
                LastUpdate: new Date(),
            },
        });
        return {
            isSuccess: true,
            data: usr,
            message: "User has been created"
        };
    }
    catch (error) {
        console.log(error);
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            console.log(error.code);
            if (error.code === 'P2002') {
                return {
                    isSuccess: false,
                    data: null,
                    errorCode: error.code,
                    message: error.message,
                };
            }
            return {
                isSuccess: false,
                data: null,
                errorCode: error.code,
                message: error.message,
            };
        }
        return {
            isSuccess: false,
            data: null,
            message: "Error on create user",
        };
    }
    finally {
        await prisma.$disconnect();
    }
};
exports.addUserService = addUserService;
//# sourceMappingURL=addUser.js.map