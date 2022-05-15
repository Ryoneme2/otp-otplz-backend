import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app: Application = express();
const PORT = process.env.PORTEXPRESS || 8080;

if (typeof process.env.PORTEXPRESS == "undefined") {
  console.log("PORTEXPRESS is not defined but set default is 8008");
}

// express config
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/public/production"));
}
if (process.env.NODE_ENV === "development") {
  app.use(express.static(__dirname + '/public/development'));
}


app.get("/", (req: Request, res: Response) => {
  console.log("Hello World22");
  res.send("Hello World5!");
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});