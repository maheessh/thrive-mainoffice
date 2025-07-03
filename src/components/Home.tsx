import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-120px)] bg-gray-900 text-white flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-4xl text-center mb-16">
        <p className="text-lg font-medium text-blue-400 mb-2 uppercase tracking-wide">
          Thrive Scholar Summer Academy 2
        </p>
        <h1 className="text-6xl font-extrabold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 animate-fade-in-up">
          The Main Office
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Your central hub for all essential services and information during your summer academy experience. We're here to support your success!
        </p>
        <div className="flex justify-center space-x-4">
          <button className="px-8 py-4 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Explore Services
          </button>
          <button className="px-8 py-4 border-2 border-blue-500 text-blue-400 font-semibold rounded-full shadow-lg hover:bg-blue-900 hover:text-white transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Contact Us
          </button>
        </div>
      </div>

      {/* Services Section */}
      <div className="max-w-6xl w-full">
        <h2 className="text-4xl font-extrabold text-white text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400">
          Our Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Service Card 1: Snacks */}
          <div className="bg-gray-800 p-8 rounded-2xl shadow-lg border-t-4 border-yellow-500 transform hover:scale-105 transition duration-300 ease-in-out">
            <h3 className="text-2xl font-bold text-white mb-3">Snacks & Refreshments</h3>
            <p className="text-gray-300 leading-relaxed">
              Fuel your studies and activities with a variety of healthy and delicious snacks available throughout the day.
              Check our daily menu for special treats!
            </p>
          </div>

          {/* Service Card 2: Lost and Founds */}
          <div className="bg-gray-800 p-8 rounded-2xl shadow-lg border-t-4 border-red-500 transform hover:scale-105 transition duration-300 ease-in-out">
            <h3 className="text-2xl font-bold text-white mb-3">Lost & Found</h3>
            <p className="text-gray-300 leading-relaxed">
              Misplaced something? Visit the Main Office to inquire about lost items or to turn in something you've found.
              We'll help reunite items with their owners.
            </p>
          </div>

          {/* Service Card 3: Academic Items */}
          <div className="bg-gray-800 p-8 rounded-2xl shadow-lg border-t-4 border-blue-500 transform hover:scale-105 transition duration-300 ease-in-out">
            <h3 className="text-2xl font-bold text-white mb-3">Academic Supplies</h3>
            <p className="text-gray-300 leading-relaxed">
              Need a notebook, pen, or specific academic material? The Main Office provides essential supplies to keep you prepared for your classes.
            </p>
          </div>

          {/* Service Card 4: Printing Services */}
          <div className="bg-gray-800 p-8 rounded-2xl shadow-lg border-t-4 border-green-500 transform hover:scale-105 transition duration-300 ease-in-out">
            <h3 className="text-2xl font-bold text-white mb-3">Printing Services</h3>
            <p className="text-gray-300 leading-relaxed">
              Convenient printing facilities are available for all your academic needs. Submit your documents and pick them up at the Main Office.
            </p>
          </div>

          {/* Service Card 5: Mailbox Pickup */}
          <div className="bg-gray-800 p-8 rounded-2xl shadow-lg border-t-4 border-purple-500 transform hover:scale-105 transition duration-300 ease-in-out">
            <h3 className="text-2xl font-bold text-white mb-3">Mailbox Pickup</h3>
            <p className="text-gray-300 leading-relaxed">
              Check the Mail Status page for updates on your incoming mail. Pick up your packages and letters conveniently from the Main Office.
            </p>
          </div>

          {/* Service Card 6: Check-in/Check-out */}
          <div className="bg-gray-800 p-8 rounded-2xl shadow-lg border-t-4 border-orange-500 transform hover:scale-105 transition duration-300 ease-in-out">
            <h3 className="text-2xl font-bold text-white mb-3">Check-in / Check-out</h3>
            <p className="text-gray-300 leading-relaxed">
              Manage your daily check-ins and check-outs efficiently at the Main Office. Ensure your attendance records are always up-to-date.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
