import React from "react";
import { cn } from "@/lib/utils";
import { Kumbh_Sans } from "next/font/google";
import Image from "next/image";
import ResourceExplorer from "./ResourceCompo";

const kumbh = Kumbh_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const Hero: React.FC = () => {
  return (
    <div>
      <main className="container mx-auto px-4 flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 pt-8 md:pt-[100px] md:border-r">
          <p className={cn(`text-xl md:text-2xl text-[#666666] pb-4 md:pb-[30px]`, kumbh.className)}>
            Your Journey to Tomorrow Begins Here
          </p>
          <h1 className={cn(`text-3xl md:text-5xl tracking-wider font-semibold pb-2 md:pb-4`, kumbh.className)}>
            Explore the Frontiers of
          </h1>
          <h1 className={cn(`text-3xl md:text-5xl tracking-wider font-semibold pb-2 md:pb-4`, kumbh.className)}>
            Artificial Intelligence
          </h1>
          <p className={`pb-6 md:pb-8 text-[#7E7E81]`}>
            Welcome to the epicenter of AI innovation. FutureTech AI News is
            your passport to a world where machines think, learn, and reshape
            the future. Join us on this visionary expedition into the heart of
            AI.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 ">
            {[
              { title: "300+", subtitle: "Resources available" },
              { title: "12k+", subtitle: "Total Downloads" },
              { title: "10k+", subtitle: "Active Users" },
            ].map((item, index) => (
              <div key={index} className="border py-6 px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold">
                  {item.title.replace('+', '')}<span className="text-[#0841ae]">+</span>
                </h2>
                <p className="mt-2 text-[#98989A] text-sm">{item.subtitle}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full md:w-1/2 mt-8 md:mt-0 border-b">
          <ResourceExplorer />
        </div>
      </main>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 container mx-auto px-4">
        {[
          { icon: "/icon/fuddi.png", title: "Latest News Updates", subtitle: "Stay Current", description: "Over 1,000 articles published monthly" },
          { icon: "/icon/chakri.png", title: "Expert Contributors", subtitle: "Trusted Insights", description: "50+ renowned AI experts on our team" },
          { icon: "/icon/patti.png", title: "Global Readership", subtitle: "Worldwide Impact", description: "2 million monthly readers" },
        ].map((item, index) => (
          <div key={index} className="py-6 md:py-[30px] px-4 md:px-[60px] flex flex-col border-b border-r last:border-r-0 first:border-l">
            <Image src={item.icon} alt="" width={40} height={40} />
            <div className="flex flex-row pt-4 md:pt-[30px] justify-between items-center">
              <div className="flex flex-col">
                <h1 className="text-md font-medium">{item.title}</h1>
                <p className="pt-1 text-[#7E7E81]">{item.subtitle}</p>
              </div>
              <Image src="/icon/arrow.png" alt="" width={30} height={30} />
            </div>
            <p className="text-[#98989A] text-sm md:text-md pt-4 md:pt-[30px]">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;