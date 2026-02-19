import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Activity, Sparkles, ShieldAlert, Trophy } from "lucide-react";
import { useAuth } from "../../context/auth.jsx";
import { motion } from "framer-motion";

import Sidebar from "../../components/Sidebar";
import DashboardMap from "../../components/DashboardMap.jsx";
import DemographicsCard from "../../components/DemographicsCard.jsx";
import FootfallCard from "../../components/FootfallCard.jsx";

function CityDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    const navData = location.state?.locations?.[0];
    const savedData = JSON.parse(localStorage.getItem("lastPrediction"));

    if (navData) {
      setData(navData);
      localStorage.setItem("lastPrediction", JSON.stringify(navData));
    } else if (savedData) {
      setData(savedData);
    }
  }, [location.state]);

  if (!data) return null;

  const locations = [data];

  const topLocations = [...locations]
    .sort(
      (a, b) =>
        (parseFloat(b.opportunity_score || b.rank_score) || 0) -
        (parseFloat(a.opportunity_score || a.rank_score) || 0)
    )
    .slice(0, 3);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#030303] text-white">
      <Sidebar data={data} />

      <div className="flex-1 overflow-y-auto p-6 no-scrollbar min-w-0 min-h-0">
        
        {/* Map Section */}
        <div className="w-full h-[500px] mb-6 rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative">
          <DashboardMap locations={locations} />
        </div>

        {/* Brand Clusters */}
        <div className="p-6 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 backdrop-blur-md mb-6">
          <Sparkles className="text-indigo-400 w-5 h-5 mb-4" />
          <h4 className="text-xs font-bold text-indigo-400 uppercase mb-2">
            Brand Clusters
          </h4>
          <p className="text-sm text-slate-300">
            Presence of: Starbucks, Apple, Nike Anchors.
          </p>
        </div>

        {/* Avoidance Metrics */}
        <div className="p-6 rounded-2xl border border-rose-500/20 bg-rose-500/5 backdrop-blur-md mb-10">
          <ShieldAlert className="text-rose-400 w-5 h-5 mb-4" />
          <h4 className="text-xs font-bold text-rose-400 uppercase mb-2">
            Avoidance Metrics
          </h4>
          <p className="text-sm text-slate-300">
            Distance from: Wine shops, High-noise zones.
          </p>
        </div>

        {/* Demographics */}
        <DemographicsCard data={data} />

        {/* Footfall */}
        <div className="mt-5">
          <FootfallCard data={data} />
        </div>
      </div>
    </div>
  );
}

export default CityDashboard;
