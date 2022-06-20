"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
exports.schema = {
    type: "object",
    properties: {
        name: { type: "string" },
        email: { type: "string" },
        username: { type: "string" },
        password: { type: "string" },
    },
    required: ["uid", "name", "email", "username", "password"],
    additionalProperties: false,
};
//# sourceMappingURL=userSchema.js.map