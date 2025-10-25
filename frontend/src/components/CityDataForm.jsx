import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CityDataForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    business_category: "",
    city: "",
    avg_income: "",
    population: "",
    rent: "",
    similar_shops: "",
    youth_ratio: "",
    footfall: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/api/predict_city", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("frontend Prediction:", data);
        navigate("/dashboard", { state: { locations: [data] } });
      } else {
        alert(`Prediction: ${data.predicted_category}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to fetch prediction.");
    }
  };


  const cities = [
    "Ahmednagar", "Achalpur", "Akola", "Ambarnath", "Amravati", "Badlapur",
    "Barshi", "Beed", "Bhiwandi-Nizampur", "Bhusawal", "Chandrapur",
    "Chattrapati Sambhaji Nagar", "Dhule", "Gondia", "Hinganghat",
    "Ichalkaranji", "Jalgaon", "Jalna", "Kalyan-Dombivli", "Kolhapur",
    "Latur", "Malegaon", "Mira-Bhayandar", "Mumbai", "Nagpur",
    "Nanded-Waghala", "Nandurbar", "Nashik", "Navi Mumbai", "Osmanabad",
    "Panvel", "Parbhani", "Pimpri-Chinchwad", "Pune", "Sangli", "Satara",
    "Solapur", "Thane", "Udgir", "Ulhasnagar", "Vasai-Virar", "Wardha",
    "Yavatmal"
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto mt-8"
    >
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Add City Business Data
      </h2>

      {/* Business Category */}
      <label className="block mb-2 font-medium">Business Category</label>
      <select
        name="business_category"
        value={formData.business_category}
        onChange={handleChange}
        className="border p-2 rounded w-full mb-3"
        required
      >
        <option value="">Select Category</option>
        <option value="bakery">Bakery</option>
        <option value="cafe">Cafe</option>
        <option value="shoes">Shoes</option>
        <option value="watch">Watch</option>
      </select>

      {/* City Dropdown */}
      <label className="block mb-2 font-medium">City</label>
      <select
        name="city"
        value={formData.city}
        onChange={handleChange}
        className="border p-2 rounded w-full mb-3"
        required
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      {/* Optional Fields */}
      {/* {[
        "avg_income",
        "population",
        "rent",
        "similar_shops",
        "youth_ratio",
        "footfall",
      ].map((field) => (
        <div key={field}>
          <label className="block mb-2 capitalize font-medium">
            {field.replace("_", " ")}
          </label>
          <input
            type="number"
            name={field}
            value={formData[field]}
            onChange={handleChange}
            className="border p-2 rounded w-full mb-3"
          />
        </div>
      ))} */}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition-all"
      >
        Evaluate City
      </button>
    </form>
  );
};

export default CityDataForm;
