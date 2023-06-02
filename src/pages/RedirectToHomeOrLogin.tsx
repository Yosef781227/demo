import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { Spinner } from "@chakra-ui/react";
import { BASE_URL } from '@/constants';

const RedirectToHomeOrLogin = () => {
  const [loading, setLoading] = useState(true);
  const [hasInstagram, setHasInstagram] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          BASE_URL,
          {
            query: `
              mutation Mutation($jsonInput: String!) {
                signWithGoogle(json_input: $jsonInput) {
                  success
                  message
                  me {
                    id
                    has_instagram
                    has_tiktok
                  }
                }
              }
            `,
          },
          {
            withCredentials: true,
          }
        );

        console.log('API response:', response.data);

        if (response.data.data.signWithGoogle.me.has_instagram) {
          console.log('User has Instagram');
          setHasInstagram(true);
        } else {
          console.log('User does not have Instagram');
        }
      } catch (error) {
        console.error('API request failed:', error);
      } finally {
        console.log('Finished API request');
        setLoading(false);
      }
    };

    console.log('Starting API request');
    fetchData();
  }, []);

  console.log('Rendering RedirectToHomeOrLogin:', { loading, hasInstagram });

  if (loading) {
    return <Spinner />;
  }

  return hasInstagram ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />;
};

export default RedirectToHomeOrLogin;
