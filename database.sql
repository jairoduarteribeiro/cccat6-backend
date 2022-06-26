CREATE DATABASE cccat6_test;

CREATE SCHEMA ccca;

CREATE TABLE ccca.item (
  id_item SERIAL PRIMARY KEY,
  description TEXT,
  price NUMERIC,
  width INTEGER,
  height INTEGER,
  length INTEGER,
  weight INTEGER
);
