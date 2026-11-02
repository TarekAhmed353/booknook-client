"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Button } from "@/components/ui/button";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    tag: "Welcome to BookNook",
    title: "Find your next good read",
    text: "Novels, science, history and picture books, all shared by readers like you. Pick one up and keep it for a few days.",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1600&q=80",
  },
  {
    tag: "Borrowing made easy",
    title: "Borrow a book in one click",
    text: "Open a book, press borrow, and it is yours for a week. Return it from My Borrows when you have turned the last page.",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1600&q=80",
  },
  {
    tag: "Grow the shelves",
    title: "Share the books you love",
    text: "Finished a great book? Add it to BookNook so the next reader can enjoy it too.",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1600&q=80",
  },
];

export function Banner() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pt-6">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        loop
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={{ enabled: false }}
        breakpoints={{ 768: { navigation: { enabled: true } } }}
        className="overflow-hidden rounded-3xl"
        style={
          {
            "--swiper-theme-color": "#fdf8f0",
            "--swiper-navigation-size": "28px",
            "--swiper-pagination-bullet-inactive-color": "#fdf8f0",
            "--swiper-pagination-bullet-inactive-opacity": "0.45",
          } as React.CSSProperties
        }
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.title}>
            <div
              className="dark relative flex h-[440px] items-center bg-background bg-cover bg-center md:h-[520px]"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-linear-to-r from-background/95 via-background/70 to-background/10" />
              <div className="relative max-w-2xl px-6 sm:px-10 md:px-20">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brass">
                  {slide.tag}
                </p>
                <h2 className="mt-3 text-4xl leading-tight font-semibold text-foreground md:text-6xl">
                  {slide.title}
                </h2>
                <p className="mt-4 max-w-lg text-base text-muted-foreground md:text-lg">
                  {slide.text}
                </p>
                <Button asChild size="lg" className="mt-8">
                  <Link href="/books">Browse Books</Link>
                </Button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}