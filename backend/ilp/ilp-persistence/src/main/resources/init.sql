-- DROP DATABASE IF EXISTS ilp;
-- DROP ROLE IF EXISTS ilpuser;

CREATE ROLE ilpuser WITH
  LOGIN
  SUPERUSER
  INHERIT
  CREATEDB
  CREATEROLE
  REPLICATION
  ENCRYPTED PASSWORD 'SCRAM-SHA-256$4096:uqLVJv7o2uOga3mfDH73Ew==$uTYoxs/xfPYRNYP7DPOLfPj3YsDbQivRYEmSsnbyrzc=:MTR/tEw3GDdRp50FQYTkFSRKHdff3/pQ5p7QiHYmF9s=';

CREATE DATABASE ilp
    WITH
    OWNER = ilpuser
    ENCODING = 'UTF8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;
