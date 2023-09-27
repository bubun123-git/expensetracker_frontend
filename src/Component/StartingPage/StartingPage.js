import React, { useState } from "react";
import styles from "../StartingPage/StartingPage.css";

function StartingPAge() {
    const [enteredExpense, setEnteredExpense] = useState("");
    const [enteredMoney, setEnteredMoney] = useState("");
    const [enteredDescription, setEnteredDescription] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("food");
    const [expenses, setExpenses] = useState([]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
        const newExpense = {
            title: enteredExpense,
            money: enteredMoney,
            description: enteredDescription,
            category: selectedCategory,
        }
        setExpenses([...expenses, newExpense]);

        // Clear the input fields after adding the expense
        setEnteredExpense("");
        setEnteredMoney("");
        setEnteredDescription("");
    };

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
                <div className={styles.formGroup}>
                    <label htmlFor="category" className={styles.label}>
                        Category
                    </label>
                    <select id="category" name="category" className={styles.select} value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}>
                        <option value="food">Food</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="travel">Travel</option>
                        <option value="other">Other</option>
                    </select>
                </div><br />
                <button type="submit" className={styles.actionButton}>
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
