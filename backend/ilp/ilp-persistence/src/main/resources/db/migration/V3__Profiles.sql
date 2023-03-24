insert into user_roles (user_id, role_id) VALUES (1, 1);

alter table users
add column avatar_url VARCHAR(512),
add column extension jsonb;

update users set avatar_url= 'https://s.gravatar.com/avatar/8b1fd0aefd3189c2affd9b13145a6959?s=80',
                 extension = '{"moreInfo": {}}'
where id = 1;


