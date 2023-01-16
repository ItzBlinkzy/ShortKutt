import Layout from '@/components/Layout';
import React, {useState, useEffect} from 'react';
import Hero from '@/components/Hero';
import Image from 'next/image';
import {ILink, TErrors} from '@/types';
export default function Home() {
    const [inputValue, setInputValue] = useState('');
    const [createdLinks, setCreatedLinks] = useState<ILink[]>([]);
    const [errors, setErrors] = useState<TErrors[]>([]);

    const submitURL = async () => {
        if (!inputValue.length) {
            const key = Date.now();
            setErrors([...errors, {key, message: 'Must enter a URL'}]);
            return;
        }

        // Validate URL with REGEX here client side

        const response = await fetch('/api/link/shorten', {
            method: 'POST',
            body: JSON.stringify({url: inputValue}),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        console.log({data});
        setCreatedLinks([data, ...createdLinks]);
        console.log(`Validating and sending value: ${inputValue}`);
        setInputValue('');
    };

    const handleChange = (e: any) => {
        setInputValue(e.target.value);
    };

    return (
        <Layout>
            <div className="flex flex-col items-center h-full w-full gap-20 bg-paleblue">
                <div className="w-full">
                    <div>
                        <div className="input-container">
                            <div className="flex items-center justify-center p-2 md:p-8 gap-2">
                                <div>
                                    <label className="block">Kutt your link here</label>
                                    <input
                                        type={'text'}
                                        value={inputValue}
                                        onChange={handleChange}
                                        placeholder="Enter URL"
                                        className="h-10 md:w-[40rem] lg:w-[60rem] ring-1 focus:outline focus:outline-2 focus:outline-darkblue rounded-lg p-4"
                                    ></input>
                                    <div className="inline pl-4">
                                        <button
                                            onClick={submitURL}
                                            className="bg-lightblue p-2 h-10 rounded-md ring-1 ring-black"
                                        >
                                            Shorten
                                        </button>
                                    </div>
                                    <div>
                                        {createdLinks.map((link, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className="bg-grayblue p-4 ring-1 ring-black m-4"
                                                >
                                                    <a
                                                        href={link.shortUrl}
                                                        className="text-standardblue"
                                                    >
                                                        {link.shortUrl}
                                                    </a>
                                                    <p>URL: {link.originalUrl}</p>
                                                    <p>{link.createdAt.toLocaleDateString()}</p>
                                                </div>
                                            );
                                        })}
                                        {errors.map(err => {
                                            return (
                                                <div key={err.key} className="text-red-500">
                                                    {err.message}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
