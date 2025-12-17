import React, { useEffect, useState } from 'react'
import { ZoomIn } from 'lucide-react';

const Notes = () => {

  const [taskDetail, setTaskDetail] = useState([]);

  useEffect(() => {
    const preDefinedData = JSON.parse(localStorage.getItem('note_data'));
    setTaskDetail(preDefinedData);
  }, [])

  const [heading, setHeading] = useState("");
  const [paragraph, setParagraph] = useState("");

  const preventingDefault = (e) => {

    e.preventDefault();

    if ((heading || paragraph) == "") {
      return;
    }

    else {

      setTaskDetail([...taskDetail, { heading: heading, paragraph: paragraph, expanded: false }]);

      setHeading("");
      setParagraph("");
    }
  }

  const deletingIndex = (index) => {

    const updated = taskDetail.filter((_, i) => i !== index);
    setTaskDetail(updated);


  }

  const increaseDivLength = (index) => {
    const updated = taskDetail.map((elem, idx) => {
      return (idx == index) ? { ...elem, expanded: !elem.expanded } : elem;
    })
    setTaskDetail(updated);
  }


  useEffect(() => {
    localStorage.setItem('note_data', JSON.stringify(taskDetail));
  }, [taskDetail])



  return (
    <div className='block-1 grid grid-cols-2 w-full divide-x-3 divide-dashed min-h-screen bg-black text-white'>
      <form onSubmit={(e) => {
        preventingDefault(e);
      }} className=''>
        <div className='h-[fit-content] flex flex-col p-[min(20px,5vw)] items-center '>
          <h1 className='mb-5 font-bold h-[fit-content] w-[90%] text-[clamp(1.2rem,2.5vw,5rem)]'>Notify</h1>

          <input type="text" name="" id="" placeholder='Enter Your Heading Here' className='inputs p-2 border-solid border-[2px] border-white w-[90%] flex-1' value={heading} maxLength={15} onChange={(e) => {
            setHeading(e.target.value);
          }} required />

          <p className='text-[clamp(0.2rem,6vw,0.8rem)] text-right w-[90%] mt-[-22px] pr-2'>{heading.length}/15 </p>
          {/* <input type="text" name="" id="" placeholder='Enter the text' value={paragraph} onChange={(e) => {
            setParagraph(e.target.value);

            if(paragraph.length > 25){
              console.log(paragraph.length);
            }

          }} className='inputs mt-7 p-15 border-solid border-[2px] border-white w-[90%]'required /> */}

          <textarea
            placeholder="Enter the text"
            value={paragraph}
            onChange={(e) => {
              const value = e.target.value;
              setParagraph(value);

              if (value.length > 25) {
                console.log(value.length);
              }
            }}
            className="inputs mt-7 p-15 border-solid border-[2px] border-white w-[90%]"
            required
            rows={4}   // optional: height control
          ></textarea>

          <input type="submit" value="Submit" className='inputs bg-white text-black font-bold p-1 mt-6 w-[90%]' />
        </div>
      </form>
      <div className='block-2 min-h-screen flex flex-wrap p-8'>
        {taskDetail.map((e, index) => {

          return <div
            key={index}
            className={`imgg
              text-black text-center pt-4 flex flex-col justify-between
              bg-white rounded-lg transition-all duration-300 p-2
              ${(e.expanded) || (e.paragraph.length > 20) ? 'h-[300px] w-[200px]' : 'h-[180px] w-[160px]'}
            `} on
          >
            <div className='flex justify-center items-center mt-4'>
              <h5 className='text-xl font-bold w-[80%]'>{e.heading}</h5>
              <div className='flex-end relative w-[20%]'><ZoomIn className='hover:scale-85 transition-transform duration-300' size={14} color='#333' onClick={() => {
                increaseDivLength(index);
              }} /></div>
            </div>
            <div>
              <p>{e.paragraph}</p>
            </div>
            <div className='flex justify-center items-center'><button className='flex justify-center items-center w-[100px] h-[25px] text-white bg-red-600 font-bold rounded-lg hover:scale-95 transition-transform duration-300 mb-2' onClick={() => {
              deletingIndex(index)
            }
            }>Delete</button></div>

          </div>

        })
        }


      </div>
    </div>
  )
}


export default Notes
