import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import './index.css' // Your main Tailwind file
import './app.css'

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Vite + React + Tailwind
          </h1>
          <p className="text-xl text-white opacity-90">
            🎉 Your setup is working perfectly!
          </p>
        </div>

        {/* Logo Section */}
        <div className="flex justify-center items-center gap-16 mb-12">
          <a href="https://vitejs.dev" target="_blank">
            <img
              src={viteLogo}
              className="w-32 h-32 animate-pulse"
              alt="Vite logo"
            />
          </a>
          <a href="https://react.dev" target="_blank">
            <img
              src={reactLogo}
              className="w-32 h-32 animate-spin-slow"
              alt="React logo"
            />
          </a>
        </div>

        {/* Counter Card */}
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition duration-300">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Counter Test
          </h2>

          <div className="text-center mb-6">
            <span className="text-6xl font-bold text-indigo-600">{count}</span>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setCount(count - 1)}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-105"
            >
              Decrement
            </button>

            <button
              onClick={() => setCount(count + 1)}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-105"
            >
              Increment
            </button>
          </div>

          <button
            onClick={() => setCount(0)}
            className="w-full mt-4 bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
          >
            Reset
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">Fast</h3>
            <p className="text-gray-600">Vite's lightning fast HMR</p>
          </div>

          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="text-3xl mb-3">🎨</div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">Stylish</h3>
            <p className="text-gray-600">Tailwind CSS styling</p>
          </div>

          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="text-3xl mb-3">🚀</div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">Ready</h3>
            <p className="text-gray-600">Deploy anytime</p>
          </div>
        </div>

        {/* Status */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-6 py-3 rounded-full">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-medium">
              Vite development server is running!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
