import Image from "next/image";
import Head from "next/head";
import UserSession from '@/components/common/UserSession';

import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import Hero from "@/components/home/Hero";
import Steps from "@/components/home/Steps";
import OurWorking from "@/components/home/OurWorking";
import Brands from "@/components/home/Brands";
import Counter from "@/components/home/Counter";
import FeaturedInstructors from "@/components/home/FeaturedInstructors";
import SuccessStories from "@/components/home/SuccessStories";
import Categories from "@/components/home/Categories";


export default function Home() {


  return (
    <main>
      <UserSession />
<Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600&family=Outfit:wght@400;500;600;700&family=Gochi+Hand&display=swap"
          rel="stylesheet"
        />
      </Head> 
    {/* <Header /> */}
    <Hero />
    <main className="tu-main">
      <Steps />
      <OurWorking />
      <Brands />
      <Counter />
      <FeaturedInstructors />
      <SuccessStories />
      <Categories />
    </main>
    {/* <Footer /> */}
    </main>
  );
}
