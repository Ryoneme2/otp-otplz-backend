"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodePassword = exports.hashString = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const hashString = async (str) => {
    const SALT_ROUNDS = Math.random() * 5;
    const hash = await bcryptjs_1.default.hash(str, SALT_ROUNDS);
    return {
        hash,
        salt: SALT_ROUNDS
    };
};
exports.hashString = hashString;
const decodePassword = (str, hash) => {
    return bcryptjs_1.default.compare(str, hash);
};
exports.decodePassword = decodePassword;
//# sourceMappingURL=endePassword.js.map