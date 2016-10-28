# --- Created by Ebean DDL
# To stop Ebean DDL generation, remove this comment and start using Evolutions

# --- !Ups

create table user (
  id                            bigint not null,
  email                         varchar(255) not null,
  sha_password                  varbinary(64) not null,
  constraint uq_user_email unique (email),
  constraint pk_user primary key (id)
);
create sequence user_seq;


# --- !Downs

drop table if exists user;
drop sequence if exists user_seq;

