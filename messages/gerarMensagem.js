
const dayjs = require("dayjs");

function gerarMensagem(contato) {
  let mensagem = contato.template;
  const agora = dayjs();

  const variaveis = {
    nome: contato.nome,
    valor: contato.valor?.toFixed(2),
  };

  if (contato.dataLimite) {
    const diasAtraso = agora.diff(dayjs(contato.dataLimite), "day");
    variaveis.diasAtraso = diasAtraso;
  }

  if (contato.dataInicial) {
    const diffMs = agora.diff(dayjs(contato.dataInicial));
    variaveis.dias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    variaveis.horas = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
    variaveis.minutos = Math.floor((diffMs / (1000 * 60)) % 60);
  }

  return mensagem.replace(/{{(.*?)}}/g, (_, chave) => variaveis[chave] ?? "");
}

module.exports = { gerarMensagem };
