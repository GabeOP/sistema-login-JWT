const bcrypt = require("bcrypt");
const User = require("../model/User");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const Controller = {
  post: async (req, res) => {
    const { email, senha, confirmaSenha } = req.body;

    if (!email || !senha || !confirmaSenha) {
      return res.status(422).json({ message: "Preencha todos os campos!" });
    }

    if (senha !== confirmaSenha) {
      return res.status(422).json({ message: "As senhas devem ser idênticas" });
    }

    if (!validator.isEmail(email)) {
      return res.status(422).json({ message: "Insira um e-mail válido" });
    }

    const userExiste = await User.findOne({ email });
    if (userExiste) {
      return res.status(422).json({ message: "Usuário já cadastrado" });
    }

    try {
      const senhaEncriptada = await bcrypt.hash(senha, 10);

      const user = new User({ email, senha: senhaEncriptada });
      await user.save();
      res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Ocorreu um erro interno." });
    }
  },
  login: async(req,res)=>{
    const {email, senha} = req.body;
  
    if(!email || !senha){
      return res.status(422).json({ message: "Preencha todos os campos!" });
    }
  
    if (!validator.isEmail(email)) {
      return res.status(422).json({ message: "Insira um e-mail válido" });
    }
    
    const user = await User.findOne({email})
    if(!user){
      return res.status(404).json({message: "Usuário não encontrado"})
    }
  
    const comparaSenha = await bcrypt.compare(senha, user.senha);

    if(!comparaSenha){
      return res.status(422).json({message: "Senha incorreta"})
    }

    const token = jwt.sign({email}, "123", {expiresIn: '1h'})

    res.status(200).json({message: "Login realizado com sucesso!", token})
  }
};

module.exports = Controller;
