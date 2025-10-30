import React from "react";
import { motion } from "framer-motion";

// --- Icon Components ---
const UsersIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const BriefcaseIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const ZapIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const StoreIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
    <path d="M2 7h20" />
    <path d="M22 7l-2 5H4L2 7" />
  </svg>
);

const DollarSignIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const FootprintsIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 16v-2.38c0-1.47 1.2-2.69 2.66-2.69h1.62c.9 0 1.7.54 2.06 1.35L12 16" />
    <path d="M10.68 18H8.32C6.5 18 5 16.57 5 14.82V14" />
    <path d="M12 20v-3.41c0-1.5 1.2-2.72 2.66-2.72h1.62c.9 0 1.7.54 2.06 1.35L20 20" />
    <path d="M18.68 22H16.32c-1.82 0-3.32-1.43-3.32-3.18V18" />
  </svg>
);

const HomeIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

// --- Circular Progress ---
const CircularProgress = ({ score }) => {
  const numericScore = typeof score === "number" ? score : 0;
  const percentage = Math.min(Math.max(numericScore * 100, 0), 100);
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  let strokeColor = "stroke-green-400";
  if (percentage < 33) strokeColor = "stroke-red-500";
  else if (percentage < 66) strokeColor = "stroke-yellow-400";

  return (
    <div className="relative flex items-center justify-center w-32 h-32">
      <svg className="w-full h-full" viewBox="0 0 120 120">
        <circle className="text-gray-700" strokeWidth="10"
          stroke="currentColor" fill="transparent" r={radius} cx="60" cy="60" />
        <circle className={`${strokeColor} transition-all duration-700 ease-in-out`}
          strokeWidth="10" strokeDasharray={circumference}
          strokeDashoffset={offset} strokeLinecap="round"
          stroke="currentColor" fill="transparent"
          r={radius} cx="60" cy="60" transform="rotate(-90 60 60)" />
      </svg>
      <span className="absolute text-3xl font-bold text-white">
        {numericScore.toFixed(2)}
      </span>
    </div>
  );
};

// --- Main Card ---
function LocationAnalysisCard({ data }) {
  if (!data) return null;
  const isUserFormResult = data.opportunity_score !== undefined;
  const formatNumber = (num) => (typeof num !== "number" ? num : num.toLocaleString("en-IN"));

  return (
    <motion.div
      className="bg-gray-900/70 backdrop-blur-md text-gray-100 p-6 rounded-2xl shadow-xl max-w-3xl mx-auto my-6 hover:shadow-cyan-700/40 border border-gray-700"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
    >
      {isUserFormResult ? (
        <UserFormCardContent data={data} formatNumber={formatNumber} />
      ) : (
        <CityDataFormCardContent data={data} />
      )}
    </motion.div>
  );
}

// --- UserForm Layout ---
const UserFormCardContent = ({ data, formatNumber }) => (
  <>
    <h2 className="text-3xl font-bold text-white mb-1 capitalize">{data.City || data.city}</h2>
    <p className="text-lg text-cyan-400 mb-4 capitalize">{data.District}</p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <InfoBlock icon={<FootprintsIcon className="w-6 h-6 text-cyan-400" />} label="Footfalls per Month" value={formatNumber(data.FootFalls_per_month)} />
        <InfoBlock icon={<DollarSignIcon className="w-6 h-6 text-green-400" />} label="Avg. Income" value={`₹${formatNumber(data.avg_income)}`} />
      </div>
      <div className="flex flex-col items-center justify-center">
        <h3 className="text-sm font-semibold text-gray-400 mb-2">Opportunity Score</h3>
        <CircularProgress score={data.opportunity_score} />
      </div>
    </div>

    <div className="mt-6 border-t border-gray-700 pt-4">
      <h3 className="text-lg font-semibold text-white mb-3">Key Insights</h3>
      <div className="space-y-3">
        <InfoRow icon={<UsersIcon className="w-5 h-5 text-cyan-400" />} label="Youth Ratio" value={`${((data.Youth_Ratio || 0) * 100).toFixed(1)}%`} />
        <InfoRow icon={<HomeIcon className="w-5 h-5 text-cyan-400" />} label="Monthly Rent" value={`₹${formatNumber(data.Rent)}`} />
        <InfoRow icon={<BriefcaseIcon className="w-5 h-5 text-cyan-400" />} label="Product Type" value={data.product_type} capitalize />
        <InfoRow icon={<StoreIcon className="w-5 h-5 text-cyan-400" />} label="Similar Shops Nearby" value={data.similar_shop} />
      </div>
    </div>
  </>
);

// --- CityData Layout (With Gemini Insight) ---
const CityDataFormCardContent = ({ data }) => {
  const successCategory = data.predicted_category || "N/A";
  let categoryColor = "bg-gray-500";
  if (successCategory.toLowerCase() === "high") categoryColor = "bg-green-500";
  else if (successCategory.toLowerCase() === "medium") categoryColor = "bg-yellow-500";
  else if (successCategory.toLowerCase() === "low") categoryColor = "bg-red-500";

  return (
    <>
      <h2 className="text-3xl font-bold text-white mb-4 capitalize">
        {data.city || data.City}
      </h2>
      <div className="space-y-4">
        <InfoBlock icon={<BriefcaseIcon className="w-6 h-6 text-cyan-400" />} label="Business Type" value={data.product_type} />
        <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
          <div className="flex items-center space-x-3">
            <ZapIcon className="w-6 h-6 text-cyan-400" />
            <span className="text-gray-300">Success Chances</span>
          </div>
          <span className={`font-semibold text-white capitalize px-3 py-1 rounded-full text-sm ${categoryColor}`}>
            {data.predicted_category}
          </span>
        </div>

        {/* ✅ AI Insights Section */}
        {data.insights && (
          <motion.div
            className="mt-6 bg-gradient-to-br from-cyan-900/30 to-gray-800/50 border border-cyan-700/40 p-4 rounded-xl text-gray-200 shadow-inner"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h3 className="text-lg font-semibold text-cyan-400 mb-2">AI Business Insight</h3>
            <p className="text-sm leading-relaxed whitespace-pre-line">{data.insights}</p>
          </motion.div>
        )}
      </div>
    </>
  );
};

// --- Reusable Blocks ---
const InfoRow = ({ icon, label, value, capitalize = false }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center space-x-3">
      {icon}
      <span className="text-gray-300">{label}</span>
    </div>
    <span className={`font-semibold text-white ${capitalize ? "capitalize" : ""}`}>
      {value}
    </span>
  </div>
);

const InfoBlock = ({ icon, label, value }) => (
  <div className="flex items-center justify-between bg-gray-800/60 rounded-xl p-3">
    <div className="flex items-center space-x-3">
      {icon}
      <span className="text-gray-300">{label}</span>
    </div>
    <span className="text-xl font-semibold text-white">{value}</span>
  </div>
);

export default LocationAnalysisCard;
