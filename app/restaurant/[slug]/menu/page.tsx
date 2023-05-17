import React from 'react';
import RestaurantNavbar from '../components/RestaurantNavbar';
import Menu from '../components/Menu';
import { metadata } from '@/app/layout';
import { PrismaClient } from '@prisma/client';

metadata.title = 'Booking Table Menu';

const prisma = new PrismaClient();

const fetchRestaurantMenu = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: { slug },
    select: {
      items: true
    }
  });

  if (!restaurant) {
    throw new Error();
  }

  return restaurant.items;
};

function RestaurantMenu({ params }: { params: { slug: string } }) {
  return (
    <div className='bg-white w-[100%] rounded p-3 shadow'>
      <RestaurantNavbar slug={params?.slug} />
      <Menu />
    </div>
  );
}

export default RestaurantMenu;
