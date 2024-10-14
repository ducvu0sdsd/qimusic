'use client'

import Albums from "@/components/home/Albums";
import Navbar from "@/components/Navbar";
import Search from "@/components/Search";
import { payloadContext } from "@/contexts/PayLoadContext";
import { playingContext } from "@/contexts/PlayingContext";
import { userContext } from "@/contexts/UserContext";
import { useContext, useEffect, useState } from "react";

export default function Home() {

  const { payloadData } = useContext(payloadContext)
  const { playingData } = useContext(playingContext)
  const [height, setHeight] = useState(0)
  const [width, setWidth] = useState(0)
  const { userData } = useContext(userContext)

  useEffect(() => {
    const updateSize = () => {
      const newHeight = window.innerHeight - 50 - 40;
      const newWidth = window.innerWidth - 24;
      setWidth(newWidth)
      setHeight(newHeight);
    };

    updateSize(); // Set initial height

    window.addEventListener('resize', updateSize); // Listen for window resize
    return () => window.removeEventListener('resize', updateSize); // Cleanup on unmount
  }, []);

  return (
    <section className="overflow-auto h-screen w-full bg-[#121212] flex flex-col px-3">
      <Navbar />
      {payloadData.filter === '' ? (
        <div style={{ height: playingData.playing ? `${height - 70}px` : `${height}px`, transition: '0.5s', width: userData.user ? `${width - 70}px` : `${width}px`, marginLeft: userData.user ? '70px' : 0 }} className="ml-[6%] bg-[#1b1b1b] overflow-y-auto w-[94%] h-full rounded-lg px-[1.5rem] py-[1rem]">
          <Albums type={'citypop'} name={'City Pop'} />
          <Albums type={'kdrama'} name={'KDrama'} />
          <Albums type={'kpop'} name={'KPOP'} />
          <Albums type={'vpop'} name={'VPOP'} />
          <Albums type={'usuk'} name={'US UK'} />
        </div>
      ) : (
        <Search />
      )}
    </section>
  );
}