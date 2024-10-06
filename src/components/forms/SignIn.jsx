import { userContext } from '@/contexts/UserContext'
import { visibleContext } from '@/contexts/VisibleContext'
import { api, TypeHTTP } from '@/utils/api'
import React, { useContext, useEffect, useRef, useState } from 'react'

const SignIn = ({ visible, hidden }) => {

    const { userHandler } = useContext(userContext)
    const { visibleHandler } = useContext(visibleContext)
    const wrapperRef = useRef()
    const itemRef = useRef()
    const [step, setStep] = useState(0)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSignIn = () => {
        api({ sendToken: false, type: TypeHTTP.POST, path: '/auth/sign-in', body: { password, email } })
            .then(res => {
                globalThis.localStorage.setItem('accessToken', res.tokens.accessToken)
                globalThis.localStorage.setItem('refreshToken', res.tokens.refreshToken)
                userHandler.setUser(res.user)
                if (res.user.statusSignUp !== 3) {
                    hidden()
                    setTimeout(() => {
                        visibleHandler.showSignUp()
                    }, 500);
                } else {
                    hidden()
                }
            })
            .catch(error => console.log(error))
    }

    const handleGetNewPassword = () => {
        hidden()
        api({ sendToken: false, type: TypeHTTP.POST, path: '/auth/get-new-password', body: { email } })
            .catch(error => console.log(error))
    }

    return (
        <section ref={itemRef} style={{ width: visible ? '50%' : 0, height: visible ? '75%' : 0, transition: '0.5s' }} className='bg-[#212121] overflow-hidden z-[50] fixed top-[50%] left-[50%] rounded-xl flex translate-x-[-50%] translate-y-[-50%]'>
            {visible && (
                <div ref={wrapperRef} style={{ transition: '0.5s', marginLeft: `-${(step) * 100}%` }} className='flex w-[100%]'>
                    <div className='min-w-[100%] h-full flex flex-col items-center justify-center py-4'>
                        <img src="/logo.png" className='aspect-square w-[55px]' />
                        <span className='text-[white] font-bold text-[30px] mt-2 font-poppins'>Log in to QiMusic</span>
                        <div className='flex flex-col w-[60%] mt-[0.5rem]'>
                            <span className='font-semibold text-[white] text-[14px] font-poppins mt-[1rem]'>Email Address</span>
                            <input value={email} onChange={e => setEmail(e.target.value)} placeholder='name@domain.com' className='w-full h-[50px] bg-[#212121] px-2 text-[white] mt-2 rounded-md border-[2px] border-[#999] focus:outline-none' />
                            <span className='font-semibold text-[white] text-[14px] font-poppins mt-[1rem]'>Password</span>
                            <input value={password} onChange={e => setPassword(e.target.value)} type='password' placeholder='xxxxxx' className='w-full h-[50px] bg-[#212121] px-2 text-[white] mt-2 rounded-md border-[2px] border-[#999] focus:outline-none' />
                            <span onClick={() => setStep(1)} className='font-semibold text-[white] text-[14px] font-poppins mt-[0.5rem] underline cursor-pointer'>Forgot Password?</span>
                            <button onClick={() => handleSignIn()} className='w-full h-[50px] bg-[#00a1ff] hover:scale-[1.1] transition-all font-poppins font-bold rounded-3xl mt-4'>Log in</button>
                        </div>
                    </div>
                    <div className='min-w-[100%] h-full flex flex-col items-center justify-center py-4'>
                        <img src="/logo.png" className='aspect-square w-[55px]' />
                        <span className='text-[white] font-bold text-[30px] mt-2 font-poppins'>Forgot Password</span>
                        <span className='font-poppins text-[white]'>Enter your email to receive a new password</span>
                        <div className='flex flex-col w-[60%] mt-[0.75rem]'>
                            <span className='font-semibold text-[white] text-[14px] font-poppins mt-[0.5rem]'>Email Address</span>
                            <input value={email} onChange={e => setEmail(e.target.value)} placeholder='name@domain.com' className='w-full h-[50px] bg-[#212121] px-2 text-[white] mt-2 rounded-md border-[2px] border-[#999] focus:outline-none' />
                            <button onClick={() => handleGetNewPassword()} className='w-full h-[50px] bg-[#00a1ff] hover:scale-[1.1] transition-all font-poppins font-bold rounded-3xl mt-4'>Get New Password</button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}

export default SignIn