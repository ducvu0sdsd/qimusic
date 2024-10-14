'use client'
import React from 'react'
import { useParams } from "next/navigation";
import { useContext, useEffect, useState, useRef } from "react";
import { spotifyContext } from '@/contexts/SpotifyContext';
import axios from 'axios';
import { playingContext } from '@/contexts/PlayingContext';
import Navbar from '@/components/Navbar';
import Search from '@/components/Search';
import { convertMsToMinutesSeconds } from '@/utils/time';
import { payloadContext } from '@/contexts/PayLoadContext';
import { formatNumber } from '@/utils/other';
import { userContext } from '@/contexts/UserContext';

const Artists = () => {

    const param = useParams();
    const { id } = param;
    const { spotifyData } = useContext(spotifyContext)
    const [artist, setArtist] = useState()
    const { payloadData } = useContext(payloadContext)
    const { playingData, playingHandler } = useContext(playingContext)
    const wrapperRef = useRef()
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

    useEffect(() => {
        if (spotifyData.accessToken) {
            const getParameters = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + spotifyData.accessToken,
                },
            };
            axios(`https://api.spotify.com/v1/artists/${id}`, getParameters)
                .then(res => {
                    setArtist(res.data)
                })
        }

    }, [id, spotifyData.accessToken])

    return (
        <section className="overflow-auto h-screen w-full bg-[#121212] flex flex-col px-3">
            <Navbar />
            {(payloadData.filter === '' && artist) ? (
                <div ref={wrapperRef} style={{ height: playingData.playing ? `${height - 70}px` : `${height}px`, transition: '0.5s', width: userData.user ? `${width - 70 - (playingData.visibleQueue ? 355 : 0)}px` : `${width - (playingData.visibleQueue ? 355 : 0)}px`, marginLeft: userData.user ? '70px' : 0 }} className="ml-[6%] flex flex-col bg-[#1b1b1b] overflow-y-auto w-[94%] rounded-lg px-[1.5rem] py-[1rem]">
                    <div className='flex items-center w-full gap-6 relative'>
                        <img src={artist.images[0].url} className='w-[15%] rounded-full aspect-square' />
                        <div className='flex flex-col gap-2 text-[white]'>
                            <span className='font-medium font-poppins'>Artists</span>
                            <span className='font-poppins text-[45px] leading-[50px] font-semibold'>{artist.name}</span>
                            <span className='flex items-center font-poppins text-[14px] text-[#b9b9b9]'>{formatNumber(artist.followers.total)} Followers</span>
                        </div>
                        <button className='bx bx-play absolute right-[3.5rem] hover:scale-[1.1] transition-all text-[40px] text-[white] bg-[#00a1ff] p-2 rounded-full'></button>
                    </div>
                    <div className='flex flex-col w-full mt-[2rem] px-[1.5rem]'>
                        <div className='flex border-b-[1px] mb-2 border-b-[#424242] text-[15px] items-center font-poppins text-[#d5d5d5] pb-2'>
                            <div className='w-[3%]'>#</div>
                            <div className='w-[90%]'>Title</div>
                            <i className='bx bx-time-five w-[7%] text-[22px]'></i>
                        </div>
                        {/* {album.tracks.items.map((item, index) => (
                            <div key={index} onClick={() => handleChooseAlbum(item)} className='cursor-pointer my-2 font-poppins text-[white] flex items-center w-full'>
                                <div className='w-[3%] text-[14px] text-[#bababa]'>{index + 1}</div>
                                <div className='w-[90%] flex flex-col'>
                                    <span className='text-[15px]'>{item.name}</span>
                                    <span className='text-[13px] text-[#bababa]'>{item.artists.map(item => item.name).join(', ')}</span>
                                </div>
                                <span className='w-[7%] text-[14px] text-[#bababa]'>
                                    {convertMsToMinutesSeconds(item.duration_ms)}
                                </span>
                            </div>
                        ))} */}
                    </div>
                </div>
            ) : (
                <Search />
            )}
        </section>
    )
}

export default Artists