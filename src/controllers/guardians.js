import { Guardians } from "../models";

class GuardiansController {
  async create(req, res) {
    const guardians = new Guardians({
      name: "Marcos",
      email: "ti.marcos@novaeranet.com.br",
      matricula: 8914,
      numerotel: "(92)985855890",
      setor: "DEV-BI",
      cargo: "ANALISTA DE FERAS I",
      filial: "BARATO E PRONTO",
      codigocargo: 10,
      codigofilial: 10,
      codigodosetor: 10,
      valecredito: "145161",
      turno: "manha",
    });

    await guardians.save();
    res.json("Usuário criado com sucesso");
  }
}

export default new GuardiansController();
