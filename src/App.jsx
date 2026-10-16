import { useState } from "react";
import TodoItem from "./components/TodoItem.jsx";

const initialTodos = [
  { id: 1, text: "学 React 基础", done: false },
  { id: 2, text: "做一个 Todo List", done: false },
  { id: 3, text: "给项目加上样式", done: true },
];

function App() {
  const [todos, setTodos] = useState(initialTodos);
  const [input, setInput] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const text = input.trim();
    if (text === "") {
      return;
    }

    const newTodo = { id: crypto.randomUUID(), text, done: false };
    setTodos([...todos, newTodo]);
    setInput("");
  }

  function toggleTodo(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    );
  }

  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  return (
    <div className="app">
      <h1>Todo List</h1>

      <form className="add-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="要做点什么？"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">添加</button>
      </form>

      <ul className="todo-list">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
