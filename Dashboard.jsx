import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Dashboard = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 bg-[#6365EF] text-white">
        <h1 className="text-xl font-bold">Education Suggestions</h1>
        <div>
          <button className="bg-white text-[#6365EF] px-4 py-2 rounded">Login</button>
        </div>
      </nav>

      {/* Greeting */}
      <div className="p-8">
        <h2 className="text-2xl font-semibold">Hi, Shashank</h2>
        <p className="text-lg mt-2">What would you like to learn today? Search below.</p>
      </div>

      {/* Alert Carousel */}
      <Carousel showArrows={true} autoPlay infiniteLoop>
        <div><h3>Alert 1</h3></div>
        <div><h3>Alert 2</h3></div>
        <div><h3>Alert 3</h3></div>
        <div><h3>Alert 4</h3></div>
      </Carousel>

      {/* Course Selection Section */}
      <div className="p-8">
        <h3 className="text-xl font-semibold">Select Your Course</h3>
        <div className="flex space-x-4 mt-4">
          {['BCA', 'BBA', 'B.Com', 'MCA', 'MBA'].map(course => (
            <button key={course} className="border border-gray-300 rounded px-4 py-2 hover:bg-[#6365EF] hover:text-white transition">
              {course}
            </button>
          ))}
          <button className="border border-gray-300 rounded px-4 py-2 hover:bg-[#6365EF] hover:text-white transition">
            See All
          </button>
        </div>
      </div>

      {/* Suggested Institutions Section */}
      <div className="p-8">
        <h3 className="text-xl font-semibold">Suggested Institutions</h3>
        <Carousel showThumbs={false} showArrows={true} autoPlay infiniteLoop>
          {[...Array(6)].map((_, index) => (
            <div key={index} className="flex space-x-4">
              {[...Array(6)].map((_, cardIndex) => (
                <div key={cardIndex} className="border border-gray-300 rounded p-4">
                  <h4 className="font-bold">Institution {cardIndex + 1}</h4>
                  <p>Description of the institution.</p>
                </div>
              ))}
            </div>
          ))}
        </Carousel>
        <button className="border border-gray-300 rounded px-4 py-2 hover:bg-[#6365EF] hover:text-white transition mt-4">
          See All
        </button>
      </div>

      {/* Course Materials Section */}
      <div className="p-8">
        <h3 className="text-xl font-semibold">Course Materials</h3>
        <div className="mt-4">
          <button className="border border-gray-300 rounded px-4 py-2 hover:bg-[#6365EF] hover:text-white transition">
            Material 1
          </button>
          <button className="border border-gray-300 rounded px-4 py-2 hover:bg-[#6365EF] hover:text-white transition ml-4">
            Material 2
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
