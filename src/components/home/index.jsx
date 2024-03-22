import React from 'react';
import { useAuth } from '../../contexts/authContext';
import { FaSearch } from 'react-icons/fa';
import { FaLeaf } from 'react-icons/fa6';
import { IoIosArrowForward } from 'react-icons/io';
import { GiMedicinePills } from 'react-icons/gi';
import { LiaPrescriptionBottleSolid } from 'react-icons/lia';
import { IoInformationCircleSharp } from 'react-icons/io5';
import { FaCamera } from 'react-icons/fa';
import { IoCloudUpload } from 'react-icons/io5';
import { animated, useSpring } from 'react-spring';
import CameraModal from '../Modal/CameraModal';
import UploadImageModal from '../Modal/UploadImageModal';

const Home = () => {
  const { currentUser } = useAuth();

  const onUploadImage = () => {
    console.log("Upload Image");
  };
  const onTakePicture = () => {
    console.log('Take a Picture');
  };

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <animated.div
          className="grid mb-8 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 md:mb-12 md:grid-cols-2 lg:grid-cols-2 md:grid-rows-2 bg-white dark:bg-gray-800"
          style={{ borderColor: '#39B68D', ...fadeIn }}>
          {/* Logo */}
          <div
            className="max-w-full flex justify-center items-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 md:col-span-3"
            style={{ borderColor: '#39B68D' }}>
            <div className="max-w-4xl items-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="flex justify-center items-center h-full">
                <a>
                  <h5 className="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Heal Your Crop
                  </h5>
                </a>
              </div>
              <div className="p-5 text-3xl flex items-center">
                <div className="flex flex-col items-center">
                  <FaLeaf className="mb-2 mr-4" />
                  <a>
                    <h6 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      Take/Upload Image
                    </h6>
                  </a>
                </div>
                <IoIosArrowForward className="mr-4" />
                <div className="flex flex-col items-center">
                  <GiMedicinePills className="mb-2 mr-4" />
                  <a>
                    <h6 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      See Diagnosis
                    </h6>
                  </a>
                </div>
                <IoIosArrowForward className="mr-4" />
                <div className="flex flex-col items-center">
                  <LiaPrescriptionBottleSolid className="mb-2 mr-4" />
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
          <animated.div
            className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-ss-lg md:border-e dark:bg-gray-800 dark:border-gray-700"
            style={{ borderColor: '#39B68D', ...fadeIn }}>
            <div className="p-10">
              <a>
                <h5 className="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Take a picture
                </h5>
              </a>
              {/* <FaCamera
                className="text-5xl text-gray-900 dark:text-white mr-6 cursor-pointer hover:text-blue-600"
                onClick={onUploadImage}
              /> */}
               <CameraModal/>
            </div>
          </animated.div>

          {/* Take an image */}
          <animated.div
            className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-ss-lg md:border-e dark:bg-gray-800 dark:border-gray-700"
            style={{ borderColor: '#39B68D', ...fadeIn }}>
            <div className="p-10">
              <a>
                <h5 className="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Upload an Image
                </h5>

              </a>
               {/* <IoCloudUpload/>  */}
              <UploadImageModal/>
            
            </div>
           
          </animated.div>
        </animated.div>
      </div>
    </>
  );
};

export default Home;
