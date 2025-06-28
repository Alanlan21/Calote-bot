const contatos = require("../data/contatos.json");
const { gerarMensagem } = require("../messages/gerarMensagem");

async function enviarMensagem(client, numero, mensagem, imagem) {
  try {
    console.log("Enviando mensagem para", numero);

    if (imagem) {
      await client.sendImage(
        `${numero}@c.us`,
        imagem,
        "comprovante.jpg",
        mensagem
      );
    } else {
      await client.sendText(`${numero}@c.us`, mensagem);
    }

    console.log("✅ Mensagem enviada:", numero);
  } catch (error) {
    console.error("❌ Erro ao enviar para", numero, ":", error.message);
  }
}

async function enviarParaTodos(client) {
  for (const contato of contatos) {
    const { numero, imagem } = contato;
    const mensagem = gerarMensagem(contato);
    console.log("Enviando para:", numero);
    console.log("Mensagem:", mensagem);
    await enviarMensagem(client, numero, mensagem, imagem);
  }
}

module.exports = { enviarMensagem, enviarParaTodos };
