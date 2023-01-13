import { Message } from "../models";
import * as Yup from "yup";

class MessageController {
  async create(req, res) {
    try {
      const message = Yup.object().shape({
        titulo: Yup.string().required("Campo obrigatório"),
        descricao: Yup.string().required("Descrição obrigatória"),
      });

      await message.validate(req.body);

      const messages = new Message({
        ...req.body,
      });

      await messages.save();

      res.json({ messages });
    } catch (error) {
      return res.status(400).json({ error: error?.message });
    }
  }
}

export default new MessageController();
