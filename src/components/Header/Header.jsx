import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          Task Manager
        </Link>
        <nav>
          <Link to="/" className="nav-link">Tasks</Link>
          <Link to="/create" className="nav-link">Create Task</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
