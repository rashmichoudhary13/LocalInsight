import React, { useState, useEffect } from "react";
import { Map, Source, Layer } from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useLocation } from "react-router-dom";

const MAPTILER_API_KEY = "PSKKY9Cyh2izeQTNhuac";

const BusinessMap = ({ mapStyle = "dark" }) => {
  const location = useLocation();
  const locations = location.state?.locations || [];

  const [geoData, setGeoData] = useState(null);
  const [viewState, setViewState] = useState({
    longitude: 78.9629, // Center of India
    latitude: 20.5937,
    zoom: 4.5,
  });

  // Fetch coordinates for each city
  useEffect(() => {
    const fetchCoordinates = async () => {
      const results = [];

      for (const loc of locations) {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${loc.City}`
          );
          const data = await res.json();

          if (data.length > 0) {
            results.push({
              city: loc.City,
              latitude: parseFloat(data[0].lat),
              longitude: parseFloat(data[0].lon),
              area: loc.Area || 100, // Default if missing
            });
          }
        } catch (err) {
          console.error("Error fetching coordinates:", err);
        }
      }

      setGeoData(results);
    };

    if (locations.length > 0) {
      fetchCoordinates();
    }
  }, [locations]);

  const getMapStyleUrl = () => {
    const styles = {
      streets: `https://api.maptiler.com/maps/streets-v2/style.json?key=${MAPTILER_API_KEY}`,
      hybrid: `https://api.maptiler.com/maps/hybrid/style.json?key=${MAPTILER_API_KEY}`,
      dataviz: `https://api.maptiler.com/maps/dataviz/style.json?key=${MAPTILER_API_KEY}`,
      dark: `https://api.maptiler.com/maps/darkmatter/style.json?key=${MAPTILER_API_KEY}`,
    };
    return styles[mapStyle] || styles.dark;
  };

  const features = geoData
    ? geoData.map((city) => ({
        type: "Feature",
        properties: {
          city: city.city,
          radius: Math.max(20, Math.min(city.area / 5, 120)), // Scale radius based on area
        },
        geometry: {
          type: "Point",
          coordinates: [city.longitude, city.latitude],
        },
      }))
    : [];

  const circleLayerStyle = {
    id: "predicted-circles",
    type: "circle",
    paint: {
      "circle-radius": ["get", "radius"],
      "circle-color": "rgba(0, 255, 117, 0.35)",
      "circle-stroke-color": "rgba(0, 255, 117, 1)",
      "circle-stroke-width": 2,
    },
  };

  return (
    <div className="w-full h-screen relative">
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle={getMapStyleUrl()}
        style={{ width: "100%", height: "100%" }}
      >
        {geoData && (
          <Source
            id="predicted-locations"
            type="geojson"
            data={{
              type: "FeatureCollection",
              features,
            }}
          >
            <Layer {...circleLayerStyle} />
          </Source>
        )}
      </Map>

      {/* Overlay */}
      <div className="absolute top-20 left-5 bg-black/60 text-white px-4 py-3 rounded-lg shadow-lg backdrop-blur-md">
        <h2 className="text-lg font-semibold">Predicted Locations</h2>
        <p className="text-gray-300 text-sm">
          Showing {locations.length} recommended business zones
        </p>
      </div>
    </div>
  );
};

export default BusinessMap;
