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

  async getAll(req, res) {
    try {
      const message = await Message.findAll({
        order: [["titulo", "ASC"]],
      });

      return res.json(message);
    } catch (error) {
      return res.status(400).json({ error: error?.message });
    }
  }

  async messageDetails(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({ error: "Id não fornecido" });
      }

      const message = await Message.findOne({
        where: { id: Number(req.params.id) },
      });

      if (!message) {
        return res.status(400).json({ error: "Message não encontrada" });
      }

      return res.json(message);
    } catch (error) {
      return res.status(400).json({ error: error?.message });
    }
  }
}

export default new MessageController();
