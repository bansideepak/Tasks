import { useState } from "react";

const AddItemForm = ({ onAdd }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onAdd(input.trim());
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add something to your list"
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddItemForm;
