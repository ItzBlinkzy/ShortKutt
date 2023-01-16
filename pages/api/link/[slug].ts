// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next';
import dbConnect from '@/lib/dbConnect';
import Link from '@/models/Link';
import rateLimit from '@/lib/rateLimit';
import type {ILink} from '@/types';


type Data = {
    message: string;
};

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
})

// GET: /api/link/:slug

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    try {
      await limiter.check(res, 10, 'CACHE_TOKEN') // 10 requests per minute
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
    catch {
      res.status(429).json({ message: 'Rate limit exceeded' })
    }
}
