import React from 'react';

const BreadcrumbItem = ({ label, isActive, onClick }) => (
  <span
    className={`hover:text-blue-600 cursor-pointer transition-colors duration-200 ${
      isActive ? 'font-medium text-blue-600' : 'text-gray-500'
    }`}
    onClick={onClick}
  >
    {label}
  </span>
);

const BreadcrumbSeparator = () => (
  <span className="mx-2 text-gray-400">/</span>
);

const BreadcrumbNav = ({
  selectedYear,
  selectedSemester,
  selectedUnit,
  selectedVideo,
  yearName,
  semesterName,
  unitName,
  setMobileView,
}) => {
  return (
    <div className="mt-2 md:mt-0 flex items-center text-sm text-gray-500 overflow-x-auto">
      {/* السنوات الدراسية */}
      <BreadcrumbItem
        label="السنوات الدراسية"
        isActive={selectedYear}
        onClick={() => setMobileView('years')}
      />

      {/* الفصل الدراسي */}
      {selectedYear && (
        <>
          <BreadcrumbSeparator />
          <BreadcrumbItem
            label={yearName}
            isActive={selectedSemester}
            onClick={() => setMobileView('semesters')}
          />
        </>
      )}

      {/* الوحدة */}
      {selectedSemester && (
        <>
          <BreadcrumbSeparator />
          <BreadcrumbItem
            label={semesterName}
            isActive={selectedUnit}
            onClick={() => setMobileView('units')}
          />
        </>
      )}

      {/* الفيديو */}
      {selectedUnit && (
        <>
          <BreadcrumbSeparator />
          <BreadcrumbItem
            label={unitName}
            isActive={selectedVideo}
            onClick={() => setMobileView('videos')}
          />
        </>
      )}
    </div>
  );
};

export default BreadcrumbNav;