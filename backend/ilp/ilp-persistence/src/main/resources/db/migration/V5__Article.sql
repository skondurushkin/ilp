create table article
(
    id          bigserial primary key,
    name        text not null,
    description text not null,
    price       bigint,
    img_link    text,
    exists      boolean default false,
    attribute   jsonb
);