import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import Header from './components/Header/Header';
import TaskList from './pages/TaskList/TaskList';
import TaskForm from './pages/TaskForm/TaskForm';

function App() {
  return (
      <TaskProvider>
        <Router>
          <div className="app">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<TaskList />} />
                <Route path="/create" element={<TaskForm />} />
                <Route path="/edit/:id" element={<TaskForm />} />
              </Routes>
            </main>
          </div>
        </Router>
      </TaskProvider>
  );
}

export default App;
