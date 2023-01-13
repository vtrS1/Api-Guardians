import { User } from "../models";
import * as Yup from "yup";
import bcrypt from "bcrypt";

class UserController {
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
