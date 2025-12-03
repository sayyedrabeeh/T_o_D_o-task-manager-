import TodoCard from "./TodoCard";

const TodoList = ({ todos, onToggle, onSubtaskToggle }) => {
 return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onSubtaskToggle={onSubtaskToggle}
        />
      ))}
    </div>
  );
};

export default TodoList;
