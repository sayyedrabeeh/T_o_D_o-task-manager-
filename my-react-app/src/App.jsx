import { StrictMode } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TodoPage from './pages/TodoPage';
import AddTodo from './pages/AddTodo';
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <div className="bg-gray-900 min-h-screen text-gray-200">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todo/:id" element={<TodoPage />} />
          <Route path="/add-todo" element={<AddTodo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;