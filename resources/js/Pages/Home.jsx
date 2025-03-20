import React from 'react';
import PublicLayout from "@/Layouts/PublicLayout";
import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Home() {
// دالة لحساب الأرقام المتحركة
const AnimatedNumber = ({ value, inView }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    // بدء العد فقط عندما يكون العنصر مرئياً
    if (!inView) {
      setCount(0);
      return;
    }
    
    let start = 0;
    const end = parseInt(value.replace("+", "").replace("%", "").replace(/,/g, ""), 10); // تحويل النص إلى رقم
    if (start === end) return;

    const duration = 2000; // مدة العد بالمللي ثانية
    const steps = duration / 16; // عدد الإطارات
    const increment = end / steps; // قيمة الزيادة التدريجية

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, inView]);

  // تنسيق الرقم بإضافة فواصل للآلاف
  const formattedNumber = count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  
  // إضافة الرموز (+ أو %) إذا كانت موجودة في القيمة الأصلية
  if (value.includes("%")) {
    return <>{formattedNumber}%</>;
  } else if (value.includes("+")) {
    return <>+{formattedNumber}</>;
  } else {
    return <>{formattedNumber}</>;
  }
};

// استخدام useInView لتتبع متى يظهر القسم في نطاق الرؤية
const sectionRef = useRef(null);
const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  
  return (
    <>
      <section className="bg-gradient-to-r from-gray-50 to-white py-20 text-right " dir="rtl">
        <div className="container mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* القسم التعريفي في اليمين */}

          <motion.div className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-green-100 rounded-full opacity-50"></div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6 relative">
                المعلم <span className="text-green-600">حمزة النويهي</span>
                <span className="block text-2xl sm:text-3xl text-gray-700 mt-2 font-medium">خبرة 6 سنين في التوجيهي</span>
              </h1>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-r-4 border-green-500 mb-8">
              <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                حمزة النويهي، متخصص في اللغة الإنجليزية، وأحمل درجة البكالوريوس، الماجستير، والدبلوم العالي في هذا المجال. أقدم المساعدة للطلاب الذين يسعون إلى تحقيق علامات ممتازة في التوجيهي، من خلال تبسيط المادة وشرحها بأسلوب واضح وسهل.
              </p>

              <p className="text-gray-700 leading-relaxed text-lg">
                لا يقتصر هدفي على مساعدة الطلاب في التفوق دراسيًا فحسب، بل يشمل أيضًا المساهمة في تطوير طرق التدريس في الوطن العربي، بحيث تصبح أكثر تفاعلية وسهولة، مما يمكّن الطلاب من فهم المادة بثقة والإجابة على الأسئلة بأفضل طريقة ممكنة.
              </p>
            </div>

            <motion.div
              className="flex items-center gap-4"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } }
              }}
            >
              <motion.button className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-lg shadow-md transition duration-300 flex items-center"
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 120, delay: 0.1 } }
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span>تسجيل الآن</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </motion.button>

              <motion.button className="border-2 border-green-600 text-green-600 hover:bg-green-50 font-medium py-3 px-6 rounded-lg transition duration-300"
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 120, delay: 0.1 } }
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                تواصل معنا
              </motion.button>
            </motion.div>
          </motion.div>

          {/* صورة المعلم في اليسار مع تأثيرات */}
          <motion.div className="w-full lg:w-1/2 relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-green-200 rounded-full opacity-30"></div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-200 rounded-full opacity-30"></div>

            <div className="relative bg-gradient-to-br from-gray-100 to-white p-4 rounded-2xl shadow-lg overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-r from-green-500/10 to-blue-500/10"></div>
              <img
                src={`/images/hamza.png`}
                alt="المعلم حمزة النويهي"
                className="w-full h-auto rounded-xl object-cover"
              />
              <div className="absolute bottom-0 right-0 bg-white/80 backdrop-blur-sm p-3 rounded-tl-lg rounded-br-lg shadow-md">
                <div className="text-green-600 font-bold">اللغة الإنجليزية </div>
                <div className="text-sm">درجة الماجستير</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>


         {/* قسم الإحصائيات باستخدام framer-motion */}
      <section 
        ref={sectionRef} 
        className="bg-white py-16" 
        dir="rtl"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            {/* الجانب الأيمن - النص */}
            <div className="md:w-1/3 mb-8 md:mb-0 text-right">
              <motion.h2 
                className="text-3xl font-semibold text-gray-700"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                Helping a local
              </motion.h2>
              <motion.h2 
                className="text-3xl font-semibold text-green-500 mb-2"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                business reinvent itself
              </motion.h2>
              <motion.p 
                className="text-gray-600"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                We reached here with our hard work and dedication
              </motion.p>
            </div>
            
            {/* الجانب الأيسر - الإحصائيات */}
            <div className="md:w-2/3 grid grid-cols-2 gap-8">
              {/* الأعضاء */}
              <motion.div
                className="flex items-center mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="bg-green-100 rounded-full p-3 ml-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">
                    <AnimatedNumber value="2,245,341" inView={isInView} />
                  </div>
                  <div className="text-gray-600">Members</div>
                </div>
              </motion.div>
              
              {/* النوادي */}
              <motion.div
                className="flex items-center mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="bg-green-100 rounded-full p-3 ml-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">
                    <AnimatedNumber value="46,328" inView={isInView} />
                  </div>
                  <div className="text-gray-600">Clubs</div>
                </div>
              </motion.div>
              
              {/* حجوزات الفعاليات */}
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="bg-green-100 rounded-full p-3 ml-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">
                    <AnimatedNumber value="828,867" inView={isInView} />
                  </div>
                  <div className="text-gray-600">Event Bookings</div>
                </div>
              </motion.div>
              
              {/* المدفوعات */}
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="bg-green-100 rounded-full p-3 ml-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">
                    <AnimatedNumber value="1,926,436" inView={isInView} />
                  </div>
                  <div className="text-gray-600">Payments</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* إذا كنت ترغب في الاحتفاظ بالقسم القديم أيضاً، يمكن تعليقه هنا */}
      {/* 
      <section className="bg-gradient-to-r from-green-50 to-green-100 py-14 text-right" dir="rtl">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "+1000", label: "طالب مستفيد" },
              { value: "6", label: "سنوات خبرة" },
              { value: "98%", label: "نسبة النجاح" },
              { value: "24/7", label: "دعم مستمر" }
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl shadow-lg backdrop-blur-md border border-green-300/30
          bg-gradient-to-r 
          transition-all duration-300 hover:scale-105 hover:shadow-xl 
          motion-safe:animate-floating"
              >
                <div className="text-4xl font-extrabold text-green-600 mt-2">
                  <AnimatedNumber value={item.value} />
                </div>
                <div className="text-gray-700 text-lg mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      */}

    </>
  );
}

Home.layout = page => <PublicLayout children={page} />;