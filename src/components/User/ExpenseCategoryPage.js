// src/pages/ExpenseCategoryPage.js
import api from '../../services/api';

import React, { useState } from 'react';
import ExpenseCategoryList from './ExpenseCategory';
import ExpenseCategoryForm from './ExpenseCategoryForm';

const ExpenseCategoryPage = () => {
  const [categoryToEdit, setCategoryToEdit] = useState(null);

  const handleEdit = (category) => {
    setCategoryToEdit(category);
  };

  const handleDelete = async (categoryId) => {
    try {
      await api.delete(`/expense-category/${categoryId}`, {withCredentials:true});
      // Optionally reload the DataTable or handle state change
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleSave = () => {
    setCategoryToEdit(null);
    // Optionally reload the DataTable or handle state change
  };

  return (
    <div>
      <ExpenseCategoryList onEdit={handleEdit} onDelete={handleDelete} />
      {/* <ExpenseCategoryForm categoryToEdit={categoryToEdit} onSave={handleSave} /> */}
    </div>
  );
};

export default ExpenseCategoryPage;
