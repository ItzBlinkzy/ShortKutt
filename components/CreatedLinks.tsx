import type {ILink} from '@/types';
import {motion} from 'framer-motion';
import {ClipboardIcon, ExternalLinkIcon} from '@heroicons/react/outline';

type Props = {
    links: ILink[];
};

function CreatedLinks({links}: Props) {
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        // You might want to add a toast notification here
    };

    return (
        <div className="space-y-4">
            {links.map((link, index) => {
                const slicedLink =
                    link.originalUrl.length > 60
                        ? link.originalUrl.slice(0, 60) + '...'
                        : link.originalUrl;

                return (
                    <motion.div
                        key={index}
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.3, delay: index * 0.1}}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 w-full"
                    >
                        <div className="p-4 space-y-2">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    Shortened URL
                                </h3>
                                <button
                                    onClick={() => copyToClipboard(link.shortUrl)}
                                    className="text-blue-500 hover:text-blue-600 transition-colors duration-200"
                                >
                                    <ClipboardIcon className="h-5 w-5" />
                                </button>
                            </div>
                            <a
                                href={link.shortUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:text-blue-600 transition-colors duration-200 flex items-center space-x-1"
                            >
                                <span>{link.shortUrl}</span>
                                <ExternalLinkIcon className="h-4 w-4" />
                            </a>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 border-t border-gray-100">
                            <h4 className="text-sm font-medium text-gray-500 mb-1">Original URL</h4>
                            <a
                                href={link.originalUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 hover:text-gray-800 transition-colors duration-200 text-sm flex items-center space-x-1"
                            >
                                <span>{slicedLink}</span>
                                <ExternalLinkIcon className="h-4 w-4" />
                            </a>
                        </div>
                        <div className="bg-gray-50 px-4 py-2 border-t border-gray-100">
                            <p className="text-xs text-gray-400">
                                Created: {new Date(link.createdAt).toLocaleString()}
                            </p>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}

export default CreatedLinks;
