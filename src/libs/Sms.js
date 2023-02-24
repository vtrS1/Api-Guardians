import axios from "axios";

const api = axios.create({
  baseURL: "https://sms.comtele.com.br/api/v2",
  timeout: 1000,
  headers: {
    "content-type": "application/json",
    "auth-key": "b10c6ab7-a126-4f75-b6bd-b9735d10af50",
  },
});

class SendSms {
  async SendSmsRequest(name, numerotel, message, guardian) {
    try {
      api
        .post("/send", {
          Sender: "Nova Era",
          Receivers: "phone_number",
          Content: "message",
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {}
  }
}
export default new SendSms();
