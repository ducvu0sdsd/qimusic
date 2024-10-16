'use client'
import Navbar from "@/components/Navbar";
import Search from "@/components/Search";
import { payloadContext } from "@/contexts/PayLoadContext";
import { playingContext, typePlayer } from "@/contexts/PlayingContext";
import { spotifyContext } from "@/contexts/SpotifyContext";
import { userContext } from "@/contexts/UserContext";
import { convertMsToMinutesSeconds, convertMsToTime } from "@/utils/time";
import axios from "axios";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState, useRef } from "react";

export default function Albums() {

    const param = useParams();
    const { id } = param;
    const { spotifyData } = useContext(spotifyContext)
    const { payloadData } = useContext(payloadContext)
    const { playingData, playingHandler } = useContext(playingContext)
    const [album, setAlbum] = useState()
    const wrapperRef = useRef()
    const { userData } = useContext(userContext)
    const [height, setHeight] = useState(0)
    const [width, setWidth] = useState(0)

    useEffect(() => {
        if (spotifyData.accessToken) {
            const getParameters = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + spotifyData.accessToken,
                },
            };
            axios(`https://api.spotify.com/v1/albums/${id}`, getParameters)
                .then(res => {
                    setAlbum(res.data)
                })
        }

    }, [id, spotifyData.accessToken])

    const handleChooseAlbum = (track) => {
        playingHandler.setTrack(track)
        playingHandler.setType(typePlayer.album)
    }

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
            {(payloadData.filter === '' && album) ? (
                <div ref={wrapperRef} style={{ height: playingData.playing ? `${height - 70}px` : `${height}px`, transition: '0.5s', width: userData.user ? `${width - 70 - (playingData.visibleQueue ? 355 : 0)}px` : `${width - (playingData.visibleQueue ? 355 : 0)}px`, marginLeft: userData.user ? '70px' : 0 }} className="ml-[6%] flex flex-col bg-[#1b1b1b] overflow-y-auto w-[94%] rounded-lg px-[1.5rem] py-[1rem]">
                    <div className='flex items-center w-full gap-4 relative'>
                        <img src={album.images[0].url} className='w-[16%] rounded-lg aspect-square' />
                        <div className='flex flex-col gap-2 text-[white]'>
                            <span className='font-medium font-poppins'>{album.album_type.slice(0, 1).toUpperCase() + album.album_type.slice(1, album.album_type.length)}</span>
                            <span className='font-poppins text-[45px] leading-[50px] font-semibold'>{album.name}</span>
                            <span className='flex items-center font-poppins text-[14px] text-[#b9b9b9]'>{album.artists.map(item => item.name).join(' - ')}<div className='bg-[#b9b9b9] p-[3px] rounded-full mx-2 translate-y-[1px]' />{album.release_date.split('-')[0]}<div className='bg-[#b9b9b9] p-[3px] rounded-full mx-2 translate-y-[1px]' />{album.total_tracks} songs, {convertMsToTime(album.tracks.items.reduce((total, track) => { return total + track.duration_ms }, 0))}</span>
                        </div>
                        <button className='bx bx-play absolute right-[3.5rem] hover:scale-[1.1] transition-all text-[40px] text-[white] bg-[#00a1ff] p-2 rounded-full'></button>
                    </div>
                    <div className='flex flex-col w-full mt-[2rem] px-[1.5rem]'>
                        <div className='flex border-b-[1px] mb-2 border-b-[#424242] text-[15px] items-center font-poppins text-[#d5d5d5] pb-2'>
                            <div className='w-[3%]'>#</div>
                            <div className='w-[90%]'>Title</div>
                            <i className='bx bx-time-five w-[7%] text-[22px]'></i>
                        </div>
                        {album.tracks.items.map((item, index) => (
                            <div key={index} onClick={() => handleChooseAlbum(item)} className='cursor-pointer my-2 font-poppins text-[white] flex items-center w-full'>
                                {!playingData.track ? (
                                    <div className='w-[3%] text-[14px] text-[#bababa]'>{index + 1}</div>
                                ) :
                                    playingData.track.id === item.id ? (
                                        <div className="flex w-[3%] items-end space-x-1">
                                            <div className="bar w-[2px] bg-[#00a1ff] h-3 animate-bar-1"></div>
                                            <div className="bar w-[2px] bg-[#00a1ff] h-2 animate-bar-2"></div>
                                            <div className="bar w-[2px] bg-[#00a1ff] h-3 animate-bar-3"></div>
                                            <div className="bar w-[2px] bg-[#00a1ff] h-2 animate-bar-4"></div>
                                        </div>

                                    ) : (
                                        <div className='w-[3%] text-[14px] text-[#bababa]'>{index + 1}</div>
                                    )
                                }
                                <div className='w-[90%] flex flex-col'>
                                    <span className='text-[15px]'>{item.name}</span>
                                    <span className='text-[13px] text-[#bababa]'>{item.artists.map(item => item.name).join(', ')}</span>
                                </div>
                                <span className='w-[7%] text-[14px] text-[#bababa]'>
                                    {convertMsToMinutesSeconds(item.duration_ms)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <Search />
            )}
        </section>
    );
}