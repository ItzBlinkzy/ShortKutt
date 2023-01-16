interface ILink {
    shortUrl: string;
    originalUrl: string;
    slug: string;
    createdAt: Date;
}

type TErrors = {
    key: number;
    message: string;
};

export type {ILink, TErrors};
