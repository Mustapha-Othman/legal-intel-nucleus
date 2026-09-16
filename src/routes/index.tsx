import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Table,
  Text,
  Timeline,
  Tooltip,
} from "@mantine/core";
import { AreaChart } from "@mantine/charts";
import {
  ArrowUpRight,
  BrainCircuit,
  Briefcase,
  ClipboardCheck,
  FileText,
  Gauge,
  Landmark,
  Plus,
  TerminalSquare,
  Upload,
} from "lucide-react";
import { PageHeader } from "@/components/legint/PageHeader";
import { Mono, SectionCard, StatCard, StatusBadge } from "@/components/legint/primitives";
import {
  attentionItems,
  caseActivitySeries,
  kpis,
  recentActivity,
  systemHealth,
  type HealthState,
} from "@/data/legint";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "لوحة المراقبة — LEGINT Core" },
      {
        name: "description",
        content:
          "نظرة شاملة على حالة LEGINT Core: القضايا النشطة، المصادر الرسمية، التحليلات وعمليات النظام.",
      },
      { property: "og:title", content: "لوحة المراقبة — LEGINT Core" },
      {
        property: "og:description",
        content: "مراقبة القضايا والمصادر والتحليلات والعمليات القانونية في LEGINT Core.",
      },
    ],
  }),
  component: Overview,
});

const kpiIcons = [Briefcase, FileText, Landmark, BrainCircuit, ClipboardCheck, Gauge];

const healthLabels: Record<HealthState, { label: string; tone: "success" | "warning" | "error" | "info" }> =
  {
    operational: { label: "يعمل", tone: "success" },
    degraded: { label: "تدهور جزئي", tone: "warning" },
    authorization: { label: "يتطلب تصريحًا", tone: "warning" },
    down: { label: "متوقف", tone: "error" },
  };

const timelineTone: Record<string, string> = {
  success: "legalGreen",
  warning: "yellow",
  error: "red",
  info: "blue",
  neutral: "gray",
  brand: "navy",
};

function Overview() {
  return (
    <Box>
      <PageHeader
        eyebrow="مساء الخير، نورة"
        title="لوحة المراقبة"
        description="نظرة شاملة على حالة LEGINT Core والعمليات القانونية — تابع القضايا، المصادر القانونية، التحليلات وعمليات النظام من مكان واحد."
        actions={
          <>
            <Button color="navy" leftSection={<Plus size={15} />} component={Link} to="/cases">
              إنشاء قضية
            </Button>
            <Button variant="default" leftSection={<Upload size={15} />} component={Link} to="/documents">
              رفع مستند
            </Button>
            <Button variant="default" leftSection={<Landmark size={15} />} component={Link} to="/sources">
              إضافة مصدر رسمي
            </Button>
            <Button
              variant="default"
              leftSection={<BrainCircuit size={15} />}
              component={Link}
              to="/analysis"
            >
              تشغيل تحليل
            </Button>
            <Button
              variant="light"
              color="navy"
              leftSection={<TerminalSquare size={15} />}
              component={Link}
              to="/sandbox"
            >
              مختبر API
            </Button>
          </>
        }
      />

      <SimpleGrid cols={{ base: 1, xs: 2, md: 3, xl: 6 }} spacing="md" mb="lg">
        {kpis.map((kpi, i) => (
          <StatCard
            key={kpi.id}
            label={kpi.label}
            value={kpi.value}
            delta={kpi.delta}
            deltaTone={kpi.deltaTone}
            icon={kpiIcons[i]}
          />
        ))}
      </SimpleGrid>

      <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="md" mb="lg">
        <SectionCard
          title="نشاط القضايا"
          description="القضايا الجديدة، التحليلات والمستندات خلال الأشهر الستة الماضية"
          action={
            <Badge variant="default" size="sm">
              آخر 6 أشهر
            </Badge>
          }
        >
          <AreaChart
            h={260}
            data={caseActivitySeries}
            dataKey="month"
            withDots={false}
            curveType="linear"
            gridAxis="y"
            strokeWidth={1.6}
            series={[
              { name: "documents", label: "المستندات", color: "navy.3" },
              { name: "analyses", label: "التحليلات", color: "legalGreen.7" },
              { name: "cases", label: "القضايا", color: "navy.8" },
            ]}
            withLegend
            legendProps={{ verticalAlign: "bottom" }}
          />
        </SectionCard>

        <SectionCard
          title="حالة النظام"
          description="مراقبة تشغيلية لمكوّنات المنصة"
          action={
            <Button
              variant="subtle"
              color="navy"
              size="compact-sm"
              component={Link}
              to="/system"
              rightSection={<ArrowUpRight size={14} />}
            >
              صفحة النظام
            </Button>
          }
        >
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xs">
            {systemHealth.map((item) => {
              const state = healthLabels[item.state];
              return (
                <Box
                  key={item.id}
                  p="sm"
                  style={{ border: "1px solid #E3E8EF", borderRadius: 8, background: "#FFFFFF" }}
                >
                  <Group justify="space-between" wrap="nowrap" mb={6} gap="xs">
                    <Stack gap={0} style={{ minWidth: 0 }}>
                      <Text size="sm" fw={600} c="#16202A">
                        {item.name}
                      </Text>
                      <Mono size={10.5} c="#98A2B3">
                        {item.nameEn}
                      </Mono>
                    </Stack>
                    <StatusBadge tone={state.tone} label={state.label} />
                  </Group>
                  <Group justify="space-between" gap="xs">
                    <Text fz={11} c="#98A2B3">
                      {item.metricLabel}
                    </Text>
                    <Mono size={12} c="#0B1F33" weight={600}>
                      {item.metric}
                    </Mono>
                  </Group>
                </Box>
              );
            })}
          </SimpleGrid>
        </SectionCard>
      </SimpleGrid>

      <SimpleGrid cols={{ base: 1, xl: 3 }} spacing="md">
        <Box style={{ gridColumn: "span 1 / span 1" }} className="legint-span-2">
          <SectionCard
            title="آخر العمليات"
            description="أحدث الأحداث التشغيلية على مستوى مساحة العمل"
            action={
              <Button
                variant="subtle"
                color="navy"
                size="compact-sm"
                component={Link}
                to="/audit"
                rightSection={<ArrowUpRight size={14} />}
              >
                سجل التدقيق
              </Button>
            }
            padding="0"
          >
            <Table verticalSpacing="sm" horizontalSpacing="md">
              <Table.Thead style={{ background: "#F7F9FB", boxShadow: "inset 0 -1px 0 #E3E8EF" }}>
                <Table.Tr>
                  <Table.Th>
                    <Text fz={11.5} fw={650} c="#3F5B7E">
                      المنفّذ
                    </Text>
                  </Table.Th>
                  <Table.Th>
                    <Text fz={11.5} fw={650} c="#3F5B7E">
                      الإجراء والمورد
                    </Text>
                  </Table.Th>
                  <Table.Th>
                    <Text fz={11.5} fw={650} c="#3F5B7E">
                      الوقت
                    </Text>
                  </Table.Th>
                  <Table.Th>
                    <Text fz={11.5} fw={650} c="#3F5B7E">
                      الحالة
                    </Text>
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {recentActivity.map((event) => (
                  <Table.Tr key={event.id}>
                    <Table.Td>
                      <Text size="sm" fw={600} c="#16202A">
                        {event.actor}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Stack gap={2}>
                        <Text size="sm" c="#16202A">
                          {event.action} <Text span fw={600}>{event.resource}</Text>
                        </Text>
                        {event.resourceId && (
                          <Mono size={11} c="#667085">
                            {event.resourceId}
                          </Mono>
                        )}
                      </Stack>
                    </Table.Td>
                    <Table.Td>
                      <Text fz={12} c="#667085">
                        {event.timestamp}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <StatusBadge tone={event.status} label={event.statusLabel} />
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </SectionCard>
        </Box>

        <Stack gap="md">
          <SectionCard
            title="المهام التي تحتاج إلى انتباه"
            description="بنود تشغيلية تتطلب إجراءً من المسؤول"
          >
            <Stack gap="xs">
              {attentionItems.map((item) => (
                <Box
                  key={item.id}
                  p="sm"
                  style={{ border: "1px solid #E3E8EF", borderRadius: 8, background: "#F7F9FB" }}
                >
                  <Group justify="space-between" wrap="nowrap" gap="xs" mb={4}>
                    <Text size="sm" fw={650} c="#0B1F33">
                      {item.title}
                    </Text>
                    <StatusBadge
                      tone={item.tone}
                      dot={false}
                      label={item.tone === "error" ? "عالية" : item.tone === "warning" ? "متوسطة" : "معلومة"}
                    />
                  </Group>
                  <Text fz={12} c="#667085" mb={8}>
                    {item.description}
                  </Text>
                  <Button
                    size="compact-sm"
                    variant="light"
                    color="navy"
                    component={Link}
                    to={item.to}
                    rightSection={<ArrowUpRight size={13} />}
                  >
                    {item.cta}
                  </Button>
                </Box>
              ))}
            </Stack>
          </SectionCard>

          <SectionCard title="الجدول الزمني للنشاط" description="تدفّق الأحداث الأخيرة">
            <Timeline bulletSize={14} lineWidth={1.5} color="navy">
              {recentActivity.slice(0, 5).map((event) => (
                <Timeline.Item
                  key={event.id}
                  color={timelineTone[event.status]}
                  title={
                    <Text size="sm" fw={600} c="#16202A">
                      {event.resource}
                    </Text>
                  }
                >
                  <Text fz={12} c="#667085">
                    {event.actor} — {event.action}
                  </Text>
                  <Group gap={8} mt={4}>
                    <Text fz={11} c="#98A2B3">
                      {event.timestamp}
                    </Text>
                    {event.resourceId && (
                      <Mono size={10.5} c="#98A2B3">
                        {event.resourceId}
                      </Mono>
                    )}
                  </Group>
                </Timeline.Item>
              ))}
            </Timeline>
          </SectionCard>
        </Stack>
      </SimpleGrid>

      <Paper mt="lg" p="md">
        <Group justify="space-between" wrap="wrap" gap="md">
          <Stack gap={2}>
            <Text fw={650} c="#0B1F33">
              نموذج معلوماتي مترابط
            </Text>
            <Text fz={12} c="#667085">
              الهوية → مساحة العمل → القضايا → المستندات → الوقائع → الأدلة → المصادر القانونية →
              المعرفة → التحليل → المراجعة → إعادة التحليل → التدقيق
            </Text>
          </Stack>
          <Group gap={6}>
            <Tooltip label="آخر عملية معالجة ناجحة" withArrow>
              <ActionIcon variant="light" color="legalGreen" size="lg">
                <Gauge size={17} />
              </ActionIcon>
            </Tooltip>
            <Stack gap={0}>
              <Text fz={11} c="#98A2B3">
                آخر معالجة ناجحة
              </Text>
              <Mono size={12} c="#0B1F33" weight={600}>
                2026-09-16 15:12 · JOB-88401
              </Mono>
            </Stack>
          </Group>
        </Group>
      </Paper>
    </Box>
  );
}
