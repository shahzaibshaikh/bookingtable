import React from 'react';
import Header from './components/Header';
import SearchSidebar from './components/SearchSidebar';
import RestaurantCard from './components/RestaurantCard';
import { metadata } from '../layout';
import { PrismaClient } from '@prisma/client';

metadata.title = 'Booking Table Search';

const prisma = new PrismaClient();

const fetchRestaurantsByCity = async () => {};

function Search({ searchParams }: { searchParams: { city: string } }) {
  return (
    <>
      <Header />
      <div className='flex py-4 m-auto w-2/3 justify-between items-start'>
        <SearchSidebar />
        <div className='w-5/6'>
          <RestaurantCard />
        </div>
      </div>
    </>
  );
}

export default Search;
