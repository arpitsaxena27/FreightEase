import { useState } from 'react';
import { FaFileContract, FaReceipt, FaListAlt, FaDollarSign } from 'react-icons/fa';

const Contracts = () => {
  const [activeTab, setActiveTab] = useState('contracts');
  const [waybillData, setWaybillData] = useState({
    shipmentDetails: '',
    origin: '',
    destination: '',
  });
  const [invoiceData, setInvoiceData] = useState({
    amount: '',
    dueDate: '',
  });
  const [contracts] = useState([
    { id: 1, name: 'Contract 1' },
    { id: 2, name: 'Contract 2' },
  ]);
  const [transactions] = useState([
    { id: 1, type: 'Payment', amount: '$100', date: '2024-09-01' },
    { id: 2, type: 'Refund', amount: '$50', date: '2024-09-02' },
  ]);

  const handleWaybillSubmit = (e) => {
    e.preventDefault();
    console.log('Waybill data:', waybillData);
    // Handle waybill submission here
  };

  const handleInvoiceSubmit = (e) => {
    e.preventDefault();
    console.log('Invoice data:', invoiceData);
    // Handle invoice submission here
  };

  const handleTabChange = (tab) => {
    if (tab === 'contracts') {
      setActiveTab('contracts');
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Navbar */}
      <header className="bg-black h-20 flex justify-between items-center px-8 border-b border-neutral-800">
      </header>

      {/* Main Content */}
      <main className="py-16 px-8 max-w-6xl mx-auto font-body">
        {/* Tabs */}
        <div className="bg-neutral-700 shadow-xl rounded-lg p-6 border border-neutral-800 mb-16 font-heading ">
        <div className="flex flex-wrap justify-evenly mb-6">
          <button
              className={`mb-1 px-4 py-2 rounded-lg flex items-center transition-colors ${
                activeTab === 'contracts' ? 'bg-white text-black' : 'bg-neutral-800 text-neutral-300'
              }`}
              onClick={() => handleTabChange('contracts')}
            >
              <FaFileContract className="mr-2" /> Contracts
            </button>
            <button
              className={`mb-1 px-4 py-2 rounded-lg flex items-center transition-colors ${
                activeTab === 'waybill' ? 'bg-white text-black' : 'bg-neutral-800 text-neutral-300'
              }`}
              onClick={() => handleTabChange('waybill')}
            >
              <FaListAlt className="mr-2" /> Waybills
            </button>
            <button
              className={`mb-1 px-4 py-2 rounded-lg flex items-center transition-colors ${
                activeTab === 'invoice' ? 'bg-white text-black' : 'bg-neutral-800 text-neutral-300'
              }`}
              onClick={() => handleTabChange('invoice')}
            >
              <FaReceipt className="mr-2" /> Invoices
            </button>
            <button
              className={`mb-1 px-4 py-2 rounded-lg flex items-center transition-colors ${
                activeTab === 'transactions' ? 'bg-white text-black' : 'bg-neutral-800 text-neutral-300'
              }`}
              onClick={() => handleTabChange('transactions')}
            >
              <FaDollarSign className="mr-2" /> Transactions
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'contracts' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold mb-4">Manage Contracts</h2>
              <ul className="space-y-2">
                {contracts.map((contract) => (
                  <li key={contract.id} className="border p-4 rounded-lg bg-neutral-800">
                    {contract.name}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex space-x-4">
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500"
                  onClick={() => handleTabChange('waybill')}
                >
                  Generate Waybill
                </button>
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500"
                  onClick={() => handleTabChange('invoice')}
                >
                  Generate Invoice
                </button>
              </div>
            </div>
          )}

          {activeTab === 'waybill' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold mb-4">Generate Waybill</h2>
              <form onSubmit={handleWaybillSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-300">Shipment Details</label>
                  <textarea
                    value={waybillData.shipmentDetails}
                    onChange={(e) => setWaybillData({ ...waybillData, shipmentDetails: e.target.value })}
                    className="mt-1 block w-full p-2 border border-neutral-700 rounded-lg bg-neutral-800 text-neutral-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-300">Origin</label>
                  <input
                    type="text"
                    value={waybillData.origin}
                    onChange={(e) => setWaybillData({ ...waybillData, origin: e.target.value })}
                    className="mt-1 block w-full p-2 border border-neutral-700 rounded-lg bg-neutral-800 text-neutral-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-300">Destination</label>
                  <input
                    type="text"
                    value={waybillData.destination}
                    onChange={(e) => setWaybillData({ ...waybillData, destination: e.target.value })}
                    className="mt-1 block w-full p-2 border border-neutral-700 rounded-lg bg-neutral-800 text-neutral-200"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-500"
                >
                  Generate Waybill
                </button>
              </form>
            </div>
          )}

          {activeTab === 'invoice' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold mb-4">Generate Invoice</h2>
              <form onSubmit={handleInvoiceSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-300">Amount</label>
                  <input
                    type="number"
                    value={invoiceData.amount}
                    onChange={(e) => setInvoiceData({ ...invoiceData, amount: e.target.value })}
                    className="mt-1 block w-full p-2 border border-neutral-700 rounded-lg bg-neutral-800 text-neutral-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-300">Due Date</label>
                  <input
                    type="date"
                    value={invoiceData.dueDate}
                    onChange={(e) => setInvoiceData({ ...invoiceData, dueDate: e.target.value })}
                    className="mt-1 block w-full p-2 border border-neutral-700 rounded-lg bg-neutral-800 text-neutral-200"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-500"
                >
                  Generate Invoice
                </button>
              </form>
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold mb-4">View Transactions</h2>
              <ul className="space-y-2">
                {transactions.map((transaction) => (
                  <li key={transaction.id} className="border p-4 rounded-lg bg-neutral-800">
                    {transaction.type}: {transaction.amount} (Date: {transaction.date})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Contracts;
