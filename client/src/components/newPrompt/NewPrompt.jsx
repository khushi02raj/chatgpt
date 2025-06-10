import React, { useEffect, useRef, useState } from "react";
import "./newPrompt.css";
import Upload from "../upload/Upload";
import { IKImage } from "imagekitio-react";
import model from "../../lib/gemini";
import MarkDown from "react-markdown";
const NewPrompt = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {},
    aiData: {},
  });

  const chat=model.startChat({
    history: [
      {
        role: "user",
        parts: [{text:"You are a helpful assistant."}],
      },
      {
        role: "model",
        parts: [{text:"How can I assist you today?"}],
      }
    ],
    generationConfig:{

    }
  })
  const endRef = useRef(null);

  useEffect(() => {
    if (endRef.current) {
      console.log("endRef.current", endRef.current.scrollIntoView);

      endRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [question, answer, img.dbData]);

  const add = async (text) => {
    setQuestion(text);
    const result = await chat.sendMessageStream(
      Object.entries(img.aiData).length ? [img.aiData, text] : [text]
    );
    let accmulatedText="";
    for await (const chunk of result.stream) 
    {
      const chunkText = chunk.text();
      accmulatedText += chunkText;
      setAnswer(accmulatedText);
    }
    setImg({
      isLoading: false,
      error: "",
      dbData: {}, 
      aiData: {},
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    if (!text) return;
    add(text);
    // setImg((prev) => ({...prev, isLoading: true}))
    // const file=document.getElementById('file').files[0]
    // const formData=new FormData()
    // formData.append('file', file)
    // formData.append('fileName', file.name)
    // formData.append('folder', 'test')
    // try {
    //   const res=await fetch(`${import.meta.env.VITE_SERVER_URL}/upload`, {
    //     method: 'POST',
    //     body: formData
    //   })
    //   const data=await res.json()
    //   console.log('data', data);
    //   setImg((prev) => ({...prev, dbData: data, isLoading: false}))
    // } catch (error) {
    //   console.log('error', error);
    //   setImg((prev) => ({...prev, error: error.message, isLoading: false}))
    // }
  };

  return (
    <>
      {img.isLoading && <div className="loading">Loading...</div>}
      {img.dbData?.filePath && (
        <IKImage
          urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
          path={img.dbData?.filePath}
          transformation={[{ height: "300", width: "380" }]}
          // loading="lazy"
          // className='img'
        />
      )}
      {question && <div className="message user">{question}</div>}
      {answer && (
        <div className="message">
          <MarkDown>{answer}</MarkDown>
        </div>
      )}
      <div className="endChat" ref={endRef}>
        <form
          className="newForm"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <Upload setImg={setImg} />
          <input type="file" id="file" multiple={false} hidden />
          <input type="text" name="text" placeholder="Ask anything..." />
          <button>
            <img src="/arrow.png" alt="" />
          </button>
        </form>
      </div>
    </>
  );
};

export default NewPrompt;
