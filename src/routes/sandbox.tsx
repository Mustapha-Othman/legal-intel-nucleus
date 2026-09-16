import { createFileRoute } from "@tanstack/react-router";
import { PhasePlaceholder } from "@/components/legint/PhasePlaceholder";

export const Route = createFileRoute("/sandbox")({
  head: () => ({
    meta: [
      { title: "مختبر API — LEGINT Core" },
      {
        name: "description",
        content: "مختبر API لمحاكاة استخدام عملاء LEGINT Core: بناء الطلبات وقراءة الاستجابات والسجلات.",
      },
      { property: "og:title", content: "مختبر API — LEGINT Core" },
      { property: "og:description", content: "بناء طلبات API ومحاكاتها داخل LEGINT Core." },
    ],
  }),
  component: () => (
    <PhasePlaceholder
      crumb="مختبر API"
      title="مختبر API"
      titleEn="API Sandbox"
      phase="المرحلة 3"
      description="بيئة داخلية للمسؤولين لمحاكاة كيفية استخدام عملاء LEGINT Core لواجهات البرمجة."
      capabilities={[
        "منشئ الطلبات: نقطة النهاية، طريقة HTTP، مساحة العمل، القضية، المصادقة، المعاملات والرؤوس",
        "محرر JSON كبير مع منطقة رفع ملفات",
        "عارض الاستجابة المباشر بتبويبات: الاستجابة، JSON، الرؤوس، السجلات، تفاصيل التنفيذ",
        "أمثلة جاهزة: إنشاء قضية، رفع مستند، استخراج الوقائع، تشغيل تحليل، الاستعلام المعرفي",
      ]}
      primitives={["Code", "Tabs", "FileInput", "ScrollArea", "StatusBadge"]}
    />
  ),
});
