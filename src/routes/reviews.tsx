import { createFileRoute } from "@tanstack/react-router";
import { PhasePlaceholder } from "@/components/legint/PhasePlaceholder";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "المراجعات والتصحيحات — LEGINT Core" },
      {
        name: "description",
        content: "قائمة المراجعات القانونية: مراجعة الوقائع والمستندات وتصحيح التحليلات والأدلة.",
      },
      { property: "og:title", content: "المراجعات والتصحيحات — LEGINT Core" },
      { property: "og:description", content: "قائمة انتظار المراجعة القانونية في LEGINT Core." },
    ],
  }),
  component: () => (
    <PhasePlaceholder
      crumb="المراجعات والتصحيحات"
      title="المراجعات والتصحيحات"
      titleEn="Reviews & Corrections"
      phase="المرحلة 3"
      description="قائمة انتظار المراجعة القانونية وشاشة مراجعة البند بثلاثة أعمدة: المحتوى الأصلي، الأدلة والمصادر، وقرار المراجعة."
      capabilities={[
        "جدول المراجعات: النوع، القضية، مقدم الطلب، السبب، الأولوية، المراجع والحالة",
        "شاشة مراجعة البند مع مقارنة المحتوى الأصلي والأدلة والأسانيد",
        "قرارات: قبول، تصحيح، رفض، طلب معلومات إضافية — مع إلزامية تسجيل السبب",
        "سجل قرارات المراجعة مرتبط بسجل التدقيق",
      ]}
      primitives={["DataTable", "StatusBadge", "DetailDrawer", "Timeline", "Alert"]}
    />
  ),
});
