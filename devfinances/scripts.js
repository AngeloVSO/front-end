const overlay = {
  open() {
    document.querySelector(".overlay").classList.add("active");
  },

  close() {
    document.querySelector(".overlay").classList.remove("active");
  },
};

const transactions = [
  {
    id: 1,
    description: "Luz",
    amount: -50000,
    date: "23/01/2021",
  },
  {
    id: 2,
    description: "Website",
    amount: 500000,
    date: "23/01/2021",
  },
  {
    id: 3,
    description: "Internet",
    amount: -20000,
    date: "23/01/2021",
  },
  {
    id: 4,
    description: "App",
    amount: 200000,
    date: "23/01/2021",
  },
];

const balance = {
  all: transactions,
  
  add(transaction) {
    balance.all.push(transaction);
    app.reload();
  },

  remove(index) {
    
  },

  input() {
    let income = 0;
    balance.all.forEach(transaction => {
      if (transaction.amount > 0) {
        income += transaction.amount
      };
    });

    return income;
  },

  output() {
    let expense = 0;
    balance.all.forEach(transaction => {
      if (transaction.amount < 0) {
        expense += transaction.amount
      };
    });

    return expense;
  },

  total() {
    return balance.input() + balance.output();
  },
};

const DOM = {
  transactionsContent: document.querySelector('#data-table tbody'),

  addTransaction(transaction, index) {
      const tr = document.createElement('tr');
      tr.innerHTML = DOM.innerHTMLTransaction(transaction);

      DOM.transactionsContent.appendChild(tr);
  },
  
  innerHTMLTransaction(transaction) {
    const CssClass = transaction.amount > 0 ? "cashIn" : "cashOut";

    const amount = utils.formatCurrency(transaction.amount);

    const html = `
        <td class="description">${transaction.description}</td>
        <td class="${CssClass}">${amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
          <img src="./images/assets/minus.svg" alt="Remover transação" />
        </td>
    `;
    return html
  },
  updateBalance() {
    document.getElementById('cashInDisplay').innerHTML = utils.formatCurrency(balance.input());
    document.getElementById('cashOutDisplay').innerHTML = utils.formatCurrency(balance.output());
    document.getElementById('totalDisplay').innerHTML = utils.formatCurrency(balance.total());
  },

  clearTransaction() {
    DOM.transactionsContent.innerHTML = "";
  }
};

const utils = {
  formatCurrency(value) {
    const signal = Number(value) < 0 ? "-" : "";
    
    value = String(value).replace(/\D/g, "");

    value = Number(value)/100;

    value = value.toLocaleString("pt-BR",{
        style: "currency",
        currency: "BRL"
    });
    
    return signal + value
  }
}

const app = {
  init() {
    balance.all.forEach(transaction => {
      DOM.addTransaction(transaction);
    })
    
    DOM.updateBalance()
  },

  reload() {
    DOM.clearTransaction();
    app.init();
  }
};

app.init();

balance.add({
    id: 7,
    description: "Celular",
    amount: -5000,
    date: "23/01/2021",
});