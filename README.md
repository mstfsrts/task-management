# Task Management Application

## About The Project
A modern task management application built with React and Supabase. This application allows users to efficiently manage their tasks with features like real-time updates, filtering, and categorization.

## Features
- ✨ Create, edit, and delete tasks
- 🔍 Search functionality across tasks
- 🏷️ Category-based organization
- 📊 Status tracking (Todo, In Progress, Completed)
- ⏰ Deadline management
- 🔄 Real-time updates with Supabase
- 📱 Responsive design

## Built With
- [React 18](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [React Router v7](https://reactrouter.com/)
- [Supabase](https://supabase.com/)
- [React Icons](https://react-icons.github.io/react-icons/)

## Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm
- Supabase account

### Installation

1. Clone the repository
```bash
git clone [LINK]
cd task-management
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server
```bash
npm run dev
```

## API Documentation

### Supabase Table Structure
The application uses a `tasks` table with the following structure:

```sql
tasks {
  id: uuid primary key
  title: string
  description: string
  status: enum('TODO', 'IN_PROGRESS', 'COMPLETED')
  category: string
  created_at: timestamp
  deadline: timestamp
  has_deadline: boolean
}
```

### API Endpoints

#### Get All Tasks
```javascript
GET: supabase.from("tasks").select("*")
Response: Task[]
```

#### Create Task
```javascript
POST: supabase.from("tasks").insert([taskData])
Body: {
  title: string
  description?: string
  status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED'
  category: string
  deadline?: string
  has_deadline: boolean
}
```

#### Update Task
```javascript
PUT: supabase.from("tasks").update(taskData).eq("id", id)
Body: {
  title?: string
  description?: string
  status?: 'TODO' | 'IN_PROGRESS' | 'COMPLETED'
  category?: string
  deadline?: string
  has_deadline?: boolean
}
```

#### Delete Task
```javascript
DELETE: supabase.from("tasks").delete().eq("id", id)
```

## Project Structure
```
src/
├── components/          # Reusable components
│   ├── ErrorMessage/    # Error handling component
│   ├── Header/         # Application header
│   ├── Loading/        # Loading spinner
│   ├── Modal/          # Modal dialog
│   └── TaskCard/       # Task display component
├── pages/              # Page components
│   ├── TaskList/       # Main task list page
│   └── TaskForm/       # Create/Edit task form
├── context/            # React Context
│   └── TaskContext.jsx # Task state management
├── hooks/              # Custom React hooks
│   └── useTaskList.js  # Task list operations
├── services/           # API services
│   ├── supabase.js     # Supabase client
│   └── taskService.js  # Task API methods
└── assets/             # Static assets
```

## Contributing
1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Contact
Created by [LINK]

## License
MIT License
