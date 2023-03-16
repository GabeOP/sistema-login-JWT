const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const dbUser = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;

const dbConnect = async () => {
  try {
    mongoose
    .connect(
      `mongodb+srv://${dbUser}:${dbPassword}@cluster0.7tvvkz3.mongodb.net/?retryWrites=true&w=majority`
    )
    console.log("Banco de dados conectado com sucesso!");
  } catch (error) {
    console.log(error.message)
  }
  
};
module.exports = dbConnect;
