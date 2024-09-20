import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import DynamicChart from '../../DynamicChart';

const AllExpenseReport = ({ data }) => {
    
    console.log(data);
    
    return (
        <div>
            <h3>My Expenses Listing</h3>
            
            {data.length <= 0 && (
                <div className='row'>
                    <div className='col-12'>
                <div className='alert alert-danger'>
                    Sorry, no data exists for the selected report range
                    </div>
                    </div>
                    </div>  
            )}
            <div className='row'>
               
                <div className='col-12 '>

                        <table class="table table-striped table-hover  datanew">
                                <thead>
                                    <tr>
                                        <th>
                                            SN
                                        </th>
                                        <th>Category Name</th>
                                        <th>Amount</th>
                                        <th>Description</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
           
                                {data.map((data, index) => (
                                    <tr key={data.expenseId}>
                                         <td>
                                            {index + 1}.
                                        </td>
                                        <td>{data.categoryName}</td>
                                        <td>{data.amount}</td>
                                        <td>{data.description}</td>
                                        <td>{new Date(data.date).toLocaleDateString()}</td>
                                       
                                    </tr>
                                ))}
                                </tbody>
                            </table>

                </div>
            </div>
            
           
        </div>
    );
};

export default AllExpenseReport;
