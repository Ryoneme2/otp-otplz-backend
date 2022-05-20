import { Request, Response } from "express";
import { addUserService } from "../services/userService/addUser";
import { getUser, getListUser, getUserByUsername } from "../services/userService/getUser";
import { UserInterface } from "../templates/@types";
import { httpStatus } from "../configs/httpStatus";
import { decodePassword } from "../utils/endePassword";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

interface ResultGet {
  isSuccess: boolean;
  data: UserInterface | null;
  message: string;
}

interface ResultGetList {
  isSuccess: boolean;
  data: UserInterface[] | null;
  message: string;
}

export const addUser = async (req: Request, res: Response) => {
  const { name, email, username, password } = req.body;

  const data: UserInterface = {
    name,
    email,
    username,
    password,
  };

  const result = await addUserService(data);

  if (!result.isSuccess) {
    res.send({
      status: httpStatus.InternalServerError,
      data: result.data,
      message: result.message,
    });
    return
  }

  res.send({
    status: httpStatus.created,
    data: result.data,
    message: result.message,
  });
};


export const getOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log({ id });

    const result: ResultGet | undefined = await getUser(id);

    if (!result) {
      res.send({
        status: httpStatus.InternalServerError,
        data: null,
        message: "Error on get user",
      });
      return
    }

    if (!result.isSuccess) {
      res.send({
        status: httpStatus.InternalServerError,
        data: null,
        message: result.message,
      })
      return
    }

    res.send({
      status: httpStatus.ok,
      data: result.data,
      message: result.message,
    })
  } catch (error) {
    console.log(error);
    
    res.send({
      status: httpStatus.InternalServerError,
      data: null,
      message: "Error on get user",
    });
  }
}

export const getList = async (_req: Request, res: Response) => {
  try {
    console.log("req get list");

    const result: ResultGetList | undefined = await getListUser();


    if (!result) {
      res.send({
        status: httpStatus.InternalServerError,
        data: null,
        message: "Error on get listUser",
      });
      return
    }

    if (!result.isSuccess) {
      res.send({
        status: httpStatus.InternalServerError,
        data: null,
        message: result.message,
      })
      return
    }

    res.send({
      status: httpStatus.ok,
      data: result.data,
      message: result.message,
    })
    
  } catch (error) {
    console.log(error);
    
    res.send({
      status: httpStatus.InternalServerError,
      data: null,
      message: "Error on get listUser",
    });
  }

}

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  console.log({ username, password });
  
  const result = await getUserByUsername(username);

  console.log({ result });

  if(!result.data) {
    res.send({
      status: httpStatus.forbidden,
      data: null,
      message: "Username not found",
    });
    return
  }

  if(!result.isSuccess) {
    res.send({
      status: httpStatus.InternalServerError,
      data: null,
      message: result.message,
    });
    return
  }

  if(!result.data.password) console.log("password are undefined");

  if(!await decodePassword(password, result.data.password || "")) {
    res.send({
      status: httpStatus.forbidden,
      data: null,
      message: "Password not match",
    });
    return
  }

  const secret = process.env.SECRET_KEY


  if(!secret) {
    res.send({
      status: httpStatus.InternalServerError,
      data: null,
      message: "the key is not found",
    });
    return
  }

  const token = jwt.sign({
    id: result.data.id,
    username: result.data.username,
    email: result.data.email,
  }, secret || "x##A7Nzam1LoIWP90Ubp8c50gi&v7@N8@HcT9TwWXiWfi" , { expiresIn: '48h' })

  res.send({
    status: httpStatus.ok,
    data: token,
    message: "Success",
  });
}