import React, { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const NewExpenseNotifications = () => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState(null);

  useEffect(() => {
    // WebSocket URL
    const socketUrl = 'https://employee-image-latest.onrender.com/ws';
    
    // Create a STOMP client
    const client = new Client({
      brokerURL: socketUrl, // Use this for direct WebSocket connection
      webSocketFactory: () => new SockJS(socketUrl), // Use this for SockJS fallback
      onConnect: () => {
        console.log('Connected to WebSocket');

        // Subscribe to the topic
        client.subscribe('/topic/newExpense', (message) => {
          const expense = JSON.parse(message.body);
          console.log('New expense received:', expense);
          setNewExpense(expense);

          // Add the new expense to the list
          setExpenses((prevExpenses) => [expense, ...prevExpenses]);
        });
      },
      onStompError: (error) => {
        console.error('STOMP error:', error);
      },
    });

    // Activate the client
    client.activate();

    // Cleanup on component unmount
    return () => {
      client.deactivate();
      console.log('Disconnected from WebSocket');
    };
  }, []);

  return (
    <div>
      <h1>New Expense Notifications</h1>
      {newExpense && (
        <div>
          <h3>New Expense Alert!</h3>
          <p>Title: {newExpense.title}</p>
          <p>Amount: {newExpense.amount}</p>
          <p>Date: {newExpense.date}</p>
        </div>
      )}
      <h2>All Expenses</h2>
      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>
            <p>Title: {expense.title}</p>
            <p>Amount: {expense.amount}</p>
            <p>Date: {expense.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewExpenseNotifications;
