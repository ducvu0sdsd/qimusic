'use client'
import { playingContext, typePlayer } from '@/contexts/PlayingContext'
import { convertSecondsToTime } from '@/utils/time'
import axios from 'axios'
import React from 'react'
import { useContext, useState, useEffect, useRef } from 'react'
import ReactPlayer from 'react-player'

const googleApiKeys = [
    'AIzaSyBzQIQn0m-ckWIEQEi1HPhrxG9U_ySwdH4',
    'AIzaSyDBJ0uR3jcjnJDB3BOZYW8eJvIkGVFjdlw'
]

const Playing = ({ playing, setPlaying }) => {

    const { playingData, playingHandler } = useContext(playingContext)
    const [track, setTrack] = useState()
    const [urlTracks, setUrlTracks] = useState('')
    const [duration, setDuration] = useState(0)
    const [played, setPlayed] = useState(0)
    const reactPlayerRef = useRef()
    const processRef = useRef()
    const [enablePrev, setEnablePrev] = useState(false)
    const [enableNext, setEnableNext] = useState(false)

    // action
    const [repeat, setRepeat] = useState(false)
    const [playingTrack, setPlayingTrack] = useState(true)

    useEffect(() => {
        if (playingData.track) {
            const query = `${playingData.track.name} - ${playingData.track.artists.map(item => item.name).join(',')} - lyris`
            setTrack(playingData.track)
            axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=${googleApiKeys[0]}`)
                .then(res => {
                    console.log(res.data.items.map(item => `https://www.youtube.com/watch?v=${item.id.videoId}`))
                    setUrlTracks(res.data.items.map(item => `https://www.youtube.com/watch?v=${item.id.videoId}`))
                })
        }
    }, [playingData.track])

    useEffect(() => {
        if (playingData.album && playingData.track && playingData.type === typePlayer.album) {
            if (playingData.track.id === playingData.album.tracks.items[0].id) {
                setEnablePrev(false)
                setEnableNext(true)
            } else if (playingData.track.id === playingData.album.tracks.items[playingData.album.tracks.items.length - 1].id) {
                setEnablePrev(true)
                setEnableNext(false)
            } else {
                setEnablePrev(true)
                setEnableNext(true)
            }
        }
    }, [playingData.album, playingData.type, playingData.track])

    const handleClickProcess = (event) => {
        const x = event.clientX;
        // toa do cua process
        const rect = processRef.current.getBoundingClientRect();
        const percent = (x - rect.x) * 100 / rect.width
        reactPlayerRef.current.seekTo(duration * (percent / 100))
    };

    const handleOnProgress = () => {
        if (reactPlayerRef.current) {
            setPlayed(Math.floor(reactPlayerRef.current.getCurrentTime()))
        }
    }

    const handlePrev = () => {
        if (enablePrev) {
            const index = playingData.album.tracks.items.map(item => item.id).indexOf(playingData.track.id)
            playingHandler.setTrack(playingData.album.tracks.items[index - 1])
        }
    }

    const handleNext = () => {
        if (enableNext) {
            const index = playingData.album.tracks.items.map(item => item.id).indexOf(playingData.track.id)
            playingHandler.setTrack(playingData.album.tracks.items[index + 1])
        }
    }

    const handleError = (error) => {
        console.error('Playback error:', error);
    }

    return (
        <section className='flex justify-around items-center overflow-hidden w-screen h-[70px] bg-[#121212] fixed bottom-0 left-0' style={{ height: playing ? '13%' : 0, transition: '0.5s' }}>
            {track && (
                <>
                    <div className="flex text-[white] flex-col items-start font-poppins w-[25%]">
                        <span className='text-[15px]'>{track.name}</span>
                        <span className='text-[13px] text-[#bababa]'>{track.artists.map(item => item.name).join(', ')}</span>
                    </div>
                    <div className='flex flex-col text-[white] w-[37%] items-center gap-[2px]'>
                        <div className='flex items-center h-[40px] gap-[2px]'>
                            <i className='text-[25px] bx bx-shuffle' ></i>
                            <i onClick={() => handlePrev()} style={{ cursor: enablePrev ? 'pointer' : 'default', color: enablePrev ? 'white' : '#999' }} className='text-[40px] bx bx-skip-previous' ></i>
                            {!playingTrack ? <i onClick={() => setPlayingTrack(true)} className='text-[45px] bx bx-play cursor-pointer' ></i> : <i onClick={() => setPlayingTrack(false)} className='text-[45px] bx bx-pause cursor-pointer' ></i>}
                            <i onClick={() => handleNext()} style={{ cursor: enableNext ? 'pointer' : 'default', color: enableNext ? 'white' : '#999' }} className='text-[40px] bx bx-skip-next' ></i>
                            <i onClick={() => setRepeat(!repeat)} style={{ color: repeat ? '#00a1ff' : 'white' }} className='cursor-pointer text-[20px] ml-1 fa-solid fa-repeat' ></i>
                        </div>
                        <div className='flex text-[14px] items-center w-full gap-2 justify-center font-poppins'>
                            <span className='w-[40px]'>{convertSecondsToTime(played)}</span>
                            <div ref={processRef} onClick={handleClickProcess} className='flex w-[100%] overflow-hidden bg-[white] h-1 rounded-lg cursor-pointer'>
                                <div style={{ width: `${played * 100 / duration}%`, transition: '0.5s' }} className='h-full bg-[#00a1ff]' />
                            </div>
                            <span className='w-[40px]'>{convertSecondsToTime(duration)}</span>
                        </div>
                    </div>
                    <div className="flex text-[white] items-center justify-end font-poppins w-[25%]">
                        <i onClick={() => playingHandler.setPlaying(false)} className='bx bx-chevron-down text-[35px]'></i>
                    </div>

                    {/* react player */}
                    <ReactPlayer
                        config={{
                            youtube: {
                                playerVars: {
                                    controls: 1, // Hiển thị bảng điều khiển
                                    modestbranding: 1, // Ẩn logo YouTube
                                    showinfo: 1, // Ẩn tiêu đề và thông tin video
                                    rel: 1, // Tắt gợi ý video liên quan 
                                    fs: 0,
                                },
                            },
                            facebook: {
                                appId: '1048093426472292'
                            }
                        }}
                        ref={reactPlayerRef}
                        height={0}
                        width={0}
                        progressInterval={100}
                        url={urlTracks[0]}
                        onError={handleError}
                        // url={'https://www.youtube.com/watch?v=Vk5-c_v4gMU'}
                        playing={playingTrack}
                        loop={repeat}
                        onProgress={() => handleOnProgress()}
                        onDuration={() => setDuration(Math.floor(reactPlayerRef.current?.getDuration()))}
                    />
                </>
            )}
        </section>
    )
}

export default Playing