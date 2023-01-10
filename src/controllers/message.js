import { Message } from "../models";

class MessageController {
  async create(req, res) {
    const message = new Message({
      titulo: "Aprendiz",
      descricao:
        "Ola candidato marabilhoso, hoe é o dia mais feliz da sua vida, chegou a data da sua integração",
    });

    await message.save();

    res.json({ message });
  }
}

export default new MessageController();
