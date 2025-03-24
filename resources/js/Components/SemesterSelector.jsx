import React from 'react';
import EmptyState from './EmptyState';

const SemesterSelector = ({ semesters, selectedSemester, onSemesterSelect, selectedYear, yearName, isMobile }) => (
  <div className={`bg-white p-6 rounded-lg shadow-md ${!selectedYear && !isMobile ? 'opacity-50' : ''}`}>
    <h3 className="text-lg font-medium text-gray-900 border-b pb-3 mb-4">
      {isMobile ? `${yearName} - الفصول الدراسية` : 'الفصل الدراسي'}
    </h3>
    <div className={isMobile ? "grid grid-cols-1 sm:grid-cols-2 gap-3" : "space-y-2"}>
      {semesters.length > 0 ? (
        semesters.map((semester) => (
          <button
            key={semester.id}
            onClick={() => onSemesterSelect(semester.id)}
            className={isMobile 
              ? "flex justify-between items-center py-4 px-5 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg transition-all duration-200"
              : `w-full text-right py-3 px-4 rounded-lg transition-all duration-200 ${
                  selectedSemester === semester.id 
                    ? 'bg-blue-600 text-white font-medium shadow-md' 
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                }`
            }
            disabled={!selectedYear}
          >
            <span className={isMobile ? "font-medium" : ""}>{semester.semester}</span>
            {isMobile && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        ))
      ) : selectedYear ? (
        <EmptyState 
          icon="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          message={isMobile ? "لا توجد فصول دراسية لهذه السنة" : "لا توجد فصول دراسية"}
        />
      ) : (
        <p className="text-gray-400 text-center italic pt-6">الرجاء اختيار السنة الدراسية أولاً</p>
      )}
    </div>
  </div>
);

export default SemesterSelector;