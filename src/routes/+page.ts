import type { PageLoad } from './shorten/$types';

export const load: PageLoad = ({ url }) => {
    const baseUrl = url.origin; // Ambil domain dari request

    return {
        title: 'URL Shortener - Simple & Fast',
        description: 'Shorten your long URLs into simple, easy-to-share links instantly.',
        openGraph: {
            title: 'URL Shortener',
            description: 'Generate short URLs instantly and share them anywhere.',
            image: `${baseUrl}/og-image.png`, // Dinamis
            url: `${baseUrl}/shorten`, // Dinamis
            type: 'website'
        },
        twitter: {
            card: 'summary_large_image',
            title: 'URL Shortener',
            description: 'Generate short URLs instantly and share them anywhere.',
            image: `${baseUrl}/og-image.png`
        }
    };
};
