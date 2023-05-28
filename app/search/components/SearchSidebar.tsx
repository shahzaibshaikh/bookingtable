import { Cuisine, Location } from '@prisma/client';
import Link from 'next/link';
import React from 'react';

function SearchSidebar({
  locations,
  cuisines
}: {
  locations: Location[];
  cuisines: Cuisine[];
}) {
  return (
    <div className='w-1/5'>
      <div className='border-b pb-4 flex flex-col'>
        <h1 className='mb-2'>Region</h1>
        {locations.map(location => (
          <Link
            href={{
              pathname: '/search',
              query: {
                city: location.name
              }
            }}
            key={location.id}
            className='font-light text-reg capitalize'
          >
            {location.name}
          </Link>
        ))}
      </div>
      <div className='border-b pb-4 mt-3 flex flex-col'>
        <h1 className='mb-2'>Cuisine</h1>
        {cuisines.map(cuisine => (
          <Link
            href={{
              pathname: '/search',
              query: {
                cuisine: cuisine.name
              }
            }}
            key={cuisine.id}
            className='font-light text-reg capitalize'
          >
            {cuisine.name}
          </Link>
        ))}
      </div>
      <div className='mt-3 pb-4'>
        <h1 className='mb-2'>Price</h1>
        <div className='flex'>
          <button className='border w-full text-reg font-light rounded-l p-2'>$</button>
          <button className='border-r border-t border-b w-full text-reg font-light p-2'>
            $$
          </button>
          <button className='border-r border-t border-b w-full text-reg font-light p-2 rounded-r'>
            $$$
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchSidebar;
