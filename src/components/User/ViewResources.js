import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import {Link} from 'react-router-dom';

const ViewResources = () => {
    const [resources, setResources] = useState([]);
    
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
        try {
            await api.delete(`/resources/educational-resource/${id}`, {withCredentials:true});
            fetchResources();
        } catch (err) {
            console.error('Failed to delete resource', err);
        }
    };
    return (
      <div className="add-income">
        <div class="page-wrapper">
          <div class="content">
            <div>
              <h3>Educational Resources</h3>

              {resources.length <= 0 && (
                <div className="row">
                  <div className="col-12">
                    <div className="alert alert-danger">
                      Sorry, no resource exists
                    </div>
                  </div>
                </div>
              )}

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
                            
                          </tr>
                        </thead>
                        <tbody>
                          {resources.map((data, index) => (
                            <tr key={index}>
                              <td>{index + 1}.</td>
                              <td>
                                <Link to={`/user/resources/${data.resourceId}`}>
                                {data.title}
                                </Link>
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

export default ViewResources;