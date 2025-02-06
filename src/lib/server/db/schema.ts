import { mysqlTable, serial, int, varchar, datetime } from 'drizzle-orm/mysql-core';
import { sql } from "drizzle-orm";

export const user = mysqlTable('user', {
	id: varchar('id', { length: 255 }).primaryKey(),
	age: int('age'),
	username: varchar('username', { length: 32 }).notNull().unique(),
	passwordHash: varchar('password_hash', { length: 255 }).notNull()
});

export const session = mysqlTable('session', {
	id: varchar('id', { length: 255 }).primaryKey(),
	userId: varchar('user_id', { length: 255 })
		.notNull()
		.references(() => user.id),
	expiresAt: datetime('expires_at').notNull()
});

// Tabel untuk URL Shortener
export const shortUrls = mysqlTable("short_urls", {
	id: serial("id").primaryKey(),
	shortCode: varchar("short_code", { length: 10 }).notNull().unique(),
	originalUrl: varchar("original_url", { length: 2048 }).notNull(),
	createdAt: datetime("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
	clicks: int("clicks").notNull().default(0)
});

export type ShortUrls = typeof shortUrls.$inferSelect;

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;
