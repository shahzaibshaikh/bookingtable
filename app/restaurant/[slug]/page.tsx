import React from 'react';
import RestaurantNavbar from './components/RestaurantNavbar';
import Title from './components/Title';
import Rating from './components/Rating';
import Description from './components/Description';
import Images from './components/Images';
import Reviews from './components/Reviews';
import ReservationCard from './components/ReservationCard';
import { metadata } from '@/app/layout';
import { PrismaClient, Review } from '@prisma/client';
import { notFound } from 'next/navigation';

metadata.title = 'Booking Table Restaurant';

const prisma = new PrismaClient();

interface RestaurantDetail {
  id: number;
  name: string;
  images: string[];
  description: string;
  slug: string;
  reviews: Review[];
}

const fetchRestaurant = async (slug: string) => {
  const restaurant = prisma.restaurant.findUnique({
    where: { slug },
    select: {
      id: true,
      name: true,
      images: true,
      description: true,
      slug: true,
      reviews: true
    }
  });
  if (!restaurant) {
    notFound();
  }

  return restaurant;
};

async function RestaurantDetail({ params }: { params: { slug: string } }) {
  const restaurant = await fetchRestaurant(params.slug);

  return (
    <>
      {restaurant && (
        <>
          <div className='bg-white w-[70%] rounded p-3 shadow'>
            <RestaurantNavbar slug={restaurant?.slug} />
            <Title name={restaurant?.name} />
            <Rating reviews={restaurant.reviews} />
            <Description description={restaurant?.description} />
            <Images images={restaurant.images} />
            <Reviews reviews={restaurant.reviews} />
          </div>
          <div className='w-[27%] relative text-reg'></div>
        </>
      )}
    </>
  );
}

export default RestaurantDetail;
