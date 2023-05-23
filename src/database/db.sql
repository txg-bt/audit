-- CREATE DATABASE audit-service;
-- \c audit-service
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE logs (
  log_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  route VARCHAR(255) NOT NULL,
  status_code INT NOT NULL,
  message TEXT NOT NULL,
  user_id UUID,
  app_name VARCHAR(255) NOT NULL,
  timestamp TIMESTAMP 
);