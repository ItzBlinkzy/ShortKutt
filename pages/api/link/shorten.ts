// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next';
import generateId from '@/lib/generateId';
import dbConnect from '@/lib/dbConnect';
import Link from '@/models/Link';
import type ILink from '@/types';

type TResponseData = {
    message: string;
    originalUrl?: string;
    shortUrl?: string;
};

// POST: /api/link/shorten

export default async function handler(req: NextApiRequest, res: NextApiResponse<TResponseData>) {
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

    const saved = await linkObj.save();
    console.log(saved);
    res.status(200).json({...data, message: 'success'});
}