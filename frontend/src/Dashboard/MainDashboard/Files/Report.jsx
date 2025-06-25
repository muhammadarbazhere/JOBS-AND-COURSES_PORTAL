import React from 'react';
import { Card, CardContent, Tabs, Tab } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
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
    <div className='w-2/4 sm:w-[71%]'>
      <div className="flex flex-col p-4 font-[Chivo] bg-white shadow-md rounded-md">
        <div className="pb-2">
          <h2 className="font-semibold text-base sm:text-xl text-gray-700">Recent Reports</h2>
        </div>

        <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary">
          <Tab label="Courses" />
          <Tab label="Jobs" />
          <Tab label="Internships" />
        </Tabs>

        <Slider {...settings}>
          {value === 0 && (
            <div>
              <Card>
                <CardContent>
                  <LineChart width={500} height={300} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="courses" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </LineChart>
                </CardContent>
              </Card>
            </div>
          )}

          {value === 1 && (
            <div>
              <Card>
                <CardContent>
                  <LineChart width={500} height={300} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="jobs" stroke="#82ca9d" activeDot={{ r: 8 }} />
                  </LineChart>
                </CardContent>
              </Card>
            </div>
          )}

          {value === 2 && (
            <div>
              <Card>
                <CardContent>
                  <LineChart width={500} height={300} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="internships" stroke="#ffc658" activeDot={{ r: 8 }} />
                  </LineChart>
                </CardContent>
              </Card>
            </div>
          )}
        </Slider>
      </div>
    </div>
  );
};

export default Report;

