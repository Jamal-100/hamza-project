import { useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function Register() {
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 3;
    const [validationErrors, setValidationErrors] = useState({});

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submitForm = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    // التحقق من صحة الاسم
    const validateName = () => {
        if (data.name.trim() === '') {
            setValidationErrors(prev => ({ ...prev, name: 'يجب إدخال الاسم' }));
            return false;
        }
        setValidationErrors(prev => ({ ...prev, name: null }));
        return true;
    };

    // التحقق من صحة البريد الإلكتروني
    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            setValidationErrors(prev => ({ ...prev, email: 'يرجى إدخال بريد إلكتروني صحيح' }));
            return false;
        }
        setValidationErrors(prev => ({ ...prev, email: null }));
        return true;
    };

    // التحقق من صحة كلمة المرور
    const validatePassword = () => {
        let isValid = true;
        if (data.password.length < 8) {
            setValidationErrors(prev => ({ ...prev, password: 'يجب أن تكون كلمة المرور 8 أحرف على الأقل' }));
            isValid = false;
        } else {
            setValidationErrors(prev => ({ ...prev, password: null }));
        }

        if (data.password !== data.password_confirmation) {
            setValidationErrors(prev => ({ ...prev, password_confirmation: 'كلمات المرور غير متطابقة' }));
            isValid = false;
        } else {
            setValidationErrors(prev => ({ ...prev, password_confirmation: null }));
        }

        return isValid;
    };

    const nextStep = () => {
        if (currentStep === 1) {
            if (!validateName()) return;
        } else if (currentStep === 2) {
            if (!validateEmail()) return;
        }

        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    // Subtler animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.4 }
        }
    };

    const formVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.3 }
        },
        exit: {
            opacity: 0,
            x: -20,
            transition: { duration: 0.3 }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
            <div className="absolute inset-0 bg-cover bg-center opacity-5" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')" }}></div>

            <div className="relative min-h-screen flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
                <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            {/* Logo can go here */}
                        </div>
                        <Link href="/" >
                            <div className="ml-3 text-2xl font-bold text-green-600"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                            </svg>
                            </div>
                        </Link>
                    </div>
                    <div>
                        <Link href={route('login')} className="text-sm text-gray-600 hover:text-green-600 transition duration-150">
                            تسجيل الدخول
                        </Link>
                    </div>
                </div>

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="sm:mx-auto sm:w-full sm:max-w-md md:max-w-lg"
                >
                    <Head title="Register" />

                    <div className="bg-white py-8 px-4 shadow-2xl sm:rounded-xl sm:px-10 border border-gray-100">
                        <div className="mb-8 text-center">
                            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">إنشاء حساب جديد</h1>
                            <p className="text-gray-600">انضم إلى مجتمعنا وابدأ رحلتك</p>

                            {/* Progress indicator */}
                            <div className="mt-8 flex justify-center">
                                {[...Array(totalSteps)].map((_, index) => (
                                    <div key={index} className="flex items-center">
                                        <motion.div
                                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${currentStep > index + 1
                                                ? 'bg-green-500 text-white'
                                                : currentStep === index + 1
                                                    ? 'bg-green-600 text-white'
                                                    : 'bg-gray-200 text-gray-600'
                                                }`}
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            {currentStep > index + 1 ? (
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                                </svg>
                                            ) : (
                                                index + 1
                                            )}
                                        </motion.div>
                                        {index < totalSteps - 1 && (
                                            <div className="relative w-16 h-1 mx-2">
                                                <div className="absolute w-full h-full bg-gray-200 rounded"></div>
                                                <div
                                                    className={`absolute h-full rounded ${currentStep > index + 1 ? 'bg-green-500' : 'bg-gray-200'
                                                        }`}
                                                    style={{ width: currentStep > index + 1 ? '100%' : '0%' }}
                                                ></div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <form onSubmit={submitForm} className="relative">
                            {/* Step 1: Name */}
                            <motion.div
                                initial="hidden"
                                animate={currentStep === 1 ? "visible" : "exit"}
                                variants={formVariants}
                                className={`${currentStep === 1 ? 'block' : 'hidden'}`}
                            >
                                <div className="space-y-6">
                                    <div>
                                        <InputLabel htmlFor="name" value="الاسم الكامل" className="text-gray-700" />
                                        <div className="mt-1 relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </div>
                                            <TextInput
                                                id="name"
                                                name="name"
                                                value={data.name}
                                                className="pl-10 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                                autoComplete="name"
                                                isFocused={true}
                                                onChange={(e) => setData('name', e.target.value)}
                                                required
                                                onBlur={validateName}
                                            />
                                        </div>
                                        <InputError message={errors.name || validationErrors.name} className="mt-2" />
                                    </div>

                                    <div className="mt-8 flex justify-end">
                                        <motion.button
                                            type="button"
                                            onClick={nextStep}
                                            className="flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            الخطوة التالية
                                            <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Step 2: Email */}
                            <motion.div
                                initial="hidden"
                                animate={currentStep === 2 ? "visible" : "exit"}
                                variants={formVariants}
                                className={`${currentStep === 2 ? 'block' : 'hidden'}`}
                            >
                                <div className="space-y-6">
                                    <div>
                                        <InputLabel htmlFor="email" value="البريد الإلكتروني" className="text-gray-700" />
                                        <div className="mt-1 relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <TextInput
                                                id="email"
                                                type="email"
                                                name="email"
                                                value={data.email}
                                                className="pl-10 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                                autoComplete="username"
                                                onChange={(e) => setData('email', e.target.value)}
                                                required
                                                onBlur={validateEmail}
                                            />
                                        </div>
                                        <InputError message={errors.email || validationErrors.email} className="mt-2" />
                                    </div>

                                    <div className="mt-8 flex justify-between">
                                        <motion.button
                                            type="button"
                                            onClick={prevStep}
                                            className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <svg className="mr-2 -ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                            </svg>
                                            السابق
                                        </motion.button>
                                        <motion.button
                                            type="button"
                                            onClick={nextStep}
                                            className="flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            الخطوة التالية
                                            <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Step 3: Password */}
                            <motion.div
                                initial="hidden"
                                animate={currentStep === 3 ? "visible" : "exit"}
                                variants={formVariants}
                                className={`${currentStep === 3 ? 'block' : 'hidden'}`}
                            >
                                <div className="space-y-6">
                                    <div>
                                        <InputLabel htmlFor="password" value="كلمة المرور" className="text-gray-700" />
                                        <div className="mt-1 relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                </svg>
                                            </div>
                                            <TextInput
                                                id="password"
                                                type="password"
                                                name="password"
                                                value={data.password}
                                                className="pl-10 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                                autoComplete="new-password"
                                                onChange={(e) => setData('password', e.target.value)}
                                                required
                                                onBlur={validatePassword}
                                            />
                                        </div>
                                        <InputError message={errors.password || validationErrors.password} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="password_confirmation" value="تأكيد كلمة المرور" className="text-gray-700" />
                                        <div className="mt-1 relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                                </svg>
                                            </div>
                                            <TextInput
                                                id="password_confirmation"
                                                type="password"
                                                name="password_confirmation"
                                                value={data.password_confirmation}
                                                className="pl-10 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                                autoComplete="new-password"
                                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                                required
                                                onBlur={validatePassword}
                                            />
                                        </div>
                                        <InputError message={errors.password_confirmation || validationErrors.password_confirmation} className="mt-2" />
                                    </div>

                                    <div className="mt-8 flex justify-between">
                                        <motion.button
                                            type="button"
                                            onClick={prevStep}
                                            className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <svg className="mr-2 -ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                            </svg>
                                            السابق
                                        </motion.button>
                                        <motion.button
                                            type="submit"
                                            disabled={processing}
                                            onClick={validatePassword}
                                            className="flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            إكمال التسجيل
                                            <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        </form>
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            لديك حساب بالفعل؟{' '}
                            <Link href={route('login')} className="font-medium text-green-600 hover:text-green-500">
                                تسجيل الدخول
                            </Link>
                        </p>
                    </div>
                </motion.div>

                {/* Decorative elements */}
                <div className="absolute bottom-0 left-0 w-full">
                    <svg className="w-full h-16 text-green-100" viewBox="0 0 1440 120" fill="currentColor" preserveAspectRatio="none">
                        <path d="M0 0l48 8.9c48 8.6 144 26.6 240 31.1 96 4 192 -5 288 -9 96 -4.7 192 -4.7 288 0 96 4 192 13 288 13 96 0 192 -9 240 -13l48 -4v93H0V0z" />
                    </svg>
                </div>

                <div className="absolute top-1/2 -right-12 transform -translate-y-1/2 w-64 h-64 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-1/3 -left-12 transform -translate-y-1/2 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-1/4 left-1/4 transform -translate-y-1/2 w-56 h-56 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

                <div className="absolute bottom-6 w-full text-center text-sm text-gray-600">
                    <p>© 2025 تطبيقك. جميع الحقوق محفوظة.</p>
                </div>
            </div>
        </div>
    );
}