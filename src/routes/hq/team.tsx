import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useStudioProfile } from "@/components/auth-slot";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OPERATOR_NEVER_IN_DESK, OPERATOR_ONLY, PARTNER_MAY } from "@/lib/access";
import { inviteStudioPartner, listStudioTeam, revokeStudioPartner } from "@/lib/team-data";
import { formatDate } from "@/lib/utils";

export const Route = createFileRoute("/hq/team")({
  component: TeamPage,
});

function TeamPage() {
  const { profile } = useStudioProfile();
  const [staff, setStaff] = useState<{ userId: string; name: string; email: string; role: "operator" | "partner"; createdAt: string }[]>([]);
  const [invites, setInvites] = useState<{ id: string; email: string; token: string; createdAt: string }[]>([]);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState("");
  const [busy, setBusy] = useState(false);
  const [inviteUrl, setInviteUrl] = useState("");

  const load = () => {
    listStudioTeam()
      .then((data) => {
        setStaff(data.staff);
        setInvites(data.invites);
      })
      .catch((e: unknown) => setError(e instanceof Error ? e.message : "Could not load the team."));
  };

  useEffect(() => {
    load();
  }, []);

  const invite = async () => {
    setBusy(true);
    setError("");
    setSaved("");
    setInviteUrl("");
    try {
      const next = await inviteStudioPartner({ data: { email } });
      setStaff(next.staff);
      setInvites(next.invites);
      setEmail("");
      if (next.granted) {
        setSaved("That account is now a studio partner. They will see Desk on their next visit.");
      } else {
        const pending = next.invites.find((row) => row.email === email.trim().toLowerCase()) ?? next.invites[0];
        if (pending) {
          const url = `${window.location.origin}/login?invite=${pending.token}&redirect=${encodeURIComponent("/hq")}`;
          setInviteUrl(url);
        }
        setSaved("Invitation created. Send them the link below. They must sign in with that email.");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not invite.");
    } finally {
      setBusy(false);
    }
  };

  const revoke = async (target: { userId?: string; inviteId?: string }) => {
    setBusy(true);
    setError("");
    setSaved("");
    try {
      const next = await revokeStudioPartner({ data: target });
      setStaff(next.staff);
      setInvites(next.invites);
      setSaved("Partner access removed.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not update access.");
    } finally {
      setBusy(false);
    }
  };

  if (profile && profile.role !== "operator") {
    return (
      <main className="px-4 py-8 sm:px-6">
        <h1 className="font-display text-3xl text-fg">Team</h1>
        <p className="mt-3 max-w-xl text-sm text-muted">Only the studio operator can invite or remove partners.</p>
      </main>
    );
  }

  return (
    <main className="px-4 py-8 sm:px-6">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-subtle">Studio</p>
      <h1 className="mt-2 font-display text-3xl text-fg">Partners</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
        Invite someone to help keep the public site current. A partner can edit pages, prices, photographs, and client
        work. They cannot change PayPal, confirm receipts, export the marketing list, edit terms, or touch domain, DNS,
        banking, or account recovery — those stay off this desk entirely.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-border bg-surface p-6">
          <p className="text-xs uppercase tracking-[0.14em] text-subtle">Partners may</p>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {PARTNER_MAY.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section className="rounded-xl border border-border bg-surface p-6">
          <p className="text-xs uppercase tracking-[0.14em] text-subtle">Operator only</p>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {OPERATOR_ONLY.map((item) => (
              <li key={item}>{item}</li>
            ))}
            {OPERATOR_NEVER_IN_DESK.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>

      <form
        className="mt-10 max-w-xl space-y-4 rounded-xl border border-border bg-surface p-6"
        onSubmit={(e) => {
          e.preventDefault();
          void invite();
        }}
      >
        <Label htmlFor="partner-email">Partner email</Label>
        <Input
          id="partner-email"
          type="email"
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@example.com"
        />
        <Button type="submit" disabled={busy || !email.trim()}>
          {busy ? "Sending…" : "Invite partner"}
        </Button>
        {error ? <p className="text-sm text-danger">{error}</p> : null}
        {saved ? <p className="text-sm text-ok">{saved}</p> : null}
        {inviteUrl ? (
          <div className="space-y-2">
            <p className="break-all font-mono text-xs text-muted">{inviteUrl}</p>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => {
                void navigator.clipboard.writeText(inviteUrl).then(
                  () => setSaved("Invitation link copied."),
                  () => setSaved("Copy the link above and send it to them."),
                );
              }}
            >
              Copy invite link
            </Button>
          </div>
        ) : null}
      </form>

      <section className="mt-12">
        <h2 className="font-display text-2xl text-fg">People with desk access</h2>
        <ul className="mt-4 divide-y divide-border border-y border-border">
          {staff.map((member) => (
            <li key={member.userId} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-fg">{member.name || member.email}</p>
                <p className="mt-1 text-sm text-muted">
                  {member.email} · {member.role === "operator" ? "Operator" : "Partner"} · since{" "}
                  {formatDate(member.createdAt)}
                </p>
              </div>
              {member.role === "partner" ? (
                <Button size="sm" variant="outline" disabled={busy} onClick={() => void revoke({ userId: member.userId })}>
                  Remove partner access
                </Button>
              ) : (
                <p className="text-xs text-subtle">Full studio control</p>
              )}
            </li>
          ))}
        </ul>
      </section>

      {invites.length ? (
        <section className="mt-12">
          <h2 className="font-display text-2xl text-fg">Open invitations</h2>
          <ul className="mt-4 divide-y divide-border border-y border-border">
            {invites.map((inviteRow) => (
              <li key={inviteRow.id} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-fg">{inviteRow.email}</p>
                  <p className="mt-1 text-xs text-subtle">Sent {formatDate(inviteRow.createdAt)}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    type="button"
                    onClick={() => {
                      const url = `${window.location.origin}/login?invite=${inviteRow.token}&redirect=${encodeURIComponent("/hq")}`;
                      void navigator.clipboard.writeText(url).then(
                        () => setSaved(`Invite link copied for ${inviteRow.email}.`),
                        () => {
                          setInviteUrl(url);
                          setSaved("Copy the link below and send it to them.");
                        },
                      );
                    }}
                  >
                    Copy invite link
                  </Button>
                  <Button size="sm" variant="outline" disabled={busy} onClick={() => void revoke({ inviteId: inviteRow.id })}>
                    Revoke invite
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  );
}
