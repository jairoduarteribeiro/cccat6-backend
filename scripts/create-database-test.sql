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

CREATE TABLE ccca.coupon (
  code TEXT PRIMARY KEY,
  percentage NUMERIC,
  expire_date TIMESTAMP
);

CREATE TABLE ccca.order (
  order_code TEXT PRIMARY KEY,
  cpf TEXT,
  issue_date TIMESTAMP,
  coupon_code TEXT,
  total NUMERIC,
  freight NUMERIC
);

CREATE TABLE ccca.order_item (
  order_code TEXT,
  id_item INTEGER,
  price NUMERIC,
  quantity INTEGER,
  PRIMARY KEY (order_code, id_item)
);
