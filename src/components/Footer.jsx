import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 px-4 mt-8 w-full">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div className="text-sm md:text-base">
          <p>
            &copy; 2025 <span className="font-semibold">Anand Mali</span>. All
            rights reserved.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-center">
          <span className="hidden md:inline">|</span>
          <p>
            Powered by{" "}
            <a
              className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
              href="https://www.appwrite.io/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Appwrite
            </a>
          </p>
          <span className="hidden md:inline">|</span>
          <p>
            Designed by{" "}
            <a
              className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
              href="https://www.tailwindcss.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Tailwind CSS
            </a>
          </p>
          <span className="hidden md:inline">|</span>
          <p>
            Built with{" "}
            <a
              className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
              href="https://reactjs.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              React
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
