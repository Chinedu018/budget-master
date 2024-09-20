import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const ExpenseCategoryForm = ({ categoryToEdit, onSave }) => {
    const [categoryId, setCategoryId] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');

    const clearStates = () => {
        setCategoryId('');
        setCategoryName('');
        setDescription('');
    }
    useEffect(() => {
      if (categoryToEdit) {
        setCategoryId(categoryToEdit.categoryId);
        setCategoryName(categoryToEdit.categoryName);
        setDescription(categoryToEdit.description);
      } else {
        setCategoryId('');
        setCategoryName('');
        setDescription('');
      }
    }, [categoryToEdit]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      const data = { categoryName, description };
      try {
        if (categoryId) {
          await api.put(`/expense-category/${categoryId}`, data, { withCredentials: true });
          setMessage('Category Updated Successfully');
          clearStates();

        } else {
          await api.post('/expense-category', data, { withCredentials: true });
          setMessage('Category Added Successfully');
          clearStates();
        }
        onSave();
        
      } catch (error) {
        if (categoryId) {
        setMessage('Error Updating category:', error);
        } else {
        setMessage('Error saving category:', error);
        }
      }
    };
  
    return (
      <div>
         <div class="page-wrapper">
            <div class="content">
                <div class="page-header">
                    <div class="page-title">
                    <h2>{categoryId ? 'Edit' : 'Add'} Expense Category</h2>
                        
                    </div>
                </div>
                 {message && <div className="text-danger text-center">{message}</div>}

                <div class="card">
                    <div class="card-body">
                    <form onSubmit={handleSubmit}>
                        <div class="row">
                            <div class="col-12">
                                <div class="form-group">
              
                                    <label>Category Name:</label>
                                            <input
                                            type="text"
                                            value={categoryName}
                                            onChange={(e) => setCategoryName(e.target.value)}
                                            required
                                            />
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="form-group">
                                    <label>Description</label>
                                    
                                    <textarea className="form-control" value={description}
                                            onChange={(e) => setDescription(e.target.value)}> </textarea>
                                </div>
                            </div>
                          
                            <div class="col-12">
                                <button type='submit' class="btn btn-submit me-2">Save </button>
                                <a href="/user/expenses" class="btn btn-cancel">Cancel</a>
                            </div>
                        </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
       
       </div> 
    );
  };
  
  export default ExpenseCategoryForm;