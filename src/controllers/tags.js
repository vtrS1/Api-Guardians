import { Tags } from "../models";

class TagsController {
  async create(req, res) {
    const tags = new Tags({
      tag: "Endereço NV Torres",
      descricao: "rua cr7 ",
    });

    await tags.save();

    res.json({ tags });
  }
}

export default new TagsController();
