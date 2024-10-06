'use client'
import SignIn from "@/components/forms/SignIn";
import SignUp from "@/components/forms/SignUp";
import Wrapper from "@/components/Wrapper";
import { createContext, useEffect, useRef, useState } from "react";

export const visibleContext = createContext()

const VisibleProvider = ({ children }) => {

    const [visibleSignUp, setVisibleSignUp] = useState(false)
    const [visibleSignIn, setVisibleSignIn] = useState(false)
    const wrapperRef = useRef()

    const showWrapper = () => {
        wrapperRef.current.style.display = "block";
        document.querySelector("body").style.overflow =
            "hidden";
        setTimeout(() => {
            wrapperRef.current.style.opacity = 1;
        }, 100);
    };

    const hiddenWrapper = () => {
        wrapperRef.current.style.opacity = 0;
        document.querySelector("body").style.overflow = "auto";
        setTimeout(() => {
            wrapperRef.current.style.display = "none";
        }, 500);
    };

    const showSignUp = () => {
        showWrapper()
        setVisibleSignUp(true)
    }

    const hiddenSignUp = () => {
        hiddenWrapper()
        setVisibleSignUp(false)
    }

    const showSignIn = () => {
        showWrapper()
        setVisibleSignIn(true)
    }

    const hiddenSignIn = () => {
        hiddenWrapper()
        setVisibleSignIn(false)
    }

    const hidden = () => {
        hiddenSignUp()
        hiddenSignIn()
    }

    const data = {

    }
    const handler = {
        showSignUp,
        hiddenSignUp,
        showSignIn,
        hiddenSignIn
    }

    return (
        <visibleContext.Provider value={{ visibleData: data, visibleHandler: handler }}>
            <Wrapper wrapperRef={wrapperRef} onClick={hidden} />
            <SignUp visible={visibleSignUp} hidden={() => hiddenSignUp()} />
            <SignIn visible={visibleSignIn} hidden={() => hiddenSignIn()} />
            <div className="z-0">
                {children}
            </div>
        </visibleContext.Provider>
    )
}

export default VisibleProvider