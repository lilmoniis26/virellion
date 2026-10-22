import { createRootRoute, HeadContent, Link, Outlet, Scripts, useRouterState } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { PersistGate } from "@/components/persist-gate";
import { CatalogProvider } from "@/components/catalog-provider";
import { SiteCopyProvider } from "@/components/site-copy-provider";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import appCss from "../styles.css?url";

import { SITE } from "@/lib/site";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: SITE.name },
      {
        name: "description",
        content:
          "One team. Multiple specialties. Complete solutions. A multidisciplinary creative, business, and technology studio at virellion.online.",
      },
      { name: "theme-color", content: "#080a09" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,400;0,500;0,600;1,400&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400&family=IBM+Plex+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  component: RootDocument,
  notFoundComponent: NotFound,
});

function RootDocument() {
  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="min-h-dvh bg-bg text-fg">
        <PreviewHostBridge />
        <AuthProvider>
          <PersistGate />
          <CatalogProvider>
            <SiteCopyProvider>
              <AppShell />
            </SiteCopyProvider>
          </CatalogProvider>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}

function AppShell() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHq = pathname.startsWith("/hq");

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <div className="flex-1">
        <Outlet />
      </div>
      {isHq ? null : <SiteFooter />}
    </div>
  );
}

function NotFound() {
  return (
    <main className="mx-auto max-w-xl px-4 py-20 text-center">
      <p className="text-xs uppercase tracking-[0.18em] text-subtle">404</p>
      <h1 className="mt-3 font-display text-4xl text-fg">Not on the map</h1>
      <p className="mt-3 text-sm text-muted">That page is not part of Virellion.</p>
      <Link to="/" className="mt-6 inline-block text-sm text-fg underline underline-offset-4">
        Return home
      </Link>
    </main>
  );
}
