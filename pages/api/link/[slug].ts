// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next';
import dbConnect from '@/lib/dbConnect';
import Link from '@/models/Link';
import ILink from '@/types';

type Data = {
    message: string;
};

// GET: /api/link/:slug

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const {slug} = req.query;

    if (req.method !== 'GET') {
        res.status(405).json({message: 'Only GET requests allowed'});
        return;
    }

    await dbConnect();

    const foundLink: ILink | null = await Link.findOne({slug: slug});
    console.log({foundLink, slug});

    if (!foundLink) {
        res.status(308).redirect('/');
        return;
    }

    const {originalUrl} = foundLink;
    const httpRegex = /^(http|https|ftp):\/\//i;

    if (httpRegex.test(originalUrl)) {
        res.status(308).redirect(originalUrl);
        return;
    }

    res.status(308).redirect(`//${originalUrl}`);
    return;
}
