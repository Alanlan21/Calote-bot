const { create } = require("venom-bot");
const agendarEnvios = require("./scheduler/agendador.js");
const { enviarParaTodos } = require("./sender/enviarMensagem.js");

const inquirer = require("inquirer");

async function iniciarBot() {
  try {
    const client = await create({
      session: "calote-session",
      disableWelcome: true,
      headless: true, // opcional: true para esconder o navegador
    });

    // Espera 1 segundo para garantir que o client esteja totalmente pronto
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const { acao } = await inquirer.prompt([
      {
        type: "list",
        name: "acao",
        message: "Escolha uma ação:",
        choices: [
          { name: "1. Enviar mensagem imediatamente", value: "imediato" },
          { name: "2. Apenas agendar mensagens", value: "agendado" },
        ],
      },
    ]);

    if (acao === "imediato") {
      await enviarParaTodos(client);
      console.log("✅ Mensagens enviadas!");
    }

    if (acao === "agendado") {
      agendarEnvios(client);
      console.log("🕒 Agendamento iniciado.");
    }
  } catch (erro) {
    console.error("Erro ao iniciar o bot:", erro);
  }
}

iniciarBot();
