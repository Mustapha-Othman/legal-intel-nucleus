import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Anchor, Badge, Box, Button, Group, Select, SimpleGrid, Stack, Text } from "@mantine/core";
import { Download, Eye, FileText, GitCompareArrows, RefreshCw, Upload } from "lucide-react";
import { PageHeader } from "@/components/legint/PageHeader";
import { DataTable, type Column } from "@/components/legint/DataTable";
import { EmptyState, Mono, RevisionBadge, StatCard, StatusBadge } from "@/components/legint/primitives";
import { docStatusLabels, documents, type LegalDocument } from "@/data/legint";

export const Route = createFileRoute("/documents/")({
  head: () => ({
    meta: [
      { title: "المستندات — LEGINT Core" },
      {
        name: "description",
        content: "إدارة المستندات القانونية: الاستخراج، OCR، التحقق من البصمة SHA-256 والنسخ.",
      },
      { property: "og:title", content: "المستندات — LEGINT Core" },
      {
        property: "og:description",
        content: "حالة معالجة المستندات القانونية والتحقق منها في LEGINT Core.",
      },
    ],
  }),
  component: DocumentsPage,
});

const ocrLabels: Record<LegalDocument["ocr"], { label: string; tone: "success" | "neutral" | "error" | "info" }> = {
  completed: { label: "مكتمل", tone: "success" },
  not_required: { label: "غير مطلوب", tone: "neutral" },
  failed: { label: "فشل", tone: "error" },
  running: { label: "قيد التنفيذ", tone: "info" },
};

function DocumentsPage() {
  const navigate = useNavigate();

  const columns: Column<LegalDocument>[] = [
    {
      key: "name",
      header: "المستند",
      render: (row) => (
        <Stack gap={2}>
          <Anchor
            component={Link}
            to="/documents/$documentId"
            params={{ documentId: row.id }}
            underline="never"
          >
            <Text size="sm" fw={600} c="#102A43">
              {row.name}
            </Text>
          </Anchor>
          <Mono size={10.5} c="#98A2B3">
            {row.id}
          </Mono>
        </Stack>
      ),
      sortValue: (row) => row.name,
    },
    {
      key: "caseId",
      header: "القضية",
      render: (row) => (
        <Anchor component={Link} to="/cases/$caseId" params={{ caseId: row.caseId }} underline="never">
          <Mono size={12} c="#3F5B7E">
            {row.caseId}
          </Mono>
        </Anchor>
      ),
      sortValue: (row) => row.caseId,
    },
    {
      key: "type",
      header: "النوع",
      render: (row) => (
        <Badge variant="default" size="sm">
          {row.type}
        </Badge>
      ),
      sortValue: (row) => row.type,
    },
    { key: "revision", header: "النسخة", render: (row) => <RevisionBadge revision={row.revision} /> },
    {
      key: "uploadSource",
      header: "مصدر الرفع",
      render: (row) => (
        <Text size="sm" c="#667085">
          {row.uploadSource}
        </Text>
      ),
      sortValue: (row) => row.uploadSource,
    },
    {
      key: "pages",
      header: "الصفحات",
      align: "end",
      render: (row) => <Mono size={12.5}>{String(row.pages)}</Mono>,
      sortValue: (row) => row.pages,
    },
    {
      key: "extraction",
      header: "الاستخراج",
      render: (row) => (
        <StatusBadge
          tone={docStatusLabels[row.extraction].tone}
          label={docStatusLabels[row.extraction].label}
        />
      ),
      sortValue: (row) => row.extraction,
    },
    {
      key: "ocr",
      header: "OCR",
      render: (row) => <StatusBadge tone={ocrLabels[row.ocr].tone} label={ocrLabels[row.ocr].label} dot={false} />,
      sortValue: (row) => row.ocr,
    },
    {
      key: "sha256",
      header: "SHA-256",
      render: (row) => (
        <Group gap={6} wrap="nowrap">
          <Mono size={11} c="#667085">
            {row.sha256}
          </Mono>
          <Badge size="sm" variant="light" color="legalGreen">
            موثّق
          </Badge>
        </Group>
      ),
    },
    {
      key: "uploadedBy",
      header: "رفع بواسطة",
      render: (row) => (
        <Stack gap={2}>
          <Text size="sm" c="#16202A">
            {row.uploadedBy}
          </Text>
          <Mono size={10.5} c="#98A2B3">
            {row.uploadedAt}
          </Mono>
        </Stack>
      ),
      sortValue: (row) => row.uploadedAt,
    },
    {
      key: "status",
      header: "الحالة",
      render: (row) => (
        <StatusBadge tone={docStatusLabels[row.status].tone} label={docStatusLabels[row.status].label} />
      ),
      sortValue: (row) => row.status,
    },
  ];

  return (
    <Box>
      <PageHeader
        crumbs={[{ label: "لوحة المراقبة", to: "/" }, { label: "المستندات" }]}
        title="المستندات"
        description="متابعة معالجة المستندات القانونية: الاستخراج النصي، المسح الضوئي، التحقق من البصمة والنسخ."
        actions={
          <>
            <Button color="navy" leftSection={<Upload size={15} />}>
              رفع مستند
            </Button>
            <Button variant="default" leftSection={<RefreshCw size={15} />}>
              إعادة معالجة الفاشلة
            </Button>
          </>
        }
      />

      <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }} spacing="md" mb="lg">
        <StatCard label="إجمالي المستندات" value="1,248" delta="+37 هذا الأسبوع" deltaTone="success" icon={FileText} />
        <StatCard label="قيد المعالجة" value="4" delta="متوسط 48s" deltaTone="info" />
        <StatCard label="فشل الاستخراج" value="2" delta="تحتاج إعادة معالجة" deltaTone="error" />
        <StatCard label="تم مراجعتها" value="912" delta="73% من الإجمالي" deltaTone="neutral" />
      </SimpleGrid>

      <DataTable
        data={documents}
        columns={columns}
        selectable
        pageSize={7}
        searchPlaceholder="بحث باسم المستند، رقم القضية، النوع…"
        searchFields={(row) => `${row.id} ${row.name} ${row.caseId} ${row.type} ${row.uploadedBy}`}
        onRowClick={(row) => navigate({ to: "/documents/$documentId", params: { documentId: row.id } })}
        toolbar={
          <Group gap="xs" wrap="wrap">
            <Select
              size="sm"
              w={150}
              placeholder="الحالة"
              data={["جاهز", "قيد المعالجة", "فشل الاستخراج", "تم مراجعته", "مؤرشف"]}
              clearable
            />
            <Select
              size="sm"
              w={150}
              placeholder="نوع المستند"
              data={["عقد", "لائحة", "محضر", "إشعار", "صحيفة دعوى", "مستند إثبات"]}
              clearable
            />
            <Select size="sm" w={150} placeholder="مصدر الرفع" data={["رفع يدوي", "تكامل المحكمة", "بريد رسمي"]} clearable />
          </Group>
        }
        rowActions={[
          { label: "معاينة", icon: <Eye size={15} /> },
          { label: "تنزيل", icon: <Download size={15} /> },
          { label: "إعادة المعالجة", icon: <RefreshCw size={15} /> },
          { label: "مقارنة النسخ", icon: <GitCompareArrows size={15} /> },
        ]}
        emptyState={
          <EmptyState
            icon={FileText}
            title="لا توجد مستندات مطابقة."
            description="ارفع مستندًا رسميًا لربطه بالقضية وبدء الاستخراج النصي والتحقق."
            action={
              <Button color="navy" leftSection={<Upload size={15} />}>
                رفع مستند
              </Button>
            }
          />
        }
      />
    </Box>
  );
}
