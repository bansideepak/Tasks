import React from "react";

const WeatherCard = ({ data, onRemove }) => {
  return (
    <div className="h-full bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-md rounded-lg overflow-hidden border border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="p-5 h-full flex flex-col">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-medium text-white">
              {data.name}, {data.sys.country}
            </h2>
            <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-100 mt-1">
              {Math.round(data.main.temp)}°C
            </p>
            <p className="text-sm text-gray-300 mt-1">
              {data.weather[0].description}
            </p>
          </div>
          <button
            onClick={onRemove}
            className="p-1.5 rounded-full bg-gray-700/50 hover:bg-gray-600/50 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="mt-auto pt-6 grid grid-cols-2 gap-x-4 gap-y-3">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400">Wind</span>
            <span className="text-sm font-medium text-gray-200">
              {data.wind.speed} m/s
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-400">Humidity</span>
            <span className="text-sm font-medium text-gray-200">
              {data.main.humidity}%
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-400">Pressure</span>
            <span className="text-sm font-medium text-gray-200">
              {data.main.pressure} hPa
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-400">Condition</span>
            <span className="text-sm font-medium text-gray-200">
              {data.weather[0].main}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
