from flask import Flask, request, jsonify
import pickle
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources ={r"/api/*": {"origins":"http://localhost:5173"}})

# 🔹 Load ranked data once when server starts
with open("ranked_locations.pkl", "rb") as file:
    ranked_df = pickle.load(file)
    
with open("location_prediction.pkl", "rb") as f:
    model = pickle.load(f)
    
# 🔹 Load your base dataset (to fill in fixed values)
df = pd.read_csv("business_revenue final.csv")

if 'avg_income' in df.columns:
    df['avg_income'] = (
        df['avg_income']
        .astype(str)
        .str.replace(',', '', regex=False)
        .astype(float)
    )

@app.route("/api/predict_location", methods=["POST"])
def predict_location():
    data = request.get_json()
    business_category = data.get("business_category")
    investment_min = float(data.get("investment_min", 0))
    investment_max = float(data.get("investment_max", 0))
    preferred_district = data.get("preferred_district", "")

    # 1️⃣ Filter by product category
    filtered = ranked_df[ranked_df["product_type"].str.lower() == business_category.lower()]

    # 2️⃣ Filter by district (if user provided one)
    if preferred_district:
        filtered = filtered[filtered["District"].str.lower() == preferred_district.lower()]

    # 3️⃣ Sort by opportunity_score (highest first)
    filtered = filtered.sort_values(by="opportunity_score", ascending=False)

    # 4️⃣ Optionally, apply investment logic (if your dataset has rent/income that relates)
    # For now, we can just return top 5 ranked cities
    top_locations = filtered.head(5).to_dict(orient="records")

    if not top_locations:
        return jsonify({"message": "No suitable locations found for your input."}), 404

    return jsonify(top_locations)

@app.route("/api/predict_city", methods=["POST"])
def predict_city():
    data = request.get_json()
    product_type = data.get("business_category")
    city = data.get("city")

    # Find that city's fixed info from dataset
    city_data = df[df["City"].str.lower() == city.lower()]
    if city_data.empty:
        return jsonify({"error": f"City '{city}' not found in dataset."}), 404

    city_row = city_data.iloc[0]

    # Build input row
    input_data = pd.DataFrame([{
        "avg_income": city_row["avg_income"],
        "population": city_row["population"],
        "Rent": city_row["Rent"],
        "similar_shop": city_row["similar_shop"],
        "Youth_Ratio": city_row["Youth_Ratio"],
        "FootFalls_per_month": city_row["FootFalls_per_month"],
        "product_type": product_type
    }])

    #Predict
    prediction = model.predict(input_data)[0]

    return jsonify({
        "city": city,
        "product_type": product_type,
        "predicted_category": prediction
    })
    
if __name__ == '__main__':
    app.run(debug=True)

# package name
# flask 
# flask-cors
# flask-restful
# scikit-learn 1.6.1