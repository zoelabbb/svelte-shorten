import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { shortUrls } from '$lib/server/db/schema';
import { nanoid } from 'nanoid';
import { eq } from 'drizzle-orm';

export async function POST({ request }) {
    try {
        const { url } = await request.json();

        if (!url) {
            return json({ error: 'URL is required' }, { status: 400 });
        }

        const shortCode = nanoid(6); // Generate short code

        // Insert data dan ambil ID
        const insertResult = await db
            .insert(shortUrls)
            .values({
                originalUrl: url,  // ✅ Sesuaikan dengan schema
                shortCode: shortCode
            })
            .$returningId(); // ✅ Ambil ID dengan benar

        if (!insertResult) {
            return json({ error: 'Failed to insert' }, { status: 500 });
        }

        // Ambil data lengkap berdasarkan ID
        const [newUrl] = await db
            .select()
            .from(shortUrls)
            .where(eq(shortUrls.id, insertResult[0].id)); // ✅ Gunakan insertResult[0].id

        return json({ shortUrl: `/short/${newUrl.shortCode}` });
    } catch (error) {
        console.error(error);
        return json({ error: 'Something went wrong' }, { status: 500 });
    }
}