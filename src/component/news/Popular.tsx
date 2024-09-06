import React from 'react'
import Subscribe from '../mastter/Subscribe';
import Link from 'next/link';

interface Popular {
  id: string;
  img4: string;
  title: string;
  short_des: string;
}

interface PopularProps {
  popular: Popular[];
}

const Popular: React.FC<PopularProps> = ({ popular }) => {
  return (
    <div className="space-y-4">
      {/* Popular Section */}
      <div className="bg-gray-800 mt-2 rounded-md text-white p-2">
        <span className="p-1">POPULAR</span>
      </div>
      {popular.map((item) => (
        <div key={item.id} className="py-1 px-0">
          <Link href={`/details?id=${item.id}`} className="block">
            <div className="bg-white shadow-sm rounded-md overflow-hidden flex">
              <div className="w-full md:w-1/3">
                <img className="w-full h-full object-cover" src={item.img4} alt="News Image" />
              </div>
              <div className="w-full md:w-2/3 p-3">
                <h6 className=" text-sm">{item.title}</h6>
              </div>
            </div>
          </Link>
        </div>
      ))}

      {/* Subscribe Section */}
      <div className="bg-gray-800 mt-2 rounded-md text-white p-2">
        <span className="p-1">SUBSCRIBE</span>
      </div>
      <div className="py-1 px-0">
        <Subscribe />
      </div>
    </div>
  )
}

export default Popular;
