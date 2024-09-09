import { Routes, Route } from "react-router-dom";
import SignIn from "../components/Auth/SignIn";
import SignUp from "../components/Auth/SignUp";
import FleetOwnerDashboard from "../components/Dashboard/FleetOwnerDashboard";
import HomePage from "../components/Homecompo/Homepage";
import AcceptOrder from "../components/Marketplace/FleetManagerMarketplace.jsx";
import DriverDashboard from "../components/Dashboard/DriverDashboard.jsx";
import ShipperDashboard from "../components/Dashboard/ShipperDashboard.jsx";
import Contracts from "../components/Contracts.jsx";
// import ShipperDashboard from '../components/Dashboard/ShipperDashboard';
// import DriverDashboard from '../components/Dashboard/DriverDashboard';
// import Marketplace from '../components/Freight/Marketplace';
// import Contracts from '../components/Contracts/Contracts';
// import LiveTracking from '../components/Map/LiveTracking';
// import PerformanceMonitoring from '../components/Dashboard/PerformanceMonitoring';
// import Optimization from '../components/Freight/OptimizationSummary';
// import Notifications from '../components/Notifications/NotificationPanel';
// import LegalAssistance from '../components/Legal/LegalAssistance';

function Router() {
      return (
            <>
                  <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<SignIn />} />
                        <Route path="/register" element={<SignUp />} />
                        <Route path="/freightmarket/fleetowner" element={<AcceptOrder />} />
                        <Route
                              path="/dashboard/fleet-owner"
                              element={<FleetOwnerDashboard />}
                        />
                        <Route path="/dashboard/shipper" element={<ShipperDashboard></ShipperDashboard>} />
                        <Route path="/dashboard/driver" element={<DriverDashboard></DriverDashboard>} />
                        <Route path="/contracts" element={<Contracts></Contracts>} />
                        {/* 
                
                <Route path="/live-tracking" element={<LiveTracking />} />
                <Route path="/performance-monitoring" element={<PerformanceMonitoring />} />
                <Route path="/optimization" element={<Optimization />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/legal-assistance" element={<LegalAssistance />} /> */}
                  </Routes>
            </>
      );
}

export default Router;
