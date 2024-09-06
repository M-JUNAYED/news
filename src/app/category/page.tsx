import PlainLayout from '@/component/mastter/PlainLayout';
import React from 'react';
import NewsList from '@/component/news/NewsList';
import Popular from '@/component/news/Popular';

async function getData(id: any) {
  let Popular: any = (await (await fetch(`${process.env.HOST}/api/news/type?type=Popular`)).json())['data'];
  let News: any = (await (await fetch(`${process.env.HOST}/api/news/categories?catId=${id}`)).json())['data'];
  return { Popular, News };
}

interface PageProps {
  searchParams: {
    id: any;
  };
}

const Page: React.FC<PageProps> = async ({ searchParams: { id } }) => {
  const data = await getData(id);

  return (
    <PlainLayout>
      <div className="container mt-4">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-9 lg:col-span-9 px-3">
            <NewsList latest={data.News} />
          </div>
          <div className="col-span-12 md:col-span-3 lg:col-span-3 px-3">
            <Popular popular={data.Popular} />
          </div>
        </div>
      </div>
    </PlainLayout>
  );
};

export default Page;
