import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar.jsx";
import LocationAnalysisCard from "../../components/LocationAnalysisCard.jsx";
import { useLocation } from "react-router-dom";

function Dashboard() {
  const location = useLocation();
  const locations = location.state?.locations || [];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-8">
        <h1 className="text-3xl font-semibold text-gray-800">
          Welcome to Your Dashboard
        </h1>

        {locations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
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
