import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import './ExpenseForm.css';
import { useDispatch } from 'react-redux';
import { addExpense } from '../Store/ExpenseReducer'; 

const ExpenceForm = ({ addExpense }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Choose...");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const StoreUrl = 'https://expance-tracker-3483a-default-rtdb.firebaseio.com/expenses.json';

    const expense = {
      amount: parseFloat(amount),
      description,
      category,
    };

    fetch(StoreUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(expense),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to store expense details');
        }
        return response.json();
      })
      .then(responseData => {
        console.log('Expense details stored successfully', responseData);
        const id = responseData.name;
        console.log(id);
        dispatch(addExpense(expense));
        addExpense({ id, ...expense });
      })
      .catch(error => {
        console.log('Error updating user details', error);
      });

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
