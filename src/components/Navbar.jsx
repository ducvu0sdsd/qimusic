import { payloadContext } from '@/contexts/PayLoadContext'
import { playingContext } from '@/contexts/PlayingContext'
import { userContext } from '@/contexts/UserContext'
import { visibleContext } from '@/contexts/VisibleContext'
import { themeColor } from '@/utils/color'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'

const Navbar = () => {
    const router = useRouter()
    const { userData } = useContext(userContext)
    const { visibleHandler } = useContext(visibleContext)
    const { payloadHandler, payloadData } = useContext(payloadContext)
    const { playingData, playingHandler } = useContext(playingContext)

    return (
        <>
            <section className='my-3 flex items-center h-[50px] justify-between relative'>
                <div className='flex items-center h-[100%]'>
                    <div className='flex w-[8%]'>
                        <img onClick={() => router.push('/')} src='/logo.png' className='cursor-pointer aspect-square w-[67%] mr-[1rem]' />
                    </div>
                    <div className='flex gap-3 w-[50%] h-[100%] items-center'>
                        <button className='bx bxs-home text-[white] text-[28px] p-[7px] bg-[#2c2c2c] rounded-full'></button>
                        <div className='flex h-[80%] items-center w-[350px] bg-[#2c2c2c] rounded-3xl gap-1 px-3'>
                            <i className='bx bx-search text-[#989faf] text-[25px]'></i>
                            <input value={payloadData.filter} onChange={e => payloadHandler.setFilter(e.target.value)} placeholder='What do you want to play?' className='text-[15px] focus:outline-none text-[#989faf] font-poppins bg-[#2c2c2c] bg-none w-[100%] h-full rounded-2xl' />
                        </div>
                    </div>
                </div>
                {(userData.user && userData.user.statusSignUp === 3) ? (
                    <div className='flex items-center h-[100%] w-[50%] justify-end gap-4'>
                        <button className='bx bxs-bell text-[white] text-[28px]' />
                        <img className='w-[12%] cursor-pointer rounded-full aspect-square' src='https://img.lovepik.com/element/45006/1283.png_860.png' />
                    </div>
                ) : (
                    <div className='flex items-center h-[100%] w-[50%] justify-end gap-6'>
                        <button onClick={() => visibleHandler.showSignUp()} className='font-poppins font-bold text-[#989faf]'>Register</button>
                        <button onClick={() => visibleHandler.showSignIn()} className='font-poppins font-bold text-[black] bg-[white] px-4 py-2 rounded-3xl'>Log in</button>
                    </div>
                )}

            </section>

            {/*Menu vertical*/}
            {(userData.user && userData.user.statusSignUp === 3) && (
                <section className='fixed h-[86%] w-[5%] left-2 flex flex-col items-center py-3 top-[12%]'>
                    <button onClick={() => playingHandler.setPlaying(!playingData.playing)} className={`bx bx-plus bg-[#2c2c2c] text-[#999] text-[30px] bg-[${themeColor}] p-1 rounded-lg hover:scale-[1.15] transition-all`}></button>
                </section>
            )}
        </>
    )
}

export default Navbar