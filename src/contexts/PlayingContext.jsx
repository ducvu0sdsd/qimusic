'use client'
import Playing from "@/components/playing/Playing";
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
    const [track, setTrack] = useState()

    const data = {
        playing,
        track,
        album,
        type
    }

    const handler = {
        setPlaying,
        setTrack,
        setAlbum,
        setType
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
        </playingContext.Provider>
    )
}

export default PlayingProvider