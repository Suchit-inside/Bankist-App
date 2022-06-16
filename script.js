"use strict";

//BANKIST APP

//Data;
const account1 = {
  owner: "Aryan Kumar",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Shrusti Singh",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2];
// const account1 = {
//   owner: "Jonas Schmedtmann",
//   movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
//   interestRate: 1.2, // %
//   pin: 1111,
// };

// const account2 = {
//   owner: "Jessica Davis",
//   movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//   interestRate: 1.5,
//   pin: 2222,
// };

// const account3 = {
//   owner: "Steven Thomas Williams",
//   movements: [200, -200, 340, -300, -20, 50, 400, -460],
//   interestRate: 0.7,
//   pin: 3333,
// };

// const account4 = {
//   owner: "Sarah Smith",
//   movements: [430, 1000, 700, 50, 90],
//   interestRate: 1,
//   pin: 4444,
// };

// const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const displayMovements = function (movements, movementsDates) {
  containerMovements.innerHTML = "";
  movements.forEach(function (mov, i) {
    const movDate = new Date(currentAccount.movementsDates[i]);
    const date = `${movDate.getDate()}`.padStart(2, "0");
    const month = `${movDate.getMonth() + 1}`.padStart(2, "0");
    const year = movDate.getFullYear();
    const curDate = `${date}/${month}/${year}`;
    const type = mov > 0 ? `deposit` : `withdrawal`;
    // console.log(transaction);
    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">
    ${i + 1} ${type}</div>
    <div class="movements__date">${curDate}</div>
    <div class="movements__value">${mov.toFixed(2)}₹</div>
  </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};
// displayMovements(account1.movements);

const calcDisplayBalance = function (acc) {
  const balance = acc.movements.reduce((preval, curval) => preval + curval, 0);
  acc.Balance = balance;
  labelBalance.textContent = `${balance.toFixed(2)}₹`;
};
//calcDisplayBalance(account1.movements);

const calcDisplaySummary = function (acc) {
  const income = acc.movements
    .filter((mov) => mov > 0)
    .reduce((pre, val) => pre + val, 0);
  labelSumIn.textContent = `${income.toFixed(2)}₹`;

  const outcome = acc.movements
    .filter((mov) => mov < 0)
    .reduce((pre, val) => pre + val, 0);
  labelSumOut.textContent = `${Math.abs(outcome).toFixed(2)}₹`;
  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int) => int > 1)
    .reduce((pre, val) => pre + val, 0);
  labelSumInterest.textContent = `${Number(interest).toFixed(2)}₹`;
};
// calcDisplaySummary(account1.movements);

const createUserName = function (accs) {
  accs.forEach(function (acc) {
    const user = acc.owner;
    acc.userName = user
      .toLowerCase()
      .split(" ")
      .map((ele) => ele[0])
      .join("");
  });
};
createUserName(accounts);
const updateUI = function (acc) {
  displayMovements(acc.movements);
  calcDisplayBalance(acc);
  calcDisplaySummary(acc);
};
let currentAccount;
//Event Handler
//FAKE LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

const startLogoutTimer = function () {
  let time = 300;
  const timer = setInterval(function () {
    const min = String(Math.trunc(time / 60)).padStart(2, "0");
    const sec = String(time % 60).padStart(2, "0");
    labelTimer.textContent = `${min}:${sec}`;
    time--;
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = `Log in to get started`;
      containerApp.style.opacity = 0;
    }
  }, 1000);
};

btnLogin.addEventListener("click", function (event) {
  event.preventDefault();
  currentAccount = accounts.find(
    (acc) => acc.userName === inputLoginUsername.value
  );
  // console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome Back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;

    const now = new Date();
    const date = `${now.getDate()}`.padStart(2, "0");
    const month = `${now.getMonth() + 1}`.padStart(2, "0");
    const year = now.getFullYear();
    const hours = `${now.getHours() - 12}`.padStart(2, "0");
    const min = `${now.getMinutes()}`.padStart(2, "0");
    const curDate = `${date}/${month}/${year}, ${hours}:${min}`;
    labelDate.textContent = curDate;

    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();
    startLogoutTimer();
    updateUI(currentAccount);
    // console.log("Yes");
  } else {
    labelWelcome.textContent = `Please input correct credentials`;
    containerApp.style.opacity = 0;
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();
    updateUI(currentAccount);
  }
});

labelBalance.addEventListener("click", function () {
  [...document.querySelectorAll(".movements__row")].forEach(function (val, i) {
    if (i % 2 === 0) {
      val.style.backgroundColor = "orangered";
    }
  });
});

btnTransfer.addEventListener("click", function (event) {
  event.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    (acc) => acc.userName === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = "";
  inputTransferAmount.blur();
  inputTransferTo.blur();
  console.log(amount);
  console.log(receiverAcc);
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.Balance >= amount &&
    receiverAcc?.userName !== currentAccount.userName
  ) {
    // console.log("Suchit");
    currentAccount.Balance = currentAccount.Balance - amount;
    labelBalance.textContent = `${currentAccount.Balance}₹`;
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    receiverAcc.movementsDates.push(new Date().toISOString());
    currentAccount.movementsDates.push(new Date().toISOString());

    updateUI(currentAccount);
  }
});

btnLoan.addEventListener("click", function (event) {
  event.preventDefault();
  const loan = Math.floor(inputLoanAmount.value);
  if (
    loan > 0 &&
    currentAccount.movements.some((mov) => {
      return mov >= 0.1 * loan;
    })
  ) {
    setTimeout(function () {
      currentAccount.movementsDates.push(new Date().toISOString());
      currentAccount.movements.push(loan);
      updateUI(currentAccount);
    }, 3000);
  }
  inputLoanAmount.value = "";
});

btnClose.addEventListener("click", function (event) {
  event.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.userName &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.userName === currentAccount.userName
    );
    console.log(index);
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = "";
});

btnSort.addEventListener("click", function (event) {
  event.preventDefault();

  currentAccount.movements.sort((a, b) => a - b);
  updateUI(currentAccount);
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

setInterval(function () {
  const now = new Date();
  const hour = `${now.getHours() - 12}`.padStart(2, "0");
  const min = `${now.getMinutes()}`.padStart(2, "0");
  const sec = `${now.getSeconds()}`.padStart(2, "0");
  console.log(`${hour}:${min}:${sec}`);
}, 1000);
