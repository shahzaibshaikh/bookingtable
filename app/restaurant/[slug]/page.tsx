import React from 'react';
import RestaurantNavbar from './components/RestaurantNavbar';
import Title from './components/Title';
import Rating from './components/Rating';
import Description from './components/Description';
import Images from './components/Images';
import Reviews from './components/Reviews';
import ReservationCard from './components/ReservationCard';
import { metadata } from '@/app/layout';
import { PrismaClient } from '@prisma/client';

metadata.title = 'Booking Table Restaurant';

const prisma = new PrismaClient();

const fetchRestaurant = async (slug: string) => {
  const restaurant = prisma.restaurant.findUnique({
    where: { slug }
  });
};

async function RestaurantDetail({ params }: { params: { slug: string } }) {
  const restaurant = await fetchRestaurant(params.slug);
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
      <div className='w-[27%] relative text-reg'>
        <ReservationCard />
      </div>
    </>
  );
}

export default RestaurantDetail;
