import React, { useState, useEffect } from "react";
import api from "../../services/api";
import {Link} from 'react-router-dom';
const IncomeList = () => {
  const [incomes, setIncomes] = useState([]);
;
  useEffect(() => {
    const fetchIncomes = async () => {
      try {
        const response = await api.get("/income", {withCredentials:true});
        setIncomes(response.data);
      } catch (err) {
        console.error("Error fetching income records:", err);
      }
    };

    fetchIncomes();
  }, []);

  const handleDelete = async (incomeId) => {
    console.log(incomeId);
    try {
      await api.delete(`/income/${incomeId}`, {withCredentials:true});
      setIncomes(incomes.filter((income) => income.incomeId !== incomeId));
    } catch (err) {
      console.error("Error deleting income record:", err);
    }
  };

  return (
  
<div class="page-wrapper">
            <div class="content">
                <div class="page-header">
                    <div class="page-title">
                        <h2>My Income list</h2>
                        <h6>View/Search product Category</h6>
                    </div>
                    <div class="page-btn">
                        <a href="/user/addincome" class="btn btn-added">
                            <img src="/assets/img/icons/plus.svg" class="me-1" alt="img" />Add Income
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
                                        <span><img src="/assets/img/icons/closes.svg" alt="img" /></span>
                                    </a>
                                </div>
                                <div class="search-input">
                                    <a class="btn btn-searchset"><img src="/assets/img/icons/search-white.svg"
                                            alt="img" /></a>
                                </div>
                            </div>
                            <div class="wordset">
                                <ul>
                                    <li>
                                        <a data-bs-toggle="tooltip" data-bs-placement="top" title="pdf"><img
                                                src="/assets/img/icons/pdf.svg" alt="img" /></a>
                                    </li>
                                    <li>
                                        <a data-bs-toggle="tooltip" data-bs-placement="top" title="excel"><img
                                                src="/assets/img/icons/excel.svg" alt="img" /></a>
                                    </li>
                                    <li>
                                        <a data-bs-toggle="tooltip" data-bs-placement="top" title="print"><img
                                                src="/assets/img/icons/printer.svg" alt="img" /></a>
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
                                        <th>Source</th>
                                        <th>Amount</th>
                                        <th>Description</th>
                                        <th>Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                  { incomes.map((income) => (
                                      <tr  key={income.incomeId}>
                                      <td>
                                          <label class="checkboxs">
                                              <input type="checkbox" />
                                              <span class="checkmarks"></span>
                                          </label>
                                      </td>
                                      <td class="productimgname">
                                          
                                          <a href="javascript:void(0);"> {income.source} </a>
                                      </td>
                                      <td>{income.amount}</td>
                                      <td>{income.description}</td>
                                      <td>{new Date(income.date).toLocaleDateString()}</td>
                                      <td>
                                          
                                          <Link className="me-3" to={`/user/income/edit/${income.incomeId}`}>
                                          <img src="/assets/img/icons/edit.svg" alt="img" />
                                          </Link>
                                          
                                          <a class="me-3 confirm-text"  
                                          onClick={() => handleDelete(income.incomeId)}>
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
  );
};

export default IncomeList;
