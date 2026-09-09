import { isOperator } from "@/lib/access";
import { getSql } from "@/lib/db";
import { sanitizeImage } from "@/lib/media";
import { mergeSiteCopy, type SiteCopy } from "@/lib/site-copy";
import { requireStaff } from "@/lib/staff.server";

function cleanImages(copy: SiteCopy): SiteCopy {
  return {
    ...copy,
    home: {
      ...copy.home,
      image: sanitizeImage(copy.home.image) || copy.home.image,
      studioImage: sanitizeImage(copy.home.studioImage) || copy.home.studioImage,
    },
    services: { ...copy.services, image: sanitizeImage(copy.services.image) || copy.services.image },
    packages: { ...copy.packages, image: sanitizeImage(copy.packages.image) || copy.packages.image },
    work: {
      ...copy.work,
      image: sanitizeImage(copy.work.image) || copy.work.image,
      engagementImage: sanitizeImage(copy.work.engagementImage) || copy.work.engagementImage,
    },
    start: { ...copy.start, image: sanitizeImage(copy.start.image) || copy.start.image },
    receptionist: {
      ...copy.receptionist,
      image: sanitizeImage(copy.receptionist.image) || copy.receptionist.image,
    },
    account: { ...copy.account, image: sanitizeImage(copy.account.image) || copy.account.image },
    legal: {
      ...copy.legal,
      termsImage: sanitizeImage(copy.legal.termsImage) || copy.legal.termsImage,
      privacyImage: sanitizeImage(copy.legal.privacyImage) || copy.legal.privacyImage,
    },
  };
}

export async function readSiteCopy(): Promise<SiteCopy> {
  const sql = await getSql();
  await sql`insert into site_copy (id) values ('site') on conflict (id) do nothing`;
  const rows = await sql<{ payload: unknown }>`select payload from site_copy where id = 'site' limit 1`;
  return mergeSiteCopy(rows[0]?.payload);
}

export async function saveSiteCopyFor(userId: string, payload: SiteCopy): Promise<SiteCopy> {
  const role = await requireStaff(userId);
  const current = await readSiteCopy();
  const next = cleanImages(mergeSiteCopy(payload));
  if (!isOperator(role)) {
    next.legal = current.legal;
  }
  const sql = await getSql();
  await sql`
    insert into site_copy (id, payload, updated_at, updated_by)
    values ('site', ${JSON.stringify(next)}::jsonb, now(), ${userId})
    on conflict (id) do update set
      payload = excluded.payload,
      updated_at = now(),
      updated_by = excluded.updated_by
  `;
  return readSiteCopy();
}

export async function resetSiteCopyFor(userId: string): Promise<SiteCopy> {
  const role = await requireStaff(userId);
  const sql = await getSql();
  if (!isOperator(role)) {
    const current = await readSiteCopy();
    await sql`
      update site_copy
      set payload = ${JSON.stringify({ legal: current.legal })}::jsonb, updated_at = now(), updated_by = ${userId}
      where id = 'site'
    `;
    return readSiteCopy();
  }
  await sql`
    update site_copy
    set payload = '{}'::jsonb, updated_at = now(), updated_by = ${userId}
    where id = 'site'
  `;
  return readSiteCopy();
}

export async function readTermsVersion(): Promise<string> {
  const copy = await readSiteCopy();
  return copy.legal.version;
}
