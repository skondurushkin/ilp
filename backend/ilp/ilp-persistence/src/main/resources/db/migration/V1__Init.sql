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
    end_date    date,
    extension   jsonb,
    primary key (id)
);

alter table if exists articles
    add constraint UK_articles_code unique (code);

create type accrual_status as enum (
    'created',
    'cancelled');

-- Начисления
create table accruals
(
    id      bigserial   not null,
    date    date    not null,
    user_id int     not null,
    activity_id int not null,
    amount   int not null,
    status  accrual_status not null default 'created',
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

create type op_type as enum (
    'accrual',
    'writeOff'
    );

-- история операций
create table operations
(
    id          bigserial   not null,
    type        op_type     not null,
    instant     timestamp(0) not null default now(),
    user_id     bigint      not null,
    accrual_id  bigint,
    writeoff_id bigint,
    name        varchar(50) not null,
    amount      int         not null,
    active      boolean default true,
    primary key (id)
);

alter table if exists operations
    add constraint FK_operations__accruals foreign key (accrual_id) references accruals ON DELETE CASCADE;

alter table if exists operations
    add constraint FK_operations__writeoffs foreign key (writeoff_id) references write_offs ON DELETE CASCADE;

create unique index UX_accrual_operations on operations(user_id, accrual_id) where accrual_id is not null;
create unique index UX_write_off_operations on operations(user_id, writeoff_id) where writeoff_id is not null;

create type event_type as enum (
    'login',
    'logout',
    'accrual',
    'writeOff',
    'error'
    );

create table event_log
(
    id          bigserial   not null,
    ev_type     event_type  not null,
    user_id     bigint      not null,
    instant     timestamp(0) not null default now(),
    ev_info     text        not null,
    primary key (id)
);

alter table if exists event_log
    add constraint FK_event_log__users foreign key (user_id) references users ON DELETE CASCADE;


CREATE OR REPLACE FUNCTION on_accrual_change() RETURNS TRIGGER AS $accrual_op$
DECLARE
    ACT_NAME varchar;
BEGIN
    select act.name into ACT_NAME from (
        select name from activities a where a.id = new.activity_id
    ) act;
    --
    -- Добавление строки в operations, которая отражает операцию начисления;
    --
    IF (TG_OP = 'UPDATE') THEN
        UPDATE operations SET name = ACT_NAME, amount = NEW.amount, active = NEW.status <> 'cancelled'::accrual_status
        WHERE accrual_id = new.id;
        CALL public.log_event(new.user_id, 'accrual'::event_type, format('Обновлена операция начисления %s', new.id));
        return NEW;
    ELSIF (TG_OP = 'INSERT') THEN
        insert into operations(type, user_id, accrual_id, name, amount)
        values('accrual'::op_type, new.user_id, new.id, ACT_NAME, new.amount);
        CALL public.log_event(new.user_id, 'accrual'::event_type, format('Создана операция начисления %s', new.id));
        return NEW;
    END IF;
    RETURN NULL;

END
$accrual_op$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION on_write_off_change() RETURNS TRIGGER AS $write_off_op$
DECLARE
    ART_NAME varchar;
BEGIN
    select art.name into ART_NAME from (
        select name from articles a where a.id = new.article_id
    ) art;

    --
    -- Добавление строки в operations, которая отражает операцию списания;
    --
    IF (TG_OP = 'UPDATE') THEN
        UPDATE operations SET name = ART_NAME, amount = NEW.amount
        WHERE writeoff_id = new.id;
        CALL public.log_event(new.user_id, 'writeOff'::event_type, format('Обновлена операция списания %s', new.id));
        return NEW;
    ELSIF (TG_OP = 'INSERT') THEN
        insert into operations(type, user_id, writeoff_id, name, amount)
        values('writeOff'::op_type, new.user_id, new.id, ART_NAME, new.amount);
        CALL public.log_event(new.user_id, 'writeOff'::event_type, format('Создана операция списания %s', new.id));
        return NEW;
    END IF;
    RETURN NULL;

END;
$write_off_op$ LANGUAGE plpgsql;


create trigger accrual_op
    AFTER INSERT OR UPDATE on accruals
    FOR EACH ROW EXECUTE PROCEDURE on_accrual_change();

create trigger write_off_op
    AFTER INSERT OR UPDATE on write_offs
    FOR EACH ROW EXECUTE PROCEDURE on_write_off_change();

CREATE OR REPLACE PROCEDURE public.log_event(_user_id bigint, _ev_type event_type, _ev_info text)
    language plpgsql
    as $$
begin
    insert into event_log(user_id, ev_type, ev_info)
    values (_user_id, _ev_type, _ev_info);
end;
$$;

CREATE OR REPLACE FUNCTION public.balance(userid bigint)
    RETURNS jsonb
    LANGUAGE plpgsql
AS $function$
declare
    earned integer;
    spent  integer;
    _result jsonb;
begin
    select coalesce (sum(a.amount), 0) into earned from accruals a where a.user_id = userId  and a.status <> 'cancelled'::accrual_status;
    select coalesce (sum(w.amount), 0) into spent from write_offs w where w.user_id = userId and w.status <> 'cancelled'::order_status;

    select row_to_json(t) into _result from (
        select userId, earned, spent, earned - spent as balance
    ) t;
    return _result;
END;
$function$
;

-- Permissions
alter procedure public.log_event(userid bigint, ev_type event_type, info text) owner to current_user;
grant all on procedure public.log_event(userid bigint, ev_type event_type, info text) to public;

alter function public.balance(int8) owner to current_user;
grant all on function public.balance(int8) to public;

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
            'profile/1.jpeg'
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
           'profile/2.jpeg'
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
           'profile/3.jpeg'
       );

insert into user_roles (user_id, role_id)
values  (3, 1);

insert into event_log(ev_type , user_id, instant, ev_info)
values
    ('login'::event_type, 1, '2023-03-14 12:00:00', 'Вход в программу лояльности'),
    ('login'::event_type, 2, '2023-03-14 13:00:00', 'Вход в программу лояльности'),
    ('login'::event_type, 3, '2023-03-14 14:00:00', 'Вход в программу лояльности')
;

insert into activities (name, description, start_date, price)
values
    ('Добро пожаловать!', 'Добро пожаловать в программу лояльности!', '3000-01-01', 10),
    ('Работа в компании', 'Мы награждаем наших сотрудников за стабильную трудовую деятельность на благо компании', '2020-01-01', 20),
    ('Юбилей сотрудника', 'Мы ценим ваш возраст и опыт', '2020-01-01', 25),
    ('Выступление', 'Публичное выступление на мероприятиях компании', '2020-01-01', 30),
    ('Наставничество', 'Участие в обучении новых сотрудников', '2020-01-01', 50),
    ('Собеседование', 'Собеседование с кандидатами', '2020-01-01', 40)
;

insert into articles (code, name, description, price, image_link, available)
values
    ('t-shirt-0001', 'Футболка', 'Черная футболка с логотипом компании', 5, 'article/t-shirt-0001.jpg', true),
    ('mug-0001', 'Кружка', 'Кружка с логотипом компании', 5, 'article/mug-0001.jpg', true),
    ('t-mug-0002', 'Термокружка', 'Термокружка с логотипом компании', 10, 'article/t-mug-0001.jpg', true)
;

insert into accruals (date, user_id, activity_id, amount)
values
    ('2023-03-24', 1, 1, 10),
    ('2023-03-24', 2, 1, 10),
    ('2023-03-24', 3, 1, 10),
    ('2023-03-24', 2, 3, 25),
    ('2023-03-22', 2, 4, 30),
    ('2023-03-22', 3, 2, 20)
;

insert into write_offs (date, user_id, article_id, amount, status)
values
    ('2023-03-25', 2, 2, 25, 'created'::order_status),
    ('2023-03-25', 3, 3, 10, 'completed'::order_status),
    ('2023-03-25', 2, 1, 5, 'delivering'::order_status)
;



