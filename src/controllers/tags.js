import { Tags } from "../models";
import * as Yup from "yup";

class TagsController {
  async create(req, res) {
    try {
      const tags = Yup.object().shape({
        tag: Yup.string()
          .max(20, "No maximo 20 caracteres")
          .required("Campo Obrigatorio"),
        descricao: Yup.string().required("Campo Obrigatorio"),
      });

      await tags.validate(req.body);

      const tag = new Tags({
        ...req.body,
      });

      await tag.save();

      res.json({ tag });
    } catch (error) {
      return res.status(400).json({ error: error?.message });
    }
  }

  async getAll(req, res) {
    try {
      const tag = await Tags.findAll({
        order: [["tag", "ASC"]],
      });

      return res.json(tag);
    } catch (error) {
      return res.status(400).json({ error: error?.message });
    }
  }

  async tagsDetails(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({ error: "Id não fornecido" });
      }

      const tag = await Tags.findOne({
        where: { id: Number(req.params.id) },
      });

      if (!tag) {
        return res.status(400).json({ error: "Tag não encontrada" });
      }

      return res.json(tag);
    } catch (error) {
      return res.status(400).json({ error: error?.message });
    }
  }
}

export default new TagsController();
