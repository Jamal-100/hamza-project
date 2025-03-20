import React from 'react';
import PublicLayout from "@/Layouts/PublicLayout";
import { motion } from 'framer-motion';
import { Link } from "@inertiajs/react";


export default function TeachersCourses() {

    return (
        <>
            <section className="bg-gradient-to-br from-gray-50 via-white to-green-50 py-16 md:py-20 text-right overflow-hidden" dir="rtl">
                <div className="container mx-auto px-4 md:px-8 lg:px-12">
                    {/* شريط علوي للتأكيد البصري */}
                    <motion.div
                        className="h-1.5 bg-gradient-to-l from-green-600 to-green-400 rounded-full w-full max-w-md mr-auto mb-12 md:mb-16"
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: "100%", opacity: 1 }}
                        transition={{ duration: 1 }}
                    />

                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 md:gap-16">
                        {/* القسم التعريفي في اليمين */}
                        <motion.div
                            className="w-full lg:w-1/2 order-2 lg:order-1"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <div className="relative">
                                <motion.h1
                                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-6 relative"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                >
                                    المعلم <span className="text-green-600 relative">
                                        حمزة النويهي
                                        <motion.span
                                            className="absolute bottom-0 left-0 right-0 h-1 bg-green-500 rounded-full"
                                            initial={{ width: 0 }}
                                            animate={{ width: "100%" }}
                                            transition={{ duration: 0.4, delay: 1 }}
                                        />
                                    </span>
                                    <span className="block text-xl sm:text-2xl md:text-3xl text-gray-700 mt-3 font-medium">تجربة تدريسية متجددة</span>
                                </motion.h1>
                            </div>

                            <motion.div
                                className="bg-white p-5 md:p-6 rounded-lg shadow-lg border-r-4 border-green-500 mb-8 relative overflow-hidden"
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                                whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                            >
                                {/* زخارف داخل المربع */}
                                <div className="absolute -top-10 -left-10 w-20 h-20 rounded-full bg-green-100 opacity-20" />
                                <div className="absolute -bottom-10 -right-10 w-24 h-24 rounded-full bg-green-200 opacity-20" />

                                <p className="text-gray-700 mb-5 leading-relaxed text-base md:text-lg relative z-10">
                                    التعليم ليس مجرد نقل للمعلومات، بل هو فن التأثير والإلهام. من خلال خبرتي الأكاديمية والعملية، أساعد المعلمين على تطوير أساليبهم التدريسية لتصبح أكثر فاعلية وتفاعلية، مما يسهم في رفع مستوى الطلاب وتحقيق أفضل النتائج.
                                </p>

                                <p className="text-gray-700 leading-relaxed text-base md:text-lg relative z-10">
                                    يركز هذا الكورس على تقديم تقنيات حديثة تجعل التدريس تجربة مشوقة وفعالة، مع مراعاة أسلوب كل معلم وطريقته الخاصة، مما يعزز من قدرته على إيصال المعلومة بأفضل شكل ممكن.
                                </p>
                            </motion.div>

                            <motion.div
                                className="flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4 justify-center sm:justify-start"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.7 }}
                            >

                                <Link href="/DetailsTeachersCourses">

                                    <motion.button
                                        className="border-2 border-green-600 text-green-600 hover:bg-green-50 font-medium py-3 px-6 rounded-lg transition duration-300 flex items-center gap-2 w-full sm:w-auto justify-center"
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                                        </svg>
                                        <span>    التفاصيل و التسجيل     </span>


                                    </motion.button>
                                </Link>

                            </motion.div>

                            {/* إضافة مؤشرات إحصائية */}
                            <motion.div
                                className="mt-10 grid grid-cols-3 gap-3"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1, duration: 0.8 }}
                            >
                                <div className="bg-white/80 backdrop-blur rounded-lg p-3 text-center shadow-sm border border-green-100">
                                    <motion.span
                                        className="block text-green-600 font-bold text-2xl md:text-3xl"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1.2, duration: 0.5 }}
                                    >
                                        +١٥
                                    </motion.span>
                                    <span className="text-gray-600 text-sm">سنوات خبرة</span>
                                </div>
                                <div className="bg-white/80 backdrop-blur rounded-lg p-3 text-center shadow-sm border border-green-100">
                                    <motion.span
                                        className="block text-green-600 font-bold text-2xl md:text-3xl"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1.4, duration: 0.5 }}
                                    >
                                        +٣٠٠٠
                                    </motion.span>
                                    <span className="text-gray-600 text-sm">متدرب</span>
                                </div>
                                <div className="bg-white/80 backdrop-blur rounded-lg p-3 text-center shadow-sm border border-green-100">
                                    <motion.span
                                        className="block text-green-600 font-bold text-2xl md:text-3xl"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1.6, duration: 0.5 }}
                                    >
                                        +٢٥
                                    </motion.span>
                                    <span className="text-gray-600 text-sm">دورة تدريبية</span>
                                </div>
                            </motion.div>
                        </motion.div>


                        {/* قسم الصورة المحسن والمتجاوب */}
                        <motion.div
                            className="w-full lg:w-1/2 relative flex justify-center items-center order-1 lg:order-2 mb-8 lg:mb-0"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                        >
                            {/* خلفية زخرفية */}
                            <motion.div
                                className="absolute w-full h-full max-w-md max-h-md"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 0.3 }}
                            >
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-br from-green-200/20 to-transparent rounded-full blur-2xl"
                                    animate={{
                                        scale: [1, 1.1, 1],
                                        opacity: [0.3, 0.5, 0.3]
                                    }}
                                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                                />
                            </motion.div>

                            {/* دوائر زخرفية متحركة */}
                            <div className="relative">
                                <motion.div
                                    className="absolute -left-4 -top-4 w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full border-2 border-green-300 opacity-50"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                                />
                                <motion.div
                                    className="absolute -right-6 -bottom-6 w-60 h-60 sm:w-72 sm:h-72 rounded-full border-2 border-green-400 opacity-40"
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                />

                                {/* إطار الصورة الرئيسي */}
                                <motion.div
                                    className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-xl z-10"
                                    initial={{ scale: 0.9, y: 20 }}
                                    animate={{ scale: 1, y: 0 }}
                                    transition={{ duration: 0.7, delay: 0.5, type: "spring", stiffness: 100 }}
                                    whileHover={{
                                        scale: 1.03,
                                        transition: { duration: 0.3 }
                                    }}
                                >
                                    {/* نقوش وتأثيرات ضوئية */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-tr from-green-600/20 to-transparent mix-blend-overlay z-20"
                                        animate={{
                                            opacity: [0.3, 0.6, 0.3],
                                        }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    />

                                    {/* الصورة الرئيسية */}
                                    <img
                                        src="/images/482002956_2864874387017522_1726867088491099673_n.jpg"
                                        alt="المعلم حمزة النويهي"
                                        className="w-full h-full object-cover"
                                    />

                                    {/* تأثير التوهج والظل */}
                                    <div className="absolute inset-0 shadow-inner bg-gradient-to-b from-white/10 via-transparent to-green-900/30"></div>
                                </motion.div>

                                {/* شارة أو وسام على الصورة */}
                                <motion.div
                                    className="absolute -bottom-2 -right-2 bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-20 flex items-center gap-1"
                                    initial={{ scale: 0, rotate: -20 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ duration: 0.5, delay: 1.2, type: "spring" }}
                                    whileHover={{ scale: 1.1 }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                    <span>مدرب معتمد</span>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* شريط خاتمة للقسم */}
                <motion.div
                    className="h-1 bg-gradient-to-r from-green-500 to-green-100 w-full max-w-xs mx-auto mt-16 rounded-full"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "100%", opacity: 0.7 }}
                    transition={{ duration: 0.8, delay: 1.5 }}
                />
            </section>



        </>
    );
}

TeachersCourses.layout = page => <PublicLayout children={page} />;