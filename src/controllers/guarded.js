import { Guarded } from "../models";

class GuardedController {
  async create(req, res) {
    const guardeds = new Guarded({
      name: "Antonio",
      matricula: 13753,
      numerotel: "(92)98585-5809",
      setor: "ccc",
      cargo: "ccc",
      filial: "ccc",
      codigocargo: 10,
      codigofilial: 1,
      codigodosetor: 25,
      turno: "1",
      dtadmissao: new Date(),
      uffilial: "AM",
      guardiansid: 1,
    });

    await guardeds.save();
    res.json({ guardeds });
  }
}

export default new GuardedController();
