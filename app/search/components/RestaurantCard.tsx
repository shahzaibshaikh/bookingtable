import { Cuisine, Location, PRICE } from '@prisma/client';
import Link from 'next/link';
import React from 'react';

interface Restaurant {
  id: number;
  name: string;
  main_image: string;
  price: PRICE;
  cuisine: Cuisine;
  location: Location;
  slug: string;
}

function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  return (
    <div className='border-b flex pb-5'>
      <img
        src='https://images.otstatic.com/prod1/49153814/2/medium.jpg'
        alt=''
        className='w-44 rounded'
      />
      <div className='pl-5'>
        <h2 className='text-3xl'>Aiāna Restaurant Collective</h2>
        <div className='flex items-start'>
          <div className='flex mb-2'>*****</div>
          <p className='ml-2 text-sm'>Awesome</p>
        </div>
        <div className='mb-9'>
          <div className='font-light flex text-reg'>
            <p className='mr-4'>$$$</p>
            <p className='mr-4'>Mexican</p>
            <p className='mr-4'>Ottawa</p>
          </div>
        </div>
        <div className='text-red-600'>
          <Link href='/restaurant/milestones-stones'>View more information</Link>
        </div>
      </div>
    </div>
  );
}

export default RestaurantCard;
