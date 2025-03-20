import React, { useState, useEffect } from 'react';
import { Link } from "@inertiajs/react";

export default function PublicLayout({ children }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // تحديد حالة الجهاز عند التحميل
        setIsMobile(window.innerWidth < 768);

        // التحقق من التمرير لتغيير شكل الهيدر
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        // التحقق من حجم الشاشة عند تغيير الحجم
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
        };
    }, []);
// -----------------------------------------
const themes = ["mytheme", "dark", "gourmet"];
    const [theme, setTheme] = useState(localStorage.getItem("selectedTheme") || "mytheme");

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("selectedTheme", theme);
    }, [theme]);

    const changeTheme = () => {
        const nextTheme = themes[(themes.indexOf(theme) + 1) % themes.length];
        setTheme(nextTheme);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 font-sans text-right">
             {/* زر تغيير الثيم */}
             {/* <button onClick={changeTheme} className="btn btn-primary m-4">
                تغيير الثيم ({theme})
            </button> */}

            {/* الشريط العلوي - متكيف مع التمرير */}
            <header className={`${scrolled ? 'py-2 shadow-md bg-white/95 backdrop-blur-sm' : 'py-4 bg-white'} sticky top-0 z-50 transition-all duration-300`}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        {/* الشعار */}
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center group">
                                <img
                                    src={`/images/1.png`}
                                    alt="الشعار"
                                    className={`${scrolled ? 'h-16 w-16' : 'h-20 w-20'} transition-all duration-300 transform group-hover:scale-105`}
                                />
                                <span className="font-bold text-lg text-gray-800 ml-2 hidden sm:inline-block">اسم المنصة</span>
                            </Link>
                        </div>

                        {/* زر القائمة للهواتف */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                                aria-label="القائمة"
                            >
                                {!mobileMenuOpen ? (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                ) : (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                )}
                            </button>
                        </div>

                        {/* القائمة للشاشات الكبيرة */}
                        <nav className="hidden md:block">
                            <ul className="flex items-center space-x-1 space-x-reverse lg:space-x-2 lg:space-x-reverse">
                                <li>
                                    <Link href="/" className="text-gray-700 hover:text-green-600 font-medium px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                                        الرئيسية
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/courses" className="text-gray-700 hover:text-green-600 font-medium px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                                        ماذا نقدم
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/FromHamza" className="text-gray-700 hover:text-green-600 font-medium px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                                     من انا؟
                                    </Link>
                                </li>
                                <li className="relative group">
                                    <Link
                                        href="/CategoryAndCourse"
                                        className="text-gray-700 hover:text-green-600 font-medium px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                                    >
                                        أنواع الكورسات
                                    </Link>

                                    {/* القائمة المنسدلة */}
                                    <div className="absolute left-0 mt-2 hidden min-w-60 bg-white shadow-lg rounded-lg opacity-0 group-hover:opacity-100 group-hover:block transition-opacity duration-200">
                                        <ul className="py-2">
                                            <li>
                                                <Link
                                                    href="/StudentCourses"
                                                >
                                                    <a className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                                        كورسات الطلاب
                                                    </a>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href="/TeachersCourses"
                                                >

                                                    <a className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                                        كورسات الأساتذة
                                                    </a>
                                                </Link>

                                            </li>
                                        </ul>
                                    </div>
                                </li>


                                <li className="mr-2 lg:mr-4">
                                    <Link
                                        href="/login"
                                        className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-medium px-5 py-2 rounded-lg transition duration-300 shadow-sm hover:shadow flex items-center"
                                    >
                                        <span>تسجيل الآن</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    {/* القائمة المنسدلة للهواتف */}
                    {mobileMenuOpen && (
                        <nav className="mt-4 md:hidden border-t border-gray-100 pt-4 animate-fadeIn">
                            <ul className="flex flex-col space-y-2">
                                <li>
                                    <Link
                                        href="/"
                                        className="text-gray-700 hover:text-green-600 block px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        الرئيسية
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/courses"
                                        className="text-gray-700 hover:text-green-600 block px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        ماذا نقدم
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/about"
                                        className="text-gray-700 hover:text-green-600 block px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        من نحن؟
                                    </Link>
                                </li>
                                <li className="mt-3 mb-2">
                                    <Link
                                        href="/login"
                                        className="bg-gradient-to-r from-green-600 to-green-500 text-white font-medium px-4 py-3 rounded-lg block text-center transition duration-300"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        تسجيل الآن
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 inline-block" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    )}
                </div>
            </header>

            {/* المحتوى الرئيسي */}

            <main className="flex-1">
                {children}
            </main>

            {/* الفوتر - متجاوب */}
            <footer className="bg-white border-t border-gray-100 py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

                        {/* معلومات المنصة */}
                        <div>
                            <div className="mb-6">
                                <Link href="/" className="inline-block">
                                    <img height="75px" width="75px" src={`/images/1.png`} alt="الشعار" className="mb-2" />
                                    <h3 className="text-lg font-bold text-gray-800">اسم المنصة</h3>
                                </Link>
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                منصة تعليمية متخصصة تهدف إلى تقديم أفضل المحتويات التعليمية للطلاب في مختلف المراحل الدراسية.
                            </p>
                            {/* أيقونات وسائل التواصل الاجتماعي */}
                            <div className="flex space-x-4 space-x-reverse mt-4">
                                <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-green-100 hover:text-green-600 transition-colors duration-200">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                    </svg>
                                </a>
                                <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-green-100 hover:text-green-600 transition-colors duration-200">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                                    </svg>
                                </a>
                                <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-green-100 hover:text-green-600 transition-colors duration-200">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* روابط مهمة */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 mb-4 border-r-4 border-green-500 pr-3">روابط مهمة</h3>
                            <ul className="space-y-3 text-sm">
                                <li>
                                    <Link href="/" className="text-gray-600 hover:text-green-600 hover:mr-1 transition-all duration-200 flex items-center">
                                        <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                        </svg>
                                        الرئيسية
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/courses" className="text-gray-600 hover:text-green-600 hover:mr-1 transition-all duration-200 flex items-center">
                                        <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                        </svg>
                                        خدماتنا
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/about" className="text-gray-600 hover:text-green-600 hover:mr-1 transition-all duration-200 flex items-center">
                                        <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                        </svg>
                                        من نحن
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/faq" className="text-gray-600 hover:text-green-600 hover:mr-1 transition-all duration-200 flex items-center">
                                        <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                        </svg>
                                        الأسئلة الشائعة
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* تواصل معنا */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 mb-4 border-r-4 border-green-500 pr-3">تواصل معنا</h3>
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-start">
                                    <svg className="w-5 h-5 text-green-500 ml-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <span className="text-gray-600">البريد: info@example.com</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="w-5 h-5 text-green-500 ml-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <span className="text-gray-600">الهاتف: 123-456-789</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="w-5 h-5 text-green-500 ml-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span className="text-gray-600">العنوان: شارع الرئيسي، المدينة</span>
                                </li>
                            </ul>
                        </div>

                        {/* النشرة الإخبارية */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4 border-r-4 border-green-500 pr-3">النشرة الإخبارية</h3>
                            <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                                <input
                                    type="email"
                                    placeholder="بريدك الإلكتروني"
                                    className="p-3 text-sm w-full outline-none"
                                />
                                <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 text-sm flex-shrink-0">اشتراك</button>
                            </div>
                        </div>
                    </div>

                    <div className="text-center pt-6 border-t border-gray-300">
                        <p className="text-gray-600 text-sm">جميع الحقوق محفوظة &copy; 2025</p>
                    </div>
                </div>
            </footer>

        </div>
    );
}