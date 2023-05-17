import React from 'react';

function Header({ name }: { name: string }) {
  const renderTitle = () => {
    const name_array = name.split('-');
    name_array[name_array.length - 1] = `(${name_array[name_array.length - 1]})`;
    return name_array.join(' ');
  };

  return (
    <div className='h-96 overflow-hidden'>
      <div className='bg-center bg-gradient-to-r from-[#0f1f47] to-[#5f6984] h-full flex justify-center items-center'>
        <h1 className='text-7xl text-white captitalize text-shadow text-center'>
          {renderTitle()}
        </h1>
      </div>
    </div>
  );
}

export default Header;
