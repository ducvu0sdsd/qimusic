import { playingContext } from '@/contexts/PlayingContext'
import React, { useContext, useEffect, useState } from 'react'

const Queue = () => {

    const [height, setHeight] = useState(0)
    const [width, setWidth] = useState(0)
    const [album, setAlbum] = useState()
    const { playingData, playingHandler } = useContext(playingContext)

    useEffect(() => {
        if (playingData.album) {
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
            <span className='font-poppins text-[#afafaf] text-[20px] font-semibold absolute left-2 top-2'>Waiting List</span>
            {album ? (
                <div className='flex flex-col gap-2 h-[93%] w-[100%]'>

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