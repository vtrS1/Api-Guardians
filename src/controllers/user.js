import { User } from "../models";

class UserController {
  async create(req, res) {
    const user = new User({
      name: "Antonio",
      email: "vtrvieira2.0@gmail.com",
      password: "qaz123#@!",
      password_hash: "qaz123#@!",
      reset_password_token: "qaz!@",
      reset_password_token_sent_at: new Date(),
      matricula: 13753,
      numerotel: "(92) 98585-5809",
    });

    await user.save();

    return res.json({ user });
  }
}

export default new UserController();
