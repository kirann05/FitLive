CREATE TABLE `rate_limits` (
	`owner` text NOT NULL,
	`bucket` text NOT NULL,
	`count` integer NOT NULL,
	`expires` integer NOT NULL,
	PRIMARY KEY(`owner`, `bucket`)
);
