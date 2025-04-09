import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import StatusFilters from "../components/StatusFilters";
import TodoCard from "../components/TodoCard";
import { FiPlus,FiEdit, FiCheckCircle, FiTrash2 } from "react-icons/fi";
import { getAuth,onAuthStateChanged  } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";  
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TodoList from '../components/TodoList'; 




const Home = () => {
    const navigate = useNavigate();
    const [searchResults, setSearchResults] = useState([]);
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("all");

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (user) {
            try {
              const querySnapshot = await getDocs(
                collection(db, "users", user.uid, "todos")
              );
      
              const todoList = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));
      
              setTodos(todoList);
            } catch (error) {
              console.error("Error fetching todos:", error);
              toast.error("Failed to fetch tasks.");
            }
          } else {
            toast.error("You must be logged in to see tasks.");
          }
        });
      
        return () => unsubscribe(); 
      }, []);
      
    
      const handleEdit = (id) => {
        toast("Redirecting to edit page... ");
        navigate(`/add-todo?id=${id}`);
       };



       const handleComplete = async (id) => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) return toast.error("User not found");
      
        const todoRef = doc(db, "users", user.uid, "todos", id);
        try {
          await updateDoc(todoRef, {
            completed: true,
            completedDate: new Date().toISOString().split("T")[0],  
          });
          toast.success("Marked as completed");
          setTodos((prev) =>
            prev.map((todo) =>
              todo.id === id ? { ...todo, completed: true,completedDate: new Date().toISOString().split("T")[0] } : todo
            )
          );
        } catch (error) {
          console.error(error);
          toast.error("Failed to mark as complete");
        }
      };

      const handleDelete = async (id) => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) return toast.error("User not found");
      
        const todoRef = doc(db, "users", user.uid, "todos", id);
        try {
          await deleteDoc(todoRef);
          toast.success("Todo deleted");
          setTodos((prev) => prev.filter((todo) => todo.id !== id));
        } catch (error) {
          console.error(error);
          toast.error("Failed to delete");
        }
      };

      const filteredTodos = todos.filter((todo) => {
        const frequencyMatch =
          filter === "All" || todo.frequency?.toLowerCase() === filter.toLowerCase();
      
        const statusMatch =
          statusFilter === "all" ||
          (statusFilter === "completed" && todo.completed) ||
          (statusFilter === "pending" && !todo.completed);
      
        return frequencyMatch && statusMatch;
      });
      
    
     
      const finalTodos = searchResults.length ? searchResults : filteredTodos;

      return (
        <div className="flex h-screen bg-gray-900">
          <Sidebar filter={filter} setFilter={setFilter} />
      
          <div className="flex flex-col flex-1 overflow-hidden">
            <Navbar />
      
            <div className="p-6 space-y-6 overflow-auto">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-white">My Tasks</h1>
                <Link
                  to="/add-todo"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <FiPlus size={18} />
                  <span>New Task</span>
                </Link>
              </div>
      
              <SearchBar setResults={setSearchResults} />
              <StatusFilters statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
      
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {finalTodos.length > 0 ? (
                  finalTodos.map((todo) => (
                    <div
                      key={todo.id}
                      className="relative bg-gray-800 rounded-lg shadow-lg border border-gray-700 hover:scale-[1.01] transition-all"
                    >
                      <Link
                        to={`/todo/${todo.id}`}
                        className="block p-4 hover:bg-gray-700 rounded-t-lg transition-colors"
                      >
                        <TodoCard
                          title={todo.title}
                          description={todo.description}
                          frequency={todo.frequency}
                          completed={todo.completed || false}
                          completedDate={todo.completedDate}
                        />
                      </Link>
      
                      <div className="flex justify-end gap-3 p-3 absolute bottom-0 right-0">
                        <button
                          className="text-yellow-400 hover:text-yellow-300"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(todo.id);
                          }}
                          title="Edit"
                        >
                          <FiEdit size={18} />
                        </button>
                        <button
                          className="text-green-400 hover:text-green-300"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleComplete(todo.id);
                          }}
                          title="Mark as Complete"
                        >
                          <FiCheckCircle size={18} />
                        </button>
                        <button
                          className="text-red-400 hover:text-red-300"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(todo.id);
                          }}
                          title="Delete"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">No tasks found.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      );
      
};

export default Home;
