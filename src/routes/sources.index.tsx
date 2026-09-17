import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Anchor, Badge, Box, Button, Group, Select, SimpleGrid, Stack, Text } from "@mantine/core";
import {
  ClipboardCheck,
  DownloadCloud,
  ExternalLink,
  FileUp,
  Landmark,
  Layers,
  Plus,
  ScrollText,
  ShieldAlert,
} from "lucide-react";
import { PageHeader } from "@/components/legint/PageHeader";
import { DataTable, type Column } from "@/components/legint/DataTable";
import { EmptyState, Mono, StatCard, StatusBadge } from "@/components/legint/primitives";
import {
  acquisitionMethodShort,
  authorizationLabels,
  knowledgeStateLabels,
  legalSources,
  revisionStateLabels,
  sourceStatusLabels,
  sourceSummary,
  type LegalSource,
} from "@/data/sources";

export const Route = createFileRoute("/sources/")({
  head: () => ({
    meta: [
      { title: "المصادر القانونية الرسمية — LEGINT Core" },
      {
        name: "description",
        content:
          "إدارة المصادر الرسمية ونسخها وعمليات الاستحواذ والتحقق منها: الأنظمة واللوائح والقرارات الوزارية والجرائد الرسمية.",
      },
      { property: "og:title", content: "المصادر القانونية الرسمية — LEGINT Core" },
      {
        property: "og:description",
        content: "مصادر قانونية رسمية موثوقة مع سجل نسخ كامل وتحقق من السلامة في LEGINT Core.",
      },
    ],
  }),
  component: SourcesListPage,
});

function SourcesListPage() {
  const navigate = useNavigate();

  const columns: Column<LegalSource>[] = [
    {
      key: "name",
      header: "المصدر",
      width: 260,
      render: (row) => (
        <Stack gap={2} style={{ minWidth: 0 }}>
          <Anchor
            component={Link}
            to="/sources/$sourceId"
            params={{ sourceId: row.id } as never}
            underline="never"
          >
            <Text size="sm" fw={650} c="#102A43">
              {row.name}
            </Text>
          </Anchor>
          <Mono size={11} c="#98A2B3">
            {row.id}
          </Mono>
        </Stack>
      ),
      sortValue: (row) => row.name,
    },
    {
      key: "authority",
      header: "الجهة الرسمية",
      render: (row) => (
        <Text size="sm" c="#667085">
          {row.authority}
        </Text>
      ),
      sortValue: (row) => row.authority,
    },
    {
      key: "type",
      header: "نوع المصدر",
      render: (row) => (
        <Badge variant="default" size="sm">
          {row.type}
        </Badge>
      ),
      sortValue: (row) => row.type,
    },
    {
      key: "jurisdiction",
      header: "الاختصاص القضائي",
      render: (row) => (
        <Text size="sm" c="#667085">
          {row.jurisdiction}
        </Text>
      ),
      sortValue: (row) => row.jurisdiction,
    },
    {
      key: "currentRevision",
      header: "النسخة الحالية",
      render: (row) =>
        row.currentRevision === "—" ? (
          <Text size="sm" c="#98A2B3">
            لا توجد نسخة
          </Text>
        ) : (
          <Mono size={12} c="#3F5B7E" weight={600}>
            {row.currentRevision}
          </Mono>
        ),
      sortValue: (row) => row.currentRevision,
    },
    {
      key: "revisionState",
      header: "حالة النسخة",
      render: (row) => (
        <StatusBadge
          tone={revisionStateLabels[row.revisionState].tone}
          label={revisionStateLabels[row.revisionState].label}
        />
      ),
      sortValue: (row) => row.revisionState,
    },
    {
      key: "method",
      header: "طريقة الاستحواذ",
      render: (row) => (
        <Text size="sm" c="#16202A">
          {acquisitionMethodShort[row.method]}
        </Text>
      ),
      sortValue: (row) => acquisitionMethodShort[row.method],
    },
    {
      key: "knowledge",
      header: "حالة المعرفة",
      render: (row) => (
        <StatusBadge
          tone={knowledgeStateLabels[row.knowledge].tone}
          label={knowledgeStateLabels[row.knowledge].label}
        />
      ),
      sortValue: (row) => row.knowledge,
    },
    {
      key: "lastVerified",
      header: "آخر تحقق",
      render: (row) => (
        <Mono size={11.5} c="#667085">
          {row.lastVerified}
        </Mono>
      ),
      sortValue: (row) => row.lastVerified,
    },
    {
      key: "status",
      header: "الحالة",
      render: (row) => (
        <Group gap={6} wrap="nowrap">
          <StatusBadge
            tone={sourceStatusLabels[row.status].tone}
            label={sourceStatusLabels[row.status].label}
          />
          {(row.authorization === "required" ||
            row.authorization === "expired" ||
            row.authorization === "blocked") && (
            <StatusBadge
              dot={false}
              tone={authorizationLabels[row.authorization].tone}
              label={authorizationLabels[row.authorization].label}
            />
          )}
        </Group>
      ),
      sortValue: (row) => row.status,
    },
  ];

  return (
    <Box>
      <PageHeader
        crumbs={[{ label: "لوحة المراقبة", to: "/" }, { label: "المصادر القانونية" }]}
        title="المصادر القانونية الرسمية"
        description="إدارة المصادر الرسمية ونسخها وعمليات الاستحواذ والتحقق منها."
        actions={
          <>
            <Button color="navy" leftSection={<Plus size={15} />}>
              إضافة مصدر رسمي
            </Button>
            <Button
              variant="default"
              leftSection={<FileUp size={15} />}
              component={Link}
              to="/acquisition/intake"
            >
              رفع ملف رسمي
            </Button>
            <Button
              variant="default"
              leftSection={<DownloadCloud size={15} />}
              component={Link}
              to="/acquisition"
            >
              مركز الاستحواذ
            </Button>
          </>
        }
      />

      <SimpleGrid cols={{ base: 1, xs: 2, md: 3, lg: 6 }} spacing="md" mb="lg">
        <StatCard label="إجمالي المصادر" value={sourceSummary.total} delta="8 أنواع رسمية" icon={Landmark} />
        <StatCard label="المصادر النشطة" value={sourceSummary.active} delta="منشورة في المعرفة" deltaTone="success" icon={ShieldAlert} />
        <StatCard label="نسخ مسودة" value={sourceSummary.drafts} delta="DRAFT بانتظار المراجعة" deltaTone="neutral" icon={Layers} />
        <StatCard label="تحتاج إلى مراجعة" value={sourceSummary.needsReview} delta="أولوية تشغيلية" deltaTone="warning" icon={ClipboardCheck} />
        <StatCard label="تحتاج إلى تصريح" value={sourceSummary.needsAuthorization} delta="تصريح منتهٍ أو مطلوب" deltaTone="info" icon={ShieldAlert} />
        <StatCard label="آخر تحديث ناجح" value={sourceSummary.lastSuccess} delta="ACQ-2026-00941" deltaTone="success" icon={ScrollText} />
      </SimpleGrid>

      <DataTable
        data={legalSources}
        columns={columns}
        selectable
        pageSize={8}
        searchPlaceholder="بحث بالمصدر، الجهة، المعرّف…"
        searchFields={(row) => `${row.id} ${row.name} ${row.nameEn} ${row.authority} ${row.type} ${row.jurisdiction}`}
        onRowClick={(row) => navigate({ to: "/sources/$sourceId", params: { sourceId: row.id } })}
        toolbar={
          <Group gap="xs" wrap="wrap">
            <Select
              size="sm"
              w={150}
              placeholder="حالة المصدر"
              data={["نشط", "مسودة", "يحتاج إلى مراجعة", "يحتاج إلى تصريح", "فشل الاستحواذ", "غير متاح"]}
              clearable
            />
            <Select
              size="sm"
              w={140}
              placeholder="نوع المصدر"
              data={["نظام", "لائحة تنفيذية", "مرسوم", "قرار وزاري", "جريدة رسمية", "نشر قضائي"]}
              clearable
            />
            <Select
              size="sm"
              w={190}
              placeholder="الجهة الرسمية"
              data={[
                "هيئة الخبراء بمجلس الوزراء",
                "وزارة العدل",
                "وزارة الإعلام — الجريدة الرسمية",
                "المركز الوطني للوثائق القضائية",
              ]}
              clearable
            />
            <Select
              size="sm"
              w={170}
              placeholder="الاختصاص القضائي"
              data={["المملكة العربية السعودية — اتحادي", "منطقة الرياض", "منطقة مكة المكرمة"]}
              clearable
            />
            <Select
              size="sm"
              w={150}
              placeholder="حالة النسخة"
              data={["DRAFT", "IN_REVIEW", "PUBLISHED", "SUPERSEDED"]}
              clearable
            />
            <Select
              size="sm"
              w={165}
              placeholder="طريقة الاستحواذ"
              data={["جلب آلي", "إدخال يدوي رسمي", "رفع ملف رسمي", "استكشاف HTML"]}
              clearable
            />
          </Group>
        }
        rowActions={[
          { label: "فتح المصدر", icon: <ExternalLink size={15} /> },
          { label: "عرض النسخ", icon: <Layers size={15} /> },
          { label: "بدء الاستحواذ", icon: <DownloadCloud size={15} /> },
          { label: "رفع ملف رسمي", icon: <FileUp size={15} /> },
          { label: "مراجعة", icon: <ClipboardCheck size={15} /> },
          { label: "فتح سجل التدقيق", icon: <ScrollText size={15} /> },
        ]}
        emptyState={
          <EmptyState
            icon={Landmark}
            title="لم تُضف أي مصادر قانونية رسمية بعد."
            description="أضف مصدرًا رسميًا لبدء الاستحواذ والتحقق وإنشاء النسخ."
            action={
              <Button color="navy" leftSection={<Plus size={15} />}>
                إضافة مصدر رسمي
              </Button>
            }
          />
        }
      />

      <Text fz={11.5} c="#98A2B3" mt="lg">
        تظهر المعرّفات مثل <Mono size={11.5} c="#667085">SRC-PERSONAL-STATUS-001</Mono> و{" "}
        <Mono size={11.5} c="#667085">REV-2026-003</Mono> باتجاه لاتيني ثابت داخل الواجهة العربية.
      </Text>
    </Box>
  );
}
