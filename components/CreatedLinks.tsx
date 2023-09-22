import React from 'react';
import {ILink} from '@/types';
type Props = {
    links: ILink[];
};

function CreatedLinks({links}: Props) {
    return (
        <>
            {links.map((link, index) => {
                const slicedLink =
                    link.originalUrl.length > 100
                        ? link.originalUrl.slice(0, 100) + '...'
                        : link.originalUrl;

                return (
                    <div key={index}>
                        <div className="min-w-[80%] bg-gray-100 rounded-lg shadow-md p-4 ring-1">
                            <div className="mb-2">
                                <label className="text-gray-600 text-sm">Shortened URL: </label>
                                <span className="text-blue-600 break-all">
                                    <a href={link.shortUrl}>{link.shortUrl}</a>
                                </span>
                            </div>
                            <div className="mb-2">
                                <label className="text-gray-600 text-sm">Original URL: </label>
                                <span className="text-blue-600 break-all">
                                    <a href={slicedLink}>{slicedLink}</a>
                                </span>
                            </div>
                            <div>
                                <label className="text-gray-600 text-sm">Date:</label>
                                <p className="text-gray-700">
                                    {new Date(link.createdAt).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
}

export default CreatedLinks;
