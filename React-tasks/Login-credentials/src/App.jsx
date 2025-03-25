import React, { useState } from "react";
import LoginForm from "./LoginForm";
import "./Loginform.css";

const Welcome = ({ userEmail, onSignOut }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden p-10">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-4">
          Welcome Back!
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
          {userEmail}
        </p>
        <button
          onClick={onSignOut}
          className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  // Handle successful login
  const handleLoginSuccess = (email) => {
    setUserEmail(email);
    setIsAuthenticated(true);
  };

  // Handle signout
  const handleSignOut = () => {
    setIsAuthenticated(false);
    setUserEmail("");
  };

  return (
    <div className="App">
      {isAuthenticated ? (
        <Welcome userEmail={userEmail} onSignOut={handleSignOut} />
      ) : (
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}

export default App;
