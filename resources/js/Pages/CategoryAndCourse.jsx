import React from 'react';
import PublicLayout from "@/Layouts/PublicLayout";
import { FaChalkboardTeacher, FaSchool } from "react-icons/fa";

export default function CategoryAndCourse() {
    return (
        <>
            <section className="bg-green-50 py-16 text-right motion-safe:animate-fade-in" dir="rtl">
                <div className="container mx-auto px-6 lg:px-12">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                        {/* كورسات الأساتذة */}
                        <div className="bg-white p-8 shadow-lg rounded-xl motion-preset-slide-left motion-ease-spring-bouncier border-t-4 border-green-500 flex flex-col items-center text-center">
                            <div className="bg-green-100 p-4 rounded-full mb-4 motion-safe:animate-bounce">
                                <FaChalkboardTeacher className="text-green-700 text-4xl" />
                            </div>
                            <h2 className="text-2xl font-bold text-green-700 mb-4 motion-safe:animate-slide-in-left">كورسات الأساتذة</h2>
                            <p className="text-gray-700 leading-relaxed mb-6 motion-safe:animate-fade-in"> 
                                دورات تدريبية متقدمة مصممة خصيصًا للأساتذة لمساعدتهم على تحسين مهاراتهم الأكاديمية.
                            </p>
                            <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md transition duration-300 ">
                                استكشاف الكورسات
                            </button>
                        </div>

                        {/* كورسات الطلاب */}
                        <div className="bg-white p-8 shadow-lg rounded-xl motion-preset-slide-left motion-delay-[400ms] motion-ease-spring-bouncier border-t-4 border-blue-500 flex flex-col items-center text-center">
                            <div className="bg-blue-100 p-4 rounded-full mb-4 motion-safe:animate-bounce">
                                <FaSchool className="text-blue-700 text-4xl" />
                            </div>
                            <h2 className="text-2xl font-bold text-blue-700 mb-4 motion-safe:animate-slide-in-right">كورسات الطلاب</h2>
                            <p className="text-gray-700 leading-relaxed mb-6 motion-safe:animate-fade-in"> 
                                مجموعة متنوعة من الكورسات المصممة خصيصًا للطلاب لتعزيز تعلمهم وتحقيق النجاح الأكاديمي.
                            </p>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition duration-300 ">
                                استكشاف الكورسات
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

CategoryAndCourse.layout = page => <PublicLayout children={page} />;
