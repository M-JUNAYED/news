import PlainLayout from '@/component/mastter/PlainLayout';
import parse from 'html-react-parser';
import React from 'react';

async function getData() {
  const response = await fetch(`${process.env.HOST}/api/policies?type=policies`);
  const json = await response.json();
  return json.data;
}
interface Policy {
  long_des?: string;
}
const Page: React.FC = async () => {
  const policies: Policy[] = await getData();
  const longDes:any = policies[0]?.long_des;
  return (
    <PlainLayout>
      <div className="container max-w-xl p-6 mx-auto space-y-12 lg:px-8 lg:max-w-7xl">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12">
            {parse(longDes)}
          </div>
        </div>
      </div>
    </PlainLayout>
  );
};

export default Page;
