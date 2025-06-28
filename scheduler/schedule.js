const schedule = require("node-schedule");
const { sendMessage } = require("../sender/sendMessage");
const contacts = require("../data/contacts.json");
const { generateMessage } = require("../messages/generateMessage");

function scheduleMessages(client) {
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
        console.log(`📅 Sending message to ${number} (${name}) at ${timeStr}`);
        await sendMessage(client, number, message, image);
      });
    }
  }
}

module.exports = scheduleMessages;
