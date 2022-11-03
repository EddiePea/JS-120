function createInvoice(services = {}) {
  let phoneCharge = services.phone;
  if (phoneCharge === undefined) {
    phoneCharge = 3000;
  }

  let internetCharge = services.internet;
  if (internetCharge === undefined) {
    internetCharge = 5500;
  }
  
  return {
    phone: phoneCharge,
    internet: internetCharge,
    payments: [],

    total: function() {
      return this.phone + this.internet;
    },

    addPayment: function(payment) {
      this.payments.push(payment);
    },

    addPayments: function(payments) {
      payments.forEach(this.addPayment, this);
    },

    paymentTotal: function() {
      return this.payments.reduce((sum, payment) => sum + payment.total(), 0);
    },

    amountDue: function() {
      return this.total() - this.paymentTotal();
    },
  };
}

function invoiceTotal(invoices) {
  let total = 0;

  for (let index = 0; index < invoices.length; index += 1) {
    total += invoices[index].total();
  }

  return total;
}

//Total variable set to 0
//For loop -> loops through invoices array
//Adds to total the result of calling the total() function
//on the invoice object at increasing index positions of the array 

let invoices = [];
invoices.push(createInvoice());
invoices.push(createInvoice({ internet: 6500 }));
invoices.push(createInvoice({ phone: 2000 }));
invoices.push(createInvoice({
  phone: 1000,
  internet: 4500,
}));

console.log(invoiceTotal(invoices)); // 31000


function createPayment(services = {}) {
  let internetPayment = services.internet;
  if (internetPayment === undefined) {
    internetPayment = 0;
  }

  let phonePayment = services.phone;
  if (phonePayment === undefined) {
    phonePayment = 0;
  }

  let amountPayment = services.amount;

  return {
    phone: phonePayment,
    internet: internetPayment,
    amount: amountPayment,

    total: function() {
      if (this.amount !== undefined) {
        return this.amount;
      } else {
        return this.phone + this.internet;
      }
    }
  };
}

//LS Solution 
function createPayment2(services = {}) {

  let payment = {
    phone: services.phone || 0,
    internet: services.internet || 0,
    amount: services.amount,
  };

  payment.total = function() {
    return this.amount || (this.phone + this.internet);
  };
  return payment;
}

//End

function paymentTotal(payments) {
  return payments.reduce((sum, payment)  => sum + payment.total(), 0);
}

let payments = [];
payments.push(createPayment());
payments.push(createPayment({
  internet: 6500,
}));

payments.push(createPayment({
  phone: 2000,
}));

payments.push(createPayment({
  phone: 1000,
  internet: 4500,
}));

payments.push(createPayment({
  amount: 10000,
}));

console.log(paymentTotal(payments));      // => 24000