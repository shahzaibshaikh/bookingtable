import { PRICE } from '@prisma/client';
import React from 'react';

interface Props {
  price: PRICE;
}

function Price({ price }: Props) {
  const renderPrice = () => {
    if (price === PRICE.CHEAP) {
      return (
        <>
          <span>$$</span>
          <span className='text-gray-400'>$$</span>
        </>
      );
    } else if (price === PRICE.REGULAR) {
      return (
        <>
          <span>$$$</span>
          <span className='text-gray-400'>$</span>
        </>
      );
    } else {
      return (
        <>
          <span>$$$$</span>
        </>
      );
    }
  };

  return <p className='mr-3 flex'>{renderPrice()}</p>;
}

export default Price;
