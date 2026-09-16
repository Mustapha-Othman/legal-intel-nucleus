import { createFileRoute } from "@tanstack/react-router";
import { PhasePlaceholder } from "@/components/legint/PhasePlaceholder";

export const Route = createFileRoute("/audit")({
  head: () => ({
    meta: [
      { title: "سجل التدقيق — LEGINT Core" },
      {
        name: "description",
        content: "سجل تدقيق مؤسسي غير قابل للتعديل لكل عملية: المنفّذ، الإجراء، المورد، النتيجة والتتبع.",
      },
      { property: "og:title", content: "سجل التدقيق — LEGINT Core" },
      { property: "og:description", content: "سجل التدقيق غير القابل للتعديل في LEGINT Core." },
    ],
  }),
  component: () => (
    <PhasePlaceholder
      crumb="سجل التدقيق"
      title="سجل التدقيق"
      titleEn="Audit Log"
      phase="المرحلة 3"
      description="سجل مؤسسي غير قابل للتعديل يوثّق كل عملية على المنصة بصورة قابلة للتتبع."
      capabilities={[
        "أعمدة: الوقت، المنفّذ، الإجراء، نوع المورد ومعرّفه، مساحة العمل، النتيجة، عنوان IP/الجلسة ومعرّف التتبع",
        "تصفية بحسب المستخدم، الإجراء، المورد، مساحة العمل، التاريخ والنتيجة",
        "لوحة تفاصيل تعرض حدث التدقيق بصيغة JSON مهيكلة",
        "إبراز بصري لعدم قابلية التعديل وقابلية التتبع",
      ]}
      primitives={["DataTable", "AuditEvent", "DetailDrawer", "Code", "FilterBar"]}
    />
  ),
});
