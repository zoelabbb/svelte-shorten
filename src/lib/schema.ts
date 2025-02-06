import { mysqlTable, varchar, int } from 'drizzle-orm/mysql-core';

export const urls = mysqlTable('urls', {
    id: int('id').primaryKey().autoincrement(),
    original_url: varchar('original_url', { length: 2048 }).notNull(),
    short_code: varchar('short_code', { length: 10 }).notNull().unique(),
    clicks: int('clicks').notNull().default(0)
});
