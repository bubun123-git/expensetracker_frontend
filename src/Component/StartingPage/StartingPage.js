import React, { useState } from "react";
import styles from "../StartingPage/StartingPage.css";
import { useEffect } from "react";


function StartingPAge() {
    const [enteredExpense, setEnteredExpense] = useState("");
    const [enteredMoney, setEnteredMoney] = useState("");
    const [enteredDescription, setEnteredDescription] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("food");
    const [expenses, setExpenses] = useState([]);
    
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

        const newExpense = {
            title: enteredExpense,
            money: enteredMoney,
            description: enteredDescription,
            category: selectedCategory,
        };

        fetch(`https://expense-tracker-8d0b3-default-rtdb.firebaseio.com//user/${updatedEmail}.json`, {
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


    return (
        <div className={styles.container}>
            <h1 className="fs-title">EXPENSES</h1>
            <form className={styles.form} onSubmit={handleFormSubmit}>
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
            <div>
                <h2 className="fs-title">Expenses Added</h2>
                <ul>
                    {expenses.map((expense, index) => (
                        <li key={index}>
                            <strong>Title:</strong> {expense.title},&nbsp;
                            <strong>Amount Spent:</strong> {expense.money},&nbsp;
                            <strong>Description:</strong> {expense.description},&nbsp;
                            <strong>Category:</strong> {expense.category}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default StartingPAge;
