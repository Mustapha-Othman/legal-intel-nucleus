import { createFileRoute } from "@tanstack/react-router";
import { PhasePlaceholder } from "@/components/legint/PhasePlaceholder";

export const Route = createFileRoute("/facts")({
  head: () => ({
    meta: [
      { title: "الوقائع — LEGINT Core" },
      { name: "description", content: "إدارة الوقائع القانونية المستخرجة: الحالة، الثقة، الأدلة والمراجعات." },
      { property: "og:title", content: "الوقائع — LEGINT Core" },
      { property: "og:description", content: "واجهة الوقائع القانونية المهيكلة في LEGINT Core." },
    ],
  }),
  component: () => (
    <PhasePlaceholder
      crumb="الوقائع"
      title="الوقائع"
      titleEn="Facts"
      phase="المرحلة 2"
      description="واجهة مهيكلة للوقائع القانونية المستخرجة من المستندات، مع الأدلة والأسانيد وحالة المراجعة."
      capabilities={[
        "جدول الوقائع مع الحالة (مؤكدة، غير معروفة، متنازع عليها، مرفوضة، تحتاج مراجعة) ودرجة الثقة",
        "ربط الوقائع بالأدلة والنطاقات المصدرية في المستندات",
        "إضافة واقعة، تعديلها، اعتمادها، أو تسجيل تنازع عليها",
        "سجل مراجعات ونُسخ لكل واقعة",
      ]}
      primitives={["DataTable", "StatusBadge", "RevisionBadge", "DetailDrawer", "Timeline"]}
    />
  ),
});
