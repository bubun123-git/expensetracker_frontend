import React, { useState } from "react";
import styles from "../StartingPage/StartingPage.css";
import { useEffect } from "react";


function StartingPAge() {
    const [enteredExpense, setEnteredExpense] = useState("");
    const [enteredMoney, setEnteredMoney] = useState("");
    const [enteredDescription, setEnteredDescription] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("food");
    const [expenses, setExpenses] = useState([]);
    const [editMode, setEditMode] = useState(null);

    const enteredEmail = localStorage.getItem('email');
    const updatedEmail = enteredEmail ? enteredEmail.replace('@', '').replace('.', '') : '';

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await fetch(`https://expense-tracker-8d0b3-default-rtdb.firebaseio.com/user/${updatedEmail}.json`);
                if (!response.ok) {
                    throw new Error('Something went wrong!');
                }
                const data = await response.json();
                if (data) {
                    const loadedExpenses = Object.keys(data).map(key => ({
                        id: key,
                        ...data[key]
                    }));
                    setExpenses(loadedExpenses);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchExpenses();
    }, [updatedEmail]);

    function handleFormSubmit(e) {
        e.preventDefault();

        if (editMode !== null) {
            // Handle editing of an existing expense
            const updatedExpense = {
                title: enteredExpense,
                money: enteredMoney,
                description: enteredDescription,
                category: selectedCategory,
            };

            const expenseId = expenses[editMode].id;

            fetch(`https://expense-tracker-8d0b3-default-rtdb.firebaseio.com/user/${updatedEmail}/${expenseId}.json`, {
                method: 'PUT',
                body: JSON.stringify(updatedExpense),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Something went wrong!');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);

                    // Update the expenses list with the edited expense
                    const updatedExpenses = [...expenses];
                    updatedExpenses[editMode] = updatedExpense;
                    setExpenses(updatedExpenses);

                    // Clear the edit mode
                    setEditMode(null);

                    // Clear the input fields after editing the expense
                    setEnteredExpense("");
                    setEnteredMoney("");
                    setEnteredDescription("");
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            // Handle adding a new expense
            const newExpense = {
                title: enteredExpense,
                money: enteredMoney,
                description: enteredDescription,
                category: selectedCategory,
            };

            fetch(`https://expense-tracker-8d0b3-default-rtdb.firebaseio.com/user/${updatedEmail}.json`, {
                method: 'POST',
                body: JSON.stringify(newExpense),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Something went wrong!');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);

                    // Update the expenses list with the new expense
                    setExpenses([...expenses, newExpense]);

                    // Clear the input fields after adding the expense
                    setEnteredExpense("");
                    setEnteredMoney("");
                    setEnteredDescription("");
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    function handleExpenseDelete(id) {
        fetch(`https://expense-tracker-8d0b3-default-rtdb.firebaseio.com/user/${updatedEmail}/${id}.json`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Something went wrong while deleting the expense');
                }

                // Remove the deleted expense from the expenses list
                setExpenses(expenses.filter(expense => expense.id !== id));
            })
            .catch(error => {
                console.log(error);
            });
    }

    // Calculate the total expenses
    const totalExpenses = expenses.reduce((total, expense) => total + parseFloat(expense.money), 0);

    function handleEditClick(index) {
        if (index >= 0 && index < expenses.length) {
            // Check if the index is within bounds

            // Set the edit mode to the index of the expense you want to edit
            setEditMode(index);

            // Populate the form fields with the data of the expense you want to edit
            const expenseToEdit = expenses[index];
            if (expenseToEdit) {
                setEnteredExpense(expenseToEdit.title || "");
                setEnteredMoney(expenseToEdit.money || "");
                setEnteredDescription(expenseToEdit.description || "");
                setSelectedCategory(expenseToEdit.category || "");
            }
        }
    }

    function downloadCSV() {

        const csvData = "Title,Amount Spent,Description,Category\n" + expenses.map(expense => (
            `${expense.title},${expense.money},${expense.description},${expense.category}`
        )).join("\n");

       
        const blob = new Blob([csvData], { type: "text/csv" });

        
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "expenses.csv";
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();

        
        document.body.removeChild(a);
    }





    return (
        <div className={styles.container}>
            <h1>EXPENSES</h1>
            <form className="form" onSubmit={handleFormSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="title" className={styles.label}>
                        Expense Title
                    </label>
                    <input
                        onChange={(e) => setEnteredExpense(e.target.value)}
                        value={enteredExpense}
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Enter your title"
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="money" className={styles.label}>
                        Amount Spent
                    </label>
                    <input
                        onChange={(e) => setEnteredMoney(e.target.value)}
                        value={enteredMoney}
                        type="text"
                        id="money"
                        name="money"
                        placeholder="Enter your money"
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="description" className={styles.label}>
                        Description
                    </label>
                    <input
                        onChange={(e) => setEnteredDescription(e.target.value)}
                        value={enteredDescription}
                        type="text"
                        id="description"
                        name="description"
                        placeholder="Enter your description"
                        className={styles.input}
                    />
                </div>
                <br />
                <div className={styles.formGroup}>
                    <label htmlFor="category" className={styles.label}>
                        Category
                    </label>
                    <select
                        id="category"
                        name="category"
                        className="form-select"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="food">Food</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="travel">Travel</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <br />
                <button type="submit" className="btn btn-success">
                    Add Expense
                </button>
            </form>
            <div className="expenses-list">
                <h2>Expenses Added</h2>
                <ul>
                    {expenses.map((expense, index) => (
                        <li key={index} className="expense-item">
                            <div className="expense-details">
                                <strong>Title:</strong> {expense.title},&nbsp;
                                <strong>Amount Spent:</strong> {expense.money},&nbsp;
                                <strong>Description:</strong> {expense.description},&nbsp;
                                <strong>Category:</strong> {expense.category}
                            </div>
                            <button onClick={() => handleEditClick(index)} className="btn btn-warning">Edit</button>
                            <button onClick={() => handleExpenseDelete(expense.id)} className="btn btn-danger">Delete</button>

                        </li>

                    ))}

                </ul>
            </div>
            <div class="mx-auto p-2">

                {totalExpenses > 10000 && (
                    <button type="button" class="btn btn-success">Activate Premium</button>
                )}

            </div>


            <button type="button" class="btn btn-success" onClick={downloadCSV} className="btn btn-primary">
                Download Expenses as CSV
            </button>

        </div>
    );
}

export default StartingPAge;
