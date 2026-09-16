import { createFileRoute } from "@tanstack/react-router";
import { PhasePlaceholder } from "@/components/legint/PhasePlaceholder";

export const Route = createFileRoute("/analysis")({
  head: () => ({
    meta: [
      { title: "التحليل القانوني — LEGINT Core" },
      {
        name: "description",
        content: "تشغيل ومتابعة التحليل القانوني: الوقائع، الأدلة، المعرفة، الأسانيد والنتائج.",
      },
      { property: "og:title", content: "التحليل القانوني — LEGINT Core" },
      { property: "og:description", content: "لوحة التحليل القانوني وقارئ النتائج في LEGINT Core." },
    ],
  }),
  component: () => (
    <PhasePlaceholder
      crumb="التحليل القانوني"
      title="التحليل القانوني"
      titleEn="Legal Analysis"
      phase="المرحلة 2"
      description="تشغيل التحليلات ومتابعة مسارها من نسخة القضية حتى النتائج والأسانيد، مع قارئ نتائج احترافي."
      capabilities={[
        "تشغيل تحليل جديد باختيار مساحة العمل، القضية، نسخة القضية، حزمة التحليل ونسخة المعرفة",
        "مسار التحليل: نسخة القضية → الوقائع → الأدلة → المعرفة → التحليل → الأسانيد → النتيجة",
        "بطاقات التشغيلات: المعرّف، الحالة، المزود، المدة، عدد الأسانيد والوقائع المستخدمة",
        "قارئ النتائج بأقسام: الملخص، الوقائع المعتمدة، المسائل القانونية، التحليل، الأسانيد، النتائج، التحفظات",
      ]}
      primitives={["Stepper", "AnalysisStatus", "SourceCitation", "DetailDrawer", "Progress"]}
    />
  ),
});
