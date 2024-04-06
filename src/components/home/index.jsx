import React from 'react';
// import { useAuth } from '../../contexts/authContext';

import { IoIosArrowForward } from 'react-icons/io';
import { FaCameraRetro } from "react-icons/fa"
import { FaStethoscope } from "react-icons/fa";
import { FaBriefcaseMedical } from "react-icons/fa";

import { animated, useSpring } from 'react-spring';
import CameraModal from '../Modal/CameraModal';
import UploadImageModal from '../Modal/UploadImageModal';
import '../../App.css'
const Home = () => {
  // const { currentUser } = useAuth();

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <animated.div
          className="grid mb-8 border border-gray-200 rounded-lg shadow-sm  md:mb-12 md:grid-cols-2 lg:grid-cols-2 md:grid-rows-2 bg-white" 
          style={{ width:'45%',height:'60%', borderColor: '#39B68D', ...fadeIn }}
        >
          {/* Logo */}
          <div className="max-w-full flex justify-center items-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 md:col-span-3">
            <div className="max-w-5xl items-center  rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="flex justify-center items-center h-full">
                <a>
                  <h5 className="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Heal Your Crop
                  </h5>
                </a>
              </div>
              <div className="p-5 text-3xl flex items-center">
                <div className="flex flex-col items-center">
                  <FaCameraRetro className="mb-2 mr-6 " />
                  <a>
                    <h6 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      Take a Picture
                    </h6>
                  </a>
                </div>
                <IoIosArrowForward className="mr-4 text-gray-400" />
                <div className="flex flex-col items-center">
                  <FaStethoscope className="mb-2 mr-6 " />
                  <a>
                    <h6 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      See Diagnosis
                    </h6>
                  </a>
                </div>
                <IoIosArrowForward className="mr-4 text-gray-400" />
                <div className="flex flex-col items-center">
                  <FaBriefcaseMedical className="mb-2 mr-6" />
                  <a>
                    <h6 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      Get Medicine
                    </h6>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Upload image */}
          <animated.div className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-ss-lg md:border-e dark:bg-gray-800 dark:border-gray-700">
            <div className="p-10">
              <a>
                <h5 className="mb-5 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Take a Picture
                </h5>
              </a>
              <CameraModal />
            </div>
          </animated.div>

          {/* Upload an image */}
          <animated.div className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-ss-lg md:border-e dark:bg-gray-800 dark:border-gray-700">
            <div className="p-10">
              <a>
                <h5 className="mb-5 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Upload an Image
                </h5>
              </a>
              <UploadImageModal />
            </div>
          </animated.div>
        </animated.div>
      </div>
    </>
  );
};

export default Home;
