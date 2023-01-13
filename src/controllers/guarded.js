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
}

export default new GuardedController();
