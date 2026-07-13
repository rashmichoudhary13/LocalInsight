# 📍 LocalInsight

**LocalInsight** is a data-driven market intelligence platform designed to empower entrepreneurs, small business owners, and market researchers with actionable insights. Leveraging machine learning, demographics analysis, and generative AI (Google Gemini), the platform identifies optimal business locations, detects market gaps, performs city-level viability analysis, and generates comprehensive, professionally structured strategic business plans.

---

## 🚀 Key Features

*   **Location Prediction & Ranking**: Recommends the top 5 districts or areas for a specific business category using an custom *Opportunity Score* (based on population, income, footfalls, and competitive density).
*   **City-Level Business Analysis**: Deep-dive assessment showing footfalls, demographics (youth ratio), average rent, and existing competition density.
*   **AI Strategic Intelligence Dashboard**: A premium strategic planning interface that uses Gemini AI to generate:
    *   Proposed Business Names
    *   Executive Syntheses
    *   Target Market Segmentation
    *   Regional Leverage Explanations
    *   Multi-phase Roadmap/Implementation Plans
*   **Market Gap Detection**: Automatically detects market "Niches" with high demand and low saturation.
*   **Professional PDF Export**: One-click download of the generated strategic business plan as a beautifully formatted PDF.

---

## 🏗️ Project Architecture

The project is split into a **React (Vite) Frontend** and a **Flask Backend**.

```
LocalInsight/
├── backend/            # Python Flask server (ML models & AI generation)
│   ├── app.py          # Main entrypoint & route handling
│   ├── business_logic.py# AI Business Plan Generator
│   ├── market_gap.py   # Market Gap / Niche detection logic
│   ├── models.py       # Data models and datasets loader
│   ├── services.py     # External APIs & services (Gemini Integration)
│   ├── utils.py        # Helper utilities (JSON parsing, sanitization)
│   └── requirements.txt# Backend dependencies
├── frontend/           # React + Vite web application
│   ├── src/            # Components, pages, hooks, styling
│   ├── public/         # Static assets
│   ├── index.html      # Main HTML template
│   ├── package.json    # Frontend dependencies
│   └── vite.config.js  # Vite bundler configurations
└── PRD.md              # Product Requirements Document
```

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React.js (Vite)
- **Styling**: Vanilla CSS + TailwindCSS (for dashboard grids) + Framer Motion (smooth, interactive UI animations)
- **Icons**: Lucide React
- **PDF Export**: jsPDF + html2canvas

### Backend
- **Framework**: Flask (Python)
- **Data Analytics**: Pandas, NumPy
- **AI Core**: Google Gemini API (`google-generativeai`)
- **Authentication**: Firebase auth

---

## ⚙️ Getting Started

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [Python](https://www.python.org/) (v3.8+)
- A [Google Gemini API Key](https://aistudio.google.com/)

---

### 1. Backend Setup

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Create a virtual environment (optional but recommended)**:
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure Environment Variables**:
   Create a `.env` file in the `backend/` directory:
   ```env
   GEMINI_API_KEY=your_google_gemini_api_key_here
   ```

5. **Start the Flask server**:
   ```bash
   python app.py
   ```
   The API server will run at `http://localhost:5000`.

---

### 2. Frontend Setup

1. **Navigate to the frontend directory**:
   ```bash
   cd ../frontend
   ```

2. **Install node modules**:
   ```bash
   npm install
   ```

3. **Run the React development server**:
   ```bash
   npm run dev
   ```
   The application will be accessible at `http://localhost:5173` (or the port specified in your console).

---

## 📊 API Reference (Backend)

The backend Flask app exposes the following key API endpoints:

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `GET /` | `GET` | API Health Check. |
| `/api/predict_location` | `POST` | Recommends top districts for a specified business category. |
| `/api/predict_city` | `POST` | Provides detailed analysis, footfall data, and metrics for a specific city. |
| `/api/generate_strategy` | `POST` | Coordinates Gemini AI to generate a full business strategy plan. |

---

## 📖 Further Documentation

For detailed information about project metrics, user flows, database calculations, and the mathematical formulas for the Opportunity Score and Market Gap Analysis, refer to the [PRD.md](PRD.md).
