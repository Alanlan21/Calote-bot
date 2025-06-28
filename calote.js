const { create } = require("venom-bot");
const scheduleMessages = require("./scheduler/schedule.js");
const { sendToAll } = require("./sender/sendMessage.js");
const inquirer = require("inquirer");

async function startBot() {
  try {
    const client = await create({
      session: "calote-session",
      disableWelcome: true,
      headless: true,
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const { action } = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "Choose an action:",
        choices: [
          { name: "1. Send message immediately", value: "immediate" },
          { name: "2. Schedule messages only", value: "scheduled" },
        ],
      },
    ]);

    if (action === "immediate") {
      await sendToAll(client);
      console.log("✅ Messages sent!");
    }

    if (action === "scheduled") {
      scheduleMessages(client);
      console.log("🕒 Scheduling started.");
    }
  } catch (error) {
    console.error("Error starting bot:", error);
  }
}

startBot();
