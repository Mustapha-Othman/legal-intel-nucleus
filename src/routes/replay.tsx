import { createFileRoute } from "@tanstack/react-router";
import { PhasePlaceholder } from "@/components/legint/PhasePlaceholder";

export const Route = createFileRoute("/replay")({
  head: () => ({
    meta: [
      { title: "إعادة التحليل والمقارنة — LEGINT Core" },
      {
        name: "description",
        content: "مقارنة التحليل الأصلي مع إعادة التحليل: تغيّر الوقائع والأدلة والأسانيد والنتائج.",
      },
      { property: "og:title", content: "إعادة التحليل والمقارنة — LEGINT Core" },
      { property: "og:description", content: "مقارنة نتائج التحليل القانوني بين النسخ في LEGINT Core." },
    ],
  }),
  component: () => (
    <PhasePlaceholder
      crumb="إعادة التحليل والمقارنة"
      title="إعادة التحليل والمقارنة"
      titleEn="Replay & Comparison"
      phase="المرحلة 3"
      description="مقارنة تشغيل التحليل الأصلي مع إعادة التحليل، مع إظهار الفروق في الوقائع والأدلة والمصادر والأسانيد والنتيجة."
      capabilities={[
        "اختيار التشغيل الأصلي مقابل تشغيل إعادة التحليل",
        "أقسام المقارنة: الأسباب، تغيّر النتيجة، تغيّر الأسانيد، تغيّر الوقائع، تغيّر نسخة المعرفة",
        "إبراز الفروق بصورة احترافية مع إظهار النتيجة الأصلية كسجل غير قابل للتعديل",
      ]}
      primitives={["StatusBadge", "RevisionBadge", "MetadataList", "SourceCitation", "Code"]}
    />
  ),
});
