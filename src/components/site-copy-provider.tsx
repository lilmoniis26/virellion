import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getPublicSiteCopy } from "@/lib/site-copy-data";
import { defaultSiteCopy, type SiteCopy } from "@/lib/site-copy";

type Value = SiteCopy & { refresh: () => void };

const SiteCopyContext = createContext<Value>({
  ...defaultSiteCopy(),
  refresh: () => {},
});

export function SiteCopyProvider({ children }: { children: ReactNode }) {
  const seed = useMemo(() => defaultSiteCopy(), []);
  const [copy, setCopy] = useState<SiteCopy>(seed);
  const refresh = useCallback(() => {
    void getPublicSiteCopy()
      .then(setCopy)
      .catch(() => {});
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const value = useMemo(() => ({ ...copy, refresh }), [copy, refresh]);
  return <SiteCopyContext.Provider value={value}>{children}</SiteCopyContext.Provider>;
}

export function useSiteCopy() {
  return useContext(SiteCopyContext);
}
