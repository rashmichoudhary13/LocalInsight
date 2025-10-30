from flask import Flask, request, jsonify
import pickle
import pandas as pd
import numpy as np
from flask_cors import CORS
import os
from dotenv import load_dotenv  # ✅ Load environment variables
import google.generativeai as genai

# 🔹 Initialize Flask and enable CORS
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

# 🔹 Load environment variables from .env file
load_dotenv()

# 🔹 Configure Gemini API key
api_key = os.getenv("GEMINI_API_KEY")
if api_key:
    try:
        genai.configure(api_key=api_key)
        gemini_model = genai.GenerativeModel("gemini-2.5-flash")  # ✅ Free-tier model
        print("✅ Gemini API configured successfully.")
    except Exception as e:
        print(f"⚠️ Gemini configuration error: {e}")
        gemini_model = None
else:
    print("⚠️ GEMINI_API_KEY not found in .env file.")
    gemini_model = None

# 🔹 Load datasets and ML model
with open("ranked_locations.pkl", "rb") as file:
    ranked_df = pickle.load(file)

with open("location_prediction.pkl", "rb") as f:
    model_prediction = pickle.load(f)

df = pd.read_csv("business_revenue final.csv")

if "avg_income" in df.columns:
    df["avg_income"] = (
        df["avg_income"]
        .astype(str)
        .str.replace(",", "", regex=False)
        .astype(float)
    )


# 🔧 Helper: recursively convert numpy & pandas objects to JSON-safe types
def make_json_serializable(obj):
    if isinstance(obj, dict):
        return {k: make_json_serializable(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [make_json_serializable(v) for v in obj]
    elif isinstance(obj, (np.integer, np.int64)):
        return int(obj)
    elif isinstance(obj, (np.floating, np.float64)):
        return float(obj)
    elif isinstance(obj, (np.bool_)):
        return bool(obj)
    elif isinstance(obj, pd.Series):
        return make_json_serializable(obj.to_dict())
    elif pd.isna(obj):
        return None
    return obj


# 🧭 Route 1: Predict top 5 locations
@app.route("/api/predict_location", methods=["POST"])
def predict_location():
    data = request.get_json()
    business_category = data.get("business_category")
    investment_min = float(data.get("investment_min", 0))
    investment_max = float(data.get("investment_max", 0))
    preferred_district = data.get("preferred_district", "")

    # Filter dataset
    filtered = ranked_df[ranked_df["product_type"].str.lower() == business_category.lower()]

    if preferred_district:
        filtered = filtered[filtered["District"].str.lower() == preferred_district.lower()]

    filtered = filtered.sort_values(by="opportunity_score", ascending=False)
    top_locations = filtered.head(5).to_dict(orient="records")

    if not top_locations:
        return jsonify({"message": "No suitable locations found for your input."}), 404

    return jsonify(make_json_serializable(top_locations))


# 🌆 Route 2: Predict city success + AI insights
@app.route("/api/predict_city", methods=["POST"])
def predict_city():
    data = request.get_json()
    product_type = data.get("business_category")
    city = data.get("city")

    # Find city in dataset
    city_data = df[df["City"].str.lower() == city.lower()]
    if city_data.empty:
        return jsonify({"error": f"City '{city}' not found in dataset."}), 404

    city_row = city_data.iloc[0]

    # Prepare input for ML model
    input_data = pd.DataFrame([{
        "avg_income": city_row["avg_income"],
        "population": city_row["population"],
        "Rent": city_row["Rent"],
        "similar_shop": city_row["similar_shop"],
        "Youth_Ratio": city_row["Youth_Ratio"],
        "FootFalls_per_month": city_row["FootFalls_per_month"],
        "product_type": product_type
    }])

    # Predict success level
    prediction = model_prediction.predict(input_data)[0]

    # Data summary for AI
    data_for_ai = {
        "city": city,
        "product_type": product_type,
        "avg_income": float(city_row["avg_income"]),
        "population": int(city_row["population"]),
        "rent": float(city_row["Rent"]),
        "similar_shops": int(city_row["similar_shop"]),
        "youth_ratio": float(city_row["Youth_Ratio"]),
        "footfalls": int(city_row["FootFalls_per_month"]),
        "predicted_category": str(prediction),
    }

    # 🧠 Generate Gemini AI insights
    ai_summary = "AI summary unavailable."
    if gemini_model:
        try:
            prompt = f"""
            You are a smart business analyst.
            Analyze the success potential of a {product_type} business in {city}
            using the following data:

            {data_for_ai}

            Explain briefly in 4-5 sentences why this business might succeed
            or face challenges here, focusing on factors like income levels,
            rent, youth ratio, and customer footfall.
            """
            response = gemini_model.generate_content(prompt)
            ai_summary = getattr(response, "text", "AI summary unavailable.")
        except Exception as e:
            print(f"Error during Gemini generation: {e}")
            ai_summary = "AI summary unavailable due to generation issue."
            

    # Final response
    final_response = {
        "city": city,
        "product_type": product_type,
        "predicted_category": prediction,
        "insights": ai_summary
    }

    return jsonify(make_json_serializable(final_response))


if __name__ == "__main__":
    app.run(debug=True)
