create table users
(
    id          bigserial                   not null,
    email       varchar(100)                not null,
    first_name  varchar(30)                 not null,
    middle_name varchar(40),
    last_name   varchar(50)                 not null,
    password    varchar(255)                not null,
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

insert into roles (name)
    values ('USER');
insert into roles (name)
    values ('MODERATOR');
insert into roles (name)
    values ('ADMIN');

INSERT INTO users (email, first_name, middle_name, last_name, password)
VALUES (
           'skondurushkin@it-one.ru',
           'Сергей',
           'Игоревич',
           'Кондурушкин',
           '$2a$10$7v4ZoxJRBCKWBvrzVZ5WU.s32TDClI4wgQnppBuoXxEUN/ud4G1GK'
       );
insert into user_roles (user_id, role_id)
values (1, 3);
