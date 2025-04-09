import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { FiSave, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { useLocation,useNavigate  } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
 
const AddTodo = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [frequency, setFrequency] = useState("None");
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const todoId = params.get("id");

  const handleSubmit = async  (e) => {
    e.preventDefault();

    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
        toast.error("You must be logged in to add tasks.");
        return;
      }

    const uid = user.uid;


    const newTodo = {
      title,
      description,
      frequency,
      completed: false,
      tracking: {},
      subtasks: [],
      createdAt: new Date(),
    };

     
        try {
            if (todoId) {
              
              const todoRef = doc(db, "users", uid, "todos", todoId);
              await updateDoc(todoRef, {
                title,
                description,
                frequency,
              });
              toast.success("Task updated successfully!");
              navigate("/");
            } else {
              
              await addDoc(collection(db, "users", uid, "todos"), newTodo);
              
              toast.success("Task added successfully!");
            }
        
            setTitle("");
            setDescription("");
            setFrequency("None");
          } catch (error) {
            console.error("Error saving todo:", error);
            toast.error("Failed to save task.");
          }
  };

  useEffect(() => {
    const fetchTodo = async () => {
      if (!todoId) return;
  
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return toast.error("You must be logged in.");
  
      try {
        const todoRef = doc(db, "users", user.uid, "todos", todoId);
        const docSnap = await getDoc(todoRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title);
          setDescription(data.description);
          setFrequency(data.frequency || "None");
        } else {
          toast.error("Todo not found");
        }
      } catch (err) {
        toast.error("Failed to load task");
        console.error(err);
      }
    };
  
    fetchTodo();
  }, [todoId]);
  
  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-auto">
        <Navbar />

        <div className="p-8 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-white">
          {todoId ? "Edit Task" : "Create New Task"}
        </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
            <div>
              <label className="block text-gray-300 mb-2 font-medium">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-600 bg-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
                placeholder="Enter task title"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2 font-medium">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-600 bg-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows="4"
                required
                placeholder="Enter task description"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-3 font-medium">Frequency</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {["Daily", "Weekly", "Monthly", "None"].map((option) => (
                  <label 
                    key={option} 
                    className={`flex items-center justify-center gap-2 p-3 rounded-lg cursor-pointer ${
                      frequency === option 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    <input
                      type="radio"
                      name="frequency"
                      value={option}
                      checked={frequency === option}
                      onChange={(e) => setFrequency(e.target.value)}
                      className="hidden"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Link
                to="/"
                className="flex-1 bg-gray-700 text-white px-4 py-3 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
              >
                <FiX size={18} />
                <span>Cancel</span>
              </Link>
              
              <button
                type="submit"
                className="flex-1 bg-indigo-600 text-white px-4 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
              >
                <FiSave size={18} />
                <span>{todoId ? "Update Task" : "Save Task"}</span>

              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTodo;
