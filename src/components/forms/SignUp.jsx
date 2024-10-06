import React, { useContext, useEffect, useRef, useState } from 'react'
import Step1 from './signup/Step1'
import Step2 from './signup/Step2'
import Step3 from './signup/Step3'
import { userContext } from '@/contexts/UserContext'

const SignUp = ({ visible, hidden }) => {

    const { userData } = useContext(userContext)
    const wrapperRef = useRef()
    const itemRef = useRef()
    const [step, setStep] = useState(0)

    useEffect(() => {
        if (userData.user && userData.user.statusSignUp !== 3) {
            setStep(userData.user.statusSignUp)
        }
    }, [userData.user])

    return (
        <section ref={itemRef} style={{ width: visible ? '50%' : 0, height: visible ? '90%' : 0, transition: '0.5s' }} className='bg-[#212121] overflow-hidden z-[50] fixed top-[50%] left-[50%] rounded-xl flex translate-x-[-50%] translate-y-[-50%]'>
            {visible && (
                <div ref={wrapperRef} style={{ transition: '0.5s', marginLeft: `-${(step) * 100}%` }} className='flex w-[100%]'>
                    <Step1 setStep={setStep} />
                    <Step2 step={step} setStep={setStep} />
                    <Step3 setStep={setStep} hidden={hidden} />
                </div>
            )}
        </section>
    )
}

export default SignUp