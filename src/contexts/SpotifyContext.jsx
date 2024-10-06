'use client'
import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const spotifyContext = createContext()

const SpotifyProvider = ({ children }) => {

    const clientId = '6cbccba0728248f8b0fce66a76efd9c2'
    const clientSecret = '44f77a94ece9444ebca990030e746e39'
    const [accessToken, setAccessToken] = useState()

    // albums
    const [vpopAlbums, setVpopAlbums] = useState()
    const [kdramaAlbums, setKdramaAlbums] = useState()
    const [cityPopAlbums, setCityPopAlbums] = useState()
    const [kpopAlbums, setKpopAlbums] = useState()
    const [uSUkAlbums, setUSUKAlbums] = useState()

    const getParameters = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken,
        },
    };

    useEffect(() => {
        // API Access Token
        var authParameters = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: 'grant_type=client_credentials&client_id=' + clientId + '&client_secret=' + clientSecret,
        };

        axios('https://accounts.spotify.com/api/token', authParameters)
            .then(result => {
                setAccessToken(result.data.access_token)
            })
    }, []);

    useEffect(() => {
        if (accessToken) {
            // albums
            axios('https://api.spotify.com/v1/search?type=album&q=vpop playlist', getParameters)
                .then(res => { setVpopAlbums(res.data.albums) })
            axios('https://api.spotify.com/v1/search?type=album&q=Korean drama OST Playlist', getParameters)
                .then(res => setKdramaAlbums(res.data.albums))
            axios('https://api.spotify.com/v1/search?type=album&q=CITYPOP', getParameters)
                .then(res => setCityPopAlbums(res.data.albums))
            axios('https://api.spotify.com/v1/search?type=album&q=KPOP', getParameters)
                .then(res => setKpopAlbums(res.data.albums))
            axios('https://api.spotify.com/v1/search?type=album&q=US UK playlist', getParameters)
                .then(res => setUSUKAlbums(res.data.albums))
        }
    }, [accessToken])

    const data = {
        vpopAlbums,
        kdramaAlbums,
        kpopAlbums,
        uSUkAlbums,
        cityPopAlbums,
        accessToken
    }

    const handler = {

    }

    return (
        <spotifyContext.Provider value={{ spotifyData: data, spotifyHandler: handler }}>
            {children}
        </spotifyContext.Provider>
    )
}

export default SpotifyProvider