CREATE TABLE `accounts` (
	`owner` text PRIMARY KEY NOT NULL,
	`version` integer DEFAULT 0 NOT NULL,
	`data` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `operations` (
	`owner` text NOT NULL,
	`id` text NOT NULL,
	`created_at` text NOT NULL,
	PRIMARY KEY(`owner`, `id`)
);
