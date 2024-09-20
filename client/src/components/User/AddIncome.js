import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';



const AddIncome = () => {
    const [amount, setAmount] = useState('');
    const [source, setSource] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();
    const { incomeId } = useParams(); // This will Get incomeId from route param

     // Load existing income data if editing
     useEffect(() => {
        if (incomeId) {
            const fetchIncome = async () => {
                try {
                    
                    const response = await api.get(`/income/${incomeId}`, {withCredentials:true});
                    const income = response.data;
                    console.log(income);
                    setAmount(income.amount);
                    setSource(income.source);
                    setDate(income.date);
                    setDescription(income.description);
                } catch (err) {
                    setMessage('Failed to load income data');
                }
            };
            fetchIncome();
        }
    }, [incomeId]);

    const validate = () => {
        let errors = {};
        if (!amount || isNaN(amount) || amount <= 0) errors.amount = "Amount must be a positive number.";
        if (!source) errors.source = "Source is required.";
        if (!date) errors.date = "Date is required.";
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const incomeData = { amount, source, date, description };

        try {
            if (incomeId) {
                // Update existing income
                await api.put(`/api/income/${incomeId}`, { amount, source, date, description }, {withCredentials:true});
                setMessage('Income updated successfully');
                setTimeout(() => navigate('/login'), 3000); 

            } else {
            await api.post('/income', incomeData, {withCredentials:true});
            setMessage('Income added successfully!');
            }
            setAmount('');
            setSource('');
            setDate('');
            setDescription('');
            setErrors({});
        } catch (err) {
            if (err.response && err.response.data) {
                setMessage(err.response.data.message || 'An error occurred');
            } else {
                setMessage('An error occurred. Please try again later.');
            }
        }
    };

    return (
        <div className="add-income">
              <div class="page-wrapper">
            <div class="content">
            <h2>{incomeId ? 'Edit Income' : 'Add Income'}</h2>
            <div class="card">
            <div class="card-body">
            <form onSubmit={handleSubmit}>
            <div class="row">
                  <div class="form-group col-12 col-md-4">
                    <label htmlFor="amount">Amount:</label>
                    <input
                        type="number" className='form-control'
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                    {errors.amount && <p className="error">{errors.amount}</p>}
                </div>
                <div class="form-group col-12 col-md-4">

                    <label htmlFor="source">Source:</label>
                    <input
                        type="text" className='form-control'
                        id="source"
                        value={source}
                        onChange={(e) => setSource(e.target.value)}
                        required
                    />
                    {errors.source && <p className="error">{errors.source}</p>}
                </div>
                <div class="form-group col-12 col-md-4">

                    <label htmlFor="date">Date:</label>
                    <input
                        type="date" className='form-control'
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                    {errors.date && <p className="error">{errors.date}</p>}
                </div>
                <div class="form-group col-12 ">

                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description" className='form-control'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button type="submit" className='btn btn-submit' >{incomeId ? 'Update Income' : 'Add Income'}</button>
                {message && <p>{message}</p>}
                </div>
            </form>
            </div>
            </div>
            </div>
            </div>
        </div>
    );
};

export default AddIncome;
