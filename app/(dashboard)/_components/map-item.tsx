"use client";
import React, { useRef, useEffect, useState, act } from "react";
import "./map.css";
import { AerialVehicle, TerrestrialVehicle, Baliza } from "@prisma/client";
import { cn } from "@/lib/utils";

import Map from "@arcgis/core/Map.js";
import MapView from "@arcgis/core/views/MapView.js";
import BasemapToggle from "@arcgis/core/widgets/BasemapToggle.js";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js";
import Graphic from "@arcgis/core/Graphic.js";
import "@arcgis/core/assets/esri/themes/light/main.css";
import axios from "axios";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Cross, Flame, MapPin, Plane, Shield, X } from "lucide-react";


interface MapComponentProps {
  aerialVehicles: AerialVehicle[],
  terrestrialVehicles: TerrestrialVehicle[],
  balizas: Baliza[]
}

const MapComponent = ({
  aerialVehicles,
  terrestrialVehicles,
  balizas
}: MapComponentProps
) => {
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const mapDiv = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [activeSubwindow, setActiveSubwindow] = useState(1); // Default to Subwindow 1
  const [vehicleTypePopup, setVehicleTypePopup] = useState("dron");

  // Future implementation for KINEIS integration
  /*const fetchInfo = async () => {try {
    
    const config = {
      headers: { Authorization: `Bearer TOKEN` }
    };

    const response = await axios.get("https://verhaert.allthingstalk.io//device/{{HUONnBVQowuDKBT4YrczeK5g}}/asset/{{temperature}}",
      config
    );
    
    console.log("OK")
    console.log(response)

    } catch (error){
    console.log("ERROR")
    console.log(error)
    }
  };*/
  
  // Handle changing the subwindow
  const handleSubwindowChange = (subwindowNumber) => {
    if (subwindowNumber === 1) {
      if (videoRef2.current) {
        videoRef2.current.pause();
        videoRef2.current.currentTime = 0;
      }
    } else if (subwindowNumber === 2) {
      if (videoRef1.current) {
        videoRef1.current.pause();
        videoRef1.current.currentTime = 0;
      }
    }
    setActiveSubwindow(subwindowNumber);
  };

  const getVideoSource = () => {
    return activeSubwindow === 1
      ? "video_dron_view.mp4"
      : "video_dron_thermal_view.mp4";
  };



  // State to manage layer visibility
  const [layersVisibility, setLayersVisibility] = useState({
    heli: true,
    fire: true,
    cross: true,
    drone: true,
    heliOnly: true, // New state for the helicopter-only 
    baliza: true
  });

  // References to GraphicsLayers
  const heliLayerRef = useRef<GraphicsLayer | null>(null);
  const fireLayerRef = useRef<GraphicsLayer | null>(null);
  const crossLayerRef = useRef<GraphicsLayer | null>(null);
  const droneLayerRef = useRef<GraphicsLayer | null>(null);
  const heliOnlyLayerRef = useRef<GraphicsLayer | null>(null); // New reference for the helicopter-only layer
  const balizaLayerRef = useRef<GraphicsLayer | null>(null); // New reference for the helicopter-only layer

  useEffect(() => {
    if (mapDiv.current) {
      const map = new Map({
        basemap: "osm",
      });

      const view = new MapView({
        container: mapDiv.current,
        map: map,
        center: [-0.39, 39.43], // Center on Paiporta
        zoom: 13,
      });

      // Initialize GraphicsLayers
      const heliLayer = new GraphicsLayer({ title: "Helicopters" });
      const fireLayer = new GraphicsLayer({ title: "Fires" });
      const crossLayer = new GraphicsLayer({ title: "Crosses" });
      const droneLayer = new GraphicsLayer({ title: "Drones" });
      const heliOnlyLayer = new GraphicsLayer({ title: "Helicopters Only" }); // New helicopter-only layer
      const balizaLayer = new GraphicsLayer({ title: "Drones" });

      // Assign layers to refs
      heliLayerRef.current = heliLayer;
      fireLayerRef.current = fireLayer;
      crossLayerRef.current = crossLayer;
      droneLayerRef.current = droneLayer;
      heliOnlyLayerRef.current = heliOnlyLayer; // Assign new layer to ref
      balizaLayerRef.current = balizaLayer;

      // Add layers to the map
      map.addMany([heliLayer, fireLayer, crossLayer, droneLayer, heliOnlyLayer, balizaLayer]);

      const coordinates = [];

      aerialVehicles.forEach(vehicle => {
        coordinates.push({longitude: vehicle.longitude, latitude: vehicle.latitude, type: vehicle.type});
      });

      terrestrialVehicles.forEach(vehicle => {
        coordinates.push({longitude: vehicle.longitude, latitude: vehicle.latitude, type: vehicle.type});
      });

      balizas.forEach(vehicle => {
        coordinates.push({longitude: vehicle.longitude, latitude: vehicle.latitude, type: vehicle.type});
      });


      console.log(coordinates);
      // Array of coordinates with type
      
      // Icon URLs mapped by type
      const icons: { [key: string]: string } = {
        heli: "/heli.png",
        fire: "/fire.png",
        cross: "/cross.png",
        drone: "/drone.png",
        baliza: "/baliza.png"
      };

      // Add points to respective GraphicsLayers with assigned icons and attributes
      coordinates.forEach((coord, index) => {
        const iconUrl = icons[coord.type];

        const pointGraphic = new Graphic({
          geometry: {
            type: "point",
            longitude: coord.longitude,
            latitude: coord.latitude,
          },
          symbol: {
            type: "picture-marker",
            url: iconUrl,
            width: "24px",
            height: "24px",
          },
          attributes: {
            name: `Point ${index + 1}`,
            type: coord.type,
          },
        });

        // Add graphic to the appropriate layer
        switch (coord.type) {
          case "heli":
            heliLayer.add(pointGraphic);
            heliOnlyLayer.add(pointGraphic); // Also add to the helicopter-only layer
            break;
          case "fire":
            fireLayer.add(pointGraphic);
            break;
          case "cross":
            crossLayer.add(pointGraphic);
            break;
          case "drone":
            droneLayer.add(pointGraphic);
            break;
          case "baliza":
            balizaLayer.add(pointGraphic);
            break;
          default:
            break;
        }
      });

      // Event listener for map click to show the custom popup
      view.on("click", (event) => {
        view.hitTest(event).then((response) => {
          const graphic = response.results[0]?.graphic;
          if (graphic) {
            const { offsetWidth, offsetHeight } = view.container;
            setPopupPosition({
              x: (offsetWidth+950)/2, // Adjusted for popup width
              y: (offsetHeight+450)/2, // Adjusted for popup height
            });
            //setVehicleTypePopup("heli");
            setShowPopup(true);
          }
        });
      });

      // Initialize BasemapToggle
      const toggle = new BasemapToggle({
        view: view,
        nextBasemap: "hybrid",
      });

      view.ui.add(toggle, "top-right");

      // Cleanup on unmount
      return () => {
        if (view) {
          view.destroy();
        }
      };
    }
  }, []);





  // Effect to handle layer visibility based on state
  useEffect(() => {
    if (fireLayerRef.current) {
      fireLayerRef.current.visible = layersVisibility.fire;
    }
    if (crossLayerRef.current) {
      crossLayerRef.current.visible = layersVisibility.cross;
    }
    if (droneLayerRef.current) {
      droneLayerRef.current.visible = layersVisibility.drone;
    }
    if (heliOnlyLayerRef.current) {
      heliOnlyLayerRef.current.visible = layersVisibility.heliOnly; // Handle visibility for the new layer
    }
    if (balizaLayerRef.current) {
      balizaLayerRef.current.visible = layersVisibility.baliza;
    }
  }, [layersVisibility]);

  // Handler for layer visibility toggle
  const handleLayerToggle = (layerType: string) => {
    setLayersVisibility((prev) => ({
      ...prev,
      [layerType]: !prev[layerType],
    }));
  };

  return (
    <>
      <div
        className="mapDiv"
        ref={mapDiv}
        style={{ height: "100vh", width: "100%" }}
      ></div>

      {/* Layer Control Widgets */}
      <div className="absolute top-44 left-3 gap-y-5">
        <div className="flex flex-col">
        <Button onClick={() => handleLayerToggle("fire")}
                size="sm" variant="default" className={cn(
                  "bg-slate-200 text-slate-800 border-slate-900 border-2 m-2 h-16 w-16",
                  layersVisibility.fire  && "bg-slate-800 text-slate-100 m-2 h-16 w-16"
              )}>
            <Flame className="h-6 w-6"/>
        </Button>

        <Button onClick={() => handleLayerToggle("cross")}
                size="sm" variant="default" className={cn(
                  "bg-slate-200 text-slate-800 border-slate-900 border-2 m-2 h-16 w-16",
                  layersVisibility.cross  && "bg-slate-800 text-slate-100 m-2 h-16 w-16"
              )}>
            <Cross className="h-6 w-6"/>
        </Button>

        <Button onClick={() => handleLayerToggle("drone")}
                size="sm" variant="default" className={cn(
                  "bg-slate-200 text-slate-800 border-slate-900 border-2 m-2 h-16 w-16",
                  layersVisibility.drone  && "bg-slate-800 text-slate-100 m-2 h-16 w-16"
              )}>
            <Plane className="h-6 w-6"/>
        </Button>

        <Button onClick={() => handleLayerToggle("heliOnly")}
                size="sm" variant="default" className={cn(
                  "bg-slate-200 text-slate-800 border-slate-900 border-2 m-2 h-16 w-16",
                  layersVisibility.heliOnly  && "bg-slate-800 text-slate-100 m-2 h-16 w-16"
              )}>
            <Shield className="h-6 w-6"/>
        </Button>

        <Button onClick={() => handleLayerToggle("baliza")}
                size="sm" variant="default" className={cn(
                  "bg-slate-200 text-slate-800 border-slate-900 border-2 m-2 h-16 w-16",
                  layersVisibility.baliza  && "bg-slate-800 text-slate-100 m-2 h-16 w-16"
              )}>
            <MapPin className="h-6 w-6"/>
        </Button>

        </div>
        
      </div>
      

      {/* Custom popup */}
      {showPopup && (
        <div
          className="absolute items-center border-slate-800 border-2 rounded-md bg-slate-100"
          style={{
            left: `${popupPosition.x - 350}px`,
            top: `${popupPosition.y - 250}px`,
            zIndex: 1000,
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            width: "600px",
            height: "350px",
            overflow: "hidden",
          }}
        >
          <div className="flex flex-col justify-center items-center">
            <div className="relative justify-center">
              {activeSubwindow === 1 && (
                <video ref={videoRef1} width="600" height="400" controls>
                  <source src={getVideoSource()} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
              {activeSubwindow === 2 && (
                <video ref={videoRef2} width="600" height="400" controls>
                  <source src={getVideoSource()} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
            <div className="absolute gap-x-10 m-5 top-0 left-0 w-20">
              <div className="flex flex-row gap-x-3">
                  <Button onClick={() => handleSubwindowChange(1)} className={cn(
                  "bg-slate-200 text-slate-800 border-slate-900 border-2",
                  activeSubwindow===2  && "bg-slate-800 text-slate-100"
              )}>Optical</Button>
                  <Button onClick={() => handleSubwindowChange(2)} className={cn(
                  "bg-slate-200 text-slate-800 border-slate-900 border-2",
                  activeSubwindow===1 && "bg-slate-800 text-slate-100"
              )}>Thermal</Button>
              </div>
            </div>
            <Button
              onClick={() => setShowPopup(false)}
              className="absolute top-0 right-0 bg-slate-900 text-slate-200 rounded-md m-4"
            >
              <X className="h-4 w-4"/>
            </Button>
        </div>
        </div>
      )}
    </>
  );
};

// Styles for the Layer Control Widgets
const layerControlStyle: React.CSSProperties = {
  position: "relative",
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  padding: "10px",
  borderRadius: "5px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
  margin: "4px",
};

// Dynamic button styles based on layer visibility
const buttonStyle = (isVisible: boolean): React.CSSProperties => ({
  padding: "5px 10px",
  backgroundColor: isVisible ? "#f44336" : "#4caf50",
  color: "white",
  border: "none",
  borderRadius: "3px",
  cursor: "pointer",
});

export default MapComponent;