import express from "express";
import path from "path";
import morgan from "morgan";
import session from "express-session";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import api from "../api";
import { initAuth, parseAuthUser } from "../middleware/auth";
import { handleError } from "../middleware/errors";

const app = express();

app.use(cookieParser());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  res.setHeader("Access-Control-Allow-Methods", "GET, POST");

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});

app.use(express.static(path.join(__dirname, "../../public")));

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(express.static("public"));

app.use(
  session({
    name: "securityTodo",
    secret: "randomSecret",
    resave: true,
    saveUninitialized: true,
    rolling: true,
    cookie: {
      maxAge: 120 * 60 * 10000
    }
  })
);

app.use(initAuth);
app.use(parseAuthUser);

app.use("/api", api);
app.use(handleError);

app.use("*", (req, res) => {
  res.sendFile("/public/index.html", { root: process.cwd() });
});

export default app;
