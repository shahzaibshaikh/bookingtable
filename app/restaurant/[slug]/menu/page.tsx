import React from 'react';
import RestaurantNavbar from '../components/RestaurantNavbar';
import Menu from '../components/Menu';
import { metadata } from '@/app/layout';

metadata.title = 'Booking Table Menu';

function RestaurantMenu() {
  return (
    <div className='bg-white w-[100%] rounded p-3 shadow'>
      <Menu />
    </div>
  );
}

export default RestaurantMenu;
