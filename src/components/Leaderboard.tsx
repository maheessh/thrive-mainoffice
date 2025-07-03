import React, { useState, useEffect } from 'react';

// Define the Scholar interface (updated to include 'floor')
interface Scholar {
  id: string;
  name: string;
  floorPoints: number;
  floor: string; // Added floor property
}

// Define the Floor interface for aggregated data
interface Floor {
  id: string;
  name: string;
  totalPoints: number;
  weeklyTarget: number;
  rewardAchieved: boolean;
}

const Leaderboard: React.FC<{ scholars: Scholar[] }> = ({ scholars: propScholars }) => {
  // Internal state to manage floor points, allowing direct manipulation
  // This will be the source of truth for the points displayed on this leaderboard
  const [floorPointsState, setFloorPointsState] = useState<{ [key: string]: number }>({
    'Floor 2': 0,
    'Floor 3': 0,
    'Floor 4': 0,
  });

  const [floors, setFloors] = useState<Floor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const WEEKLY_TARGET = 200; // Define the weekly target for each floor

  // State for adding points to a floor
  const [selectedFloorForPoints, setSelectedFloorForPoints] = useState<string>('');
  const [pointsToAdd, setPointsToAdd] = useState<number>(0);
  const [addPointsMessage, setAddPointsMessage] = useState<string | null>(null);
  const [addPointsError, setAddPointsError] = useState<string | null>(null);
  const [addingPoints, setAddingPoints] = useState<boolean>(false);

  // Effect 1: Initialize floorPointsState based on propScholars.
  // This runs once on mount and whenever propScholars changes (e.g., if parent App updates them).
  useEffect(() => {
    setLoading(true);
    setError(null);

    const timer = setTimeout(() => {
      try {
        const initialFloorPointsMap: { [key: string]: number } = {
          'Floor 2': 0,
          'Floor 3': 0,
          'Floor 4': 0,
        };
        // Aggregate points from propScholars to set the initial floorPointsState
        propScholars.forEach(scholar => {
          if (scholar.floor && initialFloorPointsMap.hasOwnProperty(scholar.floor)) {
            initialFloorPointsMap[scholar.floor] += scholar.floorPoints;
          }
        });
        setFloorPointsState(initialFloorPointsMap);
        setLoading(false);
      } catch (err) {
        console.error("Error loading floor data:", err);
        setError("Failed to load floor leaderboard data.");
        setLoading(false);
      }
    }, 500); // Simulate network delay

    return () => clearTimeout(timer); // Cleanup the timer
  }, [propScholars]); // Only re-run this effect if propScholars themselves change

  // Effect 2: Update the 'floors' array for display whenever 'floorPointsState' changes.
  // This ensures the UI reflects the current points, whether from initial load or user input.
  useEffect(() => {
    const targetFloors = ['Floor 2', 'Floor 3', 'Floor 4'];
    const aggregatedFloors: Floor[] = targetFloors
      .map(floorName => ({
        id: floorName.replace(/\s/g, '').toLowerCase(), // Create a simple ID (e.g., "floor2")
        name: floorName,
        totalPoints: floorPointsState[floorName] || 0, // Use the state value
        weeklyTarget: WEEKLY_TARGET,
        rewardAchieved: (floorPointsState[floorName] || 0) >= WEEKLY_TARGET,
      }))
      .sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically by floor name

    setFloors(aggregatedFloors);
  }, [floorPointsState, WEEKLY_TARGET]); // Re-run whenever floorPointsState or target changes

  const showAddPointsMessage = (msg: string, isError: boolean = false) => {
    setAddPointsMessage(msg);
    setAddPointsError(isError ? msg : null);
    setTimeout(() => {
      setAddPointsMessage(null);
      setAddPointsError(null);
    }, 3000);
  };

  const handleAddPointsToFloor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFloorForPoints || pointsToAdd <= 0) {
      showAddPointsMessage("Please select a floor and enter a positive number of points.", true);
      return;
    }

    setAddingPoints(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay

    try {
      // Update the specific floor's total points in floorPointsState
      setFloorPointsState(prev => ({
        ...prev,
        [selectedFloorForPoints]: (prev[selectedFloorForPoints] || 0) + pointsToAdd
      }));

      showAddPointsMessage(`Successfully added ${pointsToAdd} points to ${selectedFloorForPoints}!`);
      setSelectedFloorForPoints('');
      setPointsToAdd(0);
    } catch (err) {
      console.error("Error adding points to floor:", err);
      showAddPointsMessage("Failed to add points to floor.", true);
    } finally {
      setAddingPoints(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px] text-gray-600">
        <p className="text-lg font-medium">Loading Floor Leaderboard...</p>
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
    <div className="container mx-auto p-8 bg-white rounded-xl shadow-2xl mt-8">
      <h2 className="text-5xl font-extrabold text-gray-800 mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-700">
        Floor Leaderboard
      </h2>

      <p className="text-center text-gray-700 text-lg mb-8 max-w-2xl mx-auto">
        Floor points are awarded based on various positive contributions and achievements by the scholars of each floor.
        If a floor collectively reaches its weekly target of <span className="font-bold text-blue-600">{WEEKLY_TARGET} points</span>,
        the scholars on that floor earn a special reward! The Main Office updates these points regularly.
      </p>

      {/* Section to Add Points to a Floor */}
      {/* <div className="mb-12 p-6 border border-indigo-200 rounded-lg shadow-md bg-indigo-50">
        <h3 className="text-3xl font-bold text-indigo-700 mb-6 border-b pb-3">Add Points to a Floor</h3>
        <form onSubmit={handleAddPointsToFloor} className="space-y-4">
          <div>
            <label htmlFor="selectFloor" className="block text-sm font-medium text-gray-700">Select Floor</label>
            <select
              id="selectFloor"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={selectedFloorForPoints}
              onChange={(e) => setSelectedFloorForPoints(e.target.value)}
              required
            >
              <option value="">-- Select a Floor --</option>
              {Object.keys(floorPointsState).map(floorName => (
                <option key={floorName} value={floorName}>{floorName}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="pointsToAdd" className="block text-sm font-medium text-gray-700">Points to Add</label>
            <input
              type="number"
              id="pointsToAdd"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={pointsToAdd}
              onChange={(e) => setPointsToAdd(parseInt(e.target.value) || 0)}
              min="0"
              required
            />
          </div>
          {addPointsMessage && (
            <div className={`p-3 rounded-lg text-center font-medium ${addPointsError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              {addPointsMessage}
            </div>
          )}
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={addingPoints}
          >
            {addingPoints ? 'Adding Points...' : 'Add Points to Floor'}
          </button>
        </form>
      </div> */}

      {floors.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No floor entries found yet for Floor 2, Floor 3, or Floor 4.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {floors.map((floor) => {
            const progress = (floor.totalPoints / floor.weeklyTarget) * 100;
            const circumference = 2 * Math.PI * 40; // 2 * pi * radius (radius = 40 for a 100x100 viewBox with 8px stroke)
            // Calculate strokeDashoffset to fill the circle based on progress
            const strokeDashoffset = circumference - (Math.min(progress, 100) / 100) * circumference;

            return (
              <div
                key={floor.id}
                className={`bg-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-between
                  ${floor.rewardAchieved ? 'border-4 border-green-500' : 'border-2 border-gray-200'}
                  transform hover:scale-105 transition duration-300 ease-in-out`}
              >
                <h3 className="text-3xl font-bold text-gray-800 mb-4">{floor.name}</h3>
                <div className="relative w-32 h-32 mb-4">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    {/* Background circle */}
                    <circle
                      className="text-gray-200"
                      strokeWidth="8"
                      stroke="currentColor"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                    />
                    {/* Progress circle */}
                    <circle
                      className={`${floor.rewardAchieved ? 'text-green-500' : 'text-blue-500'}`}
                      strokeWidth="8"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                      transform="rotate(-90 50 50)" // Start from top
                    />
                    <text
                      x="50"
                      y="50"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-xl font-bold text-gray-700"
                    >
                      {floor.totalPoints}
                      <tspan className="text-sm">/{floor.weeklyTarget}</tspan>
                    </text>
                  </svg>
                </div>
                <p className="text-lg text-gray-700 text-center font-semibold">
                  Points: <span className="font-bold">{floor.totalPoints}</span>
                </p>
                <p className="text-md text-gray-600 text-center mt-2">
                  Target: <span className="font-bold">{floor.weeklyTarget} points</span>
                </p>
                {floor.rewardAchieved ? (
                  <p className="text-green-600 font-bold text-center mt-3 text-xl">
                    Reward Achieved! 🎉
                  </p>
                ) : (
                  <p className="text-yellow-600 font-medium text-center mt-3 text-sm">
                    {Math.max(0, floor.weeklyTarget - floor.totalPoints)} points to reward!
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
