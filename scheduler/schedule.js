const schedule = require("node-schedule");
const { sendMessage } = require("../sender/sendMessage");
const contacts = require("../data/contacts.json");
const { generateMessage } = require("../messages/generateMessage");

function scheduleMessages(client) {
  let scheduledCount = 0;

  for (const contact of contacts) {
    const { number, name, schedules, image } = contact;

    if (!Array.isArray(schedules)) continue;

    for (const timeStr of schedules) {
      const [hour, minute] = timeStr.split(":").map(Number);

      const rule = new schedule.RecurrenceRule();
      rule.hour = hour;
      rule.minute = minute;
      rule.tz = "America/Sao_Paulo";

      schedule.scheduleJob(rule, async () => {
        const message = generateMessage(contact);
        console.log(`📤 Enviando mensagem para ${number} (${name}) às ${timeStr}`);
        await sendMessage(client, number, message, image);
      });

      console.log(`📅 Agendando mensagem para ${number} (${name}) às ${timeStr}`);
      scheduledCount++;
    }
  }

  console.log("\n📦 Resumo:");
  console.log(`🗓️ Mensagens agendadas: ${scheduledCount}`);
}

module.exports = scheduleMessages;
