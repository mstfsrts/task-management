import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTask } from '../../context/TaskContext';
import PropTypes from 'prop-types';
import { FaTrash } from 'react-icons/fa';
import Modal from '../Modal/Modal';
import './TaskCard.css';

const TaskCard = ({ task }) => {
  const { deleteTask } = useTask();
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false); // Modal durumu

  const handleDelete = () => {
    deleteTask(task.id);
    setShowConfirm(false); // Popup'u kapat
  };

  return (
    <div className="task-card" onClick={() => navigate(`/edit/${task.id}`)}>
      <div className="task-content">
        <div className="task-header">
          <h3 className="task-title">{task.title}</h3>
          <span className={`status status-${task.status.toLowerCase()}`}>
            {task.status}
          </span>
        </div>
        <div className="task-card-category">Category: {task.category}</div>
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}

        <p className="task-deadline">
          Start Date: {new Date(task.created_at).toLocaleDateString()}
        </p>

        {task.has_deadline && task.deadline && (
          <p className="task-deadline">
            Due Date: {new Date(task.deadline).toLocaleDateString()}
          </p>
        )}
      </div>
      <div className="task-actions">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowConfirm(true); // Popup'u aç
          }}
          className="btn btn-danger"
        >
          <FaTrash size={16} />
        </button>
      </div>
      {showConfirm && (
  <Modal onClose={() => setShowConfirm(false)}>
    <p>Are you sure?</p>
    <div className="modal-actions">
      <button
        className="btn btn-secondary"
        onClick={() => setShowConfirm(false)}
      >
        No
      </button>
      <button
        className="btn btn-danger"
        onClick={handleDelete}
      >
        Yes
      </button>
    </div>
  </Modal>
)}
    </div>
  );
};

TaskCard.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    created_at: PropTypes.string,
    deadline: PropTypes.string,
    status: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    has_deadline: PropTypes.bool.isRequired,
  }).isRequired,
};

export default TaskCard;
