import { useState } from "react";
import "./style.css";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [headingInput, setHeadingInput] = useState("");
  const [listInputs, setListInputs] = useState({});
  const [darkMode, setDarkMode] = useState(false);

  const handleAddTodo = () => {
    if (!headingInput.trim()) return;
    setTodos([...todos, { heading: headingInput, lists: [], enabled: true }]);
    setHeadingInput("");
  };

  const handleAddList = (index) => {
    if (!listInputs[index]?.trim()) return;

    const updated = [...todos];
    updated[index].lists.push({
      text: listInputs[index],
      completed: false,
    });

    setTodos(updated);
    setListInputs({ ...listInputs, [index]: "" });
  };

  const toggleComplete = (i, j) => {
    const updated = [...todos];
    updated[i].lists[j].completed = !updated[i].lists[j].completed;
    setTodos(updated);
  };

  const progress = (lists) => {
    if (!lists.length) return 0;
    const done = lists.filter((l) => l.completed).length;
    return Math.round((done / lists.length) * 100);
  };

  return (
    <div className={`app-shell ${darkMode ? "dark" : ""}`}>
      <header className="top-bar">
        <h1>Todo</h1>

        {/* DARK MODE TOGGLE */}
        <label className="switch">
          <input
            type="checkbox"
            onChange={() => setDarkMode(!darkMode)}
          />
          <span className="slider" />
        </label>
      </header>

      {/* ADD HEADING */}
      <div className="soft-card input-card">
        <input
          type="text"
          placeholder="New heading"
          value={headingInput}
          onChange={(e) => setHeadingInput(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>

      {/* GRID */}
      <div className="todo-grid">
        {todos.map((todo, i) => (
          <div className="soft-card todo-card" key={i}>
            <div className="card-header">
              <h3>{todo.heading}</h3>
              <button
                className="delete-btn"
                onClick={() =>
                  setTodos(todos.filter((_, idx) => idx !== i))
                }
              >
                ✕
              </button>
            </div>

            {/* PROGRESS */}
            <div className="progress">
              <div
                className="progress-bar"
                style={{ width: `${progress(todo.lists)}%` }}
              />
            </div>

            <ul className="list">
              {todo.lists.map((item, j) => (
                <li
                  key={j}
                  className={item.completed ? "done" : ""}
                  onClick={() => toggleComplete(i, j)}
                >
                  <span className="check">
                    {item.completed && "✓"}
                  </span>
                  {item.text}
                </li>
              ))}
            </ul>

            <div className="add-list-row">
              <input
                type="text"
                placeholder="Add item"
                value={listInputs[i] || ""}
                onChange={(e) =>
                  setListInputs({ ...listInputs, [i]: e.target.value })
                }
              />
              <button onClick={() => handleAddList(i)}>＋</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;