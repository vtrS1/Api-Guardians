import { Guardians } from "../models";
import * as Yup from "yup";

class GuardiansController {
  async create(req, res) {
    try {
      const guardians = Yup.object().shape({
        name: Yup.string().required("Campo Obrigatório"),
        email: Yup.string()
          .email("E-mail inválido")
          .required("Campo Obrigatório"),
        matricula: Yup.number().required("Campo Obrigatório"),
        numerotel: Yup.string().required("Campo Obrigatório"),
        setor: Yup.string().required("Campo Obrigatório"),
        cargo: Yup.string().required("Campo Obrigatório"),
        filial: Yup.string().required("Campo Obrigatório"),
        codigocargo: Yup.number().required("Campo Obrigatório"),
        codigofilial: Yup.number().required("Campo Obrigatório"),
        codigodosetor: Yup.number().required("Campo Obrigatório"),
        valecredito: Yup.string().required("Campo Obrigatório"),
        turno: Yup.string().required("Campo Obrigatório"),
      });

      await guardians.validate(req.body);

      const guardian = new Guardians({
        ...req.body,
      });
      await guardian.save();
      res.json({ guardian });
    } catch (error) {
      return res.status(400).json({ error: error?.message });
    }
  }
  async getAll(req, res) {
    try {
      const guardian = await Guardians.findAll({
        order: [["name", "ASC"]],
      });

      return res.json(guardian);
    } catch (error) {
      return res.status(400).json({ error: error?.message });
    }
  }

  async guardianDetails(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({ error: "Id não fornecido" });
      }

      const guardian = await Guardians.findOne({
        where: { id: Number(req.params.id) },
      });

      if (!guardian) {
        return res.status(400).json({ error: "Guardião não encontrado" });
      }

      return res.json(guardian);
    } catch (error) {
      return res.status(400).json({ error: error?.message });
    }
  }

  async changedRegisterGuardian(req, res) {
    try {
      const schema = Yup.object().shape({
        id: Yup.number().required("Id é obrigatório"),
        name: Yup.string(),
        email: Yup.string().email("E-mail inválido"),
        numerotel: Yup.string(),
        setor: Yup.string(),
        cargo: Yup.string(),
        filial: Yup.string(),
        codigocargo: Yup.number(),
        codigofilial: Yup.number(),
        codigodosetor: Yup.number(),
        valecredito: Yup.string(),
        turno: Yup.string(),
      });

      await schema.validate(req.body);

      const user = await Guardians.findOne({ where: { id: req.body.id } });

      if (!user) {
        return res.status(404).json({ error: "Usuário não existe!" });
      }

      await user.update({
        id: req?.body.id,
        name: req?.body.name,
        email: req?.body.email,
        numerotel: req?.body.numerotel,
        setor: req?.body.setor,
        cargo: req?.body.cargo,
        filial: req?.body.filial,
        codigocargo: req?.body.codigocargo,
        codigofilial: req?.body.codigofilial,
        codigodosetor: req?.body.codigodosetor,
        valecredito: req?.body.valecredito,
        turno: req?.body.turno,
      });

      await user.save();

      return res.status(200).json({ success: "Guardião Alterado Com Sucesso" });
    } catch (error) {
      return res.status(400).json({ error: error?.message });
    }
  }
}

export default new GuardiansController();
