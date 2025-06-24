import React, { useEffect, useState } from 'react';

const Internships = () => {
    const [internships, setInternships] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchInternships();
    }, []);

    const fetchInternships = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/route/jobs-internships/getAllJobs`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            const filteredInternships = data.filter(item => item.jobOrInternship === 'internship');
            setInternships(filteredInternships);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
      };

    return (
        <div className="font-[Chivo] h-full w-full overflow-hidden">
            {loading && (
                <div className="flex items-center justify-center mt-10">
                    <div className="w-6 h-6 mr-3 border-t-2 border-b-2 border-gray-500 rounded-full animate-spin"></div>
                    <p className="text-secondary">Loading...</p>
                </div>
            )}
            {error && (
                <p className="text-center text-red-500 mt-3">
                    <span className="font-bold">Error:</span> {error}
                </p>
            )}
            {!loading && !error && internships.length === 0 && (
                <p className="text-center mt-3">No internships available.</p>
            )}
            {!loading && !error && internships.length > 0 && (
                <>
                    <table className="w-full md:min-w-full rounded-lg">
                        <thead>
                            <tr>
                                <th className='hidden'></th>
                                <th className="text-left lg:px-2 px-1 py-4 text-xs sm:text-base text-gray-700">
                                    <span className='block sm:hidden'>TITLE</span>
                                    <span className='hidden sm:block'>INTERNSHIP TITLE</span>
                                </th>
                                <th className="text-left lg:px-2 px-2 py-4 text-xs sm:text-base text-gray-700">DESCRIPTION</th>
                                <th className="text-left lg:px-2 px-1 py-4 text-xs sm:text-base text-gray-700">
                                    <span className='block sm:hidden'>ISSUE</span>
                                    <span className='hidden sm:block'>ISSUE DATE</span>
                                </th>
                                <th className="text-left lg:px-2 px-1 py-4 text-xs sm:text-base text-gray-700">
                                    <span className='block sm:hidden'>STATUS</span>
                                    <span className='hidden sm:block'>INTERNSHIP STATUS</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className='bg-white'>
                            {internships.map((item, id) => (
                                <React.Fragment key={id}>
                                    <tr>
                                        <td className='px-4 hidden'>
                                            <input type="checkbox" />
                                        </td>
                                        <td className="text-left text-gray-500 lg:px-8 px-1 py-4 text-sm sm:text-base">{item.title}</td>
                                        <td className="text-left text-gray-500 lg:px-8 px-1 py-4 w-64 md:w-96 text-sm sm:text-base">{item.description}</td>
                                        <td className="text-left text-gray-500 lg:px-8 px-1 py-4 sm:w-28 md:w-48 text-sm sm:text-base">{formatDate(item.createdAt)}</td>
                                        <td className="text-left text-green-500 lg:px-8 px-1 py-4 text-sm sm:text-base">{item.status}</td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default Internships;
