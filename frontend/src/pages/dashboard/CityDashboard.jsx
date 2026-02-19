import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Activity, Zap, Heart, Sparkles, ShieldAlert } from "lucide-react"; // Added new icons
import { useAuth } from "../../context/auth.jsx";
import { motion } from "framer-motion";

import Sidebar from "../../components/Sidebar";
import DashboardMap from "../../components/DashboardMap.jsx";
import DemographicsCard from "../../components/DemographicsCard.jsx";
import FootfallCard from "../../components/FootfallCard.jsx";

function CityDashboard() {
  const location = useLocation();
  const { currentUser } = useAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    const navData = location.state?.predictionData;
    const savedData = JSON.parse(localStorage.getItem("lastPrediction"));

    if (navData) {
      setData(navData);
      localStorage.setItem("lastPrediction", JSON.stringify(navData));
    } else if (savedData) {
      setData(savedData);
    }
  }, [location.state]);

  if (!data)
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#030303] text-white">
        <Activity className="animate-pulse text-indigo-500 w-12 h-12" />
      </div>
    );

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#030303] text-white">
      <Sidebar data={data} />

      <div className="flex-1 lg:min-h-screen overflow-y-auto p-6 no-scrollbar">
        
        {/* Map Section */}
        <div className="w-full h-[500px] mb-6 rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative">
          <DashboardMap locations={[data]} />
          <div className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-indigo-500/10 rounded-full border border-indigo-500/20 backdrop-blur-xl">
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">
              Live Geographic Analysis
            </span>
          </div>
        </div>

        {/* ================= NEW BANNERS SECTION ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {/* Growth Anchors */}
          <div className="p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-md transition-hover hover:bg-emerald-500/10">
            <Heart className="text-emerald-400 w-5 h-5 mb-4" />
            <h4 className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-2">Growth Anchors</h4>
            <p className="text-sm text-slate-300">Target proximity to: <span className="text-white font-medium">Cafes, Gyms, High-end Salons.</span></p>
          </div>

          {/* Brand Clusters */}
          <div className="p-6 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 backdrop-blur-md transition-hover hover:bg-indigo-500/10">
            <Sparkles className="text-indigo-400 w-5 h-5 mb-4" />
            <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">Brand Clusters</h4>
            <p className="text-sm text-slate-300">Presence of: <span className="text-white font-medium">Starbucks, Apple, Nike Anchors.</span></p>
          </div>

          {/* Avoidance Metrics */}
          <div className="p-6 rounded-2xl border border-rose-500/20 bg-rose-500/5 backdrop-blur-md transition-hover hover:bg-rose-500/10">
            <ShieldAlert className="text-rose-400 w-5 h-5 mb-4" />
            <h4 className="text-[10px] font-black text-rose-400 uppercase tracking-widest mb-2">Avoidance Metrics</h4>
            <p className="text-sm text-slate-300">Distance from: <span className="text-white font-medium">Wine shops, High-noise zones.</span></p>
          </div>
        </div>
        {/* ======================================================= */}

        {/* AI Insight */}  
        <div className="mb-10">
          <div className="bg-[#1e1b4b]/40 backdrop-blur-xl border border-indigo-500/20 p-6 rounded-2xl flex gap-5 items-center shadow-lg relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-indigo-500/5 rounded-full blur-3xl"></div>
            <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center">
              <Zap className="text-indigo-400 w-6 h-6" />
            </div>
            <div>
              <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-1">AI Insights</h4>
              <p className="text-md text-slate-300 italic font-medium leading-relaxed">"{data.insights}"</p>
            </div>
          </div>
        </div>

        <div className="mb-10">
          <DemographicsCard data={data} />
        </div>

        <div className="pb-12">
          <FootfallCard data={data} />
        </div>
      </div>
    </div>
  );
}

export default CityDashboard;