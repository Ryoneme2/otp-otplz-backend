export const schema = {
  type: "object",
  properties: {
  name: { type: "string" },
  email: { type: "string" },
  username: { type: "string" },
  password: { type: "string" },
  },
  required: ["uid", "name", "email", "username", "password"],
  additionalProperties: false,
}