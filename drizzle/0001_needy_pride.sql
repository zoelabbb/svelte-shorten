CREATE TABLE `short_urls` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`short_code` varchar(10) NOT NULL,
	`original_url` varchar(2048) NOT NULL,
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`clicks` int NOT NULL DEFAULT 0,
	CONSTRAINT `short_urls_id` PRIMARY KEY(`id`),
	CONSTRAINT `short_urls_short_code_unique` UNIQUE(`short_code`)
);
