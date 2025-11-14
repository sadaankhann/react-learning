import React, { useState } from 'react'



const Main = () => {

    const [num, setnum] = useState(0);

    function Increase() {
        setnum(num + 1);
    }

    function Decrease() {
        setnum(num - 1);
    }

    return (

        <div className='h-full w-full flex flex-col items-center justify-center font-bold'>
            <h1 className='text-[40px]'>The Counter Is: </h1>
            <h2 className='bg-[#333] w-[fit-content] p-5 text-[30px] border-2 border-solid border-white mt-7'>{num}</h2>
            <div className='flex mt-9 gap-6'>
                <button onClick={Increase} className='bg-[#333] p-4 rounded full border-2 border-solid border-white'>Increase</button>
                <button onClick={Decrease} className='bg-[#333] p-4 rounded full border-2 border-solid border-white'>Decrease</button>
            </div>
        </div>
    )
}

export default Main
