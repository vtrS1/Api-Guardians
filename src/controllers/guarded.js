import { Guardians } from "../models";
import { Guarded } from "../models";
import * as Yup from "yup";
import Sms from "../libs/Sms";
import guardians from "./guardians";

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
        include: [
          {
            model: Guardians,
            as: "guardian",
          },
        ],
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

  async sendMessage(req, res) {
    try {
      const schema = Yup.object().shape({
        id: Yup.number().required("Id do Usuário é obrigatório"),
        message: Yup.string().required(),
      });

      await schema.validate(req.body);

      const user = await Guarded.findOne({ where: { id: req.body.id } });

      if (!user) {
        return res.status(404).json({ error: "Usuário não existe" });
      }

      const guardian = await Guardians.findOne({
        where: { id: user.guardiansid },
      });

      const { name, numerotel } = user;

      const smsResult = await Sms.sendSms(
        name,
        numerotel,
        req.body.message,
        guardian.name
      );

      if (smsResult?.error) {
        return res.status(400).json({ error: "Sms Não enviado" });
      }

      return res.json("Sms enviado com sucesso");
    } catch (error) {
      return { error };
    }
  }

  async changedGuardian(req, res) {
    try {
      const schema = Yup.object().shape({
        id: Yup.number().required("Id é obrigatório"),
        guardiansid: Yup.number().required("Id Guardian é obrigatório"),
      });

      await schema.validate(req.body);

      const user = await Guarded.findOne({ where: { id: req.body.id } });

      if (!user) {
        return res.status(404).json({ error: "Usuário não existe!" });
      }

      const newguardian = req.body.guardiansid;

      await user.update({
        guardiansid: newguardian,
      });

      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(400).json({ error: error?.message });
    }
  }
}

export default new GuardedController();
