const contacts = require("../data/contacts.json");
const { generateMessage } = require("../messages/generateMessage");

async function sendMessage(client, number, message, image) {
  try {
    console.log("Sending message to", number);

    if (image) {
      await client.sendImage(
        `${number}@c.us`,
        image,
        "receipt.jpg",
        message
      );
    } else {
      await client.sendText(`${number}@c.us`, message);
    }

    console.log("✅ Message sent:", number);
  } catch (error) {
    console.error("❌ Failed to send to", number, ":", error.message);
  }
}

async function sendToAll(client) {
  for (const contact of contacts) {
    const { number, image } = contact;
    const message = generateMessage(contact);
    console.log("Sending to:", number);
    console.log("Message:", message);
    await sendMessage(client, number, message, image);
  }
}

module.exports = { sendMessage, sendToAll };
