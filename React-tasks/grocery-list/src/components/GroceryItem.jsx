import React from "react";
import { Pencil, Trash2 } from "lucide-react";

const GroceryItem = ({
  item,
  editingItem,
  onEditStart,
  onEditTextChange,
  onSaveEdit,
  onDelete,
}) => {
  const isEditing = editingItem?.id === item.id;

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSaveEdit(item.id);
    }
  };

  return (
    <div className="grocery-item">
      {isEditing ? (
        <input
          type="text"
          value={editingItem.text}
          onChange={(e) => onEditTextChange(item.id, e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => onSaveEdit(item.id)}
          className="edit-input"
          placeholder="Edit item..."
          autoFocus
        />
      ) : (
        <span>{item.text}</span>
      )}
      <div className="grocery-btn">
        <button
          className="delete-btn"
          onClick={() => onDelete(item.id)}
          title="Delete"
        >
          <Trash2 size={20} />
        </button>
        <button
          className="edit-btn"
          onClick={() => onEditStart(item)}
          title="Edit"
        >
          <Pencil size={20} />
        </button>
      </div>
    </div>
  );
};

export default GroceryItem;
