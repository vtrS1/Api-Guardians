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

  async changedRegisterMessage(req, res) {
    try {
      const schema = Yup.object().shape({
        id: Yup.number().required("Id é obrigatório"),
        name: Yup.string(),
        email: Yup.string().email("E-mail inválido"),
        password: Yup.string(),
      });

      await schema.validate(req.body);

      const user = await Message.findOne({ where: { id: req.body.id } });

      if (!user) {
        return res.status(404).json({ error: "Usuário não existe!" });
      }

      await user.update({
        id: req?.body.id,
        titulo: req?.body.titulo,
        descricao: req?.body.descricao,
      });

      await user.save();

      return res.status(200).json({ success: "Mensagem Alterada Com Sucesso" });
    } catch (error) {
      return res.status(400).json({ error: error?.message });
    }
  }
}

export default new MessageController();
