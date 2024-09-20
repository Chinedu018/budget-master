// src/components/ExpenseList.js
import React, { useEffect, useState } from "react";
import api from "../../services/api";
import ExpenseForm from "./ExpenseForm";
import { Link } from "react-router-dom";

const ExpensePage = () => {
  const [expenses, setExpenses] = useState([]);
  const [expenseToEdit, setExpenseToEdit] = useState(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await api.get("/expense", { withCredentials: true });
      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  
  const handleDelete = async (expenseId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this record? This action is Irreversible."
    );

    if (isConfirmed) {
      try {
        await api.delete(`/expense/${expenseId}`, { withCredentials: true });
        fetchExpenses();
      } catch (error) {
        console.error("Error deleting expense:", error);
      }
    }
  };

  return (
    <div>
      

      <div class="page-wrapper">
        <div class="content">
          <div class="page-header">
            <div class="page-title">
              <h4>My Expenses</h4>
              <h6>View/Search Expenses</h6>
            </div>
            <div class="page-btn">
              <a href="/user/expenses/add" class="btn btn-added">
                <img src="/assets/img/icons/plus.svg" class="me-1" alt="img" />
                Add Expense
              </a>
            </div>
          </div>

          <div class="card">
            <div class="card-body">
              <div class="table-top">
                <div class="search-set">
                  <div class="search-path">
                    <a class="btn btn-filter" id="filter_search">
                      <img src="/assets/img/icons/filter.svg" alt="img" />
                      <span>
                        <img src="/assets/img/icons/closes.svg" alt="img" />
                      </span>
                    </a>
                  </div>
                  <div class="search-input">
                    <a class="btn btn-searchset">
                      <img src="/assets/img/icons/search-white.svg" alt="img" />
                    </a>
                  </div>
                </div>
                <div class="wordset">
                  <ul>
                    <li>
                      <a
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="pdf"
                      >
                        <img src="/assets/img/icons/pdf.svg" alt="img" />
                      </a>
                    </li>
                    <li>
                      <a
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="excel"
                      >
                        <img src="/assets/img/icons/excel.svg" alt="img" />
                      </a>
                    </li>
                    <li>
                      <a
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="print"
                      >
                        <img src="/assets/img/icons/printer.svg" alt="img" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="table-responsive">
                <table class="table  datanew">
                  <thead>
                    <tr>
                      <th>
                        <label class="checkboxs">
                          <input type="checkbox" id="select-all" />
                          <span class="checkmarks"></span>
                        </label>
                      </th>
                      <th>Category Name</th>
                      <th>Amount</th>
                      <th>Description</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses.map((expense) => (
                      <tr key={expense.expenseId}>
                        <td>
                          <label class="checkboxs">
                            <input type="checkbox" />
                            <span class="checkmarks"></span>
                          </label>
                        </td>
                        <td>{expense.categoryName}</td>
                        <td>{expense.amount}</td>
                        <td>{expense.description}</td>
                        <td>{new Date(expense.date).toLocaleDateString()}</td>
                        <td>
                          <Link
                            className="me-3"
                            to={`/user/expenses/edit/${expense.expenseId}`}
                          >
                            <img src="/assets/img/icons/edit.svg" alt="img" />
                          </Link>
                          
                          <a
                            class="me-3"
                            onClick={() => handleDelete(expense.expenseId)}
                          >
                            <img src="/assets/img/icons/delete.svg" alt="img" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpensePage;
