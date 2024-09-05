import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className="bg-gray-800 text-white w-64 py-6 px-4">
      <ul className="space-y-4">
        <li><Link to="/dashboard/fleet-owner" className="block text-white hover:bg-gray-700 p-2 rounded">Fleet Owner Dashboard</Link></li>
        <li><Link to="/dashboard/shipper" className="block text-white hover:bg-gray-700 p-2 rounded">Shipper Dashboard</Link></li>
        <li><Link to="/dashboard/driver" className="block text-white hover:bg-gray-700 p-2 rounded">Driver Dashboard</Link></li>
        <li><Link to="/marketplace" className="block text-white hover:bg-gray-700 p-2 rounded">Marketplace</Link></li>
        <li><Link to="/contracts" className="block text-white hover:bg-gray-700 p-2 rounded">Contracts</Link></li>
        <li><Link to="/live-tracking" className="block text-white hover:bg-gray-700 p-2 rounded">Live Tracking</Link></li>
      </ul>
    </aside>
  );
}

export default Sidebar;
