import React, { useState } from "react";
import UserForm from "../components/UserForm";
import CityDataForm from "../components/CityDataForm";

const Form = () => {
  const [activeTab, setActiveTab] = useState("user");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 p-6">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-lg p-6">
        <h2 className="text-3xl font-bold text-center mb-6">Business Form</h2>

        {/* Tab Buttons */}
        <div className="flex bg-gray-100 rounded-lg mb-6 overflow-hidden">
          <button
            onClick={() => setActiveTab("user")}
            className={`flex-1 py-2 font-medium text-lg transition-all duration-300 ${
              activeTab === "user"
                ? "bg-gradient-to-r from-blue-600 to-indigo-500 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            Predict Location
          </button>
          <button
            onClick={() => setActiveTab("city")}
            className={`flex-1 py-2 font-medium text-lg transition-all duration-300 ${
              activeTab === "city"
                ? "bg-gradient-to-r from-blue-600 to-indigo-500 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            Evaluate City
          </button>
        </div>

        {/* Form Content */}
        <div className="transition-all duration-300">
          {activeTab === "user" ? <UserForm /> : <CityDataForm />}
        </div>
      </div>
    </div>
  );
};

export default Form;
