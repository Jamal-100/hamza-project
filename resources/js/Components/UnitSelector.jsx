import React from 'react';
import EmptyState from './EmptyState';

const UnitSelector = ({ units, selectedUnit, onUnitSelect, selectedSemester, semesterName, isMobile }) => (
  <div className={`bg-white p-6 rounded-lg shadow-md ${!selectedSemester && !isMobile ? 'opacity-50' : ''}`}>
    <h3 className="text-lg font-medium text-gray-900 border-b pb-3 mb-4">
      {isMobile ? `${semesterName} - الوحدات` : 'الوحدات'}
    </h3>
    <div className={isMobile ? "grid grid-cols-1 sm:grid-cols-2 gap-3" : "space-y-2"}>
      {units.length > 0 ? (
        units.map((unit) => (
          <button
            key={unit.id}
            onClick={() => onUnitSelect(unit.id)}
            className={isMobile 
              ? "flex justify-between items-center py-4 px-5 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg transition-all duration-200"
              : `w-full text-right py-3 px-4 rounded-lg transition-all duration-200 ${
                  selectedUnit === unit.id 
                    ? 'bg-blue-600 text-white font-medium shadow-md' 
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                }`
            }
            disabled={!selectedSemester}
          >
            <span className={isMobile ? "font-medium" : ""}>{unit.title}</span>
            {isMobile && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        ))
      ) : selectedSemester ? (
        <EmptyState 
          icon="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
          message={isMobile ? "لا توجد وحدات لهذا الفصل الدراسي" : "لا توجد وحدات"}
        />
      ) : (
        <p className="text-gray-400 text-center italic pt-6">الرجاء اختيار الفصل الدراسي أولاً</p>
      )}
    </div>
  </div>
);

export default UnitSelector;