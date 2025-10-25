import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    business_name: "",
    business_category: "",
    investment_min: "",
    investment_max: "",
    preferred_district: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/api/predict_location", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Predicted Locations:", data);

      if (response.ok) {
        console.log("Frontend response: ", data);
        navigate("/dashboard", { state: { locations: data } }); // 👈 Pass data here
      } else {
        alert(data.message || "No suitable location found");
      }

    } catch (error) {
      console.error("Error:", error);
      alert("Error connecting to the backend");
    }
  };

  const districts = [
    "Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Chandrapur",
    "Dhule", "Gondia", "Jalgaon", "Jalna", "Kolhapur", "Latur",
    "Mumbai City", "Mumbai Suburban", "Nagpur", "Nanded", "Nandurbar",
    "Nashik", "Osmanabad", "Palghar", "Parbhani", "Pune", "Raigad",
    "Sangli", "Satara", "Solapur", "Thane", "Wardha", "Yavatmal"
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto"
    >
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Business Prediction Form
      </h2>

      {/* Business Name */}
      <label className="block mb-2 font-medium">Business Name</label>
      <input
        type="text"
        name="business_name"
        value={formData.business_name}
        onChange={handleChange}
        className="border p-2 rounded w-full mb-4"
        required
      />

      {/* Business Category */}
      <label className="block mb-2 font-medium">Business Category</label>
      <select
        name="business_category"
        value={formData.business_category}
        onChange={handleChange}
        className="border p-2 rounded w-full mb-4"
        required
      >
        <option value="">Select Category</option>
        <option value="bakery">Bakery</option>
        <option value="cafe">Cafe</option>
        <option value="salon">Shoes</option>
        <option value="clothing">Watch</option>
      </select>

      {/* Investment Budget Range */}
      <label className="block mb-2 font-medium">Investment Budget Range (₹)</label>
      <div className="flex gap-3 mb-4">
        <input
          type="number"
          name="investment_min"
          value={formData.investment_min}
          onChange={handleChange}
          placeholder="Min"
          className="border p-2 rounded w-1/2"
          required
        />
        <input
          type="number"
          name="investment_max"
          value={formData.investment_max}
          onChange={handleChange}
          placeholder="Max"
          className="border p-2 rounded w-1/2"
          required
        />
      </div>

      {/* Preferred District */}
      <label className="block mb-2 font-medium">Preferred District</label>
      <select
        name="preferred_district"
        value={formData.preferred_district}
        onChange={handleChange}
        className="border p-2 rounded w-full mb-4"
        required
      >
        <option value="">Select District</option>
        {districts.map((district) => (
          <option key={district} value={district}>
            {district}
          </option>
        ))}
      </select>

      {/* Submit */}
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700 transition-all"
      >
        Predict Location
      </button>
    </form>
  );
};

export default UserForm;
