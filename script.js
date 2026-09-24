// ===============================
// Bank Management System
// ===============================

// Balance saved in browser
let balance = Number(localStorage.getItem("balance")) || 50000;

// Transactions saved in browser
let transactions = JSON.parse(localStorage.getItem("transactions")) || [
    {
        date: "Today",
        type: "Opening Balance",
        amount: 50000
    }
];


// ===============================
// Page Load
// ===============================

document.getElementById("dashboard").style.display = "none";

document.getElementById("balance").textContent = balance;

displayTransactions();


// ===============================
// Login System
// ===============================

function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let message = document.getElementById("loginMessage");

    if (username === "ahad" && password === "1234") {

        document.getElementById("loginPage").style.display = "none";
        document.getElementById("dashboard").style.display = "block";

    } else {

        message.innerHTML = "❌ Invalid Username or Password";
        message.style.color = "red";
    }
}


// ===============================
// Logout System
// ===============================

function logout() {

    document.getElementById("dashboard").style.display = "none";
    document.getElementById("loginPage").style.display = "flex";

    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("loginMessage").innerHTML = "";
}


// ===============================
// Deposit Money
// ===============================

function deposit() {

    const amount = Number(
        document.getElementById("depositAmount").value
    );

    if (amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    balance += amount;
localStorage.setItem("balance_" + localStorage.getItem("accountNumber"), balance);
    saveBalance();

    addTransaction("Deposit", amount);

    document.getElementById("balance").textContent = balance;

    document.getElementById("depositAmount").value = "";
}


// ===============================
// Withdraw Money
// ===============================

function withdraw() {

    const amount = Number(
        document.getElementById("withdrawAmount").value
    );

    if (amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    if (amount > balance) {
        alert("Insufficient balance!");
        return;
    }

    balance -= amount;
localStorage.setItem("balance_" + localStorage.getItem("accountNumber"), balance);
    saveBalance();

    addTransaction("Withdrawal", amount);

    document.getElementById("balance").textContent = balance;

    document.getElementById("withdrawAmount").value = "";
}


// ===============================
// Fund Transfer
// ===============================

function transferMoney() {

    const receiver =
        document.getElementById("receiverAccount").value;

    const amount =
        Number(document.getElementById("transferAmount").value);

    if (receiver === "") {
        alert("Please enter receiver account number.");
        return;
    }

    if (amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    if (amount > balance) {
        alert("Insufficient balance!");
        return;
    }

    balance -= amount;

    saveBalance();

    addTransaction("Transfer to " + receiver, amount);

    document.getElementById("balance").textContent = balance;

    document.getElementById("receiverAccount").value = "";
    document.getElementById("transferAmount").value = "";

    alert("Money transferred successfully!");
}


// ===============================
// Add Transaction
// ===============================

function addTransaction(type, amount) {
transactions.push({
    date: new Date().toLocaleString(),
    type: type,
    amount: amount
});


    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

    displayTransactions();
}


// ===============================
// Display Transactions
// ===============================

function displayTransactions() {

    const table =
        document.getElementById("transactionTable");

    table.innerHTML = "";

    transactions.forEach(function(transaction) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${transaction.date}</td>
            <td>${transaction.type}</td>
            <td>Rs. ${transaction.amount.toLocaleString()}</td>
        `;

        table.appendChild(row);
    });
}


// ===============================
// Save Balance
// ===============================

function saveBalance() {

    localStorage.setItem(
        "balance",
        balance
    );
}
// ===============================
// Create New Customer Account
// ===============================

function createAccount() {

    const name =
        document.getElementById("newCustomerName").value.trim();

    const accountNumber =
        document.getElementById("newAccountNumber").value.trim();

    const accountType =
        document.getElementById("newAccountType").value;

    const initialDeposit =
        Number(document.getElementById("initialDeposit").value);

    if (name === "") {
        alert("Please enter customer name.");
        return;
    }

    if (accountNumber === "") {
        alert("Please enter account number.");
        return;
    }

    if (initialDeposit < 0) {
        alert("Please enter a valid initial deposit.");
        return;
    }

    // Save customer information
    localStorage.setItem("customerName", name);
    localStorage.setItem("accountNumber", accountNumber);
    localStorage.setItem("accountType", accountType);

    // Set new balance
    balance = initialDeposit;

    localStorage.setItem("balance", balance);
localStorage.setItem("balance_" + accountNumber, initialDeposit);
    // Update dashboard
    document.querySelector(".customer-card").innerHTML = `
        <h2>Customer Information</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Account No:</strong> ${accountNumber}</p>
        <p><strong>Account Type:</strong> ${accountType}</p>
    `;

    document.getElementById("balance").textContent = balance;

    // Add opening transaction
    transactions = [
        {
            date: "Today",
            type: "Opening Balance",
            amount: initialDeposit
        }
    ];

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

    displayTransactions();

    alert("✅ New Account Created Successfully!");

    // Clear form
    document.getElementById("newCustomerName").value = "";
    document.getElementById("newAccountNumber").value = "";
    document.getElementById("initialDeposit").value = "";
}
// ===============================
// Search Customer Account
// ===============================

function searchCustomer() {

    const searchAccount =
        document.getElementById("searchAccount").value.trim();

    const result =
        document.getElementById("searchResult");

    const accountNumber =
        localStorage.getItem("accountNumber");

    const customerName =
        localStorage.getItem("customerName");

    const accountType =
        localStorage.getItem("accountType");

    if (searchAccount === "") {
        result.innerHTML = "❌ Please enter account number.";
        result.style.color = "red";
        return;
    }

    if (searchAccount === accountNumber) {

        result.innerHTML = `
            <h3>✅ Account Found</h3>
            <p><strong>Name:</strong> ${customerName}</p>
            <p><strong>Account No:</strong> ${accountNumber}</p>
            <p><strong>Account Type:</strong> ${accountType}</p>
            <p><strong>Balance:</strong> Rs. ${Number(localStorage.getItem("balance_" + accountNumber) || 0).toLocaleString()}</p>
        `;

        result.style.color = "green";

    } else {

        result.innerHTML = "❌ Account not found.";
        result.style.color = "red";
    }
}// ===============================
// Customer Account List
// ===============================

function displayAccounts() {

    const table = document.getElementById("accountTable");

    const name = localStorage.getItem("customerName");
    const accountNumber = localStorage.getItem("accountNumber");
    const accountType = localStorage.getItem("accountType");
document.getElementById("summaryAccountNumber").textContent = accountNumber;
document.getElementById("summaryAccountType").textContent = accountType;
    if (name && accountNumber && accountType) {

        const accountBalance =
            Number(localStorage.getItem("balance_" + accountNumber) || 0);

        table.innerHTML = `
            <tr>
                <td>${name}</td>
                <td>${accountNumber}</td>
                <td>${accountType}</td>
                <td>Rs. ${accountBalance.toLocaleString()}</td>
            </tr>
        `;

    } else {

        table.innerHTML = `
            <tr>
                <td colspan="4">No customer account found.</td>
            </tr>
        `;
    }
}

displayAccounts();// ===============================
// Transaction Summary
// ===============================

function updateTransactionSummary() {

    let totalDeposits = 0;
    let totalWithdrawals = 0;
    let totalTransfers = 0;

    transactions.forEach(function(transaction) {

        if (transaction.type === "Deposit") {
            totalDeposits += transaction.amount;
        }

        if (transaction.type === "Withdrawal") {
            totalWithdrawals += transaction.amount;
        }

        if (transaction.type.startsWith("Transfer to")) {
            totalTransfers += transaction.amount;
        }
    });

    document.getElementById("totalDeposits").textContent =
        "Rs. " + totalDeposits.toLocaleString();

    document.getElementById("totalWithdrawals").textContent =
        "Rs. " + totalWithdrawals.toLocaleString();

    document.getElementById("totalTransfers").textContent =
        "Rs. " + totalTransfers.toLocaleString();
}

updateTransactionSummary();
