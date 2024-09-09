import { useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FaTruck, FaTachometerAlt, FaChartLine, FaMapMarkerAlt, FaExclamationTriangle } from 'react-icons/fa';

const center = {
  lat: 28.7041,
  lng: 77.1025,
};

// Example truck locations
const truckLocations = [
  { id: 1, lat: 28.7041, lng: 77.1025, name: 'Truck 1', location: 'Delhi - Mumbai', speed: '60km/h', source: 'Delhi', destination: 'Mumbai', eta: '5 hours', utilization: '85%' },
  { id: 2, lat: 28.7042, lng: 77.1125, name: 'Truck 2', location: 'Mumbai - Pune', speed: '80km/h', source: 'Mumbai', destination: 'Pune', eta: '2 hours', utilization: '90%' },
  // Add more truck locations as needed
];

// Define custom truck icon
const truckIcon = new L.Icon({
  iconUrl: '/src/assets/truckicon.png', // Replace with the path to your SVG/image
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const defaultAlerts = [
  { id: 1, truck: 'Truck 1', alert: 'Speeding detected' },
  { id: 2, truck: 'Truck 2', alert: 'Harsh braking' },
  { id: 3, truck: 'Truck 3', alert: 'Maintenance required' },
];

const FleetOwnerDashboard = () => {
  const [activeTab, setActiveTab] = useState('summary');
  const [selectedTruck, setSelectedTruck] = useState(null);
  const [alerts, setAlerts] = useState(defaultAlerts);
  const [selectedAlert, setSelectedAlert] = useState(null); // State to manage selected alert

  const handleMarkerClick = (truck) => {
    setSelectedTruck(truck);
  };

  const handleMapClick = () => {
    setSelectedTruck(null);
  };

  const handleAlertClick = (alert) => {
    if (selectedAlert && selectedAlert.id === alert.id) {
      setSelectedAlert(null); // Deselect alert if clicked again
    } else {
      setSelectedAlert(alert); // Select the clicked alert
    }
  };

  // Custom hook to handle map click
  const MapClickHandler = () => {
    useMapEvents({
      click: handleMapClick,
    });
    return null;
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Navbar */}
      <header className="bg-black h-20 flex justify-between items-center px-8 border-b border-neutral-700">
      </header>

      {/* Main Content */}
      <main className="py-16 px-8 max-w-6xl mx-auto">
        {/* Fleet Overview */}
        <div className="bg-neutral-700 shadow-lg rounded-lg p-6 border border-neutral-900 mb-16 font-body">
          <h2 className="text-3xl font-semibold mb-6 flex items-center font-heading">
            <FaTruck className="mr-2" /> Fleet Overview & Driver Monitoring
          </h2>
          <div className="flex flex-wrap justify-evenly mb-6">
            <button
              className={`mb-1 px-4 py-2 rounded flex items-center ${activeTab === 'summary' ? 'bg-white text-black' : 'bg-black text-neutral-300'}`}
              onClick={() => setActiveTab('summary')}
            >
              <FaTachometerAlt className="mr-2" /> Summary of Trucks
            </button>
            <button
              className={`mb-1 px-4 py-2 rounded flex items-center ${activeTab === 'scorecard' ? 'bg-white text-black' : 'bg-black text-neutral-300'}`}
              onClick={() => setActiveTab('scorecard')}
            >
              <FaChartLine className="mr-2" /> Driver Scorecard
            </button>
            <button
              className={`mb-1 px-4 py-2 rounded flex items-center ${activeTab === 'capacity' ? 'bg-white text-black' : 'bg-black text-neutral-300'}`}
              onClick={() => setActiveTab('capacity')}
            >
              <FaMapMarkerAlt className="mr-2" /> Capacity Utilization
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'summary' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="text-xl">Active Trucks: <span className="font-bold text-green-400">20</span></div>
                <div className="text-xl">Idle Trucks: <span className="font-bold text-red-400">5</span></div>
              </div>
              <ul className="space-y-2">
                <li className="flex justify-between bg-neutral-800 p-4 rounded-lg">
                  <span>Truck 1</span>
                  <span className="text-neutral-400">Driver: Dharampal</span>
                  <span className="text-green-400">Status: Active</span>
                </li>
                <li className="flex justify-between bg-neutral-800 p-4 rounded-lg">
                  <span>Truck 2</span>
                  <span className="text-neutral-400">Driver: Kamlesh</span>
                  <span className="text-red-400">Status: Idle</span>
                </li>
              </ul>
            </div>
          )}
          {activeTab === 'scorecard' && (
            <div className="space-y-4">
              <ul>
                <li className="flex justify-between bg-neutral-800 p-4 rounded-lg mb-2">
                  <span>John Doe</span>
                  <span className="text-neutral-400">Speed Violations: 3</span>
                  <span className="text-yellow-400">Fuel Efficiency: 75%</span>
                </li>
                <li className="flex justify-between bg-neutral-800 p-4 rounded-lg mb-2">
                  <span>Jane Smith</span>
                  <span className="text-neutral-400">Speed Violations: 0</span>
                  <span className="text-yellow-400">Fuel Efficiency: 80%</span>
                </li>
              </ul>
            </div>
          )}
          {activeTab === 'capacity' && (
            <div className="space-y-4">
              <ul>
                <li className="flex justify-between bg-neutral-800 p-4 rounded-lg mb-2">
                  <span>Truck 1</span>
                  <span className="text-blue-400">Utilization: 85%</span>
                </li>
                <li className="flex justify-between bg-neutral-800 p-4 rounded-lg mb-2">
                  <span>Truck 2</span>
                  <span className="text-blue-400">Utilization: 65%</span>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Live Tracker */}
        <div className="bg-white shadow-lg rounded-lg p-6 border border-neutral-900 mb-16 font-body">
          <h2 className={`text-3xl text-black font-semibold mb-6 flex items-center font-heading`}>
            <FaMapMarkerAlt className="mr-2" /> Live Truck Tracker
          </h2>
          {selectedTruck ? (
            <div>
              <h3 className="text-xl mb-4 text-neutral-500">{selectedTruck.name}: In Transit</h3>
              <div className="flex justify-between mb-4 text-neutral-700">
                <div>Location: {selectedTruck.location}</div>
                <div>Speed: {selectedTruck.speed}</div>
              </div>
              <div className="flex justify-between mb-4 text-neutral-700">
                <div>Source: {selectedTruck.source}</div>
                <div>Destination: {selectedTruck.destination}</div>
              </div>
              <div className="flex justify-between mb-4 text-neutral-700">
                <div>ETA: {selectedTruck.eta}</div>
                <div>Utilization: {selectedTruck.utilization}</div>
              </div>
            </div>
          ) : (
            <p className="text-neutral-500">Click on a marker to view details.</p>
          )}
          <div className="w-full h-80 mt-4">
            <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <MapClickHandler />
              {truckLocations.map((truck) => (
                <Marker
                  key={truck.id}
                  position={[truck.lat, truck.lng]}
                  icon={truckIcon}
                  eventHandlers={{ click: () => handleMarkerClick(truck) }}
                >
                  <Popup>
                      <h3 className="text-lg">{truck.name}</h3>
                      <p>Location: {truck.location}</p>
                      <p>Speed: {truck.speed}</p>
                      <p>Source: {truck.source}</p>
                      <p>Destination: {truck.destination}</p>
                      <p>ETA: {truck.eta}</p>
                      <p>Utilization: {truck.utilization}</p>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>


        {/* Alerts & Communication Tools */}
        <div className="bg-neutral-700 shadow-lg rounded-lg p-6 border border-neutral-900 font-body">
          <h2 className="text-3xl font-semibold mb-6 flex items-center font-heading">
            <FaExclamationTriangle className="mr-2" color='red' /> Alerts & Communication Tools
          </h2>
          <div>
            <h3 className="text-xl mb-4">Driver Alerts</h3>
            {alerts.map((alert) => (
              <button
                key={alert.id}
                className="block text-left w-full mb-4 p-4 rounded-lg bg-neutral-800 hover:bg-neutral-600"
                onClick={() => handleAlertClick(alert)}
              >
                <div className="font-bold">{alert.truck}</div>
                <div>{alert.alert}</div>
              </button>
            ))}
          </div>
          {selectedAlert && (
            <div className="mt-8 bg-neutral-800 p-4 rounded-lg">
              <h3 className="text-xl mb-4">Send Message to {selectedAlert.truck}</h3>
              <form>
                <div className="mb-4">
                  <label className="block mb-2">Message</label>
                  <textarea
                    rows="4"
                    className="w-full bg-neutral-600 border border-neutral-500 rounded-lg p-2"
                    placeholder="Enter your message here..."
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500"
                >
                  Send Message
                </button>
              </form>
              <button
                onClick={() => setSelectedAlert(null)}
                className="mt-4 text-red-400 hover:text-red-300"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default FleetOwnerDashboard;
