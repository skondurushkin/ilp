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
    avatar_link text,
    extension   jsonb,
    primary key (id)
);

alter table if exists users
    add constraint UK_users_email unique (email);


create table refresh_tokens
(
    id          bigserial                   not null,
    expiry_ts   timestamp(6) with time zone not null,
    token       varchar(40)                 not null,
    user_id     bigint,
    primary key (id)
);

alter table if exists refresh_tokens
    add constraint UK_refresh_tokens_token unique (token);

alter table if exists refresh_tokens
    add constraint FK_refresh_tokens__users foreign key (user_id) references users ON DELETE CASCADE;


create table roles
(
    id   bigserial not null,
    name varchar(20),
    primary key (id)
);

alter table if exists roles
    add constraint UK_roles_name unique (name);

create table user_roles
(
    user_id bigint not null,
    role_id bigint not null,
    primary key (user_id, role_id)
);

alter table if exists user_roles
    add constraint FK_user_roles__roles foreign key (role_id) references roles;

alter table if exists user_roles
    add constraint FK_user_roles__users foreign key (user_id) references users ON DELETE CASCADE;

create table activities
(
    id          bigserial   not null,
    name        varchar(50) not null,
    description varchar(500),
    price       integer,
    start_date  date not null default '3000-01-01',
    end_date    date not null default '3000-01-01',
    info_link   text,
    extension   jsonb,
    primary key (id)
);

alter table if exists activities
    add constraint UK_activities_name unique (name);

create table articles
(
    id          bigserial   not null,
    code        varchar(20) not null,
    name        varchar(50) not null,
    description varchar(500),
    price       integer,
    image_link  text,
    available   boolean default false,
    extension   jsonb,
    primary key (id)
);

alter table if exists articles
    add constraint UK_articles_code unique (code);

-- Начисления
create table accruals
(
    id      bigserial   not null,
    date    date    not null,
    user_id int     not null,
    activity_id int not null,
    amount   int not null,
    primary key (id)
);

alter table if exists accruals
    add constraint FK_accruals__users foreign key (user_id) references users ON DELETE CASCADE;
alter table if exists accruals
    add constraint FK_accruals__activities foreign key (activity_id) references activities ON DELETE CASCADE;


create type order_status as enum (
    'created',
    'processing',
    'delivering',
    'completed',
    'cancelled');

-- Списания
create table write_offs
(
    id          bigserial   not null,
    date        date        not null,
    user_id     int         not null,
    article_id  int         not null,
    amount      int         not null,
    status  order_status not null default 'created',
    primary key (id)
);

alter table if exists write_offs
    add constraint FK_write_offs__users foreign key (user_id) references users ON DELETE CASCADE;
alter table if exists write_offs
    add constraint FK_write_offs__articles foreign key (article_id) references articles ON DELETE CASCADE;

insert into settings (prop_key, prop_value)
values  ('db.version', '1.0'),
        ('admin.email', 'skondurushkin@gmail.com'),
        ('subject.accrual', 'IT_ONE Loyalty Program: Начисление вольт'),
        ('subject.support', 'IT_ONE Loyalty Program: Обращение в поддержку');

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

INSERT INTO users (email, first_name, middle_name, last_name, password, start_date, avatar_link)
VALUES (
           'test@it-one.ru',
           'Иван',
           'Иванович',
           'Тестовый',
           '$2a$10$7v4ZoxJRBCKWBvrzVZ5WU.s32TDClI4wgQnppBuoXxEUN/ud4G1GK',
           '2023-03-13',
           '/avatar/2.jpeg'
       );

insert into user_roles (user_id, role_id)
values  (2, 1);

INSERT INTO users (email, first_name, middle_name, last_name, password, start_date, avatar_link)
VALUES (
           'test2@it-one.ru',
           'Иван',
           'Иванович',
           'Тестовый-Второй',
           '$2a$10$7v4ZoxJRBCKWBvrzVZ5WU.s32TDClI4wgQnppBuoXxEUN/ud4G1GK',
           '2023-03-13',
           '/avatar/3.jpeg'
       );

insert into user_roles (user_id, role_id)
values  (3, 1);

insert into activities (name, description, start_date, price)
values
    ('Работа в компании', 'Мы награждаем наших сотрудников за стабильную трудовую деятельность на благо компании', '2020-01-01', 20),
    ('Юбилей сотрудника', 'Мы ценим ваш возраст и опыт', '2020-01-01', 25),
    ('Выступление', 'Публичное выступление на мероприятиях компании', '2020-01-01', 30),
    ('Наставничество', 'Участие в обучении новых сотрудников', '2020-01-01', 50),
    ('Собеседование', 'Собеседование с кандидатами', '2020-01-01', 40)
;

insert into articles (code, name, description, price, image_link, available)
values
    ('t-shirt-0001', 'Футболка', 'Черная футболка с логотипом компании', 5, '/articles/t-shirt-0001.jpg', true),
    ('mug-0001', 'Кружка', 'Кружка с логотипом компании', 5, '/articles/mug-0001.jpg', true),
    ('t-mug-0002', 'Термокружка', 'Термокружка с логотипом компании', 10, '/articles/t-mug-0001.jpg', true)
;

insert into accruals (date, user_id, activity_id, amount)
values
    ('2023-03-24', 2, 2, 25),
    ('2023-03-22', 2, 3, 30),
    ('2023-03-22', 3, 1, 20)
;

insert into write_offs (date, user_id, article_id, amount, status)
values
    ('2023-03-25', 2, 2, 25, 'created'::order_status),
    ('2023-03-25', 3, 3, 10, 'completed'::order_status),
    ('2023-03-25', 2, 1, 5, 'delivering'::order_status)
;




