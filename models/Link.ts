import mongoose from 'mongoose';
import type {ILink} from '@/types';

const LinkSchema = new mongoose.Schema<ILink>(
    {
        slug: {type: String, required: true},
        shortUrl: {type: String, required: true},
        originalUrl: {type: String, required: true},
        createdAt: {type: Date},
    },
    {collection: 'links'}
);

export default mongoose.models.Link || mongoose.model('Link', LinkSchema);
