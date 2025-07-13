import React from 'react';
import { Tabs, Tab } from '@mui/material';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Report = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const data = [
    { month: 'Jan', courses: 10, jobs: 15, internships: 5 },
    { month: 'Feb', courses: 12, jobs: 18, internships: 7 },
    { month: 'Mar', courses: 8, jobs: 20, internships: 10 },
    { month: 'Apr', courses: 15, jobs: 25, internships: 12 },
    { month: 'May', courses: 20, jobs: 30, internships: 15 },
    { month: 'Jun', courses: 25, jobs: 35, internships: 18 },
    { month: 'Jul', courses: 30, jobs: 40, internships: 20 },
    { month: 'Aug', courses: 18, jobs: 28, internships: 13 },
    { month: 'Sep', courses: 22, jobs: 32, internships: 15 },
    { month: 'Oct', courses: 30, jobs: 40, internships: 20 },
    { month: 'Nov', courses: 18, jobs: 28, internships: 13 },
    { month: 'Dec', courses: 22, jobs: 32, internships: 15 },
  ];

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="w-full px-2">
      <div className="flex flex-col font-[Chivo] bg-gray-900/70 backdrop-blur-lg rounded-2xl border border-gray-800 shadow-lg p-4 hover:shadow-blue-500/30 transition-all duration-300">
        <div className="pb-2">
          <h2 className="font-semibold text-lg sm:text-2xl text-gray-200">📊 Dashboard Reports</h2>
        </div>

        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTab-root': { color: '#9CA3AF', fontWeight: 500 },
            '& .Mui-selected': { color: '#38BDF8' },
            '& .MuiTabs-indicator': { backgroundColor: '#38BDF8' },
          }}
        >
          <Tab label="Courses" />
          <Tab label="Jobs" />
          <Tab label="Internships" />
        </Tabs>

        <Slider {...settings} className="mt-4">
          {/* Courses Chart */}
          {value === 0 && (
            <div className="bg-gray-800/80 rounded-xl border border-blue-500/30 shadow-md hover:shadow-blue-500/40 transition-all duration-300">
              <div className="p-3">
                <div className="h-[250px] sm:h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#D1D5DB" />
                      <YAxis stroke="#D1D5DB" />
                      <Tooltip contentStyle={{ backgroundColor: "#1F2937", color: "#F9FAFB", border: '1px solid #3B82F6' }} />
                      <Legend wrapperStyle={{ color: "#F9FAFB" }} />
                      <Line type="monotone" dataKey="courses" stroke="#3B82F6" strokeWidth={2} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* Jobs Chart */}
          {value === 1 && (
            <div className="bg-gray-800/80 rounded-xl border border-green-500/30 shadow-md hover:shadow-green-500/40 transition-all duration-300">
              <div className="p-3">
                <div className="h-[250px] sm:h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#D1D5DB" />
                      <YAxis stroke="#D1D5DB" />
                      <Tooltip contentStyle={{ backgroundColor: "#1F2937", color: "#F9FAFB", border: '1px solid #10B981' }} />
                      <Legend wrapperStyle={{ color: "#F9FAFB" }} />
                      <Line type="monotone" dataKey="jobs" stroke="#10B981" strokeWidth={2} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* Internships Chart */}
          {value === 2 && (
            <div className="bg-gray-800/80 rounded-xl border border-yellow-500/30 shadow-md hover:shadow-yellow-500/40 transition-all duration-300">
              <div className="p-3">
                <div className="h-[250px] sm:h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#D1D5DB" />
                      <YAxis stroke="#D1D5DB" />
                      <Tooltip contentStyle={{ backgroundColor: "#1F2937", color: "#F9FAFB", border: '1px solid #FBBF24' }} />
                      <Legend wrapperStyle={{ color: "#F9FAFB" }} />
                      <Line type="monotone" dataKey="internships" stroke="#FBBF24" strokeWidth={2} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
        </Slider>
      </div>
    </div>
  );
};

export default Report;
