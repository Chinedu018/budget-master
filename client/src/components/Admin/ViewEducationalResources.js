import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import {Link} from 'react-router-dom';

const ViewEducationalResources = () => {
    const [resources, setResources] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');

    useEffect(() => {
        fetchResources();
    }, []);

    const fetchResources = async () => {
        try {
            const response = await api.get('/resources/educational-resource', {withCredentials:true});
            setResources(response.data);
        } catch (err) {
            console.error('Failed to fetch resources', err);
        }
    };

    const handleDeleteResource = async (id) => {
        // Show a confirmation prompt to the user
        const isConfirmed = window.confirm('Are you sure you want to delete this resource?');

        if (isConfirmed) {
            try {
                await api.delete(`/resources/educational-resource/${id}`, { withCredentials: true });
                fetchResources();
            } catch (err) {
                console.error('Failed to delete resource', err);
            }
        }
    };

    
    return (
      <div className="add-income">
        <div class="page-wrapper">
          <div class="content">
            <div>
              <h3> 
                  Admin: Educational Resources <Link to={'/admin/resources/create'} className='me-3' style={{float:'right'}}>
                  <img src="/assets/img/icons/plus.svg" alt="img" /> Add New
                    </Link> </h3>

              {resources.length <= 0 && (
                <div className="row">
                  <div className="col-12">
                    <div className="alert alert-danger">
                      Sorry, no data exists for the selected report range
                    </div>
                  </div>
                </div>
              )}
              <span className='clearfix'></span>

{resources.length > 0 && (
              <div class="card">
                <div class="card-body">
                  <div className="row">
                    <div className="col-12 ">
                      <table class="table table-striped table-hover  datanew">
                        <thead>
                          <tr>
                            <th>SN</th>
                            
                            <th>Title</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {resources.map((data, index) => (
                            <tr key={index}>
                              <td>{index + 1}.</td>
                              <td>  <Link to={`/admin/resources/${data.resourceId}`}>
                                {data.title}
                                </Link>
                                </td>
                              
                              <td>
                              <Link className='me-3' to={`/admin/resources/edit/${data.resourceId}`}>
                              <img src="/assets/img/icons/edit.svg" alt="img" />

                                </Link>
                                
                              <a class="me-3" onClick={() => handleDeleteResource(data.resourceId)} >
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
            )}
            </div>
          </div>
        </div>
      </div>
    );
};

export default ViewEducationalResources;