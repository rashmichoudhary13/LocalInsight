import React from "react";

function LocationAnalysisCard({ data }) {
  const isCityPrediction = data.predicted_category !== undefined; 
  // 👆 If 'predicted_category' exists → city-level prediction

  return (
    <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all">
      {/* Common City Header */}
      <h2 className="text-xl font-bold mb-2 capitalize">
        {data.city || data.City}
      </h2>

      {isCityPrediction ? (
        // ✅ Layout for CityDataForm result
        <>
          <p className="text-gray-600">
            Business Type: {data.product_type}
          </p>
          <p className="text-gray-600">
            Success Chances: {data.predicted_category}
          </p>
        </>
      ) : (
        // ✅ Layout for UserForm result
        <>
          <p className="text-gray-600">Similar Shops: {data.similar_shop}</p>
          <p className="text-gray-600">Average Income: ₹{data.avg_income}</p>
        </>
      )}
    </div>
  );
}

export default LocationAnalysisCard;
