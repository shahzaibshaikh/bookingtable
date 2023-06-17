import axios from 'axios';

const useAuth = () => {
  const signin = async ({ email, password }: { email: string; password: string }) => {
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
