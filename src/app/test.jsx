'use client'
import Navbar from "@/components/Navbar";
import Search from "@/components/Search";
import { payloadContext } from "@/contexts/PayLoadContext";
import { playingContext } from "@/contexts/PlayingContext";
import { useContext } from "react";

export default function Home() {

    const { payloadData } = useContext(payloadContext)
    const { playingData } = useContext(playingContext)

    return (
        <section className="overflow-auto h-screen w-full bg-[#121212] flex flex-col px-3">
            <Navbar />
            {payloadData.filter === '' ? (
                <div style={{ height: playingData.playing ? '73%' : '85%', transition: '0.5s' }} className="ml-[6%] bg-[#1b1b1b] overflow-y-auto w-[94%] h-[85%] rounded-lg px-[1.5rem] py-[1rem]">

                </div>
            ) : (
                <Search />
            )}
        </section>
    );
}