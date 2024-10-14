'use client'
import Playing from "@/components/playing/Playing";
import Queue from "@/components/Queue";
import { createContext, useState, useEffect } from "react";

export const playingContext = createContext()

export const typePlayer = {
    none: 'none',
    single: 'single',
    album: 'album'
}

const PlayingProvider = ({ children }) => {

    const [type, setType] = useState(typePlayer.none)
    const [album, setAlbum] = useState()
    const [playing, setPlaying] = useState(false)
    const [visibleQueue, setVisibleQueue] = useState(false)
    const [track, setTrack] = useState()

    const data = {
        playing,
        track,
        album,
        type,
        visibleQueue
    }

    const handler = {
        setPlaying,
        setTrack,
        setAlbum,
        setType,
        setVisibleQueue
    }

    useEffect(() => {
        if (track) {
            setPlaying(true)
        }
    }, [track])

    return (
        <playingContext.Provider value={{ playingData: data, playingHandler: handler }}>
            {children}
            <Playing playing={playing} setPlaying={setPlaying} />
            <Queue />
        </playingContext.Provider>
    )
}

export default PlayingProvider