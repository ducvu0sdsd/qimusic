import React, { useContext } from 'react'

const Wrapper = ({ wrapperRef, onClick }) => {

    return (
        <div onClick={() => onClick()} ref={wrapperRef} style={{ opacity: 0, transition: '0.5s' }} className="w-screen hidden h-screen fixed bg-[#0000008c] z-10 top-0 left-0"></div>
    )
}

export default Wrapper