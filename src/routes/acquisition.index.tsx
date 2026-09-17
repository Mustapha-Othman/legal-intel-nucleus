import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Anchor, Badge, Box, Button, Group, Paper, ScrollArea, Select, SimpleGrid, Stack, Table, Text } from "@mantine/core";
import { Activity, AlertTriangle, CheckCircle2, DownloadCloud, FileUp, Loader, ShieldAlert } from "lucide-react";
import { PageHeader } from "@/components/legint/PageHeader";
import { AcquisitionPipeline } from "@/components/legint/AcquisitionPipeline";
import { Mono, SectionCard, StatCard, StatusBadge } from "@/components/legint/primitives";
import {
  acquisitionAttempts,
  acquisitionMethodLabels,
  acquisitionSummary,
  attemptStateLabels,
  authorizationLabels,
} from "@/data/sources";

export const Route = createFileRoute("/acquisition/")({
  head: () => ({
    meta: [
      { title: "الاستحواذ على المصادر الرسمية — LEGINT Core" },
      {
        name: "description",
        content: "مركز التحكم بعمليات الاستحواذ: الطلب، التصريح، الجلب، التحقق، الاستخراج، الأسانيد وإنشاء النسخ.",
      },
      { property: "og:title", content: "الاستحواذ على المصادر الرسمية — LEGINT Core" },
      { property: "og:description", content: "متابعة تشغيلية لكل محاولة استحواذ على مصدر قانوني رسمي." },
    ],
  }),
  component: AcquisitionCenter,
});

function AcquisitionCenter() {
  const navigate = useNavigate();
  const featured = acquisitionAttempts[0];

  return (
    <Box>
      <PageHeader
        crumbs={[{ label: "لوحة المراقبة", to: "/" }, { label: "المصادر القانونية", to: "/sources" }, { label: "الاستحواذ" }]}
        title="الاستحواذ على المصادر الرسمية"
        description="متابعة كل محاولة استحواذ من الطلب حتى إنشاء النسخة، مع سجل تحقق كامل."
        actions={
          <>
            <Button color="navy" leftSection={<DownloadCloud size={15} />}>
              بدء استحواذ جديد
            </Button>
            <Button variant="default" leftSection={<FileUp size={15} />} component={Link} to="/acquisition/intake">
              إدخال رسمي يدوي
            </Button>
          </>
        }
      />

      <SimpleGrid cols={{ base: 1, xs: 2, md: 3, lg: 5 }} spacing="md" mb="lg">
        <StatCard label="عمليات اليوم" value={acquisitionSummary.today} delta="خلال 24 ساعة" icon={Activity} />
        <StatCard label="قيد التنفيذ" value={acquisitionSummary.processing} delta="جارية الآن" deltaTone="info" icon={Loader} />
        <StatCard label="ناجحة" value={acquisitionSummary.succeeded} delta="اكتملت بالتحقق" deltaTone="success" icon={CheckCircle2} />
        <StatCard label="فاشلة" value={acquisitionSummary.failed} delta="تحتاج معالجة" deltaTone="error" icon={AlertTriangle} />
        <StatCard label="تحتاج إلى تصريح" value={acquisitionSummary.authorization} delta="بانتظار الجهة" deltaTone="warning" icon={ShieldAlert} />
      </SimpleGrid>

      {featured && (
        <Box mb="lg">
          <SectionCard
            title="مسار العملية التشغيلي"
            description={`${featured.id} — ${featured.sourceName}`}
            action={
              <Button
                size="xs"
                variant="default"
                component={Link}
                to="/acquisition/$attemptId"
                params={{ attemptId: featured.id } as never}
              >
                فتح المحاولة
              </Button>
            }
          >
            <AcquisitionPipeline steps={featured.pipeline} />
          </SectionCard>
        </Box>
      )}

      <Paper>
        <Group px="md" py="sm" justify="space-between" wrap="wrap" style={{ borderBottom: "1px solid #E3E8EF" }}>
          <Group gap="xs">
            <Text fw={650} c="#0B1F33">
              محاولات الاستحواذ
            </Text>
            <Badge variant="default">{acquisitionAttempts.length}</Badge>
          </Group>
          <Group gap="xs" wrap="wrap">
            <Select size="sm" w={165} placeholder="الحالة" clearable data={["مكتملة", "قيد التنفيذ", "فاشلة", "تحتاج إلى تصريح", "منتهية", "محجوبة", "فشل التحقق"]} />
            <Select size="sm" w={165} placeholder="طريقة الاستحواذ" clearable data={["جلب آلي", "إدخال يدوي رسمي", "رفع ملف رسمي", "استكشاف HTML"]} />
            <Select size="sm" w={150} placeholder="التصريح" clearable data={["غير مطلوب", "مصرَّح", "مطلوب", "منتهٍ", "محجوب"]} />
          </Group>
        </Group>
        <ScrollArea type="auto" offsetScrollbars>
          <Table highlightOnHover style={{ minWidth: 1150 }}>
            <Table.Thead style={{ background: "#F7F9FB", boxShadow: "inset 0 -1px 0 #E3E8EF" }}>
              <Table.Tr>
                {["Attempt ID", "المصدر", "النوع", "طريقة الاستحواذ", "Authorization", "HTTP / Upload", "الحالة", "بدأ", "المدة", "النتيجة"].map((h) => (
                  <Table.Th key={h}>
                    <Text fz={11.5} fw={650} c="#3F5B7E" style={{ whiteSpace: "nowrap" }}>
                      {h}
                    </Text>
                  </Table.Th>
                ))}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {acquisitionAttempts.map((a) => (
                <Table.Tr
                  key={a.id}
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate({ to: "/acquisition/$attemptId", params: { attemptId: a.id } })}
                >
                  <Table.Td>
                    <Mono size={12} c="#102A43" weight={650}>
                      {a.id}
                    </Mono>
                  </Table.Td>
                  <Table.Td>
                    <Stack gap={2}>
                      <Anchor
                        component={Link}
                        to="/sources/$sourceId"
                        params={{ sourceId: a.sourceId } as never}
                        underline="never"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Text fz={13} fw={600} c="#102A43">
                          {a.sourceName}
                        </Text>
                      </Anchor>
                      <Mono size={10.5} c="#98A2B3">
                        {a.sourceId}
                      </Mono>
                    </Stack>
                  </Table.Td>
                  <Table.Td>
                    <Badge variant="default" size="sm">
                      {a.docType}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Text fz={12.5}>{acquisitionMethodLabels[a.method].split(" — ")[1]}</Text>
                  </Table.Td>
                  <Table.Td>
                    <StatusBadge dot={false} tone={authorizationLabels[a.authorization].tone} label={authorizationLabels[a.authorization].label} />
                  </Table.Td>
                  <Table.Td>
                    <Mono size={11.5} c="#667085">
                      {a.transport}
                    </Mono>
                  </Table.Td>
                  <Table.Td>
                    <StatusBadge tone={attemptStateLabels[a.state].tone} label={attemptStateLabels[a.state].label} />
                  </Table.Td>
                  <Table.Td>
                    <Mono size={11.5} c="#667085">
                      {a.startedAt}
                    </Mono>
                  </Table.Td>
                  <Table.Td>
                    <Mono size={11.5} c="#16202A">
                      {a.duration}
                    </Mono>
                  </Table.Td>
                  <Table.Td>
                    <Text fz={12.5} c="#667085" style={{ maxWidth: 240 }} lineClamp={2}>
                      {a.result}
                    </Text>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </ScrollArea>
      </Paper>
    </Box>
  );
}
