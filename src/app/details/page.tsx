// Page.tsx
import PlainLayout from '@/component/mastter/PlainLayout';
import React from 'react';
import Popular from '@/component/news/Popular';
import NewsDetails from '@/component/news/NewsDetails';
import CommentsList from '@/component/news/Comments-List';

async function getData(id: string) {
  const popularResponse = await fetch(`${process.env.HOST}/api/news/type?type=Popular`);
  const newsResponse = await fetch(`${process.env.HOST}/api/news/details?id=${id}`);
  const Comment = (await (await fetch(`${process.env.HOST}/api/comment/news?postId=${id}`, { cache: 'no-store' })).json()).data;
  const Popular = (await popularResponse.json()).data;
  const News = (await newsResponse.json()).data;

  return { Popular, News, Comment };
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
            <NewsDetails details={data.News} />
            <CommentsList postId={parseInt(id, 10)} data={data.Comment} />
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
