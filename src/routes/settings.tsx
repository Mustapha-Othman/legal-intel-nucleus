import { createFileRoute } from "@tanstack/react-router";
import { PhasePlaceholder } from "@/components/legint/PhasePlaceholder";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "الإعدادات — LEGINT Core" },
      {
        name: "description",
        content: "إعدادات المنصة: عامة، قانونية، المستندات، المصادر، التحليل والأمان.",
      },
      { property: "og:title", content: "الإعدادات — LEGINT Core" },
      { property: "og:description", content: "إعدادات النظام والسياسات القانونية في LEGINT Core." },
    ],
  }),
  component: () => (
    <PhasePlaceholder
      crumb="الإعدادات"
      title="إعدادات النظام"
      titleEn="System Settings"
      phase="المرحلة 3"
      description="سياسات المنصة القانونية والتشغيلية والأمنية في مكان واحد، مقسّمة إلى مجموعات واضحة."
      capabilities={[
        "عامة: اسم المنصة، اللغة (العربية/الإنجليزية)، المنطقة الزمنية",
        "قانونية: الاختصاص الافتراضي، تنسيق الأسانيد، سياسة النسخ",
        "المستندات: حدود الحجم، الأنواع المسموحة، الاستخراج الضوئي (OCR)",
        "المصادر: سياسات الاستحواذ، قواعد التصريح، جدولة التحديث",
        "التحليل: حزم التحليل، قواعد إعادة التحليل، متطلبات المراجعة",
        "الأمان: سياسات الجلسات، MFA، مدة الاحتفاظ بسجل التدقيق",
      ]}
      primitives={["Tabs", "Accordion", "Select", "SegmentedControl", "Alert"]}
    />
  ),
});
