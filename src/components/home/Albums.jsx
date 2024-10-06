import { spotifyContext } from '@/contexts/SpotifyContext'
import { useRouter } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'

const Albums = ({ type, name }) => {

    const { spotifyData } = useContext(spotifyContext)
    const [albums, setAlbums] = useState()
    const router = useRouter()

    useEffect(() => {
        switch (type) {
            case 'vpop':
                setAlbums(spotifyData.vpopAlbums)
                break
            case 'kdrama':
                setAlbums(spotifyData.kdramaAlbums)
                break
            case 'kpop':
                setAlbums(spotifyData.kpopAlbums)
                break
            case 'usuk':
                setAlbums(spotifyData.uSUkAlbums)
                break
            case 'citypop':
                setAlbums(spotifyData.cityPopAlbums)
                break
        }
    }, [type, spotifyData])

    return (
        <div className='flex flex-col w-full items-start gap-2 my-2'>
            <h2 className='text-[white] font-bold text-[25px] font-poppins'>{name}</h2>
            <div className='grid grid-cols-7 gap-4 w-full'>
                {albums && albums.items.map((item, index) => {
                    if (index <= 6) {
                        return <div onClick={() => { router.push(`/albums/${item.id}`) }} key={index} className='cursor-pointer flex flex-col gap-2 w-[150px] overflow-hidden'>
                            <img src={item.images[0].url} className='h-[150px] aspect-square rounded-md ' />
                            <span className="text-[#ffffffb6] font-poppins font-normal text-[13px]">
                                {item.name.length > 35 ? item.name.substring(0, 35) + '...' : item.name}
                            </span>
                        </div>
                    }
                })}
            </div>
        </div>
    )

}

export default Albums