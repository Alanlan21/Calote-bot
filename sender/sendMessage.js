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

    console.log("✅ Message sent");
  } catch (error) {
    console.error("❌ Failed to send to", number, ":", error.message);
    throw error;
  }
}

async function sendToAll(client) {
  let successCount = 0;
  let failCount = 0;

  for (const contact of contacts) {
    const { number, image } = contact;
    const message = generateMessage(contact);

    console.log("\n-----------------------------");
    console.log("Sending to:", number);
    console.log("Message:\n", message);

    try {
      await sendMessage(client, number, message, image);
      successCount++;
    } catch {
      failCount++;
    }
  }

  console.log("\n📦 Resumo:");
  console.log(`✅ Mensagens enviadas com sucesso: ${successCount}`);
  console.log(`❌ Falhas de envio: ${failCount}`);
}

module.exports = { sendMessage, sendToAll };
