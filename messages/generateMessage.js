const dayjs = require("dayjs");

function generateMessage(contact) {
  let message = contact.template;
  const now = dayjs();

  const variables = {
    name: contact.name,
    amount: contact.amount?.toFixed(2),
  };

  // Calculate days late
  const baseDate = contact.dueDate || contact.startDate;

  if (baseDate) {
    const diff = now.diff(dayjs(baseDate));
    variables.days = Math.floor(diff / (1000 * 60 * 60 * 24));
    variables.hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    variables.minutes = Math.floor((diff / (1000 * 60)) % 60);
  }

  return message.replace(/{{(.*?)}}/g, (_, key) => variables[key] ?? "");
}

module.exports = { generateMessage };
