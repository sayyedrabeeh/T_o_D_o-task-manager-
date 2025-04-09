import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import TodoCarddisplay from "../components/TodoCarddisplay";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase"; 
import { parseISO, isSameDay, isSameWeek, isSameMonth } from "date-fns";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { format, startOfWeek, startOfMonth } from "date-fns";


const TodoPage = () => {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodo = async () => {
      setLoading(true);
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user || !id) {
          setLoading(false);
          return;
        }

        const todoRef = doc(db, "users", user.uid, "todos", id);
        const todoSnap = await getDoc(todoRef);

        if (todoSnap.exists()) {
          setTodo({ id: todoSnap.id, ...todoSnap.data() });
        } else {
          toast.error("Todo not found");
          console.error("Todo not found");
        }
      } catch (error) {
        console.error("Error fetching todo:", error);
        toast.error("Failed to load task");
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, [id]);
    
  const isLatestCheckbox = (frequency, dateStr) => {
    const trackingDate = parseISO(dateStr);
    const today = new Date();
    
    if (frequency === "Daily") {
      return isSameDay(trackingDate, today);
    } else if (frequency === "Weekly") {
      return isSameWeek(trackingDate, today, { weekStartsOn: 0 });
    } else if (frequency === "Monthly") {
      return isSameMonth(trackingDate, today);
    }
    return false;
  };

  const handleToggle = async (todoId, date) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        toast.error("You must be logged in");
        return;
      }
      
      if (!isLatestCheckbox(todo.frequency, date)) {
        toast.error("You can only edit the latest checkbox");
        return;
      }

      const todoRef = doc(db, "users", user.uid, "todos", todoId);
      const todoSnap = await getDoc(todoRef);
      const todoData = todoSnap.data();
      
      const currentTracking = todoData.tracking || {};
      const updatedTracking = {
        ...currentTracking,
        [date]: !currentTracking[date],
      };

      await updateDoc(todoRef, {
        tracking: updatedTracking,
      });
      
      
      setTodo(prev => ({
        ...prev,
        tracking: updatedTracking
      }));
      
      toast.success("Progress updated");
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update progress");
    }
  };

  const handleSubtaskToggle = async (subtaskId, date) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        toast.error("You must be logged in");
        return;
      }

     
      const subtask = todo.subtasks?.find(sub => sub.id === subtaskId);
      if (!subtask) {
        toast.error("Subtask not found");
        return;
      }
      
   
      const subtaskFrequency = subtask.frequency || todo.frequency;
      if (!isLatestCheckbox(subtaskFrequency, date)) {
        toast.error("You can only edit the latest checkbox");
        return;
      }      
   

      const todoRef = doc(db, "users", user.uid, "todos", id);
      const updatedSubtasks = todo.subtasks.map((sub) => {
        if (sub.id === subtaskId) {
          const subTracking = sub.tracking || {};
          return {
            ...sub,
            tracking: {
              ...subTracking,
              [date]: !subTracking[date],
            },
          };
        }
        return sub;
      });

      await updateDoc(todoRef, {
        subtasks: updatedSubtasks,
      });
      
 
      setTodo(prev => ({
        ...prev,
        subtasks: updatedSubtasks
      }));
      
      toast.success("Subtask progress updated");
    } catch (error) {
      console.error("Error updating subtask:", error);
      toast.error("Failed to update subtask progress");
    }
  };

  const handleAddSubtask = async (todoId, newSubtask) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        toast.error("You must be logged in");
        return;
      }

      const todoRef = doc(db, "users", user.uid, "todos", todoId);
      const today = new Date();
      let initialTrackingKey = format(today, "yyyy-MM-dd");
      if (newSubtask.frequency === "Weekly") {
        initialTrackingKey = format(startOfWeek(today, { weekStartsOn: 0 }), "yyyy-MM-dd");
      } else if (newSubtask.frequency === "Monthly") {
        initialTrackingKey = format(startOfMonth(today), "yyyy-MM-dd");
      }
      const newSub = {
        id: uuidv4(),
        title: newSubtask.title,
        frequency: newSubtask.frequency,
        tracking: { [initialTrackingKey]: false,},
        createdAt: new Date().toISOString()
      };

      const updatedSubtasks = [...(todo.subtasks || []), newSub];

      await updateDoc(todoRef, {
        subtasks: updatedSubtasks,
      });
      
     
      setTodo(prev => ({
        ...prev,
        subtasks: updatedSubtasks
      }));

      toast.success("Subtask added successfully!");
    } catch (error) {
      console.error("Error adding subtask:", error);
      toast.error("Failed to add subtask");
    }
  };

  const handleEditSubtask = async (subtaskId, updatedData) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        toast.error("You must be logged in");
        return;
      }

      const todoRef = doc(db, "users", user.uid, "todos", id);
      const updatedSubtasks = todo.subtasks.map((sub) => {
        if (sub.id === subtaskId) {
          return {
            ...sub,
            title: updatedData.title,
            frequency: updatedData.frequency,
          };
        }
        return sub;
      });

      await updateDoc(todoRef, {
        subtasks: updatedSubtasks,
      });
      
      
      setTodo(prev => ({
        ...prev,
        subtasks: updatedSubtasks
      }));

      toast.success("Subtask updated successfully!");
    } catch (error) {
      console.error("Error updating subtask:", error);
      toast.error("Failed to update subtask");
    }
  };

  const handleDeleteSubtask = async (subtaskId) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        toast.error("You must be logged in");
        return;
      }

      const todoRef = doc(db, "users", user.uid, "todos", id);
      const updatedSubtasks = todo.subtasks.filter(sub => sub.id !== subtaskId);

      await updateDoc(todoRef, {
        subtasks: updatedSubtasks,
      });
      
     
      setTodo(prev => ({
        ...prev,
        subtasks: updatedSubtasks
      }));

      toast.success("Subtask deleted successfully!");
    } catch (error) {
      console.error("Error deleting subtask:", error);
      toast.error("Failed to delete subtask");
    }
  };

  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <div className="p-6 space-y-6 overflow-auto">
          <Link to="/" className="inline-flex items-center text-indigo-400 hover:text-indigo-300 mb-4">
            <FiArrowLeft className="mr-2" />
            Back to dashboard
          </Link>
          
          <h1 className="text-2xl font-bold text-white mb-6">Task Details</h1>
          
          {loading ? (
            <p className="text-gray-400">Loading task...</p>
          ) : todo ? (
            <TodoCarddisplay
              todo={todo}
              onToggle={handleToggle}
              onSubtaskToggle={handleSubtaskToggle}
              onAddSubtask={handleAddSubtask}
              onEditSubtask={handleEditSubtask}
              onDeleteSubtask={handleDeleteSubtask}
            />
          ) : (
            <p className="text-gray-400">Task not found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoPage;