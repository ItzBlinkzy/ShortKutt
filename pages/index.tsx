import Layout from "@/components/Layout";
import React, { useState, useEffect } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState("")
  const handleClick = () => {
    console.log(`Validating and sending value: ${inputValue}`)
  }

  const handleChange = (e: any) => {
    setInputValue(e.target.value)
  }
  
  return (
    <Layout>
      <div className="flex flex-col bg-green-400 h-full w-full gap-20">
        <div className="flex flex-col bg-blue-400 p-10">
          <div className="text-4xl md:text-6xl lg:text-8xl font-extrabold">
            <h1>ShortKutt</h1>
          </div>
          <div className="p-4 italic bg-yellow-300 font-bold">
            <p>A Quick and Easy URL shortener</p>
          </div>
        </div>
        <div className="bg-orange-900 py-20 flex flex-col items-center justify-center">
          <div className="">Kutt your link here.</div>
          <div>
            <input type="text" placeholder="Enter your URL Here" onChange={handleChange}/>
            <button onClick={handleClick} className="bg-red-400">Submit URL</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
