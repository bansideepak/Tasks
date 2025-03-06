import React, { useState } from "react";

function TodoList() {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState("");
  const [editValue, setEditValue] = useState("");

  const handleDelete = (indexToDelete) => {
    setItems(items.filter((_, index) => index !== indexToDelete));
  };

  const handleEdit = (index, value) => {
    setEditIndex(index);
    setEditValue(value);
  };

  const handleUpdate = (index) => {
    if (editValue.trim() !== "") {
      const newItems = [...items];
      newItems[index] = editValue;
      setItems(newItems);
      setEditIndex(null);
      setEditValue("");
    }
  };

  function handleSubmit() {
    if (inputValue.trim() !== "") {
      setItems([...items, inputValue]);
      setInputValue("");
    }
  }

  return (
    <div className="todo-wrapper">
      <div className="todo-container">
        <h1 className="todo-title">Todo List</h1>

        <div className="input-section">
          <input
            className="todo-input"
            type="text"
            value={inputValue}
            placeholder="Add a new task..."
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className="add-btn" onClick={() => handleSubmit(inputValue)}>
            Add Task
          </button>
        </div>

        <div className="todo-list">
          {items.length === 0 ? (
            <p className="empty-message">
              No tasks yet! Add a task to get started.
            </p>
          ) : (
            <ul className="tasks-list">
              {items.map((item, index) => (
                <li className="todo-item" key={index}>
                  {editIndex === index ? (
                    <div className="edit-mode">
                      <input
                        className="edit-input"
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                      />
                      <button
                        className="save-btn"
                        onClick={() => handleUpdate(index)}
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div className="task-content">
                      <span className="task-text">{item}</span>
                      <div className="button-group">
                        <button
                          className="edit-btn"
                          onClick={() => handleEdit(index, item)}
                        >
                          ✎
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(index)}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default TodoList;
