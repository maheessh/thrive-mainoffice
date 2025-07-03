import React, { useState, useEffect } from 'react';

// Define the Scholar interface (assuming it's globally available or defined elsewhere)
interface Scholar {
  id: string;
  name: string;
  floorPoints: number;
  floor?: string; // Optional, as not directly used in MailStatus but good for consistency
}

// Define the Mail interface
interface Mail {
  id: string;
  scholarId: string;
  scholarName: string;
  status: 'Ready to Pick Up' | 'Picked Up';
  description: string; // Added description
  lastUpdated: string; // ISO string
}

// --- Static Mail Data (You can modify this directly) ---
// This data will be used internally by MailStatus.
// If you want to manage this from App.tsx, you'd pass it as a prop.
const staticMails: Mail[] = [
  {
    id: 'm1',
    scholarId: 's1',
    scholarName: 'Alice Smith',
    status: 'Ready to Pick Up',
    description: 'Textbook for advanced calculus.',
    lastUpdated: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
  },
  {
    id: 'm2',
    scholarId: 's2',
    scholarName: 'Bob Johnson',
    status: 'Picked Up',
    description: 'Graduation ceremony invitation.',
    lastUpdated: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
  },
  {
    id: 'm3',
    scholarId: 's3',
    scholarName: 'Charlie Brown',
    status: 'Ready to Pick Up',
    description: 'New student orientation package.',
    lastUpdated: new Date().toISOString(), // Just now
  },
  {
    id: 'm4',
    scholarId: 's5',
    scholarName: 'Eve Adams',
    status: 'Picked Up',
    description: 'Scholarship acceptance letter.',
    lastUpdated: new Date(Date.now() - 86400000 * 1).toISOString(), // 1 day ago
  },
  {
    id: 'm5',
    scholarId: 's1',
    scholarName: 'Alice Smith',
    status: 'Picked Up',
    description: 'Lab equipment delivery notice.',
    lastUpdated: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
  },
  {
    id: 'm6',
    scholarId: 's4',
    scholarName: 'Diana Prince',
    status: 'Ready to Pick Up',
    description: 'Financial aid documents.',
    lastUpdated: new Date(Date.now() - 86400000 * 0.5).toISOString(), // 12 hours ago
  },
];


const MailStatus: React.FC = () => {
  const [mails, setMails] = useState<Mail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'ready' | 'picked'>('all');

  useEffect(() => {
    setLoading(true);
    setError(null);

    const timer = setTimeout(() => {
      try {
        // In a real app, you might fetch from an API here.
        // For static data, we just sort and set.
        const sortedMails = [...staticMails].sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
        setMails(sortedMails);
        setLoading(false);
      } catch (err) {
        console.error("Error loading mail status:", err);
        setError("Failed to load mail status data.");
        setLoading(false);
      }
    }, 500); // Simulate network delay

    return () => clearTimeout(timer);
  }, []); // Empty dependency array means this runs once on mount

  const filteredMails = mails.filter(mail => {
    if (activeTab === 'ready') return mail.status === 'Ready to Pick Up';
    if (activeTab === 'picked') return mail.status === 'Picked Up';
    return true; // 'all' tab
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px] text-gray-600">
        <p className="text-lg font-medium">Loading Mail Status...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[200px] text-red-600">
        <p className="text-lg font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 bg-gray-900 text-gray-200 rounded-2xl shadow-2xl mt-8">
      <h2 className="text-5xl font-extrabold text-white mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-teal-500">
        Mail Status in Main Office
      </h2>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-10 bg-gray-800 rounded-full p-1.5 shadow-inner">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-7 py-3 text-lg font-semibold rounded-full transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75
            ${activeTab === 'all' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
        >
          All Mail
        </button>
        <button
          onClick={() => setActiveTab('ready')}
          className={`px-7 py-3 text-lg font-semibold rounded-full transition duration-300 ease-in-out mx-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75
            ${activeTab === 'ready' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
        >
          Ready to Pick Up
        </button>
        <button
          onClick={() => setActiveTab('picked')}
          className={`px-7 py-3 text-lg font-semibold rounded-full transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75
            ${activeTab === 'picked' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
        >
          Picked Up
        </button>
      </div>

      {/* Mail List Display */}
      {filteredMails.length === 0 ? (
        <p className="text-center text-gray-400 text-lg py-8">No mail entries found for this category.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> {/* Increased gap */}
          {filteredMails.map((mail) => (
            <div
              key={mail.id}
              className={`bg-gray-800 p-7 rounded-2xl shadow-lg border-t-4
                ${mail.status === 'Picked Up' ? 'border-green-500' : 'border-yellow-500'}
                transform hover:scale-105 transition duration-300 ease-in-out flex flex-col justify-between`}
            >
              <div>
                <h3 className="text-xl font-bold text-white mb-2.5">{mail.scholarName}</h3> {/* Adjusted mb */}
                <p className="text-gray-400 text-base mb-4 leading-relaxed"> {/* Adjusted text size, mb, and line height */}
                  <span className="font-semibold text-gray-300">Description:</span> {mail.description}
                </p>
                <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-700"> {/* Added top border and padding */}
                  <span className={`px-3.5 py-1.5 rounded-full text-xs font-semibold
                    ${mail.status === 'Picked Up' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                    {mail.status}
                  </span>
                  <span className="text-gray-500 text-sm"> {/* Explicitly set text-sm */}
                    {new Date(mail.lastUpdated).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MailStatus;
