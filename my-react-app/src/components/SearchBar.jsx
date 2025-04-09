import { FiSearch } from "react-icons/fi";
import { collection, getDocs, query, where, orderBy, startAt, endAt } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";

const SearchBar = ({ setResults }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = async () => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) return;

        const todosRef = collection(db, "users", user.uid, "todos");

        const q = query(
          todosRef,
          orderBy("title"),
          startAt(searchTerm),
          endAt(searchTerm + "\uf8ff")
        );
        try {
            const snapshot = await getDocs(q);
            const filtered = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            }));
            setResults(filtered);
          } catch (err) {
            console.error("Search error:", err);
          }
        };
        useEffect(() => {
            if (searchTerm.trim() === "") {
              setResults([]);  
            } else {
              handleSearch();
            }
          }, [searchTerm]);

  return (
    <div className="relative w-full">
      <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
        <FiSearch size={18} />
      </span>
      <input
         type="text"
         value={searchTerm}
         onChange={(e) => setSearchTerm(e.target.value)}
         placeholder="Search tasks..."
         className="w-full pl-12 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-200 placeholder:text-gray-400"
       />
       
    </div>
  );
};

export default SearchBar;