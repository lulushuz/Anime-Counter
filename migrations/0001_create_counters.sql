-- Visitor counters. WITHOUT ROWID: the primary key IS the table,
-- so every increment writes exactly one row (cheapest possible on D1).
CREATE TABLE IF NOT EXISTS counters (
  username TEXT PRIMARY KEY NOT NULL,
  count    INTEGER NOT NULL DEFAULT 0
) WITHOUT ROWID;
