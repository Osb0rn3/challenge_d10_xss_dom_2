import * as secrets from "../secrets";

const config = {
  port: process.env.port || 3000,
  db: "mongodb://localhost:27017/shop",
  mailer: {
    mailerService: "gmail",
    mailerUsername: secrets.mailerUsername,
    mailerPassword: secrets.mailerPassword
  }
};

export default config;
