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
}

export default new GuardiansController();
