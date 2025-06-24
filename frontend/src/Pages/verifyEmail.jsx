import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/verify-email/${token}`, {
                    method: 'GET',
                    credentials: 'include', // Ensure session cookies are sent with the request
                });

                if (!response.ok) {
                    const errorText = await response.text(); // Get error message from response
                    console.error('Failed to verify email:', errorText);
                    throw new Error('Failed to verify email');
                }

                const data = await response.json();
                console.log('Email verification response:', data); // Log response for debugging

                if (data.message === 'Verification successful') {
                    navigate('/complete-order'); // Redirect to CompleteOrder component
                } else {
                    alert('Verification failed, please try again.');
                }
            } catch (error) {
                console.error('Error verifying email:', error.message);
            }
        };

        verifyEmail();
    }, [token, navigate]);

    return <div>Verifying your email...</div>;
};

export default VerifyEmail;
