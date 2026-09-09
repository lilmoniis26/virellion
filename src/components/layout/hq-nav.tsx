import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bot,
  ClipboardCheck,
  CreditCard,
  FilePenLine,
  FolderKanban,
  Inbox,
  LayoutDashboard,
  Library,
  PlayCircle,
  Files,
  Scale,
  UserPlus,
  Users,
} from "lucide-react";
import { isOperator, type StudioRole } from "@/lib/access";
import { cn } from "@/lib/utils";

const ITEMS: {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
  exact?: boolean;
  operatorOnly?: boolean;
}[] = [
  { to: "/hq", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/hq/inbox", label: "Client work", icon: Inbox },
  { to: "/hq/clients", label: "Clients", icon: Users },
  { to: "/hq/pages", label: "Pages", icon: FilePenLine },
  { to: "/hq/catalog", label: "Catalog", icon: Library },
  { to: "/hq/payments", label: "PayPal", icon: CreditCard, operatorOnly: true },
  { to: "/hq/legal", label: "Terms", icon: Scale, operatorOnly: true },
  { to: "/hq/team", label: "Partners", icon: UserPlus, operatorOnly: true },
  { to: "/hq/inquiries", label: "Workspace", icon: Files },
  { to: "/hq/projects", label: "Projects", icon: FolderKanban },
  { to: "/hq/assistants", label: "Assistants", icon: Bot },
  { to: "/hq/quality", label: "Quality", icon: ClipboardCheck },
  { to: "/hq/demo", label: "Demo journey", icon: PlayCircle },
];

export function HqNav({ onNavigate, role }: { onNavigate?: () => void; role?: StudioRole | null }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const items = ITEMS.filter((item) => !item.operatorOnly || isOperator(role));

  return (
    <nav className="flex flex-col gap-1">
      {items.map((item) => {
        const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
        const Icon = item.icon;
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={cn(
              "flex h-11 items-center gap-3 rounded-md px-3 text-sm transition-colors",
              active ? "bg-raised text-fg" : "text-muted hover:bg-raised/60 hover:text-fg",
            )}
          >
            <Icon className="size-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
