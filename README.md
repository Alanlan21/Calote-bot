

## 🧠 Por que esse projeto existe?

Começou como um script simples em Python + Selenium, feito só pra cobrar um amigo que me devia.

Até... mais uma pessoa passar a me dever.

Aí eu pensei: *isso não é mais uma cobrança, é uma operação*.

Migrei para Node.js, descobri o [`venom-bot`](https://github.com/orkestral/venom) e transformei a lógica em algo modular, automatizado e levemente passivo-agressivo.

---

## 💡 O que o bot faz

- ✅ Envia mensagens personalizadas via WhatsApp
- ⏰ Agenda mensagens em horários definidos por contato
- 🧠 Usa templates com variáveis dinâmicas (`name`, `amount`, `daysLate`, etc.)
- 📎 Suporta anexos de imagem (prints, comprovantes ou memes)
- 🧪 Roda via terminal com menu interativo

---

## 🚀 Como usar

### 1. Instale as dependências

```bash
npm install
```

### 2. Configure sua lista de contatos

Renomeie o arquivo de exemplo "contacts-exemple.json" para "contacts.json":

```bash
cp data/contacts-example.json data/contacts.json
```

Edite o arquivo `contacts.json` com os dados reais (mantendo as chaves em inglês):

```json
[
  {
    "name": "Fulano",
    "number": "559999999999",
    "image": "images/exemplo-fulano.png",
    "schedules": ["08:00", "11:00"],
    "amount": 170.0,
    "dueDate": "2025-04-25",
    "template": "Prezado {{name}}, já se passaram {{days}} dias desde o combinado. Valor pendente: R${{amount}}."
  }
]
```

### 3. Rode o bot

```bash
node calote.js
```

Escolha no menu se deseja enviar as mensagens imediatamente ou agendá-las para os horários definidos.

---

## 📁 Estrutura do projeto

```
calote-bot/
├── calote.js                 # Ponto de entrada (CLI)
├── data/
│   ├── contacts.json         # Seus contatos reais (ignorado no Git)
│   └── contacts-example.json # Arquivo de exemplo
├── messages/
│   └── generateMessage.js    # Gera mensagens com base nos templates
├── scheduler/
│   └── schedule.js           # Agendador de mensagens
├── sender/
│   └── sendMessage.js        # Envio efetivo das mensagens
└── images/
    └── exemplo-lucas.png     # Imagem opcional para anexar
```

---

## 🛠 Tecnologias utilizadas

- **Node.js**
- **venom-bot** – integração com o WhatsApp Web
- **dayjs** – manipulação de datas e horários
- **inquirer** – menus interativos via terminal
- **node-schedule** – agendamento estilo cron

---

## ⚠️ Aviso de uso

Este projeto é **educacional e pessoal**.  
Não utilize para fins comerciais, spam ou qualquer forma de assédio.

**Use com responsabilidade.**  
E se você recebeu uma mensagem feita com este bot... talvez esteja devendo mesmo 😅

---

## 👨‍💻 Autor

Desenvolvido por [Alan Regis](https://github.com/Alanlan21),  
porque se o banco não esquece, por que eu deveria?.
