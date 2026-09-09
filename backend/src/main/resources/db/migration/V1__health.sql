CREATE TABLE health_samples (
 owner_id VARCHAR(255) NOT NULL,
 source_id VARCHAR(120) NOT NULL,
 day DATE NOT NULL,
 payload TEXT NOT NULL,
 received_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY(owner_id,source_id)
);
CREATE INDEX idx_health_owner_day ON health_samples(owner_id,day);
