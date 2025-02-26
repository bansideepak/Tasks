import { useState } from "react";
import AddItemForm from "./components/AddItemForm";
import GroceryList from "./components/GroceryList";
import "./styles/styles.css";

const App = () => {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  const addGroceryItem = (text) => {
    const newItem = { id: Date.now(), text };
    setItems([newItem, ...items]);
  };

  const deleteGroceryItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const startEditingItem = (item) => {
    setEditingItem(item);
  };

  const handleEditTextChange = (id, newText) => {
    setEditingItem({ ...editingItem, text: newText });
  };

  const saveEditedItem = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, text: editingItem.text } : item
      )
    );
    setEditingItem(null);
  };

  return (
    <div className="container">
      <h1>Grocery Shopping</h1>
      <GroceryList
        items={items}
        editingItem={editingItem}
        onEditStart={startEditingItem}
        onEditTextChange={handleEditTextChange}
        onSaveEdit={saveEditedItem}
        onDelete={deleteGroceryItem}
      />
      <AddItemForm onAdd={addGroceryItem} />
      {items.length > 0 && (
        <button className="clear-btn" onClick={() => setItems([])}>
          Delete List
        </button>
      )}
    </div>
  );
};

export default App;
