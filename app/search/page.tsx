import React from 'react';
import Header from './components/Header';
import SearchSidebar from './components/SearchSidebar';
import RestaurantCard from './components/RestaurantCard';
import { metadata } from '../layout';
import { PrismaClient } from '@prisma/client';

metadata.title = 'Booking Table Search';

const prisma = new PrismaClient();

const fetchRestaurantsByCity = (city: string | undefined) => {
  const select = {
    id: true,
    name: true,
    main_image: true,
    price: true,
    cuisine: true,
    location: true,
    slug: true
  };

  if (!city) return prisma.restaurant.findMany({ select });
  else {
    return prisma.restaurant.findMany({
      where: {
        location: {
          name: {
            equals: city.toLowerCase()
          }
        }
      },
      select
    });
  }
};

async function Search({ searchParams }: { searchParams: { city: string } }) {
  const restaurants = await fetchRestaurantsByCity(searchParams.city);

  return (
    <>
      <Header />
      <div className='flex py-4 m-auto w-2/3 justify-between items-start'>
        <SearchSidebar />
          {restaurants.length ? <RestaurantCard /> : <p>Sorry, no restaurants found.</p>}
        </div>
      </div>
    </>
  );
}

export default Search;
