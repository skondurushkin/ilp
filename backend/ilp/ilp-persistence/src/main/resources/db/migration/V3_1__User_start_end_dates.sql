alter table users
    add column start_date date not null default now(),
    add column end_date date not null default '3000-01-01';
