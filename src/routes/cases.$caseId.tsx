import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  Accordion,
  Alert,
  Anchor,
  Badge,
  Box,
  Button,
  Divider,
  Grid,
  Group,
  Paper,
  Progress,
  RingProgress,
  ScrollArea,
  SimpleGrid,
  Stack,
  Table,
  Tabs,
  Text,
  Timeline,
  Tooltip,
} from "@mantine/core";
import {
  AlertTriangle,
  Archive,
  BrainCircuit,
  Briefcase,
  ClipboardCheck,
  FileText,
  GitCompareArrows,
  Landmark,
  ListChecks,
  Paperclip,
  ScrollText,
  ShieldCheck,
  UserPlus,
} from "lucide-react";
import { PageHeader } from "@/components/legint/PageHeader";
import {
  EmptyState,
  MetadataList,
  Mono,
  RevisionBadge,
  SectionCard,
  StatusBadge,
} from "@/components/legint/primitives";
import {
  analysisRuns,
  analysisStatusLabels,
  caseAuditEvents,
  caseLinkedSources,
  caseParties,
  cases,
  caseStatusLabels,
  docStatusLabels,
  documents,
  facts,
  factStateLabels,
} from "@/data/legint";

export const Route = createFileRoute("/cases/$caseId")({
  loader: ({ params }) => {
    const legalCase = cases.find((c) => c.id === params.caseId);
    if (!legalCase) throw notFound();
    return { legalCase };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "القضية غير متوفرة — LEGINT Core" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.legalCase.title} — منصة LEGINT Core`;
    return {
      meta: [
        { title },
        {
          name: "description",
          content: `منصة عمل القضية ${loaderData.legalCase.id}: الوقائع، الأدلة، التحليل، المراجعات والأسانيد.`,
        },
        { property: "og:title", content: title },
        {
          property: "og:description",
          content: `منصة عمل القضية ${loaderData.legalCase.id} في LEGINT Core.`,
        },
      ],
    };
  },
  component: CaseWorkbench,
});

function CaseWorkbench() {
  const { legalCase } = Route.useLoaderData();
  const status = caseStatusLabels[legalCase.status];
  const caseDocuments = documents.filter((d) => d.caseId === legalCase.id);
  const caseFacts = facts.filter((f) => f.caseId === legalCase.id);
  const caseRuns = analysisRuns.filter((r) => r.caseId === legalCase.id);

  return (
    <Box>
      <PageHeader
        crumbs={[
          { label: "لوحة المراقبة", to: "/" },
          { label: "القضايا", to: "/cases" },
          { label: legalCase.id },
        ]}
        eyebrow={legalCase.type}
        title={legalCase.title}
        description={`${legalCase.court} · العميل: ${legalCase.client}`}
        meta={
          <Group gap="xs" mt={6} wrap="wrap">
            <Mono size={12.5} c="#102A43" weight={600}>
              {legalCase.id}
            </Mono>
            <StatusBadge tone={status.tone} label={status.label} />
            <RevisionBadge revision="CASE-REV-07" />
            <Text fz={11.5} c="#98A2B3">
              آخر تحديث {legalCase.updatedAt} · المراجع {legalCase.reviewer}
            </Text>
          </Group>
        }
        actions={
          <>
            <Button color="navy" leftSection={<BrainCircuit size={15} />}>
              تشغيل تحليل
            </Button>
            <Button variant="default" leftSection={<Paperclip size={15} />}>
              رفع مستند
            </Button>
            <Button variant="default" leftSection={<UserPlus size={15} />}>
              إسناد مراجع
            </Button>
            <Tooltip label="إجراء يتطلب تأكيدًا" withArrow>
              <Button variant="default" color="red" leftSection={<Archive size={15} />}>
                أرشفة
              </Button>
            </Tooltip>
          </>
        }
      />

      <Tabs defaultValue="overview" color="navy" keepMounted={false}>
        <Tabs.List mb="lg" style={{ borderBottom: "1px solid #E3E8EF" }}>
          <Tabs.Tab value="overview" leftSection={<Briefcase size={15} />}>
            نظرة عامة
          </Tabs.Tab>
          <Tabs.Tab value="documents" leftSection={<FileText size={15} />}>
            المستندات
            <Badge ms={6} size="sm" variant="light" color="gray">
              {caseDocuments.length}
            </Badge>
          </Tabs.Tab>
          <Tabs.Tab value="facts" leftSection={<ListChecks size={15} />}>
            الوقائع
            <Badge ms={6} size="sm" variant="light" color="gray">
              {caseFacts.length}
            </Badge>
          </Tabs.Tab>
          <Tabs.Tab value="evidence" leftSection={<ShieldCheck size={15} />}>
            الأدلة
          </Tabs.Tab>
          <Tabs.Tab value="analysis" leftSection={<BrainCircuit size={15} />}>
            التحليل
          </Tabs.Tab>
          <Tabs.Tab value="reviews" leftSection={<ClipboardCheck size={15} />}>
            المراجعات
          </Tabs.Tab>
          <Tabs.Tab value="sources" leftSection={<Landmark size={15} />}>
            الأسانيد
          </Tabs.Tab>
          <Tabs.Tab value="replay" leftSection={<GitCompareArrows size={15} />}>
            إعادة التحليل
          </Tabs.Tab>
          <Tabs.Tab value="audit" leftSection={<ScrollText size={15} />}>
            التدقيق
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="overview">
          <Grid gutter="md">
            <Grid.Col span={{ base: 12, lg: 8 }}>
              <Stack gap="md">
                <SectionCard title="بيانات القضية" description="المعلومات الأساسية والمحكمة المختصة">
                  <MetadataList
                    columns={3}
                    items={[
                      { label: "رقم القضية", value: <Mono>{legalCase.id}</Mono> },
                      { label: "نوع القضية", value: legalCase.type },
                      { label: "المحكمة", value: legalCase.court },
                      { label: "العميل", value: legalCase.client },
                      { label: "الدائرة", value: "الدائرة التجارية الثالثة" },
                      { label: "رقم الدعوى بالمحكمة", value: <Mono>4610221944</Mono> },
                      { label: "تاريخ القيد", value: <Mono>2026-04-11</Mono> },
                      { label: "الجلسة القادمة", value: <Mono>2026-10-02</Mono> },
                      { label: "المراجع المسؤول", value: legalCase.reviewer },
                    ]}
                  />
                  <Divider my="md" color="#E3E8EF" />
                  <Text size="xs" c="#98A2B3" fw={600} mb={4}>
                    وصف القضية
                  </Text>
                  <Text size="sm" c="#16202A" lh={1.7}>
                    مطالبة بإلزام المدعى عليه بتنفيذ التزاماته التعاقدية الواردة في عقد التوريد الموقّع
                    بتاريخ 12 مارس 2025، مع تطبيق الشرط الجزائي المتفق عليه عن التأخير في تسليم الدفعة
                    الثانية، والتعويض عن الأضرار المباشرة الناتجة عن توقف خط الإنتاج.
                  </Text>
                </SectionCard>

                <SectionCard title="الأطراف" description="أطراف الدعوى ووكلاؤهم">
                  <Table>
                    <Table.Thead style={{ background: "#F7F9FB" }}>
                      <Table.Tr>
                        <Table.Th>
                          <Text fz={11.5} fw={650} c="#3F5B7E">
                            الصفة
                          </Text>
                        </Table.Th>
                        <Table.Th>
                          <Text fz={11.5} fw={650} c="#3F5B7E">
                            الاسم
                          </Text>
                        </Table.Th>
                        <Table.Th>
                          <Text fz={11.5} fw={650} c="#3F5B7E">
                            المعرّف
                          </Text>
                        </Table.Th>
                        <Table.Th>
                          <Text fz={11.5} fw={650} c="#3F5B7E">
                            الوكيل
                          </Text>
                        </Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {caseParties.map((p) => (
                        <Table.Tr key={p.role}>
                          <Table.Td>
                            <Badge variant="default" size="sm">
                              {p.role}
                            </Badge>
                          </Table.Td>
                          <Table.Td>
                            <Text size="sm" fw={600} c="#16202A">
                              {p.name}
                            </Text>
                          </Table.Td>
                          <Table.Td>
                            <Mono size={12} c="#667085">
                              {p.identifier}
                            </Mono>
                          </Table.Td>
                          <Table.Td>
                            <Text size="sm" c="#667085">
                              {p.counsel}
                            </Text>
                          </Table.Td>
                        </Table.Tr>
                      ))}
                    </Table.Tbody>
                  </Table>
                </SectionCard>

                <SectionCard title="المسار الزمني للقضية" description="أحداث الملف والعمليات المرتبطة">
                  <Timeline bulletSize={14} lineWidth={1.5} color="navy" active={4}>
                    <Timeline.Item title="قيد الدعوى">
                      <Text fz={12} c="#667085">
                        تم قيد الدعوى لدى المحكمة التجارية بالرياض.
                      </Text>
                      <Mono size={11} c="#98A2B3">
                        2026-04-11
                      </Mono>
                    </Timeline.Item>
                    <Timeline.Item title="استلام المستندات الأساسية" color="navy">
                      <Text fz={12} c="#667085">
                        18 مستندًا تمت معالجتها واستخراج نصوصها بنجاح.
                      </Text>
                      <Mono size={11} c="#98A2B3">
                        2026-05-02
                      </Mono>
                    </Timeline.Item>
                    <Timeline.Item title="استخراج الوقائع" color="legalGreen">
                      <Text fz={12} c="#667085">
                        12 واقعة مستخرجة، 8 مؤكدة، 3 تحتاج مراجعة.
                      </Text>
                      <Mono size={11} c="#98A2B3">
                        2026-09-15
                      </Mono>
                    </Timeline.Item>
                    <Timeline.Item title="تشغيل التحليل RUN-92F7" color="legalGreen">
                      <Text fz={12} c="#667085">
                        اكتمل التحليل مع 14 سندًا قانونيًا.
                      </Text>
                      <Mono size={11} c="#98A2B3">
                        2026-09-16 13:51
                      </Mono>
                    </Timeline.Item>
                    <Timeline.Item title="مراجعة قانونية" color="yellow">
                      <Text fz={12} c="#667085">
                        بانتظار اعتماد واقعتين متنازع عليهما.
                      </Text>
                    </Timeline.Item>
                  </Timeline>
                </SectionCard>
              </Stack>
            </Grid.Col>

            <Grid.Col span={{ base: 12, lg: 4 }}>
              <Stack gap="md">
                <Paper p="md">
                  <Group justify="space-between" mb="sm">
                    <Text fw={650} c="#0B1F33">
                      ذكاء القضية
                    </Text>
                    <Badge variant="light" color="navy" size="sm">
                      Case Intelligence
                    </Badge>
                  </Group>
                  <Group justify="space-between" wrap="nowrap" mb="md">
                    <RingProgress
                      size={96}
                      thickness={9}
                      roundCaps
                      sections={[
                        { value: 62, color: "legalGreen.7" },
                        { value: 22, color: "yellow.6" },
                        { value: 16, color: "gray.4" },
                      ]}
                      label={
                        <Text ta="center" fz={13} fw={700} c="#0B1F33">
                          62%
                        </Text>
                      }
                    />
                    <Stack gap={6} style={{ flex: 1 }}>
                      <Text fz={11.5} c="#667085">
                        جاهزية الملف التحليلية
                      </Text>
                      <Group gap={6}>
                        <StatusBadge tone="success" label="8 وقائع مؤكدة" dot={false} />
                        <StatusBadge tone="warning" label="3 تحتاج مراجعة" dot={false} />
                      </Group>
                    </Stack>
                  </Group>
                  <Stack gap="xs">
                    {[
                      { label: "وقائع مستخرجة", value: "12" },
                      { label: "أدلة مرتبطة", value: "27" },
                      { label: "مصادر قانونية", value: "3" },
                      { label: "تشغيلات التحليل", value: String(caseRuns.length) },
                      { label: "مستندات", value: String(caseDocuments.length) },
                    ].map((row) => (
                      <Group key={row.label} justify="space-between">
                        <Text fz={12.5} c="#667085">
                          {row.label}
                        </Text>
                        <Mono size={12.5} weight={600}>
                          {row.value}
                        </Mono>
                      </Group>
                    ))}
                  </Stack>
                </Paper>

                <Alert
                  color="yellow"
                  icon={<AlertTriangle size={16} />}
                  title="تحفظات تحليلية"
                  variant="light"
                >
                  <Stack gap={4}>
                    <Text fz={12.5}>واقعة متنازع عليها تؤثر على نتيجة الشرط الجزائي.</Text>
                    <Text fz={12.5}>قيمة الأضرار غير المباشرة غير مثبتة بمستند.</Text>
                  </Stack>
                </Alert>

                <SectionCard title="مصادر مرتبطة" description="الأسانيد النظامية المستخدمة">
                  <Stack gap="xs">
                    {caseLinkedSources.map((s) => (
                      <Box
                        key={s.id}
                        p="xs"
                        style={{ border: "1px solid #E3E8EF", borderRadius: 8, background: "#F7F9FB" }}
                      >
                        <Group justify="space-between" wrap="nowrap" gap="xs">
                          <Stack gap={2} style={{ minWidth: 0 }}>
                            <Text size="sm" fw={600} c="#16202A">
                              {s.title}
                            </Text>
                            <Text fz={11.5} c="#667085">
                              {s.article}
                            </Text>
                          </Stack>
                          <Stack gap={4} align="flex-end">
                            <Mono size={10.5} c="#98A2B3">
                              {s.id}
                            </Mono>
                            <RevisionBadge revision={s.revision} />
                          </Stack>
                        </Group>
                      </Box>
                    ))}
                    <Button
                      variant="subtle"
                      color="navy"
                      size="compact-sm"
                      component={Link}
                      to="/sources"
                    >
                      إدارة المصادر القانونية
                    </Button>
                  </Stack>
                </SectionCard>
              </Stack>
            </Grid.Col>
          </Grid>
        </Tabs.Panel>

        <Tabs.Panel value="documents">
          <SectionCard
            title="مستندات القضية"
            description="حالة الاستخراج والتحقق لكل مستند"
            padding="0"
            action={
              <Button variant="default" size="compact-sm" component={Link} to="/documents">
                إدارة المستندات
              </Button>
            }
          >
            <ScrollArea type="auto">
              <Table style={{ minWidth: 820 }}>
                <Table.Thead style={{ background: "#F7F9FB", boxShadow: "inset 0 -1px 0 #E3E8EF" }}>
                  <Table.Tr>
                    {["المستند", "النوع", "النسخة", "الصفحات", "SHA-256", "الحالة"].map((h) => (
                      <Table.Th key={h}>
                        <Text fz={11.5} fw={650} c="#3F5B7E">
                          {h}
                        </Text>
                      </Table.Th>
                    ))}
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {caseDocuments.map((doc) => (
                    <Table.Tr key={doc.id}>
                      <Table.Td>
                        <Anchor
                          component={Link}
                          to="/documents/$documentId"
                          params={{ documentId: doc.id }}
                          underline="never"
                        >
                          <Text size="sm" fw={600} c="#102A43">
                            {doc.name}
                          </Text>
                        </Anchor>
                        <Mono size={10.5} c="#98A2B3">
                          {doc.id}
                        </Mono>
                      </Table.Td>
                      <Table.Td>
                        <Badge variant="default" size="sm">
                          {doc.type}
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <RevisionBadge revision={doc.revision} />
                      </Table.Td>
                      <Table.Td>
                        <Mono size={12}>{String(doc.pages)}</Mono>
                      </Table.Td>
                      <Table.Td>
                        <Mono size={11} c="#667085">
                          {doc.sha256}
                        </Mono>
                      </Table.Td>
                      <Table.Td>
                        <StatusBadge
                          tone={docStatusLabels[doc.status].tone}
                          label={docStatusLabels[doc.status].label}
                        />
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </ScrollArea>
          </SectionCard>
        </Tabs.Panel>

        <Tabs.Panel value="facts">
          <Stack gap="md">
            {caseFacts.map((fact) => (
              <Paper key={fact.id} p="md">
                <Group justify="space-between" align="flex-start" wrap="nowrap" gap="md">
                  <Stack gap={8} style={{ minWidth: 0 }}>
                    <Group gap="xs">
                      <Mono size={12} c="#102A43" weight={600}>
                        {fact.id}
                      </Mono>
                      <StatusBadge
                        tone={factStateLabels[fact.state].tone}
                        label={factStateLabels[fact.state].label}
                      />
                      <RevisionBadge revision={fact.revision} />
                    </Group>
                    <Text size="sm" c="#16202A" lh={1.7}>
                      {fact.statement}
                    </Text>
                    <Group gap="lg" wrap="wrap">
                      <Text fz={11.5} c="#667085">
                        الدليل: <Mono size={11.5} c="#3F5B7E">{fact.evidence}</Mono>
                      </Text>
                      <Text fz={11.5} c="#667085">
                        السند: {fact.source}
                      </Text>
                      <Text fz={11.5} c="#667085">
                        المراجع: {fact.reviewer}
                      </Text>
                    </Group>
                  </Stack>
                  <Stack gap={6} align="flex-end" w={150}>
                    <Text fz={11} c="#98A2B3">
                      درجة الثقة
                    </Text>
                    <Progress
                      value={fact.confidence * 100}
                      color={fact.confidence > 0.85 ? "legalGreen" : fact.confidence > 0.6 ? "yellow" : "gray"}
                      size="sm"
                      w={130}
                    />
                    <Mono size={12} weight={600}>
                      {`${Math.round(fact.confidence * 100)}%`}
                    </Mono>
                    <Group gap={6} mt={4}>
                      <Button size="compact-xs" color="legalGreen" variant="light">
                        اعتماد
                      </Button>
                      <Button size="compact-xs" variant="default">
                        مراجعة
                      </Button>
                    </Group>
                  </Stack>
                </Group>
              </Paper>
            ))}
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="evidence">
          <SimpleGrid cols={{ base: 1, md: 2, xl: 3 }} spacing="md">
            {[
              { id: "EVD-1201", label: "عقد التوريد — البند 4/2", doc: "DOC-4468 ص. 9", tone: "success" as const },
              { id: "EVD-1202", label: "محضر الجلسة الأولى — إقرار التأخير", doc: "DOC-4462 ص. 3", tone: "success" as const },
              { id: "EVD-1203", label: "إشعار الإعذار", doc: "DOC-4471 ص. 8", tone: "warning" as const },
            ].map((e) => (
              <Paper key={e.id} p="md">
                <Group justify="space-between" mb={8}>
                  <Mono size={12} weight={600} c="#102A43">
                    {e.id}
                  </Mono>
                  <StatusBadge
                    tone={e.tone}
                    label={e.tone === "success" ? "موثّق" : "بانتظار التحقق"}
                  />
                </Group>
                <Text size="sm" fw={600} c="#16202A" mb={4}>
                  {e.label}
                </Text>
                <Mono size={11.5} c="#667085">
                  {e.doc}
                </Mono>
              </Paper>
            ))}
          </SimpleGrid>
        </Tabs.Panel>

        <Tabs.Panel value="analysis">
          <SectionCard title="تشغيلات التحليل" description="سجل التحليلات المرتبطة بالقضية" padding="0">
            <Table>
              <Table.Thead style={{ background: "#F7F9FB", boxShadow: "inset 0 -1px 0 #E3E8EF" }}>
                <Table.Tr>
                  {["المعرّف", "النسخة", "الحالة", "المدة", "الأسانيد", "الوقائع", "بواسطة"].map((h) => (
                    <Table.Th key={h}>
                      <Text fz={11.5} fw={650} c="#3F5B7E">
                        {h}
                      </Text>
                    </Table.Th>
                  ))}
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {caseRuns.map((run) => (
                  <Table.Tr key={run.id}>
                    <Table.Td>
                      <Mono size={12} weight={600} c="#102A43">
                        {run.id}
                      </Mono>
                    </Table.Td>
                    <Table.Td>
                      <RevisionBadge revision={run.revision} />
                    </Table.Td>
                    <Table.Td>
                      <StatusBadge
                        tone={analysisStatusLabels[run.status].tone}
                        label={analysisStatusLabels[run.status].label}
                      />
                    </Table.Td>
                    <Table.Td>
                      <Mono size={12}>{run.duration}</Mono>
                    </Table.Td>
                    <Table.Td>
                      <Mono size={12}>{String(run.citations)}</Mono>
                    </Table.Td>
                    <Table.Td>
                      <Mono size={12}>{String(run.factsUsed)}</Mono>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm" c="#16202A">
                        {run.startedBy}
                      </Text>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </SectionCard>
        </Tabs.Panel>

        <Tabs.Panel value="reviews">
          <SectionCard title="المراجعات المرتبطة" description="بنود بانتظار قرار المراجع القانوني">
            <Accordion variant="separated" radius="md">
              <Accordion.Item value="rev-1">
                <Accordion.Control>
                  <Group gap="xs">
                    <Mono size={12} weight={600}>
                      REV-2201
                    </Mono>
                    <Text size="sm" fw={600} c="#16202A">
                      مراجعة واقعة — FACT-0313
                    </Text>
                    <StatusBadge tone="warning" label="قيد المراجعة" />
                  </Group>
                </Accordion.Control>
                <Accordion.Panel>
                  <Text size="sm" c="#667085" mb="sm">
                    السبب: عدم كفاية الدليل على تسليم إشعار الإعذار بالطرق النظامية.
                  </Text>
                  <Group gap="xs">
                    <Button size="compact-sm" color="legalGreen">
                      قبول
                    </Button>
                    <Button size="compact-sm" variant="default">
                      تصحيح
                    </Button>
                    <Button size="compact-sm" variant="default" color="red">
                      رفض
                    </Button>
                  </Group>
                </Accordion.Panel>
              </Accordion.Item>
              <Accordion.Item value="rev-2">
                <Accordion.Control>
                  <Group gap="xs">
                    <Mono size={12} weight={600}>
                      REV-2198
                    </Mono>
                    <Text size="sm" fw={600} c="#16202A">
                      تصحيح تحليل — RUN-92E1
                    </Text>
                    <StatusBadge tone="info" label="معلقة" />
                  </Group>
                </Accordion.Control>
                <Accordion.Panel>
                  <Text size="sm" c="#667085">
                    السبب: تحديث نسخة المعرفة يستلزم إعادة احتساب الشرط الجزائي.
                  </Text>
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </SectionCard>
        </Tabs.Panel>

        <Tabs.Panel value="sources">
          <SectionCard title="الأسانيد النظامية" description="المواد النظامية المعتمدة في التحليل">
            <Stack gap="xs">
              {caseLinkedSources.map((s) => (
                <Group
                  key={s.id}
                  justify="space-between"
                  p="sm"
                  style={{ border: "1px solid #E3E8EF", borderRadius: 8 }}
                >
                  <Stack gap={2}>
                    <Text size="sm" fw={600} c="#16202A">
                      {s.title}
                    </Text>
                    <Text fz={12} c="#667085">
                      {s.article}
                    </Text>
                  </Stack>
                  <Group gap="xs">
                    <Mono size={11} c="#98A2B3">
                      {s.id}
                    </Mono>
                    <RevisionBadge revision={s.revision} />
                  </Group>
                </Group>
              ))}
            </Stack>
          </SectionCard>
        </Tabs.Panel>

        <Tabs.Panel value="replay">
          <EmptyState
            icon={GitCompareArrows}
            title="لم يتم تنفيذ إعادة تحليل لهذه القضية."
            description="أعد تشغيل التحليل على نسخة معرفة أحدث لمقارنة النتائج والأسانيد مع النسخة الأصلية."
            action={
              <Button color="navy" component={Link} to="/replay">
                فتح إعادة التحليل والمقارنة
              </Button>
            }
          />
        </Tabs.Panel>

        <Tabs.Panel value="audit">
          <SectionCard
            title="سجل التدقيق"
            description="سجل غير قابل للتعديل لكل عملية على هذه القضية"
            padding="0"
          >
            <Table>
              <Table.Thead style={{ background: "#F7F9FB", boxShadow: "inset 0 -1px 0 #E3E8EF" }}>
                <Table.Tr>
                  {["الوقت", "المنفّذ", "الإجراء", "المورد", "النتيجة", "Trace"].map((h) => (
                    <Table.Th key={h}>
                      <Text fz={11.5} fw={650} c="#3F5B7E">
                        {h}
                      </Text>
                    </Table.Th>
                  ))}
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {caseAuditEvents.map((e) => (
                  <Table.Tr key={e.id}>
                    <Table.Td>
                      <Mono size={11.5} c="#667085">
                        {e.timestamp}
                      </Mono>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm" c="#16202A">
                        {e.actor}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Mono size={12} c="#102A43">
                        {e.action}
                      </Mono>
                    </Table.Td>
                    <Table.Td>
                      <Stack gap={0}>
                        <Text fz={12} c="#667085">
                          {e.resourceType}
                        </Text>
                        <Mono size={11}>{e.resourceId}</Mono>
                      </Stack>
                    </Table.Td>
                    <Table.Td>
                      <StatusBadge
                        tone={e.result === "success" ? "success" : e.result === "denied" ? "warning" : "error"}
                        label={e.result === "success" ? "ناجح" : e.result === "denied" ? "مرفوض" : "خطأ"}
                      />
                    </Table.Td>
                    <Table.Td>
                      <Mono size={11} c="#98A2B3">
                        {e.traceId}
                      </Mono>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </SectionCard>
        </Tabs.Panel>
      </Tabs>
    </Box>
  );
}
