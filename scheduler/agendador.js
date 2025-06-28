const schedule = require("node-schedule");
const { enviarMensagem } = require("../sender/enviarMensagem");
const contatos = require("../data/contatos.json");
const { gerarMensagem } = require("../messages/gerarMensagem");


function agendarEnvios(client) {
  for (const contato of contatos) {
    const { numero, nome, horarios, imagem } = contato;

    if (!Array.isArray(horarios)) continue;

    for (const horaStr of horarios) {
      const [hora, minuto] = horaStr.split(":").map(Number);

      const regra = new schedule.RecurrenceRule();
      regra.hour = hora;
      regra.minute = minuto;
      regra.tz = "America/Sao_Paulo";

      schedule.scheduleJob(regra, async () => {
        const mensagem = gerarMensagem(contato);
        console.log(`📅 Enviando mensagem para ${numero} (${nome}) às ${horaStr}`);
        await enviarMensagem(client, numero, mensagem, imagem);
      });
    }
  }
}

module.exports = agendarEnvios;
