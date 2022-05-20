import { UserInterface } from "../../templates/@types";
import { hashString } from "../../utils/endePassword";
import { PrismaClient, Prisma } from "@prisma/client";
import { schema } from "../../models/userSchema";
import Ajv from "ajv"

const prisma = new PrismaClient();
const ajv = new Ajv({ allErrors: true });

export const addUserService = async (data: UserInterface) => {
  try {
    const { name, email, username, password } = data;

    const validate = ajv.compile(schema)
    const valid = validate(data)
    if (!valid) {
      console.log(validate.errors);

      const errMsg = validate.errors

      const errMsgStr = errMsg?.map((el) => {
        return el.message
      })

      return {
        isSuccess: false,
        data: errMsgStr,
        message: "Schema validation failed",
      }
    }

    if(!password) {
      return {
        isSuccess: false,
        data: null,
        message: "password is required",
      }
    }

    const resHashed = await hashString(password);

    const usr = await prisma.user.create({
      data: {
        name,
        email,
        username,
        password: resHashed.hash,
        saltPassword: resHashed.salt.toString(),
        LastUpdate : new Date(),
      },
    });

    return {
      isSuccess: true,
      data: usr,
      message: "User has been created"
    };
  } catch (error) {
    console.log(error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      console.log(error.code);

      if (error.code === 'P2002') {
        return {
          isSuccess: false,
          data: null,
          errorCode: error.code,
          message: error.message,
        }
      }
      return {
        isSuccess: false,
        data: null,
        errorCode: error.code,
        message: error.message,
      }
    }

    return {
      isSuccess: false,
      data: null,
      message: "Error on create user",
    }
  } finally {
    await prisma.$disconnect();
  }
};