import { createFileRoute } from "@tanstack/react-router";
import { PhasePlaceholder } from "@/components/legint/PhasePlaceholder";

export const Route = createFileRoute("/access")({
  head: () => ({
    meta: [
      { title: "المستخدمون والصلاحيات — LEGINT Core" },
      {
        name: "description",
        content: "إدارة المستخدمين والأدوار والجلسات وطرق المصادقة ومصفوفة الصلاحيات.",
      },
      { property: "og:title", content: "المستخدمون والصلاحيات — LEGINT Core" },
      { property: "og:description", content: "إدارة الهوية والوصول في LEGINT Core." },
    ],
  }),
  component: () => (
    <PhasePlaceholder
      crumb="المستخدمون والصلاحيات"
      title="المستخدمون والصلاحيات"
      titleEn="Identity & Access"
      phase="المرحلة 3"
      description="إدارة مؤسسية للهوية والوصول: المستخدمون، الأدوار، الوصول إلى مساحات العمل، الجلسات، المصادقة والأمان."
      capabilities={[
        "جدول المستخدمين: البريد، مساحة العمل، الدور، MFA، مفاتيح المرور، الحالة وآخر دخول",
        "إجراءات: إضافة مستخدم، تعليق، تغيير الدور، إبطال الجلسات، إلزام MFA",
        "إعدادات المصادقة: كلمة المرور، TOTP، مفاتيح المرور، وتهيئة OIDC دون إظهار أي أسرار",
        "مصفوفة صلاحيات واضحة: القدرات في الصفوف والأدوار في الأعمدة",
      ]}
      primitives={["DataTable", "PermissionBadge", "StatusBadge", "Tabs", "Modal"]}
    />
  ),
});
