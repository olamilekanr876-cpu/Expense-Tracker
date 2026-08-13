const transactionForm = document.getElementById("transactionForm");

const descriptionInput = document.getElementById("description");

const amountInput = document.getElementById("amount");

const typeInput = document.getElementById("type");

const transactionList = document.getElementById("transactionList");

const balanceDisplay = document.getElementById("balance");

const incomeDisplay = document.getElementById("income");

const expenseDisplay = document.getElementById("expense");


// Get saved transactions from Local Storage

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];


// Add transaction

transactionForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const description = descriptionInput.value.trim();

    const amount = Number(amountInput.value);

    const type = typeInput.value;


    if (description === "" || amount <= 0) {

        alert("Please enter a valid description and amount.");

        return;

    }


    const transaction = {

        id: Date.now(),

        description: description,

        amount: amount,

        type: type

    };


    transactions.push(transaction);


    saveTransactions();

    displayTransactions();

    updateSummary();


    transactionForm.reset();

});


// Save transactions

function saveTransactions() {

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

}


// Display transactions

function displayTransactions() {

    transactionList.innerHTML = "";


    transactions.forEach(function(transaction) {

        const li = document.createElement("li");

        li.classList.add(
            "transaction-item",
            transaction.type
        );


        li.innerHTML = `

            <div class="transaction-info">

                <h3>${transaction.description}</h3>

                <p>${transaction.type}</p>

            </div>


            <div>

                <span class="transaction-amount">

                    ${transaction.type === "income" ? "+" : "-"}
                    ₦${transaction.amount.toFixed(2)}

                </span>


                <button
                    class="delete-btn"
                    onclick="deleteTransaction(${transaction.id})"
                >
                    Delete
                </button>

            </div>

        `;


        transactionList.appendChild(li);

    });

}


// Delete transaction

function deleteTransaction(id) {

    transactions = transactions.filter(function(transaction) {

        return transaction.id !== id;

    });


    saveTransactions();

    displayTransactions();

    updateSummary();

}


// Update balance, income and expenses

function updateSummary() {

    let totalIncome = 0;

    let totalExpense = 0;


    transactions.forEach(function(transaction) {

        if (transaction.type === "income") {

            totalIncome += transaction.amount;

        } else {

            totalExpense += transaction.amount;

        }

    });


    const balance = totalIncome - totalExpense;


    incomeDisplay.textContent =
        `₦${totalIncome.toFixed(2)}`;


    expenseDisplay.textContent =
        `₦${totalExpense.toFixed(2)}`;


    balanceDisplay.textContent =
        `₦${balance.toFixed(2)}`;

}


// Display saved data when page loads

displayTransactions();

updateSummary();