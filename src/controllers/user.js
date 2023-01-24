import { User } from "../models";
import * as Yup from "yup";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserController {
  async login(req, res) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("E-mail invalido")
          .required("E-mail é obrigatório"),
        password: Yup.string()
          .required("Senha é obrigatório")
          .min(6, "Senha precisa ter mais de 6 caracteres"),
      });

      await schema.validate(req.body);

      const user = await User.findOne({ where: { email: req.body.email } });

      if (!user) {
        return res.status(401).json({ error: "E-mail ou senha não conferem" });
      }
      const checkPassword = await bcrypt.compare(
        req.body.password,
        user.password_hash
      );

      if (!checkPassword) {
        return res.status(401).json({ error: "E-mail ou senha não conferem" });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_HASH, {
        expiresIn: "30d",
      });

      const { id, name, email, createdAt } = user;

      return res.json({
        id,
        name,
        email,
        createdAt,
        token,
      });
    } catch (error) {
      return res.status(401).json({ error: error?.message });
    }
  }

  async create(req, res) {
    try {
      const users = Yup.object().shape({
        name: Yup.string()
          .required("Nome é obrigatório")
          .min(3, "Acima de 3 letras"),
        email: Yup.string()
          .email("E-mail invalido")
          .required("E-mail é obrigatório"),
        password: Yup.string()
          .required("Senha é obrigatório")
          .min(6, "Senha precisa ter mais de 6 caracteres"),
        matricula: Yup.number().required("Matricula é obrigatório"),
        numerotel: Yup.string().required("Número de telefone é obrigatório"),
      });

      const existedUser = await User.findOne({
        where: { email: req.body.email },
      });

      if (existedUser) {
        return res.status(401).json({ error: "Usuário já cadastrado" });
      }

      await users.validate(req.body);

      const hashPassword = await bcrypt.hash(req.body.password, 8);

      const user = new User({
        ...req.body,
        password: "",
        password_hash: hashPassword,
      });

      await user.save();
      return res.json({ user });
    } catch (error) {
      return res.status(400).json({ error: error?.message });
    }
  }
}

export default new UserController();
