import React from 'react';
import fullStar from '../../public/full-star.png';
import emptyStar from '../../public/empty-star.png';
import halfStar from '../../public/half-star.png';
import Image from 'next/image';
import { Review } from '@prisma/client';
import { calculateReviewRatingAverage } from '@/utils/calculateReviewRatingAverage';

function Stars({ reviews }: { reviews: Review[] }) {
  const rating = calculateReviewRatingAverage(reviews);

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const difference = parseFloat((rating - i).toFixed(1));
      if (difference >= 1) stars.push(fullStar);
      else if (difference < 1 && difference > 0) {
        if (difference <= 0.2) stars.push(emptyStar);
        else if (difference > 0.2 && difference <= 0.6) stars.push(halfStar);
        else stars.push(emptyStar);
      } else stars.push(emptyStar);
    }
    return stars.map(star => <Image src={star} alt='' className='w-4 h-4 mr-1' />);
  };

  return <div className='flex items-center'>{renderStars()}</div>;
}

export default Stars;
