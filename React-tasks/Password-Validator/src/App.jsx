import React, { useState } from "react";
import "./App.css";

function PasswordValidator() {
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState("");

  const validatePassword = (password) => {
    const errors = [];

    if (password.length < 8) {
      errors.push("Must be atleast 8 Characters long.");
    }

    if (!/[A-Z]/.test(password)) {
      errors.push("Must include atleast one upperCase Letter");
    }

    if (!/[0-9]/.test(password)) {
      errors.push("Must include at least one number.");
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push("Must include at least one special character.");
    }

    if (/\s/.test(password)) {
      errors.push("Must not contain spaces.");
    }

    return errors;
  };

  const handlePassword = (e) => {
    const value = e.target.value;
    setPassword(value);

    const validationErrors = validatePassword(value);
    setErrorMessages(validationErrors);
  };

  return (
    <div className="container">
      <h1>Password Validator</h1>
      <div className="input-container">
        <input
          type="password"
          value={password}
          onChange={handlePassword}
          placeholder="Enter password...."
        />
      </div>
      {errorMessages.length > 0 && (
        <ul style={{ color: "red", marginTop: "25px" }}>
          {errorMessages.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}
      {errorMessages.length === 0 && password !== "" && (
        <p style={{ color: "green", marginTop: "25px" }}>Password Valid!</p>
      )}
    </div>
  );
}
export default PasswordValidator;
