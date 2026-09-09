import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { getMyProfile, type Profile } from "@/lib/client-data";
import { Button } from "@/components/ui/button";

export function AuthSlot({ onNavigate }: { onNavigate?: () => void }) {
  const { user, isPending } = useCurrentUserState();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      return;
    }
    let cancelled = false;
    getMyProfile()
      .then((p) => {
        if (!cancelled) setProfile(p);
      })
      .catch(() => {
        if (!cancelled) setProfile(null);
      });
    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  if (isPending) {
    return <div className="h-9 w-20 animate-pulse rounded-md bg-raised" aria-hidden />;
  }

  if (!user) {
    return (
      <Button variant="ghost" size="sm" asChild>
        <Link to="/login" search={{ redirect: "/account" }} onClick={onNavigate}>
          Sign in
        </Link>
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {profile && (profile.role === "operator" || profile.role === "partner") ? (
        <Button variant="ghost" size="sm" asChild>
          <Link to="/hq" onClick={onNavigate}>
            Desk
          </Link>
        </Button>
      ) : null}
      <Button variant="ghost" size="sm" asChild>
        <Link to="/account" onClick={onNavigate}>
          Account
        </Link>
      </Button>
      <UserButton />
    </div>
  );
}

export function useStudioProfile() {
  const { user, isPending } = useCurrentUserState();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (isPending) return;
    if (!user) {
      setProfile(null);
      setReady(true);
      return;
    }
    let cancelled = false;
    setReady(false);
    getMyProfile()
      .then((p) => {
        if (!cancelled) {
          setProfile(p);
          setReady(true);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setProfile(null);
          setReady(true);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [user?.id, isPending]);

  return { user, isPending: isPending || (Boolean(user) && !ready), profile };
}
