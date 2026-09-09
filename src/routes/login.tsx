import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHero } from "@/components/page-hero";
import { useSiteCopy } from "@/components/site-copy-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GROK_PROVIDERS, authClient, authEnabled, signIn } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { safeRedirect } from "@/lib/commerce";
import { pageHead } from "@/lib/seo";
import { acceptStudioInvite } from "@/lib/team-data";

type Search = { redirect?: string; invite?: string };

export const Route = createFileRoute("/login")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    redirect: typeof s.redirect === "string" ? s.redirect : undefined,
    invite: typeof s.invite === "string" ? s.invite : undefined,
  }),
  head: () => pageHead("Sign in", "Create a Virellion account to submit work, order packages, and pay."),
  component: LoginPage,
});

function LoginPage() {
  const { redirect: rawRedirect, invite } = Route.useSearch();
  const redirect = safeRedirect(rawRedirect, invite ? "/hq" : "/account");
  const copy = useSiteCopy();
  const { user, isPending } = useCurrentUserState();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (isPending || !user) return;
    let cancelled = false;
    const go = async () => {
      if (invite) {
        try {
          await acceptStudioInvite({ data: { token: invite } });
        } catch {
          /* Profile creation also applies an open invite by email. */
        }
      }
      if (!cancelled) window.location.replace(redirect);
    };
    void go();
    return () => {
      cancelled = true;
    };
  }, [isPending, user, redirect, invite]);

  if (isPending || user) {
    return <main className="min-h-[60dvh]" />;
  }

  const go = (path: string) => {
    window.location.assign(path);
  };

  const submitEmail = async () => {
    if (!authEnabled) return;
    setError("");
    if (mode === "signup" && !terms) {
      setError("Please agree to the Terms of Engagement and Privacy Notice.");
      return;
    }
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error: err } = await authClient.signUp.email({
          email: email.trim(),
          password,
          name: name.trim() || email.trim(),
        });
        if (err) throw new Error(err.message || "Could not create the account.");
      } else {
        const { error: err } = await authClient.signIn.email({
          email: email.trim(),
          password,
        });
        if (err) throw new Error(err.message || "Could not sign in.");
      }
      await authClient.getSession();
      if (invite) {
        try {
          await acceptStudioInvite({ data: { token: invite } });
        } catch (e) {
          setError(e instanceof Error ? e.message : "Signed in, but the invitation could not be applied.");
        }
      }
      go(redirect);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
      setBusy(false);
    }
  };

  return (
    <main>
      <PageHero
        src="/media/paper.jpg"
        alt="Brass compass and blank cotton paper on slate."
        kicker={copy.login.kicker}
        title={mode === "signup" ? copy.login.titleSignUp : copy.login.titleSignIn}
        dek={copy.login.dek}
        compact
      />
      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-2">
        <div>
          {invite ? (
            <p className="mb-6 rounded-xl border border-border bg-surface px-4 py-3 text-sm text-fg">
              You’ve been invited as a studio partner. Sign in with the invited email to open the desk. Partners can
              edit the site; PayPal, terms, and password recovery stay with the operator.
            </p>
          ) : null}
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-subtle">Continue</p>
          <div className="mt-5 flex flex-col gap-2">
            {authEnabled ? (
              GROK_PROVIDERS.map((p) => (
                <Button
                  key={p.providerId}
                  type="button"
                  variant="outline"
                  className="h-12 w-full justify-center"
                  onClick={() => void signIn(p.providerId, { callbackURL: redirect })}
                >
                  Continue with {p.label}
                </Button>
              ))
            ) : (
              <p className="text-sm text-muted">Sign-in is disabled.</p>
            )}
          </div>
          <p className="mt-8 text-sm leading-relaxed text-muted">{copy.login.body}</p>
          <p className="mt-4 text-xs leading-relaxed text-subtle">
            By continuing you agree to the{" "}
            <Link to="/terms" className="text-fg underline underline-offset-4">
              Terms of Engagement
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-fg underline underline-offset-4">
              Privacy Notice
            </Link>
            .
          </p>
        </div>

        <form
          className="rounded-xl border border-border bg-surface p-6"
          onSubmit={(e) => {
            e.preventDefault();
            void submitEmail();
          }}
        >
          <div className="flex gap-2">
            <button
              type="button"
              className={`h-10 rounded-full border px-4 text-sm ${
                mode === "signin" ? "border-accent bg-accent text-accent-fg" : "border-border text-muted"
              }`}
              onClick={() => setMode("signin")}
            >
              Sign in
            </button>
            <button
              type="button"
              className={`h-10 rounded-full border px-4 text-sm ${
                mode === "signup" ? "border-accent bg-accent text-accent-fg" : "border-border text-muted"
              }`}
              onClick={() => setMode("signup")}
            >
              Create account
            </button>
          </div>

          {mode === "signup" ? (
            <div className="mt-6 space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
            </div>
          ) : null}

          <div className="mt-5 space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div className="mt-5 space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
            />
            {mode === "signup" ? <p className="text-xs text-subtle">At least 8 characters.</p> : null}
          </div>

          {mode === "signup" ? (
            <label htmlFor="signup-terms" className="mt-5 flex min-h-11 cursor-pointer gap-3 text-sm leading-relaxed text-muted">
              <input
                id="signup-terms"
                type="checkbox"
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
                className="mt-1 size-4 shrink-0 accent-accent"
              />
              <span>
                I agree to the{" "}
                <Link to="/terms" className="text-fg underline underline-offset-4">
                  Terms of Engagement
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-fg underline underline-offset-4">
                  Privacy Notice
                </Link>
                .
              </span>
            </label>
          ) : null}

          {error ? <p className="mt-4 text-sm text-danger">{error}</p> : null}

          <Button type="submit" className="mt-6 w-full" disabled={busy || !authEnabled || (mode === "signup" && !terms)}>
            {busy ? "Please wait…" : mode === "signup" ? "Create account" : "Sign in with email"}
          </Button>
          <p className="mt-4 text-xs leading-relaxed text-subtle">
            Prefer to describe the work first?{" "}
            <Link to="/start" className="text-fg underline underline-offset-4">
              {copy.nav.startCta}
            </Link>
            .
          </p>
        </form>
      </section>
    </main>
  );
}
