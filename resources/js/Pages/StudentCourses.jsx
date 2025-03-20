import React, { useState } from 'react';
import PublicLayout from "@/Layouts/PublicLayout";
import { motion } from 'framer-motion';

export default function StudentCourses() {
    // حالة للسنة المختارة
    const [selectedYear, setSelectedYear] = useState(null);
    
    // بيانات السنوات الدراسية
    const academicYears = [
        { id: 1, name: "السنة الأولى" },
        { id: 2, name: "السنة الثانية" },
        { id: 3, name: "السنة الثالثة" },
        { id: 4, name: "السنة الرابعة" }
    ];
    
    // بيانات الكورسات لكل سنة دراسية (يمكن تعديلها حسب احتياجك)
    const courses = {
        1: [
            {
                id: 101,
                semester: "الفصل الأول",
                title: "مبادئ البرمجة",
                instructor: "د. أحمد محمد",
                image: "/api/placeholder/400/320",
                duration: "12 أسبوع",
                lessons: 24
            },
            {
                id: 102,
                semester: "الفصل الثاني",
                title: "أساسيات قواعد البيانات",
                instructor: "د. سارة علي",
                image: "/api/placeholder/400/320",
                duration: "10 أسابيع",
                lessons: 20
            }
        ],
        2: [
            {
                id: 201,
                semester: "الفصل الأول",
                title: "البرمجة المتقدمة",
                instructor: "د. محمد خالد",
                image: "/api/placeholder/400/320",
                duration: "14 أسبوع",
                lessons: 28
            },
            {
                id: 202,
                semester: "الفصل الثاني",
                title: "تطوير تطبيقات الويب",
                instructor: "د. فاطمة أحمد",
                image: "/api/placeholder/400/320",
                duration: "12 أسبوع",
                lessons: 24
            }
        ],
        3: [
            {
                id: 301,
                semester: "الفصل الأول",
                title: "تطوير تطبيقات الموبايل",
                instructor: "د. خالد عمر",
                image: "/api/placeholder/400/320",
                duration: "14 أسبوع",
                lessons: 28
            },
            {
                id: 302,
                semester: "الفصل الثاني",
                title: "الذكاء الاصطناعي",
                instructor: "د. نورة سعيد",
                image: "/api/placeholder/400/320",
                duration: "16 أسبوع",
                lessons: 32
            }
        ],
        4: [
            {
                id: 401,
                semester: "الفصل الأول",
                title: "أمن المعلومات",
                instructor: "د. عبدالله وليد",
                image: "/api/placeholder/400/320",
                duration: "12 أسبوع",
                lessons: 24
            },
            {
                id: 402,
                semester: "الفصل الثاني",
                title: "مشروع التخرج",
                instructor: "د. سلمى راشد",
                image: "/api/placeholder/400/320",
                duration: "16 أسبوع",
                lessons: 16
            }
        ]
    };

    // عند اختيار سنة دراسية
    const handleYearSelect = (yearId) => {
        setSelectedYear(yearId);
    };

    return (
        <>
           <section className="bg-gradient-to-br from-gray-50 via-white to-green-50 py-16 md:py-20 text-right overflow-hidden" dir="rtl">
                <div className="container mx-auto px-4 md:px-8 lg:px-12">
                    <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">اختر السنة الدراسية</h1>
                    
                    {/* اختيار السنة الدراسية */}
                    <div className="mb-12">
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h2 className="text-xl font-bold mb-6 text-gray-700">السنوات الدراسية</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                                {academicYears.map((year) => (
                                    <div
                                        key={year.id}
                                        className={`relative cursor-pointer rounded-lg p-6 text-center transition-all duration-200 ${
                                            selectedYear === year.id
                                                ? "bg-green-500 text-white shadow-md transform scale-105"
                                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                        onClick={() => handleYearSelect(year.id)}
                                    >
                                        <h3 className="text-lg font-bold">{year.name}</h3>
                                        {selectedYear === year.id && (
                                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    {/* عرض كورسات الفصول الدراسية */}
                    {selectedYear && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-2xl font-bold mb-6 text-gray-800">كورسات {academicYears.find(y => y.id === selectedYear)?.name}</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {courses[selectedYear]?.map((course) => (
                                    <div key={course.id} className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-xl hover:transform hover:scale-105">
                                        <div className="relative">
                                            <img 
                                                src={course.image} 
                                                alt={course.title} 
                                                className="w-full h-48 object-cover"
                                            />
                                            <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                                {course.semester}
                                            </div>
                                        </div>
                                        
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold mb-2 text-gray-800">{course.title}</h3>
                                            <p className="text-gray-600 mb-4">{course.instructor}</p>
                                            
                                            <div className="flex justify-between text-gray-500 text-sm mb-6">
                                                <div className="flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                                    </svg>
                                                    <span>{course.duration}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                                                    </svg>
                                                    <span>{course.lessons} درس</span>
                                                </div>
                                            </div>
                                            
                                            <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-bold transition-colors">
                                                عرض الكورس
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>
            </section>
        </>
    );
}

StudentCourses.layout = page => <PublicLayout children={page} />;