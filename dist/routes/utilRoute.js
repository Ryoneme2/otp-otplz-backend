"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userAuth_1 = require("../middlewares/userAuth");
const utilController_1 = require("../controllers/utilController");
const router = express_1.default.Router();
router.use("/getUserInfo/:id", userAuth_1.auth, utilController_1.generateToken);
exports.default = router;
//# sourceMappingURL=utilRoute.js.map