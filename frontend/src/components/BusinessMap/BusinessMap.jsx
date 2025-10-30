import React, { useState, useEffect, useRef } from "react";
import { Map, Source, Layer } from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useLocation } from "react-router-dom";

const MAPTILER_API_KEY = "PSKKY9Cyh2izeQTNhuac";

const BusinessMap = ({ mapStyle = "dark" }) => {
  const location = useLocation();
  const locations = location.state?.locations || [];

  const [geoData, setGeoData] = useState(null);
  const [viewState, setViewState] = useState({
    longitude: 78.9629,
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
              area: loc.Area || 100, // Default area metric
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

  // --- Map Style Config ---
  const getMapStyleUrl = () => {
    const styles = {
      streets: `https://api.maptiler.com/maps/streets-v2/style.json?key=${MAPTILER_API_KEY}`,
      hybrid: `https://api.maptiler.com/maps/hybrid/style.json?key=${MAPTILER_API_KEY}`,
      dataviz: `https://api.maptiler.com/maps/dataviz/style.json?key=${MAPTILER_API_KEY}`,
      dark: `https://api.maptiler.com/maps/darkmatter/style.json?key=${MAPTILER_API_KEY}`,
    };
    return styles[mapStyle] || styles.dark;
  };

  // --- GeoJSON Conversion ---
  const features = geoData
    ? geoData.map((city) => ({
        type: "Feature",
        properties: {
          city: city.city,
          radius: Math.max(40, Math.min(city.area / 3, 150)), // Controls size
        },
        geometry: {
          type: "Point",
          coordinates: [city.longitude, city.latitude],
        },
      }))
    : [];

  // --- Radar Ring Layers (3 rings per city) ---
  const radarLayer1 = {
    id: "radar-ring-1",
    type: "circle",
    paint: {
      "circle-radius": ["*", ["get", "radius"], 1],
      "circle-color": "rgba(0, 255, 128, 0.05)",
      "circle-stroke-color": "rgba(0, 255, 128, 0.4)",
      "circle-stroke-width": 2,
    },
  };

  const radarLayer2 = {
    id: "radar-ring-2",
    type: "circle",
    paint: {
      "circle-radius": ["*", ["get", "radius"], 1.6],
      "circle-color": "rgba(0, 255, 128, 0.03)",
      "circle-stroke-color": "rgba(0, 255, 128, 0.25)",
      "circle-stroke-width": 1.5,
    },
  };

  const radarLayer3 = {
    id: "radar-ring-3",
    type: "circle",
    paint: {
      "circle-radius": ["*", ["get", "radius"], 2.3],
      "circle-color": "rgba(0, 255, 128, 0.01)",
      "circle-stroke-color": "rgba(0, 255, 128, 0.15)",
      "circle-stroke-width": 1,
    },
  };

  // --- Center Pulse Marker (city pinpoint) ---
  const pinpointLayer = {
    id: "city-pin",
    type: "circle",
    paint: {
      "circle-radius": 5,
      "circle-color": "rgba(0,255,128,1)",
      "circle-stroke-width": 2,
      "circle-stroke-color": "#00ffaa",
    },
  };

  // --- Animation for subtle radar expansion ---
  const [pulseScale, setPulseScale] = useState(1);
  useEffect(() => {
    let growing = true;
    const interval = setInterval(() => {
      setPulseScale((prev) => {
        if (prev >= 1.15) growing = false;
        if (prev <= 0.9) growing = true;
        return growing ? prev + 0.02 : prev - 0.02;
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);

  // Animate radar ring sizes
  const animatedRadarLayers = [radarLayer1, radarLayer2, radarLayer3].map(
    (layer, i) => ({
      ...layer,
      paint: {
        ...layer.paint,
        "circle-radius": [
          "*",
          ["get", "radius"],
          (1 + i * 0.4) * pulseScale,
        ],
      },
    })
  );

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
            {/* Animated radar rings */}
            {animatedRadarLayers.map((layer) => (
              <Layer key={layer.id} {...layer} />
            ))}

            {/* City center pinpoint */}
            <Layer {...pinpointLayer} />
          </Source>
        )}
      </Map>

      {/* Overlay Info Panel */}
      <div className="absolute top-20 left-5 bg-black/60 text-white px-4 py-3 rounded-lg shadow-lg backdrop-blur-md border border-emerald-400/20">
        <h2 className="text-lg font-semibold">Predicted Locations</h2>
        <p className="text-gray-300 text-sm">
          Showing {locations.length} analytical radar zones
        </p>
      </div>
    </div>
  );
};

export default BusinessMap;
