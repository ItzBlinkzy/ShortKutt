import React from 'react';
import {ILink} from '@/types';
type Props = {
    links: ILink[];
};

function CreatedLinks({links}: Props) {
    return (
        <>
            {links.map((link, index) => {
                return (
                    <div
                        key={index}
                        className="flex flex-col bg-grayblue p-4 ring-1 ring-black rounded-md min-w-0"
                    >
                        <a href={link.shortUrl} className="text-standardblue">
                            {link.shortUrl}
                        </a>
                        <p>URL: {link.originalUrl}</p>
                        <p>{new Date(link.createdAt).toLocaleString()}</p>
                    </div>
                );
            })}
        </>
    );
}

export default CreatedLinks;
