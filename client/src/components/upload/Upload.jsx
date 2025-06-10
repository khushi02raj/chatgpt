import React, { useRef } from 'react'
import { IKContext, IKImage, IKUpload } from 'imagekitio-react';

const publicKey = import.meta.env.VITE_IMAGE_KIT_PUBLIC_KEY;
const urlEndpoint = import.meta.env.VITE_IMAGE_KIT_ENDPOINT;

const authenticator =  async () => {
    try {
        const response = await fetch('http://localhost:3000/api/upload');

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        const { signature, expire, token } = data;
        return { signature, expire, token };
    } catch (error) {
        throw new Error(`Authentication request failed: ${error.message}`);
    }
};

const Upload = ({setImg}) => {
    const ikUploadRef=useRef(null)

    const onError = err => {
        console.log("Error", err);
      };
      
      const onSuccess = res => {
        console.log("Success", res);
        setImg((prev)=>({...prev, dbData:res, isLoading:false}))
      };
      
      const onUploadProgress = progress => {
        console.log("Progress", progress);
      };
      
      const onUploadStart = evt => {
        console.log("Start", evt);
        const file=evt.target.files[0];
        const reader= new FileReader();
        reader.onloadend = () => {
          setImg((prev)=>({...prev, 
            aiData: {
              inlineData:{
                mimeType: file.type,
                data: reader.result.split(',')[1]
              }
            },
            isLoading:true
          }))
        };
        reader.readAsDataURL(file);
      };

  return (
    <IKContext 
        publicKey={publicKey} 
        urlEndpoint={urlEndpoint} 
        authenticator={authenticator} 
      >
        <IKUpload
          fileName="test-upload.png"
          onError={onError}
          onSuccess={onSuccess}
          useUniqueFileName={true}
          onUploadProgress={onUploadProgress}
          onUploadStart={onUploadStart}
          style={{display:'none'}}
          ref={ikUploadRef}
        />
        <label onClick={() => ikUploadRef.current?.click()}>
            <img src='/attachment.png' alt='upload' />
        </label>
      </IKContext>
  )
}

export default Upload
