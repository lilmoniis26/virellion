-- Public page copy, extra catalog fields, and studio partner invites.

create table if not exists site_copy (
  id text primary key,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  updated_by text
);
insert into site_copy (id) values ('site') on conflict (id) do nothing;

alter table catalog_items add column if not exists departments jsonb not null default '[]'::jsonb;
alter table catalog_items add column if not exists package_kind text not null default '';

create table if not exists studio_invites (
  id text primary key,
  email text not null,
  role text not null default 'partner',
  token text not null unique,
  invited_by text not null,
  created_at timestamptz not null default now(),
  accepted_at timestamptz,
  revoked_at timestamptz
);
create index if not exists studio_invites_email_idx on studio_invites (lower(email));
create index if not exists studio_invites_token_idx on studio_invites (token);
create index if not exists studio_invites_open_idx on studio_invites (accepted_at, revoked_at);
