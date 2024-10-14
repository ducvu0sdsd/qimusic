'use client'
import { playingContext, typePlayer } from '@/contexts/PlayingContext'
import { spotifyContext } from '@/contexts/SpotifyContext'
import { googleApiKeys } from '@/utils/apikey'
import { convertSecondsToTime } from '@/utils/time'
import axios from 'axios'
import React from 'react'
import { useContext, useState, useEffect, useRef } from 'react'
import ReactPlayer from 'react-player'

const Playing = ({ playing, setPlaying }) => {

    const { playingData, playingHandler } = useContext(playingContext)
    const { spotifyData } = useContext(spotifyContext)
    const [track, setTrack] = useState()
    const [urlTracks, setUrlTracks] = useState('')
    const [duration, setDuration] = useState(0)
    const [played, setPlayed] = useState(0)
    const reactPlayerRef = useRef()
    const processRef = useRef()
    const volumeRef = useRef()
    const [enablePrev, setEnablePrev] = useState(false)
    const [enableNext, setEnableNext] = useState(false)
    const [volumePercent, setVolumePercent] = useState(0)

    // action
    const [repeat, setRepeat] = useState(false)
    const [playingTrack, setPlayingTrack] = useState(true)

    // get Volume 
    useEffect(() => {
        const vol = globalThis.localStorage.getItem('volume')
        if (vol) {
            setVolumePercent(Number(vol))
        } else {
            setVolumePercent(100)
        }
    }, [])

    useEffect(() => {
        if (playingData.album) {
            const index = playingData.album.tracks.items.map(item => item.id).indexOf(playingData.track.id)
            if (played >= duration - 1 && index < playingData.album.tracks.items.length - 1 && repeat !== true) {
                playingHandler.setTrack(playingData.album.tracks.items[index + 1])
            }
        }
    }, [played])

    useEffect(() => {
        if (playingData.track) {
            const query = `${playingData.track.name.replaceAll("'", '').replaceAll('`', '')} - ${playingData.track.artists.map(item => item.name).join(',')} - lyris`
            const getParameters = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + spotifyData.accessToken,
                },
            };
            setTrack(playingData.track)
            axios(`https://api.spotify.com/v1/tracks/${playingData.track.id}`, getParameters)
                .then(res => {
                    setTrack(res.data)
                    playingHandler.setTrack(res.data)
                    axios(`https://api.spotify.com/v1/albums/${res.data.album.id}`, getParameters)
                        .then(res1 => {
                            playingHandler.setAlbum(res1.data)
                        })
                })
            axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=${googleApiKeys[0]}`)
                .then(res => {
                    setUrlTracks(res.data.items.map(item => `https://www.youtube.com/watch?v=${item.id.videoId}`))
                })
                .catch(() => {
                    axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=${googleApiKeys[1]}`)
                        .then(res => {
                            setUrlTracks(res.data.items.map(item => `https://www.youtube.com/watch?v=${item.id.videoId}`))
                        })
                        .catch(() => {
                            axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=${googleApiKeys[2]}`)
                                .then(res => {
                                    setUrlTracks(res.data.items.map(item => `https://www.youtube.com/watch?v=${item.id.videoId}`))
                                })
                                .catch(() => {
                                    axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=${googleApiKeys[3]}`)
                                        .then(res => {
                                            setUrlTracks(res.data.items.map(item => `https://www.youtube.com/watch?v=${item.id.videoId}`))
                                        })
                                        .catch(() => {
                                            axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=${googleApiKeys[4]}`)
                                                .then(res => {
                                                    setUrlTracks(res.data.items.map(item => `https://www.youtube.com/watch?v=${item.id.videoId}`))
                                                })
                                        })
                                })
                        })
                })
        }
    }, [playingData.track?.id])

    useEffect(() => {
        if (playingData.album && playingData.track && playingData.type === typePlayer.album) {
            if (playingData.album.tracks.items.length === 1) {
                setEnablePrev(false)
                setEnableNext(false)
            } else {
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
        }
    }, [playingData.album, playingData.type, playingData.track])

    const handleClickProcess = (event) => {
        const x = event.clientX;
        // toa do cua process
        const rect = processRef.current.getBoundingClientRect();
        const percent = (x - rect.x) * 100 / rect.width
        reactPlayerRef.current.seekTo(duration * (percent / 100))
    };

    const handleClickVolume = (event) => {
        const x = event.clientX;
        const rect = volumeRef.current.getBoundingClientRect();
        const percent = (x - rect.x) * 100 / rect.width
        globalThis.localStorage.setItem('volume', percent)
        setVolumePercent(percent)
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
        <>
            <section className='flex justify-between px-5 items-center overflow-hidden w-screen h-[90px] bg-[#121212] fixed bottom-1 left-0' style={{ transition: '0.5s', height: playingData.playing ? '90px' : 0 }}>
                {track && (
                    <>
                        <div className='flex w-[25%] gap-2'>
                            {track.album && (
                                <img src={track.album.images[0].url} className='h-[40px] rounded-md' />
                            )}
                            <div className="flex text-[white] flex-col items-start font-poppins">
                                <span className='text-[15px]'>{track.name}</span>
                                <span className='text-[13px] text-[#bababa]'>{track.artists.map(item => item.name).join(', ')}</span>
                            </div>
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
                        <div className="flex text-[white] items-center translate-y-[10px] justify-end font-poppins w-[25%] gap-2">
                            <i onClick={() => playingHandler.setPlaying(false)} className='bx bxs-playlist text-[35px]'></i>
                            <div className='flex items-center gap-2'>
                                <i onClick={() => playingHandler.setPlaying(false)} className='fa-solid fa-volume-high text-[26px]'></i>
                                <div ref={volumeRef} onClick={handleClickVolume} className='flex w-[80px] overflow-hidden bg-[white] h-1 rounded-lg cursor-pointer'>
                                    <div style={{ width: `${volumePercent}%`, transition: '0.5s' }} className='h-full bg-[#00a1ff]' />
                                </div>
                            </div>
                            <i onClick={() => playingHandler.setPlaying(false)} className='bx bx bx-fullscreen text-[35px]'></i>
                            {/* <i class='bx bxs-playlist'></i> */}
                        </div>
                    </>
                )}
            </section>
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
    )
}

export default Playing