import React from 'react';
import parse from 'html-react-parser';

interface Latest {
  id: string;
  img1: string;
  title: string;
  long_des: string;
}

interface NewsDetailsProps {
  details: Latest;
}

const NewsDetails: React.FC<NewsDetailsProps> = ({ details }) => {
  const content = parse(details?.long_des)

  return (
    <div className="container">
      <h4 className="my-3 text-xl font-bold">{details?.title}</h4>
      <hr />
      <div className="grid grid-cols-12 gap-4">
        <div className="md:col-span-3 lg:col-span-12">
          <img src={details?.img1} alt={details?.title} className="w-full" />
          {content}
        </div>
      </div>
    </div>
  );
};

export default NewsDetails;
