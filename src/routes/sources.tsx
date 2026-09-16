import { createFileRoute } from "@tanstack/react-router";
import { PhasePlaceholder } from "@/components/legint/PhasePlaceholder";

export const Route = createFileRoute("/sources")({
  head: () => ({
    meta: [
      { title: "المصادر القانونية — LEGINT Core" },
      {
        name: "description",
        content: "إدارة المصادر الرسمية: الأنظمة واللوائح والأوامر الملكية والقرارات الوزارية ونسخها.",
      },
      { property: "og:title", content: "المصادر القانونية — LEGINT Core" },
      { property: "og:description", content: "إدارة المصادر الرسمية ونسخها واستحواذها في LEGINT Core." },
    ],
  }),
  component: () => (
    <PhasePlaceholder
      crumb="المصادر القانونية"
      title="المصادر القانونية الرسمية"
      titleEn="Official Legal Sources"
      phase="المرحلة 2"
      description="إدارة متقدمة للمصادر الرسمية: الأنظمة، اللوائح، الأوامر الملكية، القرارات الوزارية، الجرائد الرسمية ومنشورات المحاكم."
      capabilities={[
        "جدول المصادر: النوع، الاختصاص القضائي، الرابط الرسمي، أحدث نسخة، طريقة الاستحواذ وحالة التصريح",
        "صفحة تفاصيل المصدر مع تبويبات: نظرة عامة، النسخ، الاستحواذ، النص المستخرج، النطاقات، المعرفة، التدقيق",
        "مركز التحكم بالاستحواذ: طلب، تصريح، جلب، تحقق، تخزين، استخراج، فهرسة، مراجعة",
        "معالج الإدخال الرسمي اليدوي حتى إنشاء نسخة بحالة مسودة (DRAFT)",
      ]}
      primitives={["DataTable", "StatusBadge", "Stepper", "Dropzone", "MetadataList", "AuditEvent"]}
    />
  ),
});
