import React from 'react'
import { useAuth } from '../../contexts/authContext'
import { FaSearch } from "react-icons/fa";
import { FaLeaf } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { GiMedicinePills } from "react-icons/gi";
import { LiaPrescriptionBottleSolid } from "react-icons/lia";
import { IoInformationCircleSharp } from "react-icons/io5";

const Home = () => {
    const { currentUser } = useAuth()


  const onTakePicture = () => {
 console.log("take a picture")
  };
    return (
      <>
   <div className="flex items-center justify-center h-screen">
    {/* Information Hub and Diseases alert */}
    <div className="grid mb-8 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 md:mb-12 md:grid-cols-2 lg:grid-cols-2 md:grid-rows-2 bg-white dark:bg-gray-800">
        <div className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-ss-lg md:border-e dark:bg-gray-800 dark:border-gray-700">
            <div className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                <IoInformationCircleSharp style={{ fontSize: 20 }} />
                <h3 className="text-3xl font-semibold text-gray-900 dark:text-white">Information Hub</h3>
                <p className="my-4 text-2xl">Get to know the diseases and treatments</p>
            </div>
        </div>
        <div className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 md:rounded-se-lg dark:bg-gray-800 dark:border-gray-700">
            <blockquote className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Solid foundation for any project</h3>
                <p className="my-4">Designing with Figma components that can be easily translated to the utility classes of Tailwind CSS is a huge timesaver!"</p>
            </blockquote>
            <figcaption className="flex items-center justify-center ">
                <img className="rounded-full w-9 h-9" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png" alt="profile picture" />
                <div className="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
                    <div>Roberta Casas</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Lead designer at Dropbox</div>
                </div>
            </figcaption>
        </div>

        {/* Take a picture */}
        <div className="max-w-full flex justify-left items-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 md:col-span-3">
            <div className="p-10">
                <a>
                    <h5 className="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Take a picture</h5>
                </a>
                <div className="max-w-2xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-5 text-3xl flex items-center">
                        <FaLeaf className="mr-4" />
                        <IoIosArrowForward className="mr-4" />
                        <GiMedicinePills className="mr-4" />
                        <IoIosArrowForward className="mr-4" />
                        <LiaPrescriptionBottleSolid className="mr-4" />
                    </div>
                </div>

                <button className="inline-flex items-center px-3 py-2 text-2xl font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={onTakePicture}>
                    Take a Picture
                </button>
            </div>
        </div>
    </div>
</div>

 



    
      
   

    </>

    )
}



export default Home