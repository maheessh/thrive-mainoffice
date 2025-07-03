import React, { useState } from 'react';
import Leaderboard from './components/Leaderboard';
import MailStatus from './components/MailStatus';
import Login from './components/Login';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import Footer from './components/Footer';
import Home from './components/Home';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('Leaderboard'); // Default page

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100 font-sans text-gray-900">
        <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <main className="flex-grow">
          {currentPage === 'Home' && <Home />} {/* <--- Add Home component */}
          {currentPage === 'Leaderboard' && <Leaderboard scholars={[]} />}
          {currentPage === 'Mail Status' && <MailStatus />}
          {currentPage === 'Login' && <Login />}
        </main>
        <Footer></Footer>
      </div>
    </AuthProvider>
  );
};

export default App;
