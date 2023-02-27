import NodeMailJet from "node-mailjet";

const mailjet = NodeMailJet.smsConnect(process.env.MJ_TOKEN);

class Sms {
  async sendSms(name, numerotel, message, guardian) {
    try {
      const result = mailjet.post("sms-send", { version: "v4" }).request({
        From: "Nova Era",
        To: "+55" + numerotel,
        Text:
          "Olá, " + name + " " + message + " Procure seu Guardião: " + guardian,
      });
      console.log({ result });
    } catch (error) {
      return { error };
    }
  }
}

export default new Sms();
