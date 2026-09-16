import { createFileRoute } from "@tanstack/react-router";
import { PhasePlaceholder } from "@/components/legint/PhasePlaceholder";

export const Route = createFileRoute("/knowledge")({
  head: () => ({
    meta: [
      { title: "غرفة المعرفة — LEGINT Core" },
      {
        name: "description",
        content: "إدارة المعرفة القانونية: النسخ، الفهرسة، المقاطع، الأسانيد والبحث المعرفي الشامل.",
      },
      { property: "og:title", content: "غرفة المعرفة — LEGINT Core" },
      { property: "og:description", content: "البحث المعرفي القانوني وإدارة نسخ المعرفة في LEGINT Core." },
    ],
  }),
  component: () => (
    <PhasePlaceholder
      crumb="غرفة المعرفة"
      title="غرفة المعرفة"
      titleEn="Knowledge Room"
      phase="المرحلة 2"
      description="إدارة المعرفة القانونية المفهرسة: مصادر المعرفة، النسخ، حالة الفهرسة، عدد المقاطع والصلاحيات."
      capabilities={[
        "قائمة مصادر المعرفة مع حالة التنشيط والفهرسة وعدد المقاطع",
        "بحث معرفي شامل يعرض المادة النظامية والمقطع المطابق والاقتباس الدقيق",
        "تصفية بحسب المصدر، المجال القانوني، الاختصاص، تاريخ النشر والنسخة",
        "التحكم بصلاحيات الوصول إلى المعرفة على مستوى مساحة العمل",
      ]}
      primitives={["FilterBar", "SourceCitation", "RevisionBadge", "StatusBadge", "Skeleton"]}
    />
  ),
});
