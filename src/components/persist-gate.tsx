import { useEffect } from "react";
import { useAtlas } from "@/lib/store";

export function PersistGate() {
  useEffect(() => {
    void useAtlas.persist.rehydrate();
  }, []);
  return null;
}
