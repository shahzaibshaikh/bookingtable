import React from 'react';

interface Props {
  inputs: {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    city: string;
    password: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function AuthModalInput({ inputs, handleInputChange }: Props) {
  return (
    <div>
      <div className='my-3 flex justify-between text-sm'>
        <input
          type='text'
          className='border rounded p-2 py-3 w-[49%]'
          placeholder='First Name'
          name='firstname'
          value={inputs.firstname}
          onChange={handleInputChange}
        />
        <input
          type='text'
          className='border rounded p-2 py-3 w-[49%]'
          placeholder='Last Name'
          name='lastname'
          value={inputs.lastname}
          onChange={handleInputChange}
        />
      </div>
      <div className='my-3 flex justify-between text-sm'>
        <input
          type='email'
          className='border rounded p-2 py-3 w-full'
          placeholder='Email'
          name='email'
          value={inputs.email}
          onChange={handleInputChange}
        />
      </div>
      <div className='my-3 flex justify-between text-sm'>
        <input
          type='text'
          className='border rounded p-2 py-3 w-[49%]'
          placeholder='Phone'
          name='phone'
          value={inputs.phone}
          onChange={handleInputChange}
        />
        <input
          type='text'
          className='border rounded p-2 py-3 w-[49%]'
          placeholder='City'
          name='city'
          value={inputs.city}
          onChange={handleInputChange}
        />
      </div>
      <div className='my-3 flex justify-between text-sm'>
        <input
          type='password'
          className='border rounded p-2 py-3 w-full'
          placeholder='Password'
          name='password'
          value={inputs.password}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}

export default AuthModalInput;
