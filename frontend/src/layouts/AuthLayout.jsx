// src/layouts/AuthLayout.jsx
import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-indigo-950 to-black font-sans">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
};

export default AuthLayout;
