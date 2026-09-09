import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getPublicCatalog } from "@/lib/catalog-data";
import { seedLiveCatalog, type LiveCatalog } from "@/lib/catalog-live";

type CatalogContextValue = LiveCatalog & { refresh: () => void };

const CatalogContext = createContext<CatalogContextValue>({
  ...seedLiveCatalog(),
  refresh: () => {},
});

export function CatalogProvider({ children }: { children: ReactNode }) {
  const seed = useMemo(() => seedLiveCatalog(), []);
  const [catalog, setCatalog] = useState<LiveCatalog>(seed);
  const refresh = useCallback(() => {
    void getPublicCatalog()
      .then(setCatalog)
      .catch(() => {});
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const value = useMemo(() => ({ ...catalog, refresh }), [catalog, refresh]);
  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export function useLiveCatalog() {
  return useContext(CatalogContext);
}
