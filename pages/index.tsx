import Layout from '@/components/Layout';
import React, {useState, useEffect} from 'react';
import ILink from '@/types';
export default function Home() {
    const [inputValue, setInputValue] = useState('');
    const [createdLinks, setCreatedLinks] = useState<ILink[]>([]);
    const submitURL = async () => {
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
    };

    const handleChange = (e: any) => {
        setInputValue(e.target.value);
    };

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
                        <input
                            type="text"
                            placeholder="Enter your URL Here"
                            onChange={handleChange}
                        />
                        <button onClick={submitURL} className="">
                            Submit URL
                        </button>
                        {createdLinks.map((link, index) => {
                            return (
                                <div key={index}>
                                    <a href={link.shortUrl}>{link.shortUrl}</a>
                                    <p>{link.originalUrl}</p>
                                    <p>{link.createdAt.toString()}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
