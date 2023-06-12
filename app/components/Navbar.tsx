import Link from 'next/link';
import React from 'react';
import LoginModal from './AuthModal';

function Navbar() {
  return (
    <nav className='bg-white p-2 flex justify-between'>
      <Link href='/' className='font-bold text-gray-700 text-2xl'>
        BookingTable
      </Link>
      <div>
        <div className='flex'>
          <LoginModal isSignIn={true} />
          <LoginModal isSignIn={false} />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
