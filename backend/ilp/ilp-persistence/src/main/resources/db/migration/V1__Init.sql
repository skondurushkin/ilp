
CREATE TABLE settings (
  prop_key varchar(100) PRIMARY KEY,
  prop_value varchar(1000)
);

INSERT INTO settings (prop_key, prop_value)
VALUES ('db.version', '1.0')
ON CONFLICT (prop_key) DO UPDATE
    SET prop_value = excluded.prop_value;

INSERT INTO settings (prop_key, prop_value)
VALUES ('greeting.default', 'Hello client!')
ON CONFLICT (prop_key) DO UPDATE
    SET prop_value = excluded.prop_value;
