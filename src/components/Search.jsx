import { payloadContext } from '@/contexts/PayLoadContext'
import { spotifyContext } from '@/contexts/SpotifyContext';
import { api, TypeHTTP } from '@/utils/api';
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import ReactAudioPlayer from 'react-audio-player';

const Search = () => {

    const { payloadData } = useContext(payloadContext)
    const { spotifyData } = useContext(spotifyContext)
    const [typeTarget, setTypeTarget] = useState('All')
    const types = ['All', 'Songs', 'Artists', 'Albums', 'Playlists']

    useEffect(() => {
        if (spotifyData.accessToken) {
            const getParameters = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + spotifyData.accessToken,
                },
            };
            axios(`https://api.spotify.com/v1/search?q=new+jeans&type=album`, getParameters)
                .then(res => {
                    console.log(res.data)
                    // setAlbum(res.data)
                })
        }
    }, [payloadData.filter])

    return (
        <div className="ml-[6%] bg-[#1b1b1b] w-[94%] flex flex-col h-full rounded-lg p-2 ">
            <div className='flex w-full gap-2'>
                {types.map((type, index) => (
                    <button onClick={() => setTypeTarget(type)} style={{ transition: '0.5s', color: typeTarget === type ? 'black' : 'white', backgroundColor: typeTarget !== type ? '#2c2c2c' : 'white' }} className='bg-[#2c2c2c] px-3 rounded-2xl text-[14px] py-1 text-[white] font-poppins' key={index}>{type}</button>
                ))}
            </div>
        </div>
    )
}

export default Search