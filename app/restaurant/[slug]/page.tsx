import React from 'react';
import RestaurantNavbar from './components/RestaurantNavbar';
import Title from './components/Title';
import Rating from './components/Rating';
import Description from './components/Description';
import Images from './components/Images';
import Reviews from './components/Reviews';
import ReservationCard from './components/ReservationCard';
import { metadata } from '@/app/layout';

metadata.title = 'Booking Table Restaurant';

function RestaurantDetail() {
  return (
    <>
      <div className='bg-white w-[70%] rounded p-3 shadow'>
        <RestaurantNavbar />
        <Title />
        <Rating />
        <Description />
        <Images />
        <Reviews />
      </div>
    </>
  );
}

export default RestaurantDetail;
