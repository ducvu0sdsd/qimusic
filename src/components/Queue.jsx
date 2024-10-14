import { playingContext } from '@/contexts/PlayingContext'
import React, { useContext, useEffect, useState } from 'react'

const Queue = () => {

    const [height, setHeight] = useState(0)
    const [width, setWidth] = useState(0)
    const [album, setAlbum] = useState()
    const { playingData, playingHandler } = useContext(playingContext)

    useEffect(() => {
        if (playingData.album) {
            console.log(album)
            console.log(playingData.album.tracks.items)
            setAlbum(playingData.album)
        }
    }, [playingData.album])

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
        <div style={{ height: playingData.playing ? `${height - 76}px` : `${height}px`, transition: '0.5s', width: playingData.visibleQueue ? `350px` : 0 }} className="bg-[#1b1b1b] flex items-end overflow-hidden rounded-lg fixed right-2 pb-2 top-[74px] z-50">
            <button onClick={() => playingHandler.setVisibleQueue(false)}><i className='bx bx-x absolute right-2 top-2 text-[30px] text-[#5e5e5e]'></i></button>
            <span className='font-poppins text-[#afafaf] text-[20px] font-semibold absolute left-3 top-2'>Waiting List</span>
            {album ? (
                <div className='flex flex-col gap-3 px-[1rem] h-[93%] w-[100%] overflow-auto'>
                    {album.tracks.items.map((item, index) => (
                        <div className='flex items-center gap-2 relative w-full' key={index}>
                            <img src={album.images[0].url} className='w-[45px] rounded-md aspect-square' />
                            <div className='flex flex-col text-[white] font-poppins'>
                                <span className='text-[15px]'>{item.name}</span>
                                <span className='text-[13px] text-[#bababa]'>{item.artists.map(item1 => item1.name).join(', ')}</span>
                            </div>
                            {playingData.track && playingData.track.id === item.id && (
                                <div className="flex absolute right-0 top-[50%] translate-y-[-50%] items-end space-x-1">
                                    <div className="bar w-[2px] bg-[#00a1ff] h-3 animate-bar-1"></div>
                                    <div className="bar w-[2px] bg-[#00a1ff] h-2 animate-bar-2"></div>
                                    <div className="bar w-[2px] bg-[#00a1ff] h-3 animate-bar-3"></div>
                                    <div className="bar w-[2px] bg-[#00a1ff] h-2 animate-bar-4"></div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className='flex flex-col gap-2 h-[93%] w-[100%] justify-center'>
                    <span className='px-[2rem] text-[white] font-poppins text-center'>There are no songs on the current waiting list.</span>
                </div>
            )}
        </div>
    )
}

export default Queue