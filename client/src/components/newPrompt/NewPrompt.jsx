import React, { useEffect, useRef, useState } from 'react'
import './newPrompt.css'
import Upload from '../upload/Upload'
import { IKImage } from 'imagekitio-react'

const NewPrompt = () => {

  const [img, setImg] = useState({
    isLoading: false,
    error:'',
    dbData:{}
  })
  const endRef=useRef(null)

  useEffect(() => {
    if (endRef.current) {
      console.log('endRef.current', endRef.current.scrollIntoView);
      
      endRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [endRef])

  return (
    <>
    {img.isLoading && <div className='loading'>Loading...</div>}
    {img.dbData?.filePath && (
      <IKImage
        urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
        path={img.dbData?.filePath}
        transformation={[{ height:"300", width: "380" }]}
        // loading="lazy"
        // className='img'
        />
    )}

    <div className='endChat' ref={endRef}>
      <div className="newForm">
        <Upload setImg={setImg}/>
            <input type="file" id='file'
             multiple={false} hidden/>
             <input type="text"
              placeholder='Ask anything...' />
              <button>
                <img src='/arrow.png' alt='' />
              </button>
              
      </div>
    </div>
    </>
  )
}

export default NewPrompt;
