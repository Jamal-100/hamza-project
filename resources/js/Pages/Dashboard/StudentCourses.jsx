import DashboardLayout from '@/Layouts/DashboardLayout';
import { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from '@/components/LoadingSpinner';
import EmptyState from '@/components/EmptyState';
import YearSelector from '@/components/YearSelector';
import SemesterSelector from '@/components/SemesterSelector';
import UnitSelector from '@/components/UnitSelector';
import VideoPlayer from '@/components/VideoPlayer';
import BreadcrumbNav from '@/components/BreadcrumbNav';

export default function StudentCourses() {
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [semesters, setSemesters] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [units, setUnits] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState('years');
  const [isVideoPageView, setIsVideoPageView] = useState(false);

  useEffect(() => {
    fetchYears();
    const handleResize = () => {
      if (window.innerWidth < 768 && !isVideoPageView) {
        setActiveView('years');
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [isVideoPageView]);

  const fetchYears = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/years');
      setYears(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching years:', error);
      setLoading(false);
    }
  };

  const fetchSemesters = async (yearId) => {
    try {
      setLoading(true);
      setSelectedYear(yearId);
      setSemesters([]);
      setSelectedSemester(null);
      setUnits([]);
      setSelectedUnit(null);
      setVideos([]);
      setSelectedVideo(null);
      const response = await axios.get(`/api/years/${yearId}/semesters`);
      setSemesters(response.data);
      setLoading(false);
      setActiveView('semesters');
    } catch (error) {
      console.error('Error fetching semesters:', error);
      setLoading(false);
    }
  };

  const fetchUnits = async (semesterId) => {
    try {
      setLoading(true);
      setSelectedSemester(semesterId);
      setUnits([]);
      setSelectedUnit(null);
      setVideos([]);
      setSelectedVideo(null);
      const response = await axios.get(`/api/semesters/${semesterId}/units`);
      setUnits(response.data);
      setLoading(false);
      setActiveView('units');
    } catch (error) {
      console.error('Error fetching units:', error);
      setLoading(false);
    }
  };

  const fetchVideos = async (unitId) => {
    try {
      setLoading(true);
      setSelectedUnit(unitId);
      setVideos([]);
      setSelectedVideo(null);
      const response = await axios.get(`/api/units/${unitId}/videos`);
      setVideos(response.data);
      setLoading(false);
      setActiveView('videos');
    } catch (error) {
      console.error('Error fetching videos:', error);
      setLoading(false);
    }
  };

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
    setIsVideoPageView(true);
    if (window.innerWidth < 768) {
      setTimeout(() => {
        const videoElement = document.getElementById('video-player');
        if (videoElement) {
          videoElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const navigateBack = () => {
    if (isVideoPageView) {
      setIsVideoPageView(false);
      return;
    }
    if (activeView === 'semesters') {
      setActiveView('years');
    } else if (activeView === 'units') {
      setActiveView('semesters');
    } else if (activeView === 'videos') {
      setActiveView('units');
    }
  };

  const getYearName = () => {
    const year = years.find((y) => y.id === selectedYear);
    return year ? year.year : '';
  };

  const getSemesterName = () => {
    const semester = semesters.find((s) => s.id === selectedSemester);
    return semester ? semester.semester : '';
  };

  const getUnitName = () => {
    const unit = units.find((u) => u.id === selectedUnit);
    return unit ? unit.title : '';
  };

  // YouTube-like Video Page View
  if (isVideoPageView && selectedVideo) {
    return (
      <>
        <div className="py-6 bg-gray-100 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-4 flex items-center">
              <button
                onClick={navigateBack}
                className="inline-flex items-center px-4 py-2 bg-white text-gray-700 rounded-md shadow hover:bg-gray-50 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-1 rtl:rotate-180"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                العودة إلى قائمة الوحدات
              </button>
              <BreadcrumbNav
                selectedYear={selectedYear}
                selectedSemester={selectedSemester}
                selectedUnit={selectedUnit}
                selectedVideo={selectedVideo}
                yearName={getYearName()}
                semesterName={getSemesterName()}
                unitName={getUnitName()}
                setActiveView={setActiveView}
              />
            </div>
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Main Video Display */}
              <div className="w-full lg:w-8/12 order-2 lg:order-1 bg-white rounded-lg shadow-lg p-6">
                <div id="video-player">
                  <VideoPlayer video={selectedVideo} />
                </div>
                <div className="mt-4">
                  <h3 className="text-2xl font-bold text-gray-900">{selectedVideo.title}</h3>
                  <div className="mt-2 text-gray-600">
                    {getUnitName()} - {getSemesterName()} - {getYearName()}
                  </div>
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <p>{selectedVideo.description || "لا يوجد وصف لهذا الفيديو"}</p>
                  </div>
                </div>
              </div>

              {/* Sidebar Videos List */}
              <div className="w-full lg:w-4/12 order-1 lg:order-2 bg-white rounded-lg shadow-lg p-4">
                <h3 className="font-bold text-lg mb-4">فيديوهات {getUnitName()}</h3>
                <div className="overflow-y-auto max-h-[calc(100vh-200px)] pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  {videos.map((video, index) => (
                    <div
                      key={video.id}
                      onClick={() => handleVideoSelect(video)}
                      className={`flex p-3 hover:bg-gray-100 cursor-pointer transition ${selectedVideo.id === video.id ? 'bg-gray-100' : ''
                        }`}
                    >
                      <div className="flex-shrink-0 relative w-32 h-20 overflow-hidden rounded bg-gray-200 ml-3 rtl:ml-0 rtl:mr-3">
                        {video.thumbnail ? (
                          <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-8 w-8 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </div>
                        )}
                        <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 py-0.5 rounded">
                          {video.duration || "00:00"}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4
                          className={`text-sm font-medium line-clamp-2 ${selectedVideo.id === video.id ? 'text-blue-600' : 'text-gray-900'
                            }`}
                        >
                          {video.title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">درس {index + 1}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>





            </div>
          </div>
        </div>
      </>
    );
  }

  // Main Selection View (Years, Semesters, Units, Videos)
  return (
    <div className="py-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
          <h2 className="text-3xl font-bold text-gray-900">المقررات الدراسية</h2>
          <BreadcrumbNav
            selectedYear={selectedYear}
            selectedSemester={selectedSemester}
            selectedUnit={selectedUnit}
            selectedVideo={selectedVideo}
            yearName={getYearName()}
            semesterName={getSemesterName()}
            unitName={getUnitName()}
            setActiveView={setActiveView}
          />
        </div>
        {activeView !== 'years' && (
          <div className="mb-4">
            <button
              onClick={navigateBack}
              className="inline-flex items-center px-4 py-2 bg-white text-gray-700 rounded-md shadow hover:bg-gray-50 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-1 rtl:rotate-180"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              رجوع
            </button>
          </div>
        )}
        {loading && <LoadingSpinner />}

        {!loading && (
          <>
            {activeView === 'years' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {years.map((year) => (
                  <div
                    key={year.id}
                    onClick={() => fetchSemesters(year.id)}
                    className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition transform hover:-translate-y-1"
                  >
                    <h3 className="text-xl font-semibold text-gray-900">{year.year}</h3>
                    <p className="text-sm text-gray-500 mt-2">{year.description}</p>
                  </div>
                ))}
              </div>
            )}
            {activeView === 'semesters' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {semesters.map((semester) => (
                  <div
                    key={semester.id}
                    onClick={() => fetchUnits(semester.id)}
                    className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition transform hover:-translate-y-1"
                  >
                    <h3 className="text-xl font-semibold text-gray-900">{semester.semester}</h3>
                    <p className="text-sm text-gray-500 mt-2">{getYearName()}</p>
                  </div>
                ))}
              </div>
            )}

            {activeView === 'units' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {units.map((unit) => (
                  <div
                    key={unit.id}
                    onClick={() => fetchVideos(unit.id)}
                    className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition transform hover:-translate-y-1"
                  >
                    <h3 className="text-xl font-semibold text-gray-900">{unit.title}</h3>
                    <p className="text-sm text-gray-500 mt-2">{getSemesterName()} - {getYearName()}</p>
                  </div>
                ))}
              </div>
            )}


            {activeView === 'videos' && (
              <div>
                {videos.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {videos.map((video, index) => (
                      <div
                        key={video.id}
                        onClick={() => handleVideoSelect(video)}
                        className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition transform hover:-translate-y-1"
                      >
                        <div className="relative h-40 bg-gray-200">
                          {video.thumbnail ? (
                            <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="flex items-center justify-center h-full">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-16 w-16 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </div>
                          )}
                          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                            {video.duration || "00:00"}
                          </div>
                          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition">
                            <div className="bg-white bg-opacity-90 rounded-full p-3">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8 text-gray-900"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="p-4">
                          <h4 className="font-medium text-gray-900 line-clamp-2">{video.title}</h4>
                          <p className="text-sm text-gray-500 mt-2">درس {index + 1}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-40 bg-gray-100 rounded-lg text-gray-500">
                    <p>لا توجد مقاطع فيديو متاحة.</p>
                  </div>
                )}
              </div>
            )}



          </>
        )}




      </div>
    </div>
  );
}

StudentCourses.layout = (page) => <DashboardLayout children={page} />;