import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import './ExpenseForm.css';

const ExpenceForm = ({addExpense}) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Choose...");

  const handleSubmit = (e) => {
    e.preventDefault();

    const expense = {
      amount: parseFloat(amount),
      description,
      category,
    };

    addExpense(expense);

    setAmount("");
    setDescription("");
    setCategory("Choose...");
  };

  return (
    <div className="form-container">
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Col} className="mb-3">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </Form.Group>

        <Form.Group as={Col} className="mb-3">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            type="text"
            value={description}
            placeholder="Enter Description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>Category:</Form.Label>
          <Form.Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Choose...</option>
            <option>Food</option>
            <option>Petrol</option>
            <option>Rent</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit" className="submit-btn">
          Add Expense
        </Button>
      </Form>
    </div>
  );
};

export default ExpenceForm;
