import { redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { shortUrls } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function load({ params }) {
    const { slug } = params;

    // Cari URL berdasarkan short_code
    const [data] = await db
        .select()
        .from(shortUrls)
        .where(eq(shortUrls.shortCode, slug));

    if (!data) throw redirect(302, '/shorten'); // Redirect jika tidak ditemukan

    // Update jumlah klik
    await db
        .update(shortUrls)
        .set({ clicks: data.clicks + 1 })
        .where(eq(shortUrls.shortCode, slug));

    throw redirect(302, data.originalUrl);
}