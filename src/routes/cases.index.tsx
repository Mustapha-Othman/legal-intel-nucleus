import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Anchor,
  Badge,
  Box,
  Button,
  Group,
  Select,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import {
  Archive,
  BrainCircuit,
  Briefcase,
  ExternalLink,
  Plus,
  UserPlus,
} from "lucide-react";
import { PageHeader } from "@/components/legint/PageHeader";
import { DataTable, type Column } from "@/components/legint/DataTable";
import { EmptyState, Mono, StatCard, StatusBadge } from "@/components/legint/primitives";
import { cases, caseStatusLabels, type LegalCase } from "@/data/legint";

export const Route = createFileRoute("/cases/")({
  head: () => ({
    meta: [
      { title: "القضايا — LEGINT Core" },
      {
        name: "description",
        content: "إدارة القضايا القانونية: الحالة، المحكمة، المستندات، آخر تحليل والمراجع المسؤول.",
      },
      { property: "og:title", content: "القضايا — LEGINT Core" },
      { property: "og:description", content: "قائمة القضايا القانونية وحالتها التشغيلية في LEGINT Core." },
    ],
  }),
  component: CasesPage,
});

function CasesPage() {
  const navigate = useNavigate();

  const columns: Column<LegalCase>[] = [
    {
      key: "id",
      header: "رقم القضية",
      width: 150,
      render: (row) => (
        <Anchor component={Link} to="/cases/$caseId" params={{ caseId: row.id }} underline="never">
          <Mono size={12.5} c="#102A43" weight={600}>
            {row.id}
          </Mono>
        </Anchor>
      ),
      sortValue: (row) => row.id,
    },
    {
      key: "title",
      header: "اسم القضية",
      render: (row) => (
        <Text size="sm" fw={600} c="#16202A">
          {row.title}
        </Text>
      ),
      sortValue: (row) => row.title,
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
    {
      key: "court",
      header: "المحكمة",
      render: (row) => (
        <Text size="sm" c="#667085">
          {row.court}
        </Text>
      ),
      sortValue: (row) => row.court,
    },
    {
      key: "client",
      header: "العميل",
      render: (row) => (
        <Text size="sm" c="#16202A">
          {row.client}
        </Text>
      ),
      sortValue: (row) => row.client,
    },
    {
      key: "status",
      header: "الحالة",
      render: (row) => (
        <StatusBadge tone={caseStatusLabels[row.status].tone} label={caseStatusLabels[row.status].label} />
      ),
      sortValue: (row) => row.status,
    },
    {
      key: "documents",
      header: "المستندات",
      align: "end",
      render: (row) => (
        <Mono size={12.5} c="#16202A" weight={600}>
          {String(row.documents)}
        </Mono>
      ),
      sortValue: (row) => row.documents,
    },
    {
      key: "lastAnalysis",
      header: "آخر تحليل",
      render: (row) => (
        <Mono size={12} c="#3F5B7E">
          {row.lastAnalysis}
        </Mono>
      ),
      sortValue: (row) => row.lastAnalysis,
    },
    {
      key: "reviewer",
      header: "المراجع",
      render: (row) => (
        <Text size="sm" c={row.reviewer === "غير معيّن" ? "#98A2B3" : "#16202A"}>
          {row.reviewer}
        </Text>
      ),
      sortValue: (row) => row.reviewer,
    },
    {
      key: "updatedAt",
      header: "آخر تحديث",
      render: (row) => (
        <Mono size={11.5} c="#667085">
          {row.updatedAt}
        </Mono>
      ),
      sortValue: (row) => row.updatedAt,
    },
  ];

  return (
    <Box>
      <PageHeader
        crumbs={[{ label: "لوحة المراقبة", to: "/" }, { label: "القضايا" }]}
        title="القضايا"
        description="إدارة القضايا القانونية ومتابعة حالتها التحليلية والمراجعات المرتبطة بها."
        actions={
          <>
            <Button color="navy" leftSection={<Plus size={15} />}>
              إنشاء قضية
            </Button>
            <Button variant="default" leftSection={<BrainCircuit size={15} />} component={Link} to="/analysis">
              تشغيل تحليل
            </Button>
          </>
        }
      />

      <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }} spacing="md" mb="lg">
        <StatCard label="القضايا النشطة" value="24" delta="+4 هذا الأسبوع" deltaTone="success" icon={Briefcase} />
        <StatCard label="قيد التحليل" value="6" delta="متوسط 3m 12s" deltaTone="info" />
        <StatCard label="قيد المراجعة" value="5" delta="3 عالية الأولوية" deltaTone="warning" />
        <StatCard label="مؤرشفة" value="112" delta="خلال 12 شهرًا" deltaTone="neutral" />
      </SimpleGrid>

      <DataTable
        data={cases}
        columns={columns}
        selectable
        searchPlaceholder="بحث برقم القضية، الاسم، العميل…"
        searchFields={(row) => `${row.id} ${row.title} ${row.client} ${row.court} ${row.reviewer}`}
        onRowClick={(row) => navigate({ to: "/cases/$caseId", params: { caseId: row.id } })}
        toolbar={
          <Group gap="xs" wrap="wrap">
            <Select
              size="sm"
              w={140}
              placeholder="الحالة"
              data={["نشطة", "قيد المراجعة", "قيد التحليل", "مسودة", "مؤرشفة"]}
              clearable
            />
            <Select
              size="sm"
              w={140}
              placeholder="نوع القضية"
              data={["تجاري", "عمالي", "أحوال شخصية", "إداري", "ملكية فكرية", "تنفيذ", "عقود"]}
              clearable
            />
            <Select
              size="sm"
              w={190}
              placeholder="المحكمة"
              data={[
                "المحكمة التجارية بالرياض",
                "المحكمة التجارية بجدة",
                "المحكمة العمالية بالدمام",
                "المحكمة الإدارية بالرياض",
                "محكمة الأحوال الشخصية بالرياض",
              ]}
              clearable
            />
            <Select
              size="sm"
              w={150}
              placeholder="المراجع"
              data={["نورة الحربي", "خالد العتيبي", "سارة القحطاني", "عبدالله الشمري"]}
              clearable
            />
            <Badge variant="light" color="navy" size="lg">
              عرض محفوظ: القضايا النشطة
            </Badge>
          </Group>
        }
        rowActions={[
          { label: "فتح القضية", icon: <ExternalLink size={15} /> },
          { label: "تشغيل تحليل", icon: <BrainCircuit size={15} /> },
          { label: "إسناد مراجع", icon: <UserPlus size={15} /> },
          { label: "أرشفة القضية", icon: <Archive size={15} />, danger: true },
        ]}
        emptyState={
          <EmptyState
            icon={Briefcase}
            title="لم يتم إنشاء أي قضايا بعد."
            description="ابدأ بإنشاء قضية لربط المستندات والوقائع والمصادر القانونية بها."
            action={
              <Button color="navy" leftSection={<Plus size={15} />}>
                إنشاء قضية
              </Button>
            }
          />
        }
      />

      <Stack mt="lg" gap={4}>
        <Text fz={11.5} c="#98A2B3">
          تظهر المعرّفات مثل <Mono size={11.5} c="#667085">CASE-2026-0142</Mono> باتجاه لاتيني ثابت داخل
          الواجهة العربية.
        </Text>
      </Stack>
    </Box>
  );
}
