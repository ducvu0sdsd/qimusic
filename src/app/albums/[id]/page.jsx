'use client'
import Navbar from "@/components/Navbar";
import Search from "@/components/Search";
import { payloadContext } from "@/contexts/PayLoadContext";
import { playingContext, typePlayer } from "@/contexts/PlayingContext";
import { spotifyContext } from "@/contexts/SpotifyContext";
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
        playingHandler.setAlbum(album)
        playingHandler.setTrack(track)
        playingHandler.setType(typePlayer.album)
    }

    return (
        <section className="overflow-auto h-screen w-full bg-[#121212] flex flex-col px-3">
            <Navbar />
            {(payloadData.filter === '' && album) ? (
                <div ref={wrapperRef} style={{ height: playingData.playing ? `${wrapperRef.current.offsetHeight - 70}px` : '85%', transition: '0.5s' }} className="ml-[6%] flex flex-col bg-[#1b1b1b] overflow-y-auto w-[94%] rounded-lg px-[1.5rem] py-[1rem]">
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
                                <div className='w-[3%] text-[14px] text-[#bababa]'>{index + 1}</div>
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