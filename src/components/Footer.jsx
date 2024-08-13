import React from 'react'

const Footer = () => {
    return (
        <div className='bg-slate-800 text-white flex flex-col justify-center items-center  w-full'>
            <div className="logo font-bold text-white text-sm">
                <span className='text-green-500'> </span>

                <span>Pass</span><span className='text-white'>word manager ||</span>
                 <span className='text-xs'> @ by lokii</span>

            </div>
            {/* <div className='flex justify-center items-center'> Created with <img className='w-7 mx-2' src="icons/heart.png" alt="" /> by CodeWithHarry </div> */}
        </div>
    )
}

export default Footer