import React, { useState , useEffect} from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import api from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";

const CreateResource = () => {
    const navigate = useNavigate();
    const {resourceId} = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  
  useEffect(() => {
    fetchResources();
}, []);

const fetchResources = async () => {
    if (resourceId) {
    try {
        const response = await api.get(`/resources/educational-resource/${resourceId}`, {withCredentials:true});
  
        setTitle(response.data.title);
        setContent(response.data.content);

    } catch (err) {
        console.error('Failed to fetch resources', err);
    }}
    else {
        setError("No Id Found");
        console.log(error);
        //navigate("/user/resources");
    }
};

  const handleSubmit = async (e) => {
    let author = 'admin';
    e.preventDefault();
    let response;
    try {
        if (!resourceId) {
       response = await api.post("/resources/educational-resource", {
        title,
        content,
        author
      }, {withCredentials:true});
    } else {
         response = await api.put(`/resources/educational-resource/${resourceId}`, {
            title,
            content,
            author
          }, {withCredentials:true});
    }
      //console.log("Resource created:", response.data);
      navigate('/admin/resources');
    } catch (error) {
      console.error("Error creating resource:", error.response.data);
    }
  };

  return (
    <div className="add-income">
      <div class="page-wrapper">
        <div class="content">
          <h2>{resourceId ? "Edit Educational Resource" : "Create Resource"}</h2>
          <div class="card">
            <div class="card-body">
              <form onSubmit={handleSubmit}>
                <div class="row">
                  <div class="form-group col-12">
                    <label>Title:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div class="form-group col-12">
                    <label>Content:</label>
                    <ReactQuill
                      value={content}
                      onChange={setContent}
                      className="form-control"
                    />
                  </div>
                  <div class="form-group col-12">
                    <button type="submit" className="btn btn-primary">
                      Create Resource
                    </button>
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

export default CreateResource;
