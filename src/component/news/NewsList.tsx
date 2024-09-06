import React from 'react';
import Link from 'next/link';

interface Latest {
  id: string;
  img3: string;
  title: string;
  short_des: string;
}

interface NewsListProps {
  latest: Latest[];
}

const NewsList: React.FC<NewsListProps> = ({ latest }) => {
  return (
    <div className="flex flex-wrap -m-2">
      {latest.map((item) => (
        <div key={item.id} className="p-2 md:w-1/3">
          <div className="bg-white shadow-sm rounded overflow-hidden">
            <img className="w-full h-auto" src={item.img3} alt="News Image" />
            <div className="p-4">
              <h6 className="font-1xl font-semibold">{item.title}</h6>
              <p className="text-sm text-gray-700">{item.short_des}</p>
              <p className="my-2 font-bold flex items-center">
                <i className="bi bi-clock mr-2"></i> 3 Days Ago
              </p>
              <Link href={`/details?id=${item.id}`} className="mt-2 inline-block text-sm text-red-500 border border-red-500 px-4 py-2 rounded-full hover:bg-red-500 hover:text-white transition duration-300">Read More</Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsList;
