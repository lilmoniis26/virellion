import { r as getSql } from "./db-Dx6HJ51b.mjs";
import { r as mergeSiteCopy } from "./site-copy-C858ekuO.mjs";
import { n as sanitizeImage } from "./media-bFZo8o61.mjs";
import { i as isOperator } from "./access-Ty0QsjcV.mjs";
import { requireStaff } from "./staff.server-CL-6ZGxS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/site-copy-data.server-BoUZC8A5.js
function cleanImages(copy) {
	return {
		...copy,
		home: {
			...copy.home,
			image: sanitizeImage(copy.home.image) || copy.home.image,
			studioImage: sanitizeImage(copy.home.studioImage) || copy.home.studioImage
		},
		services: {
			...copy.services,
			image: sanitizeImage(copy.services.image) || copy.services.image
		},
		packages: {
			...copy.packages,
			image: sanitizeImage(copy.packages.image) || copy.packages.image
		},
		work: {
			...copy.work,
			image: sanitizeImage(copy.work.image) || copy.work.image,
			engagementImage: sanitizeImage(copy.work.engagementImage) || copy.work.engagementImage
		},
		start: {
			...copy.start,
			image: sanitizeImage(copy.start.image) || copy.start.image
		},
		receptionist: {
			...copy.receptionist,
			image: sanitizeImage(copy.receptionist.image) || copy.receptionist.image
		},
		account: {
			...copy.account,
			image: sanitizeImage(copy.account.image) || copy.account.image
		},
		legal: {
			...copy.legal,
			termsImage: sanitizeImage(copy.legal.termsImage) || copy.legal.termsImage,
			privacyImage: sanitizeImage(copy.legal.privacyImage) || copy.legal.privacyImage
		}
	};
}
async function readSiteCopy() {
	const sql = await getSql();
	await sql`insert into site_copy (id) values ('site') on conflict (id) do nothing`;
	const rows = await sql`select payload from site_copy where id = 'site' limit 1`;
	return mergeSiteCopy(rows[0]?.payload);
}
async function saveSiteCopyFor(userId, payload) {
	const role = await requireStaff(userId);
	const current = await readSiteCopy();
	const next = cleanImages(mergeSiteCopy(payload));
	if (!isOperator(role)) next.legal = current.legal;
	await (await getSql())`
    insert into site_copy (id, payload, updated_at, updated_by)
    values ('site', ${JSON.stringify(next)}::jsonb, now(), ${userId})
    on conflict (id) do update set
      payload = excluded.payload,
      updated_at = now(),
      updated_by = excluded.updated_by
  `;
	return readSiteCopy();
}
async function resetSiteCopyFor(userId) {
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
async function readTermsVersion() {
	return (await readSiteCopy()).legal.version;
}
//#endregion
export { readSiteCopy, readTermsVersion, resetSiteCopyFor, saveSiteCopyFor };
