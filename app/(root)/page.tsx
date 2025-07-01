'use client'
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

import Link from 'next/link';
import Image from 'next/image';


import { dummyInterviews } from '@/constants';
import InterviewCard from '@/components/InterviewCard';


import { motion } from "framer-motion";
import { AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

const Page = () => {
  const [showButton, setShowButton] = useState(false);

  // Scroll animation effect
  useEffect(() => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll(".animate-on-scroll");
      elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight - 100) {
          element.classList.add("animate-fade-up");
        }
      });
    };
    window.addEventListener("scroll", animateOnScroll);
    animateOnScroll(); // Run once on load
    return () => window.removeEventListener("scroll", animateOnScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Show button when user scrolls down 300px
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Cleanup event listener on component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8
      }
    }
  };

  return (
    <div className='scroll-smooth'>
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-black/20 backdrop-blur flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <Link href="/" className='flex items-center gap-2'>
            <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
              <h2 className="text-primary text-white font-bold text-sm">H</h2>
            </div>
            {/* <span className="font-semibold text-lg">HealthWise</span> */}
            <h2 className='text-primary-100'>HealthWise</h2>
          </Link>


          <div className="px-75 hidden md:flex items-center space-x-8">
            
            <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
            <a href="#consultations" className="text-gray-600 hover:text-gray-900">Your Consultations</a>


          </div>
        </div>
      </nav>

      {/* Main content with grid background */}

      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-light leading-tight">
                Expert care,{' '}
                <span className="text-orange-400 font-light">compassionate</span>
                <br />
                hearts
              </h1>
              <p className="text-gray-600 text-lg max-w-md">
                Cairo, our AI voice assistant, is designed to support your care journey by suggesting possible categories of concern
                We recommend follow up with medical professionals for complete diagnosis
              </p>
            </div>

            {/* Button */}
            <Link href="/interview">
              <Button className="bg-orange-600 text-white px-8 py-6 rounded-lg text-lg hover:bg-green-700 transition-colors">
                Start a Consultation with Cairo
              </Button>
            </Link>
          </div>

          {/* Right side with image placeholder */}
          {/* Right side with image placeholder */}
          <div className="relative">
            <div className="rounded-lg h-96 flex items-center justify-center">
              <div className="text-center">
                <img
                  src="/doctor3.png"
                  alt="Healthcare Professional"
                  className="w-120 h-120 object-cover mx-auto"
                />
              </div>
            </div>





            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-orange-200 rounded-full opacity-60"></div>
            <div className="absolute top-10 -left-6 w-6 h-6 bg-blue-200 rounded-full opacity-60"></div>
            <div className="absolute -bottom-6 right-10 w-10 h-10 bg-pink-200 rounded-full opacity-60"></div>
          </div>
        </motion.div>
      </div>

      {/* Features */}
      <motion.section
        id="features"
        className="py-12 md:py-24 lg:py-32 bg-black/50 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="w-full px-4 md:px-6">
          <motion.div
            className="flex flex-col items-center justify-center space-y-4 text-center"
            variants={itemVariants}
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-light tracking-tighter text-white md:text-4xl/tight">
                Your <span className="text-[#FF8C00] font-medium"> well-being</span>,{' '}
                our
                <span className="text-[#FF8C00] font-medium"> mission</span>
              </h2>
              <p className="max-w-[1000px] text-gray-300 md:text-xl">
                HealthWise provides a comprehensive platform for individuals and healthcare professionals to collaborate on personalized health and wellness solutions.
              </p>
            </div>
          </motion.div>

          <div className="flex justify-center">
            <motion.div
              className="grid w-full items-stretch justify-items-center gap-6 py-12 px-4 md:px-8 lg:grid-cols-3"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {[
                {
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-10 w-10 text-[#FF8C00]"
                    >
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                    </svg>
                  ),
                  title: "Voice AI Doctor Consultant",
                  description: "Consult an AI-powered medical assistant for early insights using voice.",
                  features: ["Real-time speech recognition", "Symptom analysis", "Conversational interaction"]
                },
                {
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-10 w-10 text-[#FF8C00]"
                    >
                      <path d="M4 4h16v16H4z" />
                      <path d="M4 10h16" />
                      <path d="M10 4v16" />
                    </svg>
                  ),
                  title: "PDF Medical Summary",
                  description: "Download a detailed PDF report of your consultation to share with real doctors.",
                  features: ["Timestamps & notes", "Assistant's observations", "Printable & sharable"]
                },
                {
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-10 w-10 text-[#FF8C00]"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  ),
                  title: "Recommendations",
                  description: "Get personalized recommendations for lifestyle changes, tests, and follow-ups.",
                  features: ["Health tips", "Next steps", "Goal-based suggestions"]
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="w-full max-w-sm rounded-lg border border-gray-700 bg-[#111111] text-white shadow-sm transition-all duration-300 hover:shadow-md"
                  variants={cardVariants}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex flex-col space-y-1.5 p-6">
                    {feature.icon}
                    <h3 className="text-lg font-semibold leading-none tracking-tight">{feature.title}</h3>
                    <p className="text-sm text-gray-300">{feature.description}</p>
                  </div>
                  <div className="p-6 pt-0">
                    <ul className="grid gap-2 text-sm text-gray-200">
                      {feature.features.map((item, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4 text-[#FF8C00]"
                          >
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <path d="m9 11 3 3L22 4" />
                          </svg>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Your consultations */}
      <motion.section
        id="consultations"
        className="py-12 md:py-24 lg:py-32"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="w-full px-4 md:px-6">
          <motion.div
            className="flex flex-col items-center justify-center space-y-4 text-center"
            variants={itemVariants}
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-light tracking-tighter text-white-900 md:text-4xl/tight">
                Your{' '}
                <span className="text-[#FF8C00] font-medium">Consultations</span>
              </h2>
              <p className="max-w-[600px] text-gray-600 md:text-xl">
                Review your previous consultations and track your health journey over time.
              </p>
            </div>
          </motion.div>

          <div className="flex justify-center">
            <motion.div
              className="grid w-full items-stretch justify-items-center gap-6 py-12 px-4 md:px-8 lg:grid-cols-3"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* {dummyInterviews.map((interview) => (
                    <motion.div
                      key={interview.id}
                      className="w-full max-w-sm"
                      variants={cardVariants}
                      whileHover={{ y: -5 }}
                    >
                      <PatientCard {...interview} />
                    </motion.div>
                  ))} */}
              <h2>under development...</h2>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showButton && (
          <motion.button
            className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>



      <style jsx>{`
            @keyframes fadeUp {
              from {
                opacity: 0;
                transform: translateY(30px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            .animate-fade-up {
              animation: fadeUp 0.8s ease-out forwards;
            }

            .animate-on-scroll {
              opacity: 0;
              transform: translateY(30px);
              transition: all 0.8s ease-out;
            }

            .animate-on-scroll.animate-fade-up {
              opacity: 1;
              transform: translateY(0);
            }
          `}

      </style>
    </div>
  )
};

export default Page;