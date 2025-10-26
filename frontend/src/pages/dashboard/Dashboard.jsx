import React from "react";
import Sidebar from "../../components/Sidebar.jsx";
import LocationAnalysisCard from "../../components/LocationAnalysisCard.jsx";
import { useLocation, useNavigate } from "react-router-dom";

function Dashboard() {
  const location = useLocation();
  const locations = location.state?.locations || [];
  const navigate = useNavigate();

  const handleGoToMap = () => {
    if (locations.length > 0) {
      navigate("/map", { state: { locations } });
    } else {
      alert("No location data available to show on the map.");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      {/* <Sidebar /> */}

      {/* Main Content */}
      <main className="flex-1 bg-gradient-to-br from-black via-indigo-950 to-black p-8">
        <h1 className="text-3xl font-semibold text-gray-300">
          Welcome to Your Dashboard
        </h1>

        {/* Single button below heading */}
        <div className="mt-4">
          <button
            onClick={handleGoToMap}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium px-6 py-3 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            View All Locations on Map
          </button>
        </div>

        {locations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {locations.map((loc, index) => (
              <LocationAnalysisCard key={index} data={loc} />
            ))}
          </div>
        ) : (
          <p className="mt-6 text-gray-500">No location data available yet.</p>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
