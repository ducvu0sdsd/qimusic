import { userContext } from '@/contexts/UserContext'
import { api, TypeHTTP } from '@/utils/api'
import React, { useContext, useEffect, useState } from 'react'

const Step2 = ({ setStep, step }) => {

    const { userData, userHandler } = useContext(userContext)
    const [code, setCode] = useState('')

    useEffect(() => {
        if (step === 1 && userData.user) {
            api({
                sendToken: false, type: TypeHTTP.POST, path: '/auth/send-verify-code', body: {
                    email: userData.user.email,
                    subject: 'Verify account with QiMusic',
                    content: 'Verify Code: '
                }
            })
        }
    }, [step])

    const handleVerify = () => {
        api({ sendToken: false, type: TypeHTTP.POST, path: '/auth/verify-code', body: { email: userData.user.email, code } })
            .then(res => {
                userHandler.setUser(res)
                setStep(2)
            })
            .catch(error => console.log(error))
    }

    return (
        <div className='min-w-[100%] h-full flex flex-col items-center justify-center py-4'>
            <img src="/logo.png" className='aspect-square w-[55px]' />
            <span className='text-[white] font-bold text-[30px] mt-2 font-poppins'>Sign up to start listening</span>
            <span className='font-poppins text-[white]'>A verification code has been sent to email</span>
            <div className='flex flex-col w-[60%] mt-[0.75rem]'>
                <span className='font-semibold text-[white] text-[14px] font-poppins mt-[0.5rem]'>Verification Code</span>
                <input value={code} onChange={e => setCode(e.target.value)} placeholder='xxxxxx' className='w-full h-[50px] bg-[#212121] px-2 text-[white] mt-2 rounded-md border-[2px] border-[#999] focus:outline-none' />
                <button onClick={() => handleVerify()} className='w-full h-[50px] bg-[#00a1ff] hover:scale-[1.1] transition-all font-poppins font-bold rounded-3xl mt-4'>Next</button>
            </div>
        </div>
    )
}

export default Step2