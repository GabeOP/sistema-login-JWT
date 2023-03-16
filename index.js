const express = require("express");
const dbConnect = require("./db/db");
const app = express();

app.use(express.json())

//Conexão com o banco de dados
dbConnect();

const Controller = require("./controllers/user.controller");

app.post("/login", Controller.login)
app.post("/cadastro", Controller.post)

app.listen(3000, ()=> console.log("Rodando servidor na porta 3000"))