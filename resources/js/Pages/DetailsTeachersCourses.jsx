import React, { useState } from 'react';
import PublicLayout from "@/Layouts/PublicLayout";
import { motion } from 'framer-motion';
import { Link } from "@inertiajs/react";

export default function DetailsTeachersCourses() {
    const [currentStep, setCurrentStep] = useState(0);
    
    // محتوى لكل خطوة
    const steps = [
        {
            title: "محتويات الكورس",
            content: (
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-bold mb-4">محتويات الكورس</h2>
                    <div className="space-y-3">
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 ml-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <span>الدرس الأول: مقدمة في المادة</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 ml-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <span>الدرس الثاني: أساسيات المادة</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 ml-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <span>الدرس الثالث: تطبيقات عملية</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 ml-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <span>الدرس الرابع: مشاريع نهائية</span>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "الشروط والأحكام",
            content: (
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-bold mb-4">الشروط والأحكام</h2>
                    <div className="space-y-4">
                        <div className="border-r-4 border-blue-500 pr-4">
                            <h3 className="font-bold mb-1">سياسة الاسترجاع</h3>
                            <p className="text-gray-600">يمكن استرجاع المبلغ خلال 14 يوم من تاريخ الشراء إذا لم يتم مشاهدة أكثر من 20% من محتوى الكورس.</p>
                        </div>
                        <div className="border-r-4 border-blue-500 pr-4">
                            <h3 className="font-bold mb-1">مدة الوصول</h3>
                            <p className="text-gray-600">ستتمكن من الوصول إلى محتوى الكورس لمدة سنة كاملة من تاريخ الشراء.</p>
                        </div>
                        <div className="border-r-4 border-blue-500 pr-4">
                            <h3 className="font-bold mb-1">حقوق الملكية</h3>
                            <p className="text-gray-600">جميع المواد التعليمية محمية بحقوق الملكية ولا يجوز نسخها أو مشاركتها مع الآخرين.</p>
                        </div>
                        <div className="flex items-center mt-6">
                            <input type="checkbox" id="agree" className="h-5 w-5 text-green-500 ml-2" />
                            <label htmlFor="agree" className="text-sm">أوافق على الشروط والأحكام</label>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "الشراء",
            content: (
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-bold mb-4">إتمام عملية الشراء</h2>
                    <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-bold">سعر الكورس:</span>
                                <span>199 ريال</span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-bold">الضريبة:</span>
                                <span>10 ريال</span>
                            </div>
                            <div className="border-t pt-2 mt-2 flex justify-between items-center font-bold">
                                <span>الإجمالي:</span>
                                <span>209 ريال</span>
                            </div>
                        </div>
                        
                        <div className="space-y-3">
                            <h3 className="font-bold">طرق الدفع</h3>
                            <div className="flex flex-wrap gap-3">
                                <div className="border border-gray-300 rounded-lg p-3 flex items-center justify-center w-32 h-16 cursor-pointer hover:border-green-500">
                                    <span>بطاقة مدى</span>
                                </div>
                                <div className="border border-gray-300 rounded-lg p-3 flex items-center justify-center w-32 h-16 cursor-pointer hover:border-green-500">
                                    <span>فيزا/ماستركارد</span>
                                </div>
                                <div className="border border-gray-300 rounded-lg p-3 flex items-center justify-center w-32 h-16 cursor-pointer hover:border-green-500">
                                    <span>آبل باي</span>
                                </div>
                            </div>
                        </div>
                        
                        <button className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors">
                            إتمام عملية الشراء
                        </button>
                    </div>
                </div>
            )
        }
    ];

    // انتقال للخطوة التالية
    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    // انتقال للخطوة السابقة
    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <>
            <section className="bg-gradient-to-br from-gray-50 via-white to-green-50 py-16 md:py-20 text-right overflow-hidden" dir="rtl">
                <div className="container mx-auto px-4 md:px-8 lg:px-12">
                    <h1 className="text-3xl font-bold mb-8 text-center">اسم الكورس</h1>
                    
                    {/* مكون Stepper */}
                    <div className="mb-12">
                        <div className="flex justify-between items-center mb-8">
                            {steps.map((step, index) => (
                                <div key={index} className="flex flex-col items-center relative flex-1">
                                    {/* خط متصل بين الخطوات */}
                                    {index < steps.length - 1 && (
                                        <div className={`absolute top-4 h-1 w-full right-1/2 ${currentStep >= index + 1 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                    )}
                                    
                                    {/* دائرة الخطوة */}
                                    <div 
                                        className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                                            currentStep > index ? 'bg-green-500 text-white' : 
                                            currentStep === index ? 'bg-green-500 text-white border-4 border-green-100' : 'bg-gray-300 text-gray-700'
                                        }`}
                                        onClick={() => setCurrentStep(index)}
                                    >
                                        {currentStep > index ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        ) : (
                                            index + 1
                                        )}
                                    </div>
                                    
                                    {/* عنوان الخطوة */}
                                    <div className="text-center mt-2">
                                        <div className={`font-medium ${currentStep === index ? 'text-green-600' : 'text-gray-500'}`}>{step.title}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        {/* محتوى الخطوة الحالية */}
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="min-h-64"
                        >
                            {steps[currentStep].content}
                        </motion.div>
                        
                        {/* أزرار التنقل */}
                        <div className="flex justify-between mt-8">
                            <button 
                                onClick={prevStep} 
                                className={`px-6 py-2 rounded-lg ${currentStep === 0 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                                disabled={currentStep === 0}
                            >
                                السابق
                            </button>
                            <button 
                                onClick={nextStep} 
                                className={`px-6 py-2 rounded-lg ${currentStep === steps.length - 1 ? 'hidden' : 'bg-green-600 text-white hover:bg-green-700'}`}
                            >
                                التالي
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

DetailsTeachersCourses.layout = page => <PublicLayout children={page} />;