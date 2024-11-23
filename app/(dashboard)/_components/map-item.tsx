

// export default MapComponent;
"use client";
import React, { useRef, useEffect, useState } from "react";
import "./map.css";

// ArcGIS imports
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Graphic from "@arcgis/core/Graphic";

const MapComponent = () => {
  const mapDiv = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (mapDiv.current) {
      // Create a map
      const map = new Map({
        basemap: "streets-vector", // Basemap layer
      });

      // Create a MapView
      const view = new MapView({
        container: mapDiv.current,
        map: map,
        center: [-117.1490, 32.7353], // Longitude, latitude
        zoom: 10,
      });

      // Create a GraphicsLayer for adding points
      const graphicsLayer = new GraphicsLayer();
      map.add(graphicsLayer);

      // Create a point graphic
      const point = {
        type: "point", // autocasts as new Point()
        longitude: -117.1490,
        latitude: 32.7353,
      };

      // Create a graphic with the point
      const pointGraphic = new Graphic({
        geometry: point,
        symbol: {
          type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
          color: "red",
          size: "10px",
        },
      });

      // Add the graphic to the GraphicsLayer
      graphicsLayer.add(pointGraphic);

      // Event listener for the map click to show the popup
      view.on("click", (event) => {
        view.hitTest(event).then((response) => {
          const graphic = response.results[0]?.graphic;
          if (graphic) {
            // Calculate the center of the viewport
            const { clientWidth, clientHeight } = document.documentElement;

            // Set the position for the popup to be at the center
            setPopupPosition({
              x: (clientWidth - 1000) / 2, // 200 is the width of the popup
              y: (clientHeight - 100) / 2, // 100 is the height of the popup
            });

            // Show the popup
            setShowPopup(true);
          }
        });
      });

      // Cleanup
      return () => view && view.destroy();
    }
  }, []);

  return (
    <>
      {/* Map container */}
      <div
        className="mapDiv"
        ref={mapDiv}
        style={{ height: "100vh", width: "100%" }}
      ></div>

      {/* Custom popup */}
      {showPopup && (
        <div
          className="popup"
          style={{
            position: "absolute",
            left: `${popupPosition.x}px`,
            top: `${popupPosition.y}px`,
            backgroundColor: "white",
            padding: "20px",
            border: "2px solid #000",
            zIndex: 1000,
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          <div className="popup-content" style={{ textAlign: "center" }}>
            <h2>Hey, pop up!</h2>
            <p>This is a custom popup centered on the screen.</p>
            <button
              onClick={() => setShowPopup(false)}
              style={{
                marginTop: "10px",
                padding: "10px 20px",
                backgroundColor: "#4caf50",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MapComponent;
