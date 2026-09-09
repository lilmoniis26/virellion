-- Operator-editable catalog overlays. Seed copy stays in src/lib/catalog.ts.

create table if not exists catalog_items (
  kind text not null,
  id text not null,
  published boolean not null default true,
  name text not null default '',
  short_name text not null default '',
  eyebrow text not null default '',
  summary text not null default '',
  outcome text not null default '',
  timeline text not null default '',
  next_step text not null default '',
  typical_clients text not null default '',
  price integer,
  price_suffix text not null default '',
  image text not null default '',
  image_alt text not null default '',
  deliverables jsonb not null default '[]'::jsonb,
  exclusions jsonb not null default '[]'::jsonb,
  capabilities jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (kind, id)
);

create index if not exists catalog_items_published_idx on catalog_items (kind, published);
