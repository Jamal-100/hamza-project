import React from 'react';

const YearSelector = ({ years, selectedYear, onYearSelect, isMobile }) => (
  <div className={`bg-white p-6 rounded-lg shadow-md ${isMobile ? 'w-full' : ''}`}>
    <h3 className="text-lg font-medium text-gray-900 border-b pb-3 mb-4">السنة الدراسية</h3>
    <div className={isMobile ? "grid grid-cols-1 sm:grid-cols-2 gap-3" : "space-y-2"}>
      {years.map((year) => (
        <button
          key={year.id}
          onClick={() => onYearSelect(year.id)}
          className={isMobile 
            ? "flex justify-between items-center py-4 px-5 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg transition-all duration-200"
            : `w-full text-right py-3 px-4 rounded-lg transition-all duration-200 ${
                selectedYear === year.id 
                  ? 'bg-blue-600 text-white font-medium shadow-md' 
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
              }`
          }
        >
          <span className={isMobile ? "font-medium" : ""}>{year.year}</span>
          {isMobile && (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      ))}
    </div>
  </div>
);

export default YearSelector;