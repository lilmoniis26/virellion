-- PayPal settings, receipts, consent, notifications, and client roster fields.

create table if not exists studio_settings (
  id text primary key,
  paypal_me text not null default '',
  paypal_email text not null default '',
  paypal_link text not null default '',
  notify_email text not null default '',
  updated_at timestamptz not null default now()
);
insert into studio_settings (id) values ('default') on conflict (id) do nothing;

create sequence if not exists atlas_receipt_seq start with 1001;

alter table profiles add column if not exists phone text not null default '';
alter table profiles add column if not exists marketing_opt_in boolean not null default false;
alter table profiles add column if not exists marketing_opt_in_at timestamptz;
alter table profiles add column if not exists terms_version text not null default '';
alter table profiles add column if not exists terms_accepted_at timestamptz;

alter table orders add column if not exists terms_version text not null default '';
alter table orders add column if not exists terms_accepted_at timestamptz;
alter table orders add column if not exists marketing_opt_in boolean not null default false;
alter table orders add column if not exists receipt_number text;
alter table orders add column if not exists paid_at timestamptz;

create unique index if not exists orders_receipt_number_uidx on orders (receipt_number) where receipt_number is not null;

create table if not exists studio_notifications (
  id text primary key,
  kind text not null,
  title text not null,
  body text not null,
  href text not null default '',
  order_id text,
  inquiry_id text,
  about_user_id text,
  audience text not null default 'operator',
  audience_user_id text,
  read_at timestamptz,
  created_at timestamptz not null default now()
);
create index if not exists studio_notifications_audience_idx
  on studio_notifications (audience, created_at desc);
create index if not exists studio_notifications_unread_idx
  on studio_notifications (audience, read_at, created_at desc);
