import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

// Define custom truck marker icon
const truckIcon = new L.Icon({
  iconUrl: 'https://freepngimg.com/thumb/cargo_truck/3-2-cargo-truck-free-png-image.png',
  iconSize: [81, 51],
  iconAnchor: [12, 41],
});

const DriverDashboard = () => {
  const [route, setRoute] = useState([]);

  // Fetch route from OSRM API with multiple waypoints
  const fetchRoute = async (coordinates) => {
    const waypoints = coordinates.map(coord => `${coord[1]},${coord[0]}`).join(';');
    const url = `https://router.project-osrm.org/route/v1/driving/${waypoints}?overview=full&geometries=geojson`;

    try {
      const response = await axios.get(url);
      const coordinates = response.data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]); // Flip coordinates
      return coordinates;
    } catch (error) {
      console.error("Error fetching route from OSRM:", error);
      return [];
    }
  };

  // Fetch initial route when the component loads
  useEffect(() => {
    const initializeRoute = async () => {
      const initialRoute = await fetchRoute([
        [30.7333, 76.7794], // Chandigarh
        [30.3165, 78.0322], // Dehradun
      ]);
      setRoute(initialRoute);
    };
    initializeRoute();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-12 mt-16">Driver Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-8 lg:col-span-1">
            <div className="bg-[#333333] rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Capacity</h2>
              <div className="space-y-2 text-gray-300">
                <p><span className="font-bold">Current:</span> 8,000 kg</p>
                <p><span className="font-bold">Total:</span> 10,000 kg</p>
                <p><span className="font-bold">Available:</span> 2,000 kg</p>
              </div>
            </div>

            <div className="bg-[#333333] rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Current Load</h2>
              <div className="space-y-2 text-gray-300">
                <p><span className="font-bold">Source:</span> Chandigarh, India</p>
                <p><span className="font-bold">Destination:</span> Dehradun, India</p>
                <p className="text-sm text-gray-400">Estimated arrival: 4:30 PM</p>
                <p className="text-sm text-gray-400">Travel time: 5h 45m</p>
              </div>
            </div>

            <div className="bg-[#333333] rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Next Pickup</h2>
              <div className="space-y-2 text-gray-300">
                <p><span className="font-bold">Location:</span> Dehradun, India</p>
                <p><span className="font-bold">Destination:</span> Lucknow, India</p>
                <p className="text-sm text-gray-400">Pickup time: 5:00 PM</p>
                <p className="text-sm text-gray-400">Estimated travel time: 8h 30m</p>
              </div>
            </div>
          </div>

          {/* Route Map Section with Increased Area */}
          <div className="bg-[#333333] rounded-lg p-6 lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-4">Route Map</h2>
            <div className="flex items-center justify-center bg-black rounded-lg h-96 w-full">
              <MapContainer center={route[0] || [30.7333, 76.7794]} zoom={7} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {route.length > 0 && (
                  <>
                    <Marker position={route[0]} icon={truckIcon} />
                    <Marker position={route[route.length - 1]}><img src="src\assets\—Pngtree—location pin vector icon symbol_15329524.png" alt="Location Pin" /></Marker>
                    <Polyline positions={route} color="blue" weight={5} />
                  </>
                )}
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;
