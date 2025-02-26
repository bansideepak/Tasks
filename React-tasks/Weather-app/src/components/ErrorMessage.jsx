import React from "react";

const ErrorMessage = ({ message }) => (
  <div className="bg-red-500/30 backdrop-blur-sm text-red-100 p-4 rounded-lg mb-6 max-w-md mx-auto">
    <p className="font-medium">{message}</p>
  </div>
);

export default ErrorMessage;
