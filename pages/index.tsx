import Layout from '@/components/Layout';
import React, {useState, useEffect} from 'react';
import CreatedLinks from '@/components/CreatedLinks';
import {ILink, TErrors} from '@/types';

export default function Home() {
    const [inputValue, setInputValue] = useState('');
    const [createdLinks, setCreatedLinks] = useState<ILink[]>([]);
    const [errors, setErrors] = useState<TErrors[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const storedLinks = localStorage.getItem('createdLinks');
        if (storedLinks) {
            setCreatedLinks(JSON.parse(storedLinks));
        }
    }, []);

    const clearLinks = () => {
        // remove locally and from localstorage
        setCreatedLinks([]);
        localStorage.removeItem('createdLinks');
    };

    const handleSetErrors = (message: string) => {
        const key = Date.now();
        setErrors([...errors, {key, message}]);

        setTimeout(() => {
            setErrors(prevErrors => prevErrors.filter(err => err.key !== key));
        }, 1500);
    };
    const submitURL = async () => {
        if (!inputValue.length) {
            handleSetErrors('Must enter a URL');
            return;
        }

        // Validate URL with REGEX here client side
        setLoading(true);
        const response = await fetch('/api/link/shorten', {
            method: 'POST',
            body: JSON.stringify({url: inputValue}),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (response.status !== 200) {
            handleSetErrors(data.message);
            setLoading(false);
            return;
        }
        const newLinks = [data, ...createdLinks];

        // Show user new link and save to local storage
        setLoading(false);
        setCreatedLinks(newLinks);
        localStorage.setItem('createdLinks', JSON.stringify(newLinks));

        setInputValue('');
    };

    const handleChange = (e: any) => {
        setInputValue(e.target.value);
    };

    return (
        <Layout>
            <div className="flex flex-col items-center h-full w-full gap-20">
                <div className="w-full">
                    <div>
                        <div className="input-container">
                            <div className="flex items-center justify-end p-2 md:p-8 gap-2 flex-col">
                                <div className="flex flex-col">
                                    <label className="p-2 font-bold">Kutt your link here</label>
                                    <input
                                        type={'text'}
                                        value={inputValue}
                                        onChange={handleChange}
                                        placeholder="Enter URL"
                                        className="h-10 md:w-[40rem] lg:w-[60rem] ring-1 focus:ring-2 focus:r-darkblue rounded-lg p-4"
                                    ></input>
                                    <div className="flex justify-end self-end items-start m-2 gap-2">
                                        <div>
                                            <button
                                                onClick={submitURL}
                                                className="bg-lightblue p-2 h-10 rounded-md ring-1 ring-black font-bold"
                                            >
                                                Shorten
                                            </button>
                                        </div>
                                        <div className="flex items-center flex-end">
                                            <button
                                                onClick={clearLinks}
                                                className="bg-red-400 p-2 rounded-md font-bold ring-1 ring-black"
                                            >
                                                Clear Kutts
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex items-end flex-col gap-4">
                                        {errors.map(err => {
                                            return (
                                                <div
                                                    key={err.key}
                                                    className={`error-message text-red-600 opacity-0 transition-opacity duration-500 error-${err.key}`}
                                                >
                                                    <p>{err.message}</p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="flex flex-col justify-evenly gap-2">
                                    {loading && <div>Loading...</div>}
                                    <CreatedLinks links={createdLinks} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
