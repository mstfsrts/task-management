import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Loading from '../../components/Loading/Loading';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import useTaskForm from '../../hooks/useTaskForm';
import './TaskForm.css';


const TaskForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {formData, loading, error, handleChange, handleSubmit } = useTaskForm(id);

  if (loading) return <Loading />;

  return (
    <div className="task-form-container">
      <div className="task-form-header">

        <button
          className="back-button"
          onClick={() => navigate(-1)} 
        >
          <FaArrowLeft size={16}  />
        </button>


        <h2>{id ? 'Edit Task' : 'Create New Task'}</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="task-form">
        <ErrorMessage message={error} />
        
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status *</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="TODO">Todo</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="category">Category *</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group" style={{marginBottom:0}}>
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="has_deadline"
              checked={formData.has_deadline}
              onChange={handleChange}
            />
            Set Due Date
          </label>
        </div>

        {formData.has_deadline && (
          <div className="form-group">
            <label htmlFor="deadline">Due Date</label>
            <input
              type="date"
              id="deadline"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
            />
          </div>
        )}

        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>
            Cancel
          </button>
          <button type="submit" className="btn">
            {id ? 'Update Task' : 'Create Task'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
