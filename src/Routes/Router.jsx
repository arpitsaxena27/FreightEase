import { Routes,Route } from 'react-router-dom';
import SignIn from '../components/Auth/SignIn';
import SignUp from '../components/Auth/SignUp';
import FleetOwnerDashboard from '../components/Dashboard/FleetOwnerDashboard';
import HomePage from '../components/Homepage';
import Mainpage from '../components/Mainpage'
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
                <Route path="/" element={<HomePage />} /> {/* Home Page Route */}
                <Route path="/main" element={<Mainpage/>} />
                <Route path="/login" element={<SignIn />} />
                <Route path="/register" element={<SignUp />} />
                <Route path="/dashboard/fleet-owner" element={<FleetOwnerDashboard />} />
                {/* <Route path="/dashboard/shipper" element={<ShipperDashboard />} />
                <Route path="/dashboard/driver" element={<DriverDashboard />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/contracts" element={<Contracts />} />
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