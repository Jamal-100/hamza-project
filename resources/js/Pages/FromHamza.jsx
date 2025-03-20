import React, { useEffect } from 'react';
import PublicLayout from "@/Layouts/PublicLayout";
import { motion, useAnimation } from 'framer-motion';
import { Link } from "@inertiajs/react";
import { useInView } from 'react-intersection-observer';

export default function FromHamza() {
    // إعداد المراقبة لتفعيل التأثيرات عند الظهور في الشاشة
    const controls1 = useAnimation();
    const controls2 = useAnimation();
    const controls3 = useAnimation();

    const [ref1, inView1] = useInView({ threshold: 0.3, triggerOnce: true });
    const [ref2, inView2] = useInView({ threshold: 0.3, triggerOnce: true });
    const [ref3, inView3] = useInView({ threshold: 0.3, triggerOnce: true });

    // تفعيل التأثيرات عند ظهور العناصر
    useEffect(() => {
        if (inView1) {
            controls1.start("visible");
        }
        if (inView2) {
            controls2.start("visible");
        }
        if (inView3) {
            controls3.start("visible");
        }
    }, [controls1, controls2, controls3, inView1, inView2, inView3]);

    // تعريف تأثيرات الحركة
    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.7,
                ease: "easeOut"
            }
        }
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut",
                delay: 0.2
            }
        }
    };

    const textVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.7,
                ease: "easeOut",
                delay: 0.4
            }
        }
    };

    const iconVariants = {
        hidden: { opacity: 0, pathLength: 0 },
        visible: {
            opacity: 1,
            pathLength: 1,
            transition: {
                duration: 1.2,
                ease: "easeInOut",
                delay: 0.3
            }
        }
    };

    // بيانات المسيرة
    const journeyItems = [
        {
            id: 1,
            title: "البكالوريوس - جامعة ناعور",
            image: "/images/hamza.png",
            content: "بدأت رحلتي الأكاديمية في جامعة ناعور، حيث حصلت على درجة البكالوريوس. في تلك الفترة، كنت أدرك أن إتقان اللغة الإنجليزية ليس مجرد مهارة، بل هو بوابة لعالم أوسع من المعرفة والتواصل. كنت شغوفًا بتحسين مستواي، فقضيت ساعات طويلة أستمع إلى المحاضرات، أقرأ الكتب المتخصصة، وأتدرب على النطق الصحيح. ذات يوم، كنت أساعد زميلاً في شرح درس معقد، وحين رأيت عينيه تلمعان بالفهم، أدركت أنني لا أتعلم لنفسي فقط، بل لأساعد الآخرين على التعلم أيضًا. كانت تلك اللحظة التي بدأت فيها أرى نفسي ليس فقط كطالب، بل كمعلم في طور التكوين.",
            controls: controls1,
            ref: ref1,
            iconPath: "M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z",
            bgGradient: "from-green-50 to-white",
            accentColor: "green-600",
            year: "2012 - 2016"
        },
        {
            id: 2,
            title: "الماجستير - جامعة الشرق الأوسط",
            image: "/images/hamza.png",
            content: "عندما التحقت بجامعة الشرق الأوسط لمتابعة درجة الماجستير، كنت أكثر وعيًا بأهمية أساليب التدريس الحديثة. لم يكن هدفي فقط الحصول على شهادة، بل أن أصبح الأفضل فيما أفعله. حصلت على درجة الامتياز، لكن الرحلة لم تكن سهلة. أذكر موقفًا أثر فيّ كثيرًا؛ كنت أدرس لمجموعة من الطلاب، لكني لاحظت أنهم لم يتفاعلوا معي كما كنت أتوقع. حينها، أدركت أن التعليم ليس مجرد نقل للمعلومة، بل هو فن إيصالها بطريقة تلهم وتجذب الانتباه. بدأت أبحث عن طرق جديدة، جربت استراتيجيات مختلفة، وشيئًا فشيئًا أصبحت أكثر قدرة على إشراك الطلاب وتحفيزهم. هذه التجربة جعلتني أؤمن بأن التعليم عملية متجددة، وأن على المعلم أن يتعلم قبل أن يُعلّم.",
            controls: controls2,
            ref: ref2,
            iconPath: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
            bgGradient: "from-green-50 to-white",
            accentColor: "green-600",
            year: "2017 - 2019"
        },
        {
            id: 3,
            title: "دبلوم التعليم العالي - الجامعة الأردنية",
            image: "/images/hamza.png",
            content: "لم يكن الحصول على دبلوم التعليم العالي من الجامعة الأردنية مجرد خطوة إضافية في مسيرتي، بل كان تتويجًا لرحلة من الشغف والتطور. في هذه المرحلة، ركزت بشكل كبير على تدريب المعلمين، لأنني كنت أرى أن تحسين جودة التعليم يبدأ من المعلم نفسه. أذكر موقفًا عندما كنت أدرب مجموعة من المدرسين الجدد، وأحدهم أخبرني أنه يخشى الوقوف أمام الطلاب لأنه يعتقد أن لغته الإنجليزية ليست بالمستوى المطلوب. رأيت في عينيه الخوف الذي كنت أشعر به في بداياتي، فبدأت أعمل معه خطوة بخطوة، مستخدمًا أساليب التحفيز والتدريب العملي. بعد أسابيع، وقف هذا المعلم أمام صفه بثقة، وكانت تلك اللحظة التي شعرت فيها أن رحلتي لم تكن فقط عن التعلم، بل عن تمكين الآخرين من النجاح أيضًا.",
            controls: controls3,
            ref: ref3,
            iconPath: "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z",
            bgGradient: "from-green-50 to-white",
            accentColor: "green-600",
            year: "2020 - 2021"
        }
    ];

    return (
        <>
            <section className="bg-white py-16 md:py-24 text-right overflow-hidden" dir="rtl">
                <div className="container mx-auto px-4 md:px-8 lg:px-12">
                    {/* عنوان القسم مع تأثير حركي */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold text-gray-800 mb-4 inline-block relative pb-2">
                            مسيرتي الأكاديمية
                            <motion.div
                                className="absolute h-1 bg-gradient-to-l from-green-400 to-green-600 bottom-0 right-0"
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 1, delay: 0.5 }}
                            />
                        </h2>

                        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                            رحلة من التعلم والتعليم، محطات مهمة شكلت شخصيتي الأكاديمية وطورت أسلوبي في نقل المعرفة
                        </p>
                    </motion.div>

                    {/* خط زمني متصل */}
                    <div className="relative mb-24">
                        <div className="absolute left-1/2 transform -translate-x-1/2 -top-16 bottom-0 w-px bg-gradient-to-b from-transparent via-green-200 to-transparent z-0"></div>

                        {/* نقاط في الخط الزمني */}
                        <div className="hidden md:flex justify-center gap-32 md:gap-48 lg:gap-64">
                            {journeyItems.map((item, index) => (
                                <motion.div
                                    key={`point-${item.id}`}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
                                    className={`h-3 w-3 rounded-full bg-${item.accentColor} z-10`}
                                >
                                    <div className={`absolute -top-8 whitespace-nowrap text-sm text-${item.accentColor} font-medium`}>
                                        {item.year}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* عرض عناصر المسيرة */}
                    <div className="space-y-24">
                        {journeyItems.map((item, index) => (
                            <motion.div
                                key={item.id}
                                ref={item.ref}
                                className="relative"
                                variants={cardVariants}
                                initial="hidden"
                                animate={item.controls}
                            >
                                {/* زخرفة توصيل بين العناصر */}
                                {index < journeyItems.length - 1 && (
                                    <motion.div
                                        className="hidden md:block absolute h-24 w-px bg-green-100 left-1/2 -bottom-24 transform -translate-x-1/2 z-0"
                                        initial={{ height: 0 }}
                                        animate={{ height: "6rem" }}
                                        transition={{ duration: 1, delay: 1 }}
                                    />
                                )}

                                <div className={`bg-gradient-to-br ${item.bgGradient} rounded-2xl shadow-md overflow-hidden`}>
                                    <div className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-stretch`}>
                                        {/* الصورة مع تأثير حركي */}
                                        <motion.div
                                            className="w-full md:w-2/5 relative overflow-hidden"
                                            variants={imageVariants}
                                        >
                                            <div className="h-full min-h-64">
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6`}>
                                                    <div className="text-white">
                                                        <div className={`h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm mb-4 flex items-center justify-center`}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <motion.path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d={item.iconPath}
                                                                    variants={iconVariants}
                                                                />
                                                            </svg>
                                                        </div>
                                                        <h3 className="text-2xl font-bold">{item.title}</h3>
                                                        <p className="text-white/80 text-sm mt-2 md:hidden">{item.year}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>

                                        {/* المحتوى النصي مع تأثير حركي */}
                                        <motion.div
                                            className="w-full md:w-3/5 p-6 md:p-8 lg:p-10 flex items-center"
                                            variants={textVariants}
                                        >
                                            <div className="prose prose-lg text-right max-w-none">
                                                <p className="leading-relaxed text-gray-700">{item.content}</p>
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* عنصر تزييني في نهاية القسم */}
                    <motion.div
                        className="flex justify-center mt-20"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <motion.div
                            className="relative"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 1.5 }}
                        >
                            <div className="h-16 w-16 rounded-full bg-green-50 flex items-center justify-center relative">
                                <div className="h-12 w-12 rounded-full bg-green-500/10 absolute"></div>
                                <div className="h-8 w-8 rounded-full bg-green-600/20 absolute"></div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}

FromHamza.layout = page => <PublicLayout children={page} />;