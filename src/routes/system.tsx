import { createFileRoute } from "@tanstack/react-router";
import { PhasePlaceholder } from "@/components/legint/PhasePlaceholder";

export const Route = createFileRoute("/system")({
  head: () => ({
    meta: [
      { title: "النظام — LEGINT Core" },
      {
        name: "description",
        content: "إدارة النظام: المنصة، API، قاعدة البيانات، المعالجات، التخزين، المعرفة ومزودو الذكاء.",
      },
      { property: "og:title", content: "النظام — LEGINT Core" },
      { property: "og:description", content: "صفحة إدارة النظام ومزودي النماذج في LEGINT Core." },
    ],
  }),
  component: () => (
    <PhasePlaceholder
      crumb="النظام"
      title="إدارة النظام"
      titleEn="System"
      phase="المرحلة 3"
      description="حالة مكوّنات المنصة وإصداراتها وتهيئتها، مع إدارة مزودي النماذج دون إظهار أي أسرار."
      capabilities={[
        "بطاقات لكل مكوّن: المنصة، API، قاعدة البيانات، المعالجات، التخزين، المصادقة، المعرفة، مزودو الذكاء، خصائص التشغيل والتكاملات",
        "لكل بطاقة: الحالة، الإصدار، حالة التهيئة وآخر فحص صحة",
        "إدارة النماذج: المزود، النموذج، الغرض (استخراج، تحليل، مراجعة، تصنيف)، الحدود، البيئة ونسبة الفشل",
        "تحديد النماذج الافتراضية عبر إعدادات محكومة",
      ]}
      primitives={["StatusBadge", "MetadataList", "SimpleGrid", "Alert", "Tooltip"]}
    />
  ),
});
