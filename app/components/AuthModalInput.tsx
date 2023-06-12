import React from 'react';

function AuthModalInput() {
  return (
    <div>
      <div className='my-3 flex justify-between text-sm'>
        <input
          type='text'
          className='border rounded p-2 py-3 w-[49%]'
          placeholder='First Name'
        />
        <input
          type='text'
          className='border rounded p-2 py-3 w-[49%]'
          placeholder='Last Name'
        />
      </div>
      <div className='my-3 flex justify-between text-sm'>
        <input
          type='email'
          className='border rounded p-2 py-3 w-full'
          placeholder='Email'
        />
      </div>
    </div>
  );
}

export default AuthModalInput;
