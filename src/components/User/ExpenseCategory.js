// src/components/ExpenseCategoryList.js

import React, { useEffect, useState } from "react";
import api from "../../services/api";

// src/pages/ExpenseCategoryPage.js
import ExpenseCategoryForm from "./ExpenseCategoryForm";

const ExpenseCategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [categoryToEdit, setCategoryToEdit] = useState(null);

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Function to fetch categories
  const fetchCategories = async () => {
    try {
      const response = await api.get("/expense-category", {
        withCredentials: true,
      });
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Function to handle category edit
  const handleEdit = (category) => {
    setCategoryToEdit(category);
  };

  // Function to handle category delete
  const handleDelete = async (categoryId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this Category? This action is Irreversible. All expense records on it will be erased. Continue?"
    );

    if (isConfirmed) {
      try {
        await api.delete(`/expense-category/${categoryId}`, {
          withCredentials: true,
        });
        fetchCategories(); // Reload categories after delete
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  // Function to handle form save
  const handleSave = () => {
    setCategoryToEdit(null);
    fetchCategories(); // Reload categories after save
  };

  // Render categories table and form
  return (
    <div>
      {/* Form for adding/editing categories */}
      <ExpenseCategoryForm
        categoryToEdit={categoryToEdit}
        onSave={handleSave}
      />
      <div class="page-wrapper">
        <div class="content">
          <div class="page-header">
            <div class="page-title">
              <h4>Expense Category list</h4>
              <h6>View/Search Categories</h6>
            </div>
            <div class="page-btn">
              <a href="/add-category" class="btn btn-added">
                <img src="/assets/img/icons/plus.svg" class="me-1" alt="img" />
                Add Category
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
                      <th>Category name</th>
                      <th>Description</th>
                      <th>Created </th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((category) => (
                      <tr key={category.categoryId}>
                        <td>
                          <label class="checkboxs">
                            <input type="checkbox" />
                            <span class="checkmarks"></span>
                          </label>
                        </td>
                        <td>{category.categoryName}</td>
                        <td>{category.description}</td>
                        <td>
                          {new Date(category.createdAt).toLocaleDateString()}
                        </td>
                        <td>
                          <a class="me-3" onClick={() => handleEdit(category)}>
                            <img src="/assets/img/icons/edit.svg" alt="img" />
                          </a>

                          <a
                            class="me-3 confirm-text"
                            onClick={() => handleDelete(category.categoryId)}
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

export default ExpenseCategoryPage;
