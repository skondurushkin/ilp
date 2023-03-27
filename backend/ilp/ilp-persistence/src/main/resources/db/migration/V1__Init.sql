create table settings (
  prop_key varchar(100) not null primary key,
  prop_value text
);

create table users
(
    id          bigserial                   not null,
    email       varchar(100)                not null,
    first_name  varchar(30)                 not null,
    middle_name varchar(40),
    last_name   varchar(50)                 not null,
    password    varchar(255)                not null,
    start_date  date                        not null default now(),
    end_date    date                        not null default '3000-01-01',
    avatar_link varchar(512),
    extension   jsonb,
    primary key (id)
);

create table refresh_tokens
(
    id          bigserial                   not null,
    expiry_ts   timestamp(6) with time zone not null,
    token       varchar(40)                 not null,
    user_id     bigint,
    primary key (id)
);

create table roles
(
    id   bigserial not null,
    name varchar(20),
    primary key (id)
);

create table user_roles
(
    user_id bigint not null,
    role_id bigint not null,
    primary key (user_id, role_id)
);

create table activities
(
    id          bigserial   not null,
    name        varchar(50) not null,
    description varchar(500),
    price       integer,
    start_date  date not null default '3000-01-01',
    end_date    date not null default '3000-01-01',
    logo_link   varchar(512),
    extension   jsonb,
    primary key (id)
);

create table articles
(
    id          bigserial   not null,
    code        varchar(20) not null,
    name        varchar(50) not null,
    description varchar(500),
    price       integer,
    image_link  varchar(512),
    available   boolean default false,
    extension   jsonb,
    primary key (id)
);

alter table if exists settings
    add constraint UK_settings_prop_key unique (prop_key);

alter table if exists refresh_tokens
    add constraint UK_refresh_tokens_token unique (token);

alter table if exists roles
    add constraint UK_roles_name unique (name);

alter table if exists users
    add constraint UK_users_email unique (email);

alter table if exists refresh_tokens
    add constraint FK_refresh_tokens__users foreign key (user_id) references users ON DELETE CASCADE;

alter table if exists user_roles
    add constraint FK_user_roles__roles foreign key (role_id) references roles;

alter table if exists user_roles
    add constraint FK_user_roles__users foreign key (user_id) references users ON DELETE CASCADE;

alter table if exists activities
    add constraint UK_activities_name unique (name);

alter table if exists articles
    add constraint UK_articles_code unique (code);


insert into settings (prop_key, prop_value)
values ('db.version', '1.0');

insert into roles (name)
values ('USER');
insert into roles (name)
values ('MODERATOR');
insert into roles (name)
values ('ADMIN');

INSERT INTO users (email, first_name, middle_name, last_name, password, start_date, avatar_link)
VALUES (
           'skondurushkin@it-one.ru',
           'Сергей',
           'Игоревич',
           'Кондурушкин',
           '$2a$10$7v4ZoxJRBCKWBvrzVZ5WU.s32TDClI4wgQnppBuoXxEUN/ud4G1GK',
           '2023-03-13',
            '/avatar/1.jpeg'
       );

insert into user_roles (user_id, role_id)
values  (1, 1),
        (1, 3);

