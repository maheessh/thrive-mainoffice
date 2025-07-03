import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-6 px-4 sm:px-6 lg:px-8 rounded-t-xl shadow-inner">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
        {/* Logo Section */}
        <div className="flex items-center">
          <div className="relative bg-orange-200 text-gray-900 font-bold py-2 px-4 rounded-lg shadow-md mr-4 text-xl">
            Thrive Scholar- Main Office
            {/* Speech bubble tail */}
            <div className="absolute bottom-0 left-4 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-orange-200 transform translate-y-full -translate-x-1/2"></div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center md:justify-start space-x-6">
          <a href="#" className="hover:text-white transition-colors duration-200 text-lg">Blog</a>
          <a href="#" className="hover:text-white transition-colors duration-200 text-lg">Get Started</a>
          <a href="#" className="hover:text-white transition-colors duration-200 text-lg">Terms</a>
          <a href="#" className="hover:text-white transition-colors duration-200 text-lg">Privacy</a>
          <a href="#" className="hover:text-white transition-colors duration-200 text-lg">Login to account</a>
        </nav>

        {/* Social Media Icons */}
        <div className="flex space-x-6 text-2xl">
          {/* X (Twitter) Icon - using a simple 'X' for now */}
          <a href="#" className="hover:text-white transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.901 1.153h3.68l-8.042 9.167 9.932 12.057h-8.625l-6.072-7.533-7.533 7.533h-3.68l8.525-9.712-9.408-11.412h8.775l5.548 6.908zM17.848 20.457h2.124l-7.792-8.883-2.124 2.124 7.792 8.883z"/>
            </svg>
          </a>
          {/* LinkedIn Icon - using a simple 'in' for now */}
          <a href="#" className="hover:text-white transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
