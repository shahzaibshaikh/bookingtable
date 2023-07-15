import { AuthenticationContext } from '@/app/context/AuthContext';
import axios from 'axios';
import { getCookie, setCookie } from 'cookies-next';
import { useContext } from 'react';

const useAuth = () => {
  const { data, error, loading, setAuthState } = useContext(AuthenticationContext);

  const signin = async (
    { email, password }: { email: string; password: string },
    handleClose: () => void
  ) => {
    setAuthState({
      data: null,
      error: null,
      loading: true
    });
    try {
      const response = await axios.post('http://localhost:3002/api/auth/login', {
        email,
        password
      });
      setAuthState({
        data: response.data,
        error: null,
        loading: false
      });
      setCookie('jwt', response.data.token);
      handleClose();
    } catch (error: any) {
      setAuthState({
        data: null,
        error: error.response.data.error,
        loading: false
      });
    }
  };
  const signup = async (
    {
      email,
      password,
      firstname,
      lastname,
      city,
      phone
    }: {
      email: string;
      password: string;
      firstname: string;
      lastname: string;
      city: string;
      phone: string;
    },
    handleClose: () => void
  ) => {
    setAuthState({
      data: null,
      error: null,
      loading: true
    });
    try {
      const response = await axios.post('http://localhost:3002/api/auth/register', {
        email,
        password,
        firstname,
        lastname,
        city,
        phone
      });
      setAuthState({
        data: response.data,
        error: null,
        loading: false
      });
      setCookie('jwt', response.data.token);
      handleClose();
    } catch (error: any) {
      setAuthState({
        data: null,
        error: error.response.data.error,
        loading: false
      });
    }
  };

  const fetchUser = async () => {
    setAuthState({
      data: null,
      error: null,
      loading: true
    });
    try {
      const jwt = getCookie('jwt');
      if (!jwt) {
        setAuthState({
          data: null,
          error: null,
          loading: false
        });
      }
      const response = await axios.get('http://localhost:3002/api/auth/me', {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });

      axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;

      setAuthState({
        data: response.data,
        error: null,
        loading: false
      });
    } catch (error: any) {
      setAuthState({
        data: null,
        error: error.response.data.error,
        loading: false
      });
    }
  };

  return { signin, signup, fetchUser };
};

export default useAuth;
