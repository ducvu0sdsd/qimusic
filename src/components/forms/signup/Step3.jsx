import { userContext } from '@/contexts/UserContext'
import { api, TypeHTTP } from '@/utils/api'
import React, { useContext, useState } from 'react'

const Step3 = ({ hidden }) => {

    const { userData, userHandler } = useContext(userContext)

    const handleCompleteInformation = () => {
        api({ sendToken: false, type: TypeHTTP.POST, path: '/auth/complete-information', body: userData.user })
            .then(res => {
                userHandler.setUser(res)
                hidden()
            })
    }

    return (
        <div className='min-w-[100%] h-full flex flex-col items-center justify-center py-4'>
            <img src="/logo.png" className='aspect-square w-[55px]' />
            <span className='text-[white] font-bold text-[30px] mt-2 font-poppins'>Sign up to start listening</span>
            <span className='font-poppins text-[white]'>Complete your information</span>
            <div className='flex flex-col w-[60%] mt-[0.5rem]'>
                <span className='font-semibold text-[white] text-[14px] font-poppins mt-[0.75rem]'>FullName</span>
                <input value={userData.user?.fullName} onChange={e => userHandler.setUser({ ...userData.user, fullName: e.target.value })} placeholder='Ex: David Vu' className='w-full h-[48px] bg-[#212121] px-2 text-[white] mt-2 rounded-md border-[2px] border-[#999] focus:outline-none' />
                <span className='font-semibold text-[white] text-[14px] font-poppins mt-[0.75rem]'>Date Of Birth</span>
                <input value={userData.user?.dob} onChange={e => userHandler.setUser({ ...userData.user, dob: e.target.value })} type='date' className='w-full h-[48px] bg-[#212121] px-2 text-[white] mt-2 rounded-md border-[2px] border-[#999] focus:outline-none' />
                <span className='font-semibold text-[white] text-[14px] font-poppins mt-[0.75rem]'>Gender</span>
                <select onChange={e => userHandler.setUser({ ...userData.user, gender: Boolean(e.target.value) })} className='w-full h-[48px] bg-[#212121] px-2 text-[white] mt-2 rounded-md border-[2px] border-[#999] focus:outline-none'>
                    <option value={null}>Choose Gender</option>
                    <option value={true}>Male</option>
                    <option value={false}>FeMale</option>
                </select>
                <button onClick={() => handleCompleteInformation()} className='w-full h-[50px] bg-[#00a1ff] hover:scale-[1.1] transition-all font-poppins font-bold rounded-3xl mt-4'>Complete</button>
            </div>
        </div>
    )
}

export default Step3