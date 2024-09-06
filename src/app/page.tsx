import PlainLayout from "@/component/mastter/PlainLayout";
import Hero from "@/component/news/Hero";
import NewsList from "@/component/news/NewsList";
import Popular from "@/component/news/Popular";

async function getData() {
  let Slider: any = (await (await fetch(`${process.env.HOST}/api/news/type?type=Slider`)).json())['data'];
  let Featured: any = (await (await fetch(`${process.env.HOST}/api/news/type?type=Featured`)).json())['data'];
  let Popular: any = (await (await fetch(`${process.env.HOST}/api/news/type?type=Popular`)).json())['data'];
  let Latest: any = (await (await fetch(`${process.env.HOST}/api/news/latest`)).json())['data'];
  return { Slider, Featured, Popular, Latest };
}

export default async function Home() {
  const data = await getData();
  return (
    <PlainLayout>
      <Hero slider={data.Slider} featured={data.Featured} />
      <div className="container mt-4">
        <h4 className="text-2xl font-bold">Latest</h4>
        <hr />
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-9 lg:col-span-9 px-3">
            <NewsList latest={data.Latest} />
          </div>
          <div className="col-span-12 md:col-span-3 lg:col-span-3 px-3">
            <Popular popular={data.Popular} />
          </div>
        </div>
      </div>
    </PlainLayout>
  );
}
