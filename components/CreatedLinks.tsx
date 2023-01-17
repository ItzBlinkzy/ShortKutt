import React from 'react';
import {ILink} from '@/types';
type Props = {
    links: ILink[];
};

function CreatedLinks({links}: Props) {
    return (
        <>
            {links.map((link, index) => {
                const slicedLink = link.originalUrl.length > 100 ? link.originalUrl.slice(0, 100) + "..." : link.originalUrl

                return (
                    <div
                        key={index}
                        className="flex flex-col bg-grayblue p-4 ring-1 ring-black rounded-md min-w-0 max-w-xs break-words"
                    >
                        <a href={link.shortUrl} className="text-standardblue">
                            {link.shortUrl}
                        </a>
                        <p>URL: {slicedLink}</p>
                        <p>{new Date(link.createdAt).toLocaleString()}</p>
                    </div>
                );
            })}
        </>
    );
}

export default CreatedLinks;
