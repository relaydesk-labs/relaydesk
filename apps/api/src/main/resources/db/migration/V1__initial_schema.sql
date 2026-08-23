create table tenants (
  id varchar(80) primary key,
  name varchar(160) not null
);

create table organizations (
  id varchar(80) primary key,
  tenant_id varchar(80) not null,
  name varchar(160) not null
);

create table people (
  id varchar(80) primary key,
  tenant_id varchar(80) not null,
  organization_id varchar(80) not null,
  display_name varchar(160) not null
);

create table business_services (
  id varchar(80) primary key,
  tenant_id varchar(80) not null,
  domain_name varchar(120) not null,
  name varchar(160) not null,
  lifecycle varchar(40) not null
);

create table applications (
  id varchar(80) primary key,
  tenant_id varchar(80) not null,
  name varchar(160) not null,
  lifecycle varchar(40) not null,
  replacement_application_id varchar(80)
);

create table application_modules (
  id varchar(80) primary key,
  tenant_id varchar(80) not null,
  application_id varchar(80) not null,
  code varchar(40) not null,
  name varchar(160) not null
);

create table tickets (
  id varchar(80) primary key,
  tenant_id varchar(80) not null,
  title varchar(240) not null,
  request_type varchar(40) not null,
  status varchar(40) not null,
  business_service_id varchar(80),
  application_id varchar(80),
  module_id varchar(80),
  owner_organization_id varchar(80),
  owner_person_id varchar(80),
  created_at timestamp not null
);

create table ticket_history (
  id varchar(80) primary key,
  tenant_id varchar(80) not null,
  ticket_id varchar(80) not null,
  event_type varchar(80) not null,
  message varchar(1000) not null,
  created_at timestamp not null
);
