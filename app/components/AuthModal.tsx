'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useContext, useEffect, useState } from 'react';
import AuthModalInput from './AuthModalInput';
import useAuth from '@/hooks/useAuth';
import { AuthenticationContext } from '../context/AuthContext';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px'
};

export default function AuthModal({ isSignIn }: { isSignIn: boolean }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [disabled, setDisabled] = useState(true);
  const [inputs, setInputs] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    city: '',
    password: ''
  });
  const { signin } = useAuth();
  const { loading, data, error } = useContext(AuthenticationContext);

  useEffect(() => {
    if (isSignIn) {
      if (inputs.email && inputs.password) {
        return setDisabled(false);
      }
    } else {
      if (
        inputs.firstname &&
        inputs.lastname &&
        inputs.email &&
        inputs.city &&
        inputs.phone &&
        inputs.password
      ) {
        return setDisabled(false);
      }
    }
    setDisabled(true);
  }, [inputs]);

  const handleClick = () => {
    if (isSignIn) {
      signin({ email: inputs.email, password: inputs.password });
    }
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <button
        onClick={handleOpen}
        className={`${
          isSignIn ? 'bg-blue-400 text-white' : ''
        } border p-1 px-4 rounded mr-3`}
      >
        {isSignIn ? 'Sign In' : 'Sign Up'}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className='p-2'>
              <div className='uppercase font-bold text-center pb-2 border-b mb-2'>
                <p className='text-sm'>{isSignIn ? 'Sign In' : 'Create Account'}</p>
              </div>
              <div className='m-auto'>
                <h2 className='text-2xl font-light text-center'>
                  {isSignIn
                    ? 'Log Into Your Account'
                    : 'Create Your BookingTable Account'}
                </h2>
                <AuthModalInput
                  inputs={inputs}
                  handleInputChange={handleChangeInput}
                  isSignIn={isSignIn}
                />
                <button
                  className='uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400'
                  disabled={disabled}
                  onClick={handleClick}
                >
                  {isSignIn ? 'Sign In' : 'Create Super'}
                </button>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
