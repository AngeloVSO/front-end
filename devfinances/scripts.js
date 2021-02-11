const overlay = {
  open() {
    document.querySelector(".overlay").classList.add("active");
  },

  close() {
    document.querySelector(".overlay").classList.remove("active");
  },
};

const balance = {
  all: [
    {
      description: "Luz",
      amount: -50000,
      date: "23/01/2021",
    },
    {
      description: "Website",
      amount: 500000,
      date: "23/01/2021",
    },
    {
      description: "Internet",
      amount: -20000,
      date: "23/01/2021",
    },
    {
      description: "App",
      amount: 200000,
      date: "23/01/2021",
    },
  ],
  
  add(transaction) {
    balance.all.push(transaction);
    app.reload();
  },

  remove(index) {
    balance.all.splice(index, 1);

    app.reload();
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
      tr.innerHTML = DOM.innerHTMLTransaction(transaction, index);
      tr.dataset.index = index;

      DOM.transactionsContent.appendChild(tr);
  },
  
  innerHTMLTransaction(transaction, index) {
    const CssClass = transaction.amount > 0 ? "cashIn" : "cashOut";

    const amount = utils.formatCurrency(transaction.amount);

    const html = `
        <td class="description">${transaction.description}</td>
        <td class="${CssClass}">${amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
          <img onclick="balance.remove(${index})" src="./images/assets/minus.svg" alt="Remover transação" />
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
  formatAmount(value) {
    value = Number(value)*100;
    
    return value;
  },

  formatDate(date) {
    const splitDate = date.split("-");
    return `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`;
  },

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

const form = {
  description: document.getElementById("description"),
  amount: document.getElementById("amount"),
  date: document.getElementById("date"),

  getValues() {
    return {
      description: form.description.value,
      amount: form.amount.value,
      date: form.date.value,
    }
  },

  formatData() {
    let {description, amount, date} = form.getValues();
    amount = utils.formatAmount(amount);
    date = utils.formatDate(date);

    return {
      description, amount, date
    }
  },

  validateField() {
    const {description, amount, date} = form.getValues();
    
    if(description.trim() === "" || amount.trim() === "" || date.trim() === "") {
      throw new Error("Preencha todos o campos.")
    }

  },

  saveTransaction(transaction) {
    balance.add(transaction);
  },

  clearField() {
    form.description.value = "";
    form.amount.value = "";
    form.date.value = "";
  },
  
  submit(event) {
    event.preventDefault();

    try {
      form.validateField();
      const transaction = form.formatData();
      form.saveTransaction(transaction);
      form.clearField();
      overlay.close();

    } catch (error) {
      alert(error.message);
    }
    
  }
}

const app = {
  init() {
    balance.all.forEach((transaction, index) => {
      DOM.addTransaction(transaction, index);
    })
    
    DOM.updateBalance()
  },

  reload() {
    DOM.clearTransaction();
    app.init();
  }
};

app.init();