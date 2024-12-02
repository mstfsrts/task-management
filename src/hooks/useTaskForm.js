import { useState, useEffect } from "react";
import { useTask } from "../context/TaskContext";
import { taskService } from "../services/taskService";
import { useNavigate } from "react-router-dom";

const INITIAL_FORM_STATE = {
  title: "",
  description: "",
  status: "TODO",
  category: "",
  has_deadline: false,
  deadline: "",
};

const useTaskForm = (id) => {
  const { addTask, updateTask } = useTask();
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      if (id) {
        try {
          setLoading(true);
          const task = await taskService.getTaskById(id);
          setFormData({
            ...task,
            deadline: task.deadline ? new Date(task.deadline).toISOString().split("T")[0] : "",
          });
        } catch (err) {
          setError("Failed to fetch task details");
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const taskData = {
        ...formData,
        deadline: formData.has_deadline && formData.deadline ? new Date(formData.deadline).toISOString() : null,
      };

      if (id) {
        await updateTask(id, taskData);
      } else {
        await addTask(taskData);
      }

      navigate("/");
    } catch (err) {
      setError(err.message || "Failed to save task");
    } finally {
      setLoading(false);
    }
  };

  return { formData, loading, error, handleChange, handleSubmit };
};

export default useTaskForm;
