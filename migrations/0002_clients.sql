-- Client accounts, inquiries, and orders. Per-user rows are scoped by user_id TEXT.

create table if not exists profiles (
  user_id text primary key,
  email text not null default '',
  name text not null default '',
  role text not null default 'client',
  created_at timestamptz not null default now()
);
create index if not exists profiles_role_idx on profiles (role);

create table if not exists client_inquiries (
  id text primary key,
  user_id text not null,
  name text not null,
  email text not null,
  phone text not null default '',
  desired_outcome text not null,
  intake text not null,
  routing text,
  source text not null default 'form',
  status text not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists client_inquiries_user_id_idx on client_inquiries (user_id);
create index if not exists client_inquiries_created_at_idx on client_inquiries (created_at desc);

create table if not exists orders (
  id text primary key,
  user_id text not null,
  kind text not null,
  catalog_id text not null,
  title text not null,
  summary text not null,
  amount integer not null,
  price_suffix text not null default '',
  billing_name text not null,
  billing_email text not null,
  notes text not null default '',
  payment_method text not null default '',
  status text not null default 'pending_payment',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists orders_user_id_idx on orders (user_id);
create index if not exists orders_created_at_idx on orders (created_at desc);
