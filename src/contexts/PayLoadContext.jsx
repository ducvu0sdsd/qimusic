'use client'
import { createContext, useState } from "react";

export const payloadContext = createContext()

const PayloadProvider = ({ children }) => {

    const [filter, setFilter] = useState('')

    const data = {
        filter
    }
    const handler = {
        setFilter
    }

    return (
        <payloadContext.Provider value={{ payloadData: data, payloadHandler: handler }}>
            {children}
        </payloadContext.Provider>
    )
}

export default PayloadProvider