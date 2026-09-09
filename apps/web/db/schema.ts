import {
  sqliteTable,
  text,
  integer,
  primaryKey,
  index,
} from "drizzle-orm/sqlite-core";
export const accounts = sqliteTable("accounts", {
  owner: text("owner").primaryKey(),
  version: integer("version").notNull().default(0),
  data: text("data").notNull(),
  updatedAt: text("updated_at").notNull(),
  lastOperation: text("last_operation").notNull().default(""),
});
export const operations = sqliteTable(
  "operations",
  {
    owner: text("owner").notNull(),
    id: text("id").notNull(),
    createdAt: text("created_at").notNull(),
  },
  (t) => [primaryKey({ columns: [t.owner, t.id] })],
);

export const deviceTokens = sqliteTable("device_tokens", {
  hash: text("hash").primaryKey(),
  owner: text("owner").notNull(),
  expires: text("expires").notNull(),
});

export const rateLimits=sqliteTable('rate_limits',{owner:text('owner').notNull(),bucket:text('bucket').notNull(),count:integer('count').notNull(),expires:integer('expires').notNull()},t=>[primaryKey({columns:[t.owner,t.bucket]})]);

export const authChallenges = sqliteTable("auth_challenges", {hash:text("hash").primaryKey(),expires:integer("expires").notNull()},t=>[index("auth_challenges_expiry").on(t.expires)]);
export const authSessions = sqliteTable("auth_sessions", {hash:text("hash").primaryKey(),owner:text("owner").notNull(),email:text("email").notNull(),name:text("name").notNull(),expires:integer("expires").notNull()},t=>[index("auth_sessions_expiry").on(t.expires),index("auth_sessions_owner").on(t.owner)]);
