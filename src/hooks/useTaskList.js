import { useEffect, useState } from "react";
import { useTask } from "../context/TaskContext";

const useTaskList = () => {
  const { tasks, loading, error, fetchTasks, deleteTask } = useTask();
  const [filters, setFilters] = useState({
    status: "",
    category: "",
    search: "",
  });
  const [sortConfig, setSortConfig] = useState({
    key: "created_at",
    direction: "desc",
  });

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  const handleSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === "desc" ? "asc" : "desc",
    }));
  };

  const handleFilters = (filterKey, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterKey]: value,
    }));
  };

  const sortTasks = (tasksToSort) => {
    return [...tasksToSort].sort((a, b) => {
      let comparison = 0;
      if (sortConfig.key === "deadline" || sortConfig.key === "created_at") {
        const dateA = new Date(a[sortConfig.key]);
        const dateB = new Date(b[sortConfig.key]);

        comparison = dateA - dateB; // ASC için
      }

      return sortConfig.direction === "desc" ? -comparison : comparison;
    });
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus = !filters.status || task.status === filters.status;
    const matchesCategory = !filters.category || task.category === filters.category;
    const matchesSearch =
      !filters.search ||
      task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(filters.search.toLowerCase()));

    return matchesStatus && matchesCategory && matchesSearch;
  });

  const sortedAndFilteredTasks = sortTasks(filteredTasks);
  const uniqueCategories = [...new Set(tasks.map((task) => task.category))];

  return { loading, error, filters, sortConfig, handleSort, handleFilters, handleDelete, sortedAndFilteredTasks, uniqueCategories };
};

export default useTaskList;
