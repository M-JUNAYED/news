"use client";
import React, { useState } from 'react';
import { Carousel } from "react-bootstrap";
import Link from "next/link";

interface SliderItem {
  id: string;
  img1: string;
  title: string;
  short_des: string;
}

interface FeaturedItem {
  id: string;
  img2: string;
  title: string;
  short_des: string;
}

interface HeroProps {
  slider: SliderItem[];
  featured: FeaturedItem[];
}

const Hero: React.FC<HeroProps> = ({ slider, featured }) => {
  const [index, setIndex] = useState<number>(0);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="container mx-auto py-4">
      <div className="flex flex-wrap">
        <div className="w-full md:w-2/3 p-1">
          <Carousel id="carouselHero" activeIndex={index} onSelect={handleSelect} controls={false}>
            {slider.map((item, i) => (
              <Carousel.Item key={i}>
                <Link href={`/details?id=${item.id}`}>
                  <img alt="img" className="w-full" src={item.img1} />
                  <Carousel.Caption className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 rounded text-left">
                    <h4 className="text-white">{item.title}</h4>
                    <p className="text-white">{item.short_des}</p>
                  </Carousel.Caption>
                </Link>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
        <div className="w-full md:w-1/3 p-1">
          <Link href={`/details?id=${featured[0].id}`} className="block h-full">
            <div className="relative h-full">
              <img
                alt=""
                className="w-full h-full object-cover rounded-2xl"
                src={featured[0].img2}
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black via-transparent to-transparent rounded-2xl p-4">
                <div>
                  <h4 className="text-white">{featured[0].title}</h4>
                  <p className="text-white">{featured[0].short_des}</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
