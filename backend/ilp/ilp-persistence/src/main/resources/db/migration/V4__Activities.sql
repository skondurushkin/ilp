create table activities
(
    id          bigserial   not null,
    name        varchar(50) not null,
    description varchar(500),
    start_date  date not null default '3000-01-01',
    end_date    date not null default '3000-01-01',
    extension   jsonb default '{}',
    primary key (id)
);

alter table if exists activities add constraint UK_activities_name unique (name);

