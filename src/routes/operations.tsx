import { createFileRoute } from "@tanstack/react-router";
import { PhasePlaceholder } from "@/components/legint/PhasePlaceholder";

export const Route = createFileRoute("/operations")({
  head: () => ({
    meta: [
      { title: "العمليات — LEGINT Core" },
      {
        name: "description",
        content: "مركز العمليات: المهام، قوائم الانتظار، المهام المجدولة، الأخطاء وإعادة المحاولات.",
      },
      { property: "og:title", content: "العمليات — LEGINT Core" },
      { property: "og:description", content: "مركز العمليات التشغيلية ومراقب المهام في LEGINT Core." },
    ],
  }),
  component: () => (
    <PhasePlaceholder
      crumb="العمليات"
      title="مركز العمليات"
      titleEn="Operations Center"
      phase="المرحلة 3"
      description="مراقبة إنتاجية للمهام وقوائم الانتظار: الاستحواذ، معالجة المستندات، التحليل، إعادة التحليل والفهرسة المعرفية."
      capabilities={[
        "بطاقات القوائم: في الانتظار، قيد التنفيذ، ناجحة، فاشلة، متوسط زمن التنفيذ",
        "المهام المجدولة والعمليات الفاشلة وإعادة المحاولات",
        "مفحّص المهمة: المعرّف، النوع، الحالة، المعالج، المحاولات، المسار الزمني، السجلات والمخرجات",
        "إعادة تشغيل المهمة للمشغلين المصرّح لهم مع تأكيد الإجراء",
      ]}
      primitives={["JobStatus", "Timeline", "Progress", "Code", "DataTable"]}
    />
  ),
});
