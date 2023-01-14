import {customAlphabet} from 'nanoid';
import Link from '@/models/Link';
const nanoid = customAlphabet(
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-',
    8
);

type TSlug = {
    slug: string;
};

export default async function generateId(): Promise<TSlug> {
    try {
        const idGen = nanoid();
        const foundLink = await Link.findOne({slug: idGen});

        if (foundLink) {
            console.log('Duplicate ID generated, re-generating ID again', {slugId: idGen});
            return generateId();
        } else {
            const slug: TSlug = {slug: idGen};
            console.log('NEW ID GENERATED', slug);
            return slug;
        }
    } catch (e) {
        console.error(e);
        return {slug: ''};
    }
}
