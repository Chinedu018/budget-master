// src/components/ExpenseForm.js
import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';

const ExpenseForm = () => {
    
    const [amount, setAmount] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');
    const [expenseToEdit, setExpenseToEdit] = useState(null);

    const {expenseId} = useParams();
    const navigate = useNavigate();

    
          

    useEffect(() => {

        const fetchExpense = async () => {
            if ( expenseId) {   
                  try {
                
                const response = await api.get(`/expense/${expenseId}`, {withCredentials:true});
                setExpenseToEdit( response.data);
          
                    console.log("here")
                    setAmount(response.data.amount);
                    setCategoryId(response.data.categoryId);
                    setDate(response.data.date.split('T')[0]);
                    setDescription(response.data.description);
                
            } catch (err) {
                setError('Failed to load expense data', err.message);
            }
        } else {
            setAmount('');
            setCategoryId('');
            setDate('');
            setDescription('');
        }

        }

        

        fetchExpense();  

        // Fetch categories when component mounts
        const fetchCategories = async () => {
            try {
                const response = await api.get('/expense-category', { withCredentials: true });
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setError('An error occurred while fetching categories.');
            }
        };

        fetchCategories();
    }, []);



    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const data = { amount, categoryId, date, description };
         try {
            if (expenseId) {
                await api.put(`/expense/${expenseId}`, data, { withCredentials: true });
            setError('Expense Updated  Successfully.');

            } else {
                await api.post('/expense', data, { withCredentials: true });
            setError('Expense recorded Successfully.');

            }
            setTimeout(() => {
                navigate("/user/expenses");
            }, 2000);
        } catch (error) {
            console.error('Error saving expense:', error);
            setError('An error occurred while saving the expense.');
        }
    };

    return (
        <div>
         <div class="page-wrapper">
            <div class="content">
                <div class="page-header">
                    <div class="page-title">
                    <h2>{expenseId ? 'Edit' : 'Add'} Expense</h2>

                    </div>
                </div>
                 {error && <div className="text-danger text-center">{error}</div>}

                <div class="card">
                    <div class="card-body">
            <form onSubmit={handleSubmit}>
            <div class="row">
                            <div class="col-12 col-md-4">
                                <div class="form-group">
                
                    <label>Amount:</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        className="form-control"
                    />
                </div>
                </div>
                <div class="col-12  col-md-4">
                                <div class="form-group">
                    <label>Category:</label>
                    <select
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        required
                        className="form-control"
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category.categoryId} value={category.categoryId}>
                                {category.categoryName}
                            </option>
                        ))}
                    </select>
                </div>
                </div>
                <div class=" col-md-4">
                                <div class="form-group">
                    <label>Date:</label>
                    <input className="form-control"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                </div>
                <div>
                    <label>Description:</label>
                    <textarea className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                
                <div class="col-12">
                <div class="form-group mt-3">

                                <button type='submit' class="btn btn-submit me-2">Save </button>
                                <a href="/user/expenses" class="btn btn-cancel">Cancel</a>
                            </div>
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

export default ExpenseForm;
