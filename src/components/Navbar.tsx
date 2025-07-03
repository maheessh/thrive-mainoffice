import React from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC<{ currentPage: string; setCurrentPage: (page: string) => void }> = ({ currentPage, setCurrentPage }) => {
  const { isAdminAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-indigo-700 p-4 shadow-lg rounded-b-xl">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-3xl font-extrabold tracking-wide">Thrive Scholars</h1>
        <div className="flex space-x-6">
        <NavLink page="Home" currentPage={currentPage} setCurrentPage={setCurrentPage} />
          <NavLink page="Leaderboard" currentPage={currentPage} setCurrentPage={setCurrentPage} />
          <NavLink page="Mail Status" currentPage={currentPage} setCurrentPage={setCurrentPage} />
          {isAdminAuthenticated && <NavLink page="Admin Dashboard" currentPage={currentPage} setCurrentPage={setCurrentPage} />}
          {!isAdminAuthenticated ? (
            <NavLink page="Login" currentPage={currentPage} setCurrentPage={setCurrentPage} />
          ) : (
            <button
              onClick={logout}
              className="text-white text-lg font-medium px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition duration-300 ease-in-out shadow-md"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

const NavLink: React.FC<{ page: string; currentPage: string; setCurrentPage: (page: string) => void }> = ({ page, currentPage, setCurrentPage }) => (
  <button
    onClick={() => setCurrentPage(page)}
    className={`text-white text-lg font-medium px-4 py-2 rounded-lg transition duration-300 ease-in-out
      ${currentPage === page ? 'bg-indigo-800 shadow-inner' : 'hover:bg-indigo-500'}`}
  >
    {page}
  </button>
);

export default Navbar;
