import React from 'react';
import Header from './Header';
import Image from 'next/image';
function Hero() {
    return (
        <section className="bg-standardblue h-[40rem] bg-heroPattern bg-cover relative">
            <div>
                <Header />
                <div className="flex flex-col p-10">
                    <div className="text-5xl md:text-6xl lg:text-8xl font-extrabold text-white">
                        <h1>ShortKutt</h1>
                    </div>
                    <div className="p-4 italic font-bold text-white">
                        <p>A Quick and Easy URL shortener</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
