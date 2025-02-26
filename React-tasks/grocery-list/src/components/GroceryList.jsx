import React from "react";
import GroceryItem from "./GroceryItem";

const GroceryList = ({
  items,
  editingItem,
  onEditStart,
  onEditTextChange,
  onSaveEdit,
  onDelete,
}) => {
  return (
    <div className="grocery-list">
      {items.map((item) => (
        <GroceryItem
          key={item.id}
          item={item}
          editingItem={editingItem}
          onEditStart={onEditStart}
          onEditTextChange={onEditTextChange}
          onSaveEdit={onSaveEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default GroceryList;
