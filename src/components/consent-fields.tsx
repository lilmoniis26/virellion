import { Link } from "@tanstack/react-router";
import { useSiteCopy } from "@/components/site-copy-provider";
import { cn } from "@/lib/utils";

export function EngagementNotice({ className }: { className?: string }) {
  const copy = useSiteCopy();
  return (
    <div className={cn("rounded-xl border border-border bg-raised/60 p-5", className)}>
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-subtle">What you are agreeing to</p>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Terms effective {copy.legal.effective}. Virellion is administrative and production support — not legal, tax, or licensed
        advice. You own every account.
      </p>
      <div className="mt-5 grid gap-6 sm:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-fg">You allow Virellion to</p>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
            {copy.legal.allows.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-fg">You do not allow Virellion to</p>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
            {copy.legal.doesNot.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function ConsentFields({
  terms,
  onTerms,
  marketing,
  onMarketing,
  idPrefix,
}: {
  terms: boolean;
  onTerms: (value: boolean) => void;
  marketing: boolean;
  onMarketing: (value: boolean) => void;
  idPrefix: string;
}) {
  return (
    <div className="space-y-3">
      <label htmlFor={`${idPrefix}-terms`} className="flex min-h-11 cursor-pointer gap-3 text-sm leading-relaxed text-muted">
        <input
          id={`${idPrefix}-terms`}
          type="checkbox"
          checked={terms}
          onChange={(e) => onTerms(e.target.checked)}
          className="mt-1 size-4 shrink-0 accent-accent"
          required
        />
        <span>
          I have read and agree to the{" "}
          <Link to="/terms" className="text-fg underline underline-offset-4">
            Terms of Engagement
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="text-fg underline underline-offset-4">
            Privacy Notice
          </Link>
          . I authorize Virellion to use the information I provide as described there.
        </span>
      </label>
      <label
        htmlFor={`${idPrefix}-marketing`}
        className="flex min-h-11 cursor-pointer gap-3 text-sm leading-relaxed text-muted"
      >
        <input
          id={`${idPrefix}-marketing`}
          type="checkbox"
          checked={marketing}
          onChange={(e) => onMarketing(e.target.checked)}
          className="mt-1 size-4 shrink-0 accent-accent"
        />
        <span>
          Optional. Virellion may email me about related studio services. I can turn this off in my account. Virellion will not
          add me to a marketing list without this permission.
        </span>
      </label>
    </div>
  );
}
