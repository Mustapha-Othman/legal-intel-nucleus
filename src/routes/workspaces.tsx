import { createFileRoute } from "@tanstack/react-router";
import { PhasePlaceholder } from "@/components/legint/PhasePlaceholder";

export const Route = createFileRoute("/workspaces")({
  head: () => ({
    meta: [
      { title: "مساحات العمل — LEGINT Core" },
      {
        name: "description",
        content: "إدارة مساحات العمل: الأعضاء، الأدوار، القضايا، المصادر، المعرفة والوصول إلى API.",
      },
      { property: "og:title", content: "مساحات العمل — LEGINT Core" },
      { property: "og:description", content: "إدارة مساحات العمل وعزل البيانات في LEGINT Core." },
    ],
  }),
  component: () => (
    <PhasePlaceholder
      crumb="مساحات العمل"
      title="مساحات العمل"
      titleEn="Workspaces"
      phase="المرحلة 3"
      description="إدارة مساحات العمل التي تعزل القضايا والمستندات والمعرفة والصلاحيات لكل جهة أو إدارة قانونية."
      capabilities={[
        "قائمة مساحات العمل: المعرّف، المالك، عدد المستخدمين والقضايا والمصادر وحالة الوصول المعرفي",
        "صفحة تفاصيل مساحة العمل بتبويبات: نظرة عامة، الأعضاء، الأدوار، القضايا، المصادر، المعرفة، وصول API، التدقيق",
        "التحكم بحالة التنشيط وسياسات الوصول",
      ]}
      primitives={["DataTable", "MetadataList", "StatusBadge", "Tabs", "PermissionBadge"]}
    />
  ),
});
