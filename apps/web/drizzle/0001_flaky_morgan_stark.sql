CREATE TABLE `device_tokens` (
	`hash` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`expires` text NOT NULL
);
--> statement-breakpoint
ALTER TABLE `accounts` ADD `last_operation` text DEFAULT '' NOT NULL;