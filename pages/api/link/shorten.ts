// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next';
import generateId from '@/lib/generateId';
import dbConnect from '@/lib/dbConnect';
import Link from '@/models/Link';
import rateLimit from '@/lib/rateLimit';
import isValidUrl from '@/lib/isValidUrl';
import type {ILink} from '@/types';

type TResponseData = {
    message: string;
    originalUrl?: string;
    shortUrl?: string;
};

const MAX_URL_CHARS = 1000;
const MAX_REQUESTS = 15;

const limiter = rateLimit({
    interval: 60 * 1000, // 60 seconds
    uniqueTokenPerInterval: 500, // Max 500 users per second
});

// POST: /api/link/shorten

export default async function handler(req: NextApiRequest, res: NextApiResponse<TResponseData>) {
    try {
        await limiter.check(res, MAX_REQUESTS, 'CACHE_TOKEN'); // 15 requests per minute

        if (req.method !== 'POST') {
            res.status(405).json({message: 'Only POST requests allowed'});
            return;
        }

        await dbConnect();
        const url = req.body.url;

        if (!url) {
            res.status(400).json({message: 'Please provide a URL'});
            return;
        }

        if (url.length > MAX_URL_CHARS) {
            res.status(400).json({message: `Exceeding maxmimum URL chars - ${MAX_URL_CHARS}`});
            return;
        }

        if (!isValidUrl(url)) {
            res.status(400).json({message: 'Invalid URL'});
            return;
        }

        const {slug} = await generateId();

        // Internal Server Error generateId function caught an error and slug is empty.
        if (!slug.length) {
            res.status(500).json({message: 'There was an error trying to shorten this link.'});
            return;
        }

        // Save the link in the DB
        const data: ILink = {
            slug,
            shortUrl: `https://shortkutt.me/${slug}`,
            originalUrl: url,
            createdAt: new Date(),
        };

        const linkObj = new Link(data);

        try {
            const saved = await linkObj.save();
            console.log(saved);
            res.status(200).json({...data, message: 'success'});
        } catch (e) {
            res.status(500).json({message: 'There was an error trying to shorten this link.'});
        }
    } catch {
        res.status(429).json({message: 'Rate limit exceeded'});
    }
}
