CREATE INDEX `auth_challenges_expiry` ON `auth_challenges` (`expires`);--> statement-breakpoint
CREATE INDEX `auth_sessions_expiry` ON `auth_sessions` (`expires`);--> statement-breakpoint
CREATE INDEX `auth_sessions_owner` ON `auth_sessions` (`owner`);