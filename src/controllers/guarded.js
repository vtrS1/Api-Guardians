import { Guarded } from "../models";
import * as Yup from "yup";

class GuardedController {
  async create(req, res) {
    try {
      const guardeds = Yup.object().shape({
        name: Yup.string().required("Campo obrigatório"),
        matricula: Yup.number().required("Campo obrigatório"),
        numerotel: Yup.string().required("Campo obrigatório"),
        setor: Yup.string().required("Campo obrigatório"),
        cargo: Yup.string().required("Campo obrigatório"),
        filial: Yup.string().required("Campo obrigatório"),
        codigocargo: Yup.number().required("Campo obrigatório"),
        codigofilial: Yup.number().required("Campo obrigatório"),
        codigodosetor: Yup.number().required("Campo obrigatório"),
        turno: Yup.string().required("Campo obrigatório"),
        dtadmissao: Yup.string(),
        uffilial: Yup.string().required("Campo obrigatório"),
        guardiansid: Yup.number().required("Campo obrigatório"),
      });

      await guardeds.validate(req.body);

      const guarded = new Guarded({
        ...req.body,
      });

      await guarded.save();
      res.json({ guarded });
    } catch (error) {
      res.status(400).json({ error: error?.message });
    }
  }
  async getAll(req, res) {
    try {
      const guarded = await Guarded.findAll({
        order: [["name", "ASC"]],
      });

      return res.json(guarded);
    } catch (error) {
      return res.status(400).json({ error: error?.message });
    }
  }

  async guardedDetails(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({ error: "Id não fornecido" });
      }

      const guarded = await Guarded.findOne({
        where: { id: Number(req.params.id) },
      });

      if (!guarded) {
        return res.status(400).json({ error: "Usuário não encontrado" });
      }

      return res.json(guarded);
    } catch (error) {
      return res.status(400).json({ error: error?.message });
    }
  }
}

export default new GuardedController();
