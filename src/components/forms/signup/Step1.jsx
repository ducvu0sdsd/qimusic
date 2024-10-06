import { userContext } from '@/contexts/UserContext'
import { api, TypeHTTP } from '@/utils/api'
import React, { useContext, useState } from 'react'

const Step1 = ({ setStep }) => {
    const { userHandler } = useContext(userContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSignUpStep1 = () => {
        api({ sendToken: false, type: TypeHTTP.POST, path: 'auth/sign-up-step-1', body: { email, password } })
            .then(res => {
                userHandler.setUser(res)
                setStep(1)
            })
            .catch(error => console.log(error))
    }

    return (
        <div className='min-w-[100%] h-full flex flex-col items-center justify-center py-4'>
            <img src="/logo.png" className='aspect-square w-[55px]' />
            <span className='text-[white] font-bold text-[30px] mt-2 font-poppins'>Sign up to start listening</span>
            <div className='flex flex-col w-[60%] mt-[0.75rem]'>
                <span className='font-semibold text-[white] text-[14px] font-poppins mt-[1rem]'>Email Address</span>
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder='name@domain.com' className='w-full h-[50px] bg-[#212121] px-2 text-[white] mt-2 rounded-md border-[2px] border-[#999] focus:outline-none' />
                <span className='font-semibold text-[white] text-[14px] font-poppins mt-[0.75rem]'>Password</span>
                <input type='password' value={password} onChange={e => setPassword(e.target.value)} placeholder='xxxxxx' className='w-full h-[48px] bg-[#212121] px-2 text-[white] mt-2 rounded-md border-[2px] border-[#999] focus:outline-none' />
                <span className='font-semibold text-[white] text-[14px] font-poppins mt-[0.75rem]'>Confirm Password</span>
                <input type='password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder='xxxxxx' className='w-full h-[48px] bg-[#212121] px-2 text-[white] mt-2 rounded-md border-[2px] border-[#999] focus:outline-none' />
                <button onClick={() => handleSignUpStep1()} className='w-full h-[50px] bg-[#00a1ff] hover:scale-[1.1] transition-all font-poppins font-bold rounded-3xl mt-4'>Next</button>
            </div>
        </div>
    )
}

export default Step1