import NodeMailJet from "node-mailjet";

const mailjet = NodeMailJet.apiConnect(
  process.env.API_KEY,
  process.env.SECRET_KEY
);

class Mail {
  async sendForgotPasswordMail(email, name, token) {
    try {
      const result = await mailjet.post("send", { version: "v3.1" }).request({
        Messages: [
          {
            From: {
              Email: "sistemas.rh@novaeranet.com.br",
              Name: "Nova Era",
            },
            To: [
              {
                Email: email,
                Name: name,
              },
            ],
            TemplateID: 4554184,
            TemplateLanguage: true,
            Subject: "Alteração de senha",
            Variables: {
              name: name,
              token: token,
            },
          },
        ],
      });
      return result;
    } catch (error) {
      return { error };
    }
  }
}

export default new Mail();
