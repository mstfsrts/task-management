import TaskCard from '../../components/TaskCard/TaskCard';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import Loading from '../../components/Loading/Loading';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import useTaskList from '../../hooks/useTaskList';
import './TaskList.css';

const TaskList = () => {

  const {error,loading,filters,sortConfig,handleSort,handleFilters,handleDelete,sortedAndFilteredTasks,uniqueCategories} = useTaskList()


  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="task-list">
      <div className="filters">
        <input
          type="text"
          placeholder="Search tasks..."
          value={filters.search}
          onChange={(e) => handleFilters("search", e.target.value)}
          className="search-input"
        />
        
        <select
          value={filters.status}
          onChange={(e) => handleFilters("status", e.target.value)}
          className="filter-select"
        >
          <option value="">All Statuses</option>
          <option value="TODO">Todo</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>
        
        <select
          value={filters.category}
          onChange={(e) => handleFilters("category", e.target.value)}
          className="filter-select"
        >
          <option value="">All Categories</option>
          {uniqueCategories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <div className="sort-buttons">
          <button
            className={`btn btn-secondary ${sortConfig.key === 'deadline' ? 'active' : ''}`}
            onClick={() => handleSort('deadline')}
          >
            Sort by Due Date{' '}
            {sortConfig.key === 'deadline' &&
              (sortConfig.direction === 'desc' ? (
                <FaArrowDown />
              ) : (
                <FaArrowUp />
              ))}
          </button>
          <button
            className={`btn btn-secondary ${sortConfig.key === 'created_at' ? 'active' : ''}`}
            onClick={() => handleSort('created_at')}
          >
            Sort by Start Date{' '}
            {sortConfig.key === 'created_at' &&
              (sortConfig.direction === 'desc' ? (
                <FaArrowDown />
              ) : (
                <FaArrowUp />
              ))}
          </button>
        </div>
      </div>

      <div className="tasks-grid">
        {sortedAndFilteredTasks.length > 0 ? (
          sortedAndFilteredTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className="no-tasks">
            No tasks found. Try adjusting your filters or create a new task.
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskList;
