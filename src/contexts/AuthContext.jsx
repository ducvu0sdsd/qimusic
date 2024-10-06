'use client'
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { userContext } from "./UserContext";
import { visibleContext } from "./VisibleContext";
import { api, TypeHTTP } from "@/utils/api";

export const authContext = createContext()

const AuthProvider = ({ children }) => {

    const { userHandler } = useContext(userContext)
    const { visibleHandler } = useContext(visibleContext)
    const pathname = usePathname()

    //check route
    useEffect(() => {
        const accessToken = globalThis.window.localStorage.getItem('accessToken')
        const refreshToken = globalThis.window.localStorage.getItem('refreshToken')
        const privateRoutes = ['/learn', '/practice', '/broad-casts', '/communicate-with-ai']
        if (accessToken && refreshToken) {
            api({ type: TypeHTTP.POST, path: '/auth/find-user-by-token', sendToken: true })
                .then(res => {
                    userHandler.setUser(res)
                    if (res.statusSignUp !== 3) {
                        visibleHandler.showSignUp()
                    }
                })
        }
    }, [pathname])

    const data = {

    }
    const handler = {

    }

    return (
        <authContext.Provider value={{ authData: data, authHandler: handler }}>
            {children}
        </authContext.Provider>
    )
}

export default AuthProvider