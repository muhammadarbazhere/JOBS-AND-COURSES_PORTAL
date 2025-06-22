import React from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { scaleQuantize } from 'd3-scale';

const MapComponent = () => {
  const geoUrl = "https://rapidapi.com/alexanderxbx/api/maps-data"; // Update with your GeoJSON URL

  // Sample data for demonstration
  const countriesData = [
    { name: 'Country A', value: 100 },
    { name: 'Country B', value: 200 },
    // Add more country data as needed
  ];

  const colorScale = scaleQuantize()
    .domain([0, 100])
    .range([
      "#f7fbff",
      "#deebf7",
      "#c6dbef",
      "#9ecae1",
      "#6baed6",
      "#4292c6",
      "#2171b5",
      "#08519c",
      "#08306b"
    ]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-gray-200 p-4 rounded-lg shadow-lg mb-6">
        <ComposableMap projectionConfig={{ scale: 147 }} className="rounded-lg">
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={colorScale(Math.random() * 100)} // Random data for demonstration
                />
              ))
            }
          </Geographies>
        </ComposableMap>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-md">
        <h2 className="text-lg font-semibold">Statistics</h2>
        <ul className="mt-4">
          {/* Render country statistics dynamically */}
          {countriesData.map(country => (
            <li key={country.name} className="flex justify-between">
              <span>{country.name}</span>
              <span>{country.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MapComponent;
