import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useNavigate, useParams, Link } from 'react-router-dom';

const ResourceDetail = () => {
    const [resource, setResource] = useState([]);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const {resourceId} = useParams();

    useEffect(() => {
        fetchResources();
    }, []);

    const fetchResources = async () => {
        if (resourceId) {
        try {
            const response = await api.get(`/resources/educational-resource/${resourceId}`, {withCredentials:true});
            console.log(response.data);
            setResource(response.data);

        } catch (err) {
            console.error('Failed to fetch resources', err);
        }}
        else {
            setError("No Id Found");
            console.log(error);
            //navigate("/user/resources");
        }
    };

    return (
      <div className="add-income">
        <div class="page-wrapper">
          <div class="content">
            <div>
              {resource.length <= 0 && (
                <div className="row">
                  <div className="col-12">
                    <div className="alert alert-danger">
                      Sorry, no data exists for the selected resouce
                    </div>
                  </div>
                </div>
              )}

<Link className='btn btn-warning btn-sm' to="/admin/resources"><i className='fa fa-arrow-left'></i> Back to All Resources</Link>

              <div class="card">
                <div class="card-body">
                  <div className="row">
                    <div className="col-12 ">
                        
                            <div >
                            <h2 className='text-primary'>{resource.title}</h2>
                            <p> 
                              
                              Posted by: <em>Admin</em> &nbsp;&bull;&nbsp; Posted on: <em>{new Date(resource.createdAt).toDateString()}</em> </p>
                            <hr />
                              <div dangerouslySetInnerHTML={{ __html: resource.content }} />
                                </div>
                          
                        
                    </div>
                  </div>
                </div>
              </div> 

            </div>
          </div>
        </div>
      </div>
    );
};

export default ResourceDetail;