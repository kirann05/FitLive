import {
  sqliteTable,
  text,
  integer,
  primaryKey,
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
