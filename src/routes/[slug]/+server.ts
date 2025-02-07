import { redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { shortUrls } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function GET({ params }) {
    const { slug } = params;

    const [data] = await db
        .select()
        .from(shortUrls)
        .where(eq(shortUrls.shortCode, slug));

    console.log('Data ditemukan:', data); // Debugging

    if (!data) {
        console.log('Slug tidak ditemukan, redirect ke home');
        throw redirect(302, '/');
    }

    console.log('Redirecting ke:', data.originalUrl);

    await db
        .update(shortUrls)
        .set({ clicks: data.clicks + 1 })
        .where(eq(shortUrls.shortCode, slug));

    throw redirect(302, data.originalUrl);
}
