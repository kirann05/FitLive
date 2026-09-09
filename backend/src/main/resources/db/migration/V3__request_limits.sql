CREATE TABLE request_limits (
 owner_id text NOT NULL,
 bucket text NOT NULL,
 count integer NOT NULL,
 expires_at bigint NOT NULL,
 PRIMARY KEY(owner_id,bucket)
);
