import { AuthenticationContext } from '@/app/context/AuthContext';
import axios from 'axios';
import { useContext } from 'react';

const useAuth = () => {
  const { data, error, loading, setAuthState } = useContext(AuthenticationContext);

  const signin = async ({ email, password }: { email: string; password: string }) => {
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
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const signup = async () => {};

  return { signin, signup };
};

export default useAuth;
