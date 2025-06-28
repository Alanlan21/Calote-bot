const dayjs = require("dayjs");

function generateMessage(contact) {
  let message = contact.template;
  const now = dayjs();

  const variables = {
    name: contact.name,
    amount: contact.amount?.toFixed(2),
  };

  if (contact.dueDate) {
    const daysLate = now.diff(dayjs(contact.dueDate), "day");
    variables.daysLate = daysLate;
  }

  if (contact.startDate) {
    const diffMs = now.diff(dayjs(contact.startDate));
    variables.days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    variables.hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
    variables.minutes = Math.floor((diffMs / (1000 * 60)) % 60);
  }

  return message.replace(/{{(.*?)}}/g, (_, key) => variables[key] ?? "");
}

module.exports = { generateMessage };
