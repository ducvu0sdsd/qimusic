import { payloadContext } from '@/contexts/PayLoadContext'
import { spotifyContext } from '@/contexts/SpotifyContext';
import { api, TypeHTTP } from '@/utils/api';
import axios from 'axios'
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'
import ReactAudioPlayer from 'react-audio-player';

const Search = () => {
    const router = useRouter()
    const { payloadData, payloadHandler } = useContext(payloadContext)
    const { spotifyData } = useContext(spotifyContext)
    const [typeTarget, setTypeTarget] = useState('All')
    const types = ['All', 'Songs', 'Artists', 'Albums', 'Playlists']

    // data
    const [album, setAlbum] = useState()

    useEffect(() => {
        if (spotifyData.accessToken) {
            const getParameters = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + spotifyData.accessToken,
                },
            };
            axios(`https://api.spotify.com/v1/search?q=${payloadData.filter}&type=${typeTarget.slice(0, typeTarget.length - 1).toLowerCase()}`, getParameters)
                .then(res => {
                    setAlbum(res.data.albums)
                })
        }
    }, [payloadData.filter])

    const handleNavigate = () => {
        payloadHandler.setFilter('')
        router.push(`/albums/${item.id}`)
    }

    return (
        <div className="ml-[6%] bg-[#1b1b1b] w-[94%] flex flex-col h-[85%] rounded-lg p-2 ">
            <div className='flex w-full gap-2 mb-4'>
                {types.map((type, index) => (
                    <button onClick={() => setTypeTarget(type)} style={{ transition: '0.5s', color: typeTarget === type ? 'black' : 'white', backgroundColor: typeTarget !== type ? '#2c2c2c' : 'white' }} className='bg-[#2c2c2c] px-3 rounded-2xl text-[14px] py-1 text-[white] font-poppins' key={index}>{type}</button>
                ))}
            </div>
            <div className='overflow-y-auto w-full'>
                <div className='grid grid-cols-7 gap-4 w-full'>
                    {album && album.items.map((item, index) => {
                        return <div onClick={() => handleNavigate()} key={index} className='cursor-pointer flex flex-col gap-2 w-[150px] overflow-hidden'>
                            <img src={item.images[0].url} className='h-[150px] aspect-square rounded-md ' />
                            <span className="text-[#ffffffb6] font-poppins font-normal text-[13px]">
                                {item.name.length > 35 ? item.name.substring(0, 35) + '...' : item.name}
                            </span>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default Search