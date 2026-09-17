import {
  LayoutDashboard,
  Briefcase,
  FileText,
  ListChecks,
  Landmark,
  DownloadCloud,
  BookOpenCheck,
  BrainCircuit,
  ClipboardCheck,
  GitCompareArrows,
  TerminalSquare,
  Users,
  Building2,
  Activity,
  ScrollText,
  ServerCog,
  Settings,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Bi } from "@/lib/lang";

export type NavItem = {
  label: Bi;
  to: string;
  icon: LucideIcon;
  badge?: string;
};

export type NavGroup = {
  label: Bi;
  items: NavItem[];
};

export const navGroups: NavGroup[] = [
  {
    label: { ar: "المراقبة", en: "Monitoring" },
    items: [{ label: { ar: "الرئيسية", en: "Overview" }, to: "/", icon: LayoutDashboard }],
  },
  {
    label: { ar: "العمل القانوني", en: "Legal Work" },
    items: [
      { label: { ar: "القضايا", en: "Cases" }, to: "/cases", icon: Briefcase, badge: "24" },
      { label: { ar: "المستندات", en: "Documents" }, to: "/documents", icon: FileText },
      { label: { ar: "الوقائع", en: "Facts" }, to: "/facts", icon: ListChecks },
    ],
  },
  {
    label: { ar: "المعرفة القانونية", en: "Legal Knowledge" },
    items: [
      { label: { ar: "المصادر القانونية", en: "Legal Sources" }, to: "/sources", icon: Landmark },
      {
        label: { ar: "الاستحواذ على المصادر", en: "Source Acquisition" },
        to: "/acquisition",
        icon: DownloadCloud,
      },
      { label: { ar: "غرفة المعرفة", en: "Knowledge Room" }, to: "/knowledge", icon: BookOpenCheck },
    ],
  },
  {
    label: { ar: "الذكاء والتحليل", en: "Intelligence" },
    items: [
      { label: { ar: "التحليل القانوني", en: "Legal Analysis" }, to: "/analysis", icon: BrainCircuit },
      {
        label: { ar: "المراجعات والتصحيحات", en: "Reviews & Corrections" },
        to: "/reviews",
        icon: ClipboardCheck,
        badge: "7",
      },
      {
        label: { ar: "إعادة التحليل والمقارنة", en: "Replay & Comparison" },
        to: "/replay",
        icon: GitCompareArrows,
      },
      { label: { ar: "مختبر API", en: "API Sandbox" }, to: "/sandbox", icon: TerminalSquare },
    ],
  },
  {
    label: { ar: "الإدارة", en: "Administration" },
    items: [
      { label: { ar: "المستخدمون والصلاحيات", en: "Identity & Access" }, to: "/access", icon: Users },
      { label: { ar: "مساحات العمل", en: "Workspaces" }, to: "/workspaces", icon: Building2 },
      { label: { ar: "العمليات", en: "Operations" }, to: "/operations", icon: Activity },
      { label: { ar: "سجل التدقيق", en: "Audit Logs" }, to: "/audit", icon: ScrollText },
      { label: { ar: "النظام", en: "System" }, to: "/system", icon: ServerCog },
      { label: { ar: "الإعدادات", en: "Settings" }, to: "/settings", icon: Settings },
    ],
  },
];

export const workspaces = [
  { value: "ws-legal-ops", label: "مساحة العمل — الإدارة القانونية" },
  { value: "ws-litigation", label: "مساحة العمل — التقاضي" },
  { value: "ws-compliance", label: "مساحة العمل — الالتزام" },
];
