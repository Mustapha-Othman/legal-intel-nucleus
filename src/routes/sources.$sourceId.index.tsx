import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import {
  Alert,
  Anchor,
  Badge,
  Box,
  Button,
  Drawer,
  Grid,
  Group,
  Menu,
  Paper,
  ScrollArea,
  SimpleGrid,
  Stack,
  Table,
  Tabs,
  Text,
  TextInput,
  Timeline,
  Tooltip,
} from "@mantine/core";
import { useMemo, useState } from "react";
import {
  AlertTriangle,
  BookOpenCheck,
  Check,
  ClipboardCheck,
  DownloadCloud,
  ExternalLink,
  FileText,
  FileUp,
  GitCompareArrows,
  Landmark,
  Lock,
  MoreHorizontal,
  Search,
  ShieldCheck,
  Upload,
} from "lucide-react";
import { PageHeader } from "@/components/legint/PageHeader";
import { AcquisitionPipeline } from "@/components/legint/AcquisitionPipeline";
import {
  EmptyState,
  MetadataList,
  Mono,
  SectionCard,
  StatCard,
  StatusBadge,
} from "@/components/legint/primitives";
import {
  acquisitionAttempts,
  acquisitionMethodLabels,
  attemptStateLabels,
  authorizationLabels,
  extractedArticles,
  extractionLabels,
  knowledgeStateLabels,
  revisionStateLabels,
  sourceAuditEvents,
  sourceById,
  sourceSpans,
  sourceStatusLabels,
  type SourceSpan,
} from "@/data/sources";

export const Route = createFileRoute("/sources/$sourceId/")({
  loader: ({ params }) => {
    const source = sourceById(params.sourceId);
    if (!source) throw notFound();
    return { source };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "المصدر غير متوفر — LEGINT Core" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.source.name} — LEGINT Core`;
    return {
      meta: [
        { title },
        {
          name: "description",
          content: `تفاصيل المصدر الرسمي ${loaderData.source.id}: النسخ، الاستحواذ، النص المستخرج، الأسانيد المصدرية والمعرفة.`,
        },
        { property: "og:title", content: title },
        { property: "og:description", content: "تفاصيل المصدر القانوني الرسمي في LEGINT Core." },
      ],
    };
  },
  component: SourceDetailPage,
});

function SourceDetailPage() {
  const { source } = Route.useLoaderData();
  const navigate = useNavigate();
  const [tab, setTab] = useState<string>("overview");
  const [span, setSpan] = useState<SourceSpan | null>(null);
  const [textQuery, setTextQuery] = useState("");
  const [activeArticle, setActiveArticle] = useState<string | null>(null);

  const currentRevision = source.revisions[0];
  const attempts = acquisitionAttempts.filter((a) => a.sourceId === source.id);
  const latestAttempt = attempts[0];
  const spans = useMemo(
    () => sourceSpans.filter((s) => s.revisionId === (currentRevision?.id ?? "")),
    [currentRevision],
  );
  const articles = currentRevision?.id === "REV-2026-003" ? extractedArticles : [];
  const filteredArticles = articles.filter(
    (a) => !textQuery.trim() || a.text.includes(textQuery.trim()) || a.article.includes(textQuery.trim()),
  );

  return (
    <Box>
      <PageHeader
        crumbs={[
          { label: "لوحة المراقبة", to: "/" },
          { label: "المصادر القانونية", to: "/sources" },
          { label: source.name },
        ]}
        title={source.name}
        description={`${source.authority} — ${source.type}`}
        meta={
          <Group gap="xs" mt={6} wrap="wrap">
            <Mono size={12} c="#3F5B7E" weight={600}>
              {source.id}
            </Mono>
            <StatusBadge dot={false} tone="brand" label="مصدر رسمي — Official" />
            <StatusBadge
              tone={sourceStatusLabels[source.status].tone}
              label={sourceStatusLabels[source.status].label}
            />
            {currentRevision && (
              <StatusBadge
                tone={revisionStateLabels[currentRevision.state].tone}
                label={`${currentRevision.id} · ${revisionStateLabels[currentRevision.state].label}`}
              />
            )}
            <StatusBadge
              tone={authorizationLabels[source.authorization].tone}
              label={`التصريح: ${authorizationLabels[source.authorization].label}`}
            />
          </Group>
        }
        actions={
          <>
            <Button
              color="navy"
              leftSection={<DownloadCloud size={15} />}
              component={Link}
              to="/acquisition"
              disabled={source.authorization === "blocked"}
            >
              بدء الاستحواذ
            </Button>
            <Button
              variant="default"
              leftSection={<FileUp size={15} />}
              component={Link}
              to="/acquisition/intake"
            >
              رفع PDF رسمي
            </Button>
            <Menu position="bottom-end" withinPortal width={230} shadow="md">
              <Menu.Target>
                <Tooltip label="إجراءات إضافية" withArrow>
                  <Button variant="default" px={10} aria-label="إجراءات إضافية">
                    <MoreHorizontal size={16} />
                  </Button>
                </Tooltip>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item leftSection={<ClipboardCheck size={15} />} onClick={() => setTab("revisions")}>
                  بدء مراجعة النسخة
                </Menu.Item>
                <Menu.Item leftSection={<GitCompareArrows size={15} />} onClick={() => setTab("revisions")}>
                  مقارنة النسخ
                </Menu.Item>
                <Menu.Item leftSection={<ExternalLink size={15} />} component="a" href={source.url} target="_blank" rel="noreferrer">
                  فتح الرابط الرسمي
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item color="red" leftSection={<AlertTriangle size={15} />}>
                  تعليق المصدر (يتطلب تأكيدًا)
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </>
        }
      />

      {source.authorization === "blocked" && (
        <Alert
          color="red"
          variant="light"
          icon={<AlertTriangle size={16} />}
          title="الاستحواذ الآلي محجوب لهذا المصدر"
          mb="lg"
        >
          يمنع الموقع الرسمي الوصول الآلي وفق سياسة <Mono size={12}>robots.txt</Mono>. استخدم الإدخال الرسمي
          اليدوي لرفع نسخة موثوقة بدلًا من تجاوز قيود الجهة.
        </Alert>
      )}
      {source.authorization === "expired" && (
        <Alert
          color="yellow"
          variant="light"
          icon={<AlertTriangle size={16} />}
          title="التصريح التشغيلي منتهٍ"
          mb="lg"
        >
          انتهى تصريح الاستحواذ لهذا المصدر ولن تُنفَّذ العمليات المجدولة حتى تجديده.
        </Alert>
      )}

      <Tabs value={tab} onChange={(v) => setTab(v ?? "overview")} keepMounted={false}>
        <Tabs.List mb="lg">
          <Tabs.Tab value="overview">نظرة عامة</Tabs.Tab>
          <Tabs.Tab value="revisions">النسخ</Tabs.Tab>
          <Tabs.Tab value="acquisition">الاستحواذ</Tabs.Tab>
          <Tabs.Tab value="text">النص المستخرج</Tabs.Tab>
          <Tabs.Tab value="spans">Source Spans</Tabs.Tab>
          <Tabs.Tab value="knowledge">المعرفة</Tabs.Tab>
          <Tabs.Tab value="audit">سجل التدقيق</Tabs.Tab>
        </Tabs.List>

        {/* ---------------------------- OVERVIEW ---------------------------- */}
        <Tabs.Panel value="overview">
          <Grid gutter="md">
            <Grid.Col span={{ base: 12, lg: 7 }}>
              <SectionCard title="معلومات المصدر" description="بيانات التعريف الرسمية للمصدر القانوني">
                <MetadataList
                  columns={2}
                  items={[
                    { label: "الجهة", value: source.authority },
                    { label: "النوع", value: source.type },
                    { label: "الاختصاص", value: source.jurisdiction },
                    {
                      label: "الرابط الرسمي",
                      value: (
                        <Anchor href={source.url} target="_blank" rel="noreferrer" underline="hover">
                          <Mono size={11.5} c="#1F4B99">
                            {source.url}
                          </Mono>
                        </Anchor>
                      ),
                    },
                    { label: "تاريخ النفاذ", value: source.effectiveDate },
                    { label: "تاريخ النشر", value: source.publicationDate },
                    { label: "معرف المصدر", value: <Mono size={12}>{source.id}</Mono> },
                    { label: "آخر تحقق", value: <Mono size={12}>{source.lastVerified}</Mono> },
                  ]}
                />
              </SectionCard>
            </Grid.Col>

            <Grid.Col span={{ base: 12, lg: 5 }}>
              <SectionCard
                title="النسخة الحالية"
                description={currentRevision ? currentRevision.id : "لا توجد نسخة بعد"}
                action={
                  currentRevision && (
                    <Button
                      size="xs"
                      variant="default"
                      onClick={() =>
                        navigate({
                          to: "/sources/$sourceId/revisions/$revisionId",
                          params: { sourceId: source.id, revisionId: currentRevision.id },
                        })
                      }
                    >
                      فتح النسخة
                    </Button>
                  )
                }
              >
                {currentRevision ? (
                  <MetadataList
                    columns={2}
                    items={[
                      { label: "Revision", value: <Mono size={12.5} weight={600}>{currentRevision.id}</Mono> },
                      {
                        label: "State",
                        value: (
                          <StatusBadge
                            tone={revisionStateLabels[currentRevision.state].tone}
                            label={revisionStateLabels[currentRevision.state].label}
                          />
                        ),
                      },
                      {
                        label: "SHA-256",
                        value: (
                          <StatusBadge
                            tone={currentRevision.sha256Verified ? "success" : "error"}
                            label={currentRevision.sha256Verified ? "Verified — مُتحقق منه" : "غير مُتحقق"}
                          />
                        ),
                      },
                      { label: "الصفحات", value: <Mono size={12.5}>{String(currentRevision.pages)}</Mono> },
                      {
                        label: "استخراج النص",
                        value: (
                          <StatusBadge
                            tone={extractionLabels[currentRevision.extraction].tone}
                            label={extractionLabels[currentRevision.extraction].label}
                          />
                        ),
                      },
                      { label: "Source Spans", value: <Mono size={12.5}>{String(currentRevision.spans)}</Mono> },
                      {
                        label: "النشر إلى المعرفة",
                        value: (
                          <StatusBadge
                            tone={knowledgeStateLabels[currentRevision.knowledge].tone}
                            label={knowledgeStateLabels[currentRevision.knowledge].label}
                          />
                        ),
                      },
                      { label: "أنشأها", value: currentRevision.createdBy },
                    ]}
                  />
                ) : (
                  <EmptyState
                    icon={FileText}
                    title="لا توجد نسخة لهذا المصدر."
                    description="لم يُنشأ أي إصدار بعد لأن الاستحواذ بانتظار تصريح الجهة الرسمية."
                    action={
                      <Button variant="default" size="sm" component={Link} to="/acquisition">
                        عرض حالة الاستحواذ
                      </Button>
                    }
                  />
                )}
              </SectionCard>
            </Grid.Col>

            <Grid.Col span={12}>
              <SectionCard
                title="حالة الاستحواذ"
                description="سياسة الاستحواذ، التصريح، وآخر عمليتين ناجحة وفاشلة"
                action={
                  <Button size="xs" variant="default" component={Link} to="/acquisition">
                    مركز الاستحواذ
                  </Button>
                }
              >
                <Stack gap="md">
                  <MetadataList
                    columns={2}
                    items={[
                      { label: "طريقة الاستحواذ", value: acquisitionMethodLabels[source.method] },
                      {
                        label: "التصريح",
                        value: (
                          <StatusBadge
                            tone={authorizationLabels[source.authorization].tone}
                            label={authorizationLabels[source.authorization].label}
                          />
                        ),
                      },
                      { label: "سياسة الاستحواذ", value: source.acquisitionPolicy },
                      { label: "آخر عملية ناجحة", value: <Mono size={12}>{source.lastSuccess}</Mono> },
                      { label: "آخر عملية فاشلة", value: <Mono size={12}>{source.lastFailure}</Mono> },
                      {
                        label: "حالة المعرفة",
                        value: (
                          <StatusBadge
                            tone={knowledgeStateLabels[source.knowledge].tone}
                            label={knowledgeStateLabels[source.knowledge].label}
                          />
                        ),
                      },
                    ]}
                  />
                  {latestAttempt && <AcquisitionPipeline steps={latestAttempt.pipeline} />}
                </Stack>
              </SectionCard>
            </Grid.Col>
          </Grid>
        </Tabs.Panel>

        {/* ---------------------------- REVISIONS ---------------------------- */}
        <Tabs.Panel value="revisions">
          <Stack gap="md">
            <Alert color="gray" variant="light" icon={<Lock size={16} />}>
              النسخ بحالة <Mono size={12}>PUBLISHED</Mono> غير قابلة للتعديل؛ أي تغيير يتطلب إنشاء نسخة جديدة
              مع سجل استحواذ وتحقق مستقل.
            </Alert>
            <Paper>
              {source.revisions.length === 0 ? (
                <EmptyState
                  icon={FileText}
                  title="لا توجد نسخ لهذا المصدر."
                  description="سيُنشأ أول إصدار بعد اكتمال الاستحواذ والتحقق من الملف الرسمي."
                  action={
                    <Button color="navy" size="sm" component={Link} to="/acquisition/intake">
                      إدخال رسمي يدوي
                    </Button>
                  }
                />
              ) : (
                <ScrollArea type="auto" offsetScrollbars>
                  <Table highlightOnHover style={{ minWidth: 1180 }}>
                    <Table.Thead style={{ background: "#F7F9FB", boxShadow: "inset 0 -1px 0 #E3E8EF" }}>
                      <Table.Tr>
                        {[
                          "Revision",
                          "State",
                          "تاريخ النفاذ",
                          "تاريخ النشر",
                          "الاستحواذ",
                          "الملف",
                          "SHA-256",
                          "النص المستخرج",
                          "أنشأها",
                          "تاريخ الإنشاء",
                          "",
                        ].map((h, i) => (
                          <Table.Th key={`${h}-${i}`}>
                            <Text fz={11.5} fw={650} c="#3F5B7E" style={{ whiteSpace: "nowrap" }}>
                              {h}
                            </Text>
                          </Table.Th>
                        ))}
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {source.revisions.map((r) => (
                        <Table.Tr key={r.id}>
                          <Table.Td>
                            <Group gap={6} wrap="nowrap">
                              <Anchor
                                component={Link}
                                to="/sources/$sourceId/revisions/$revisionId"
                                params={{ sourceId: source.id, revisionId: r.id } as never}
                                underline="never"
                              >
                                <Mono size={12.5} c="#102A43" weight={650}>
                                  {r.id}
                                </Mono>
                              </Anchor>
                              {r.state === "PUBLISHED" && (
                                <Tooltip label="نسخة منشورة غير قابلة للتعديل" withArrow>
                                  <Box c="#106B4C" style={{ display: "flex" }} aria-label="غير قابلة للتعديل">
                                    <Lock size={13} />
                                  </Box>
                                </Tooltip>
                              )}
                            </Group>
                          </Table.Td>
                          <Table.Td>
                            <StatusBadge
                              tone={revisionStateLabels[r.state].tone}
                              label={revisionStateLabels[r.state].label}
                            />
                          </Table.Td>
                          <Table.Td>
                            <Text size="sm" c="#16202A">
                              {r.effectiveDate}
                            </Text>
                          </Table.Td>
                          <Table.Td>
                            <Text size="sm" c="#667085">
                              {r.publicationDate}
                            </Text>
                          </Table.Td>
                          <Table.Td>
                            <Stack gap={2}>
                              <Text fz={12.5} c="#16202A">
                                {acquisitionMethodLabels[r.method].split(" — ")[1]}
                              </Text>
                              <Mono size={11} c="#98A2B3">
                                {r.attemptId}
                              </Mono>
                            </Stack>
                          </Table.Td>
                          <Table.Td>
                            <Stack gap={2}>
                              <Mono size={11.5} c="#3F5B7E">
                                {r.fileName}
                              </Mono>
                              <Text fz={11} c="#98A2B3">
                                {r.mediaType} · {r.fileSize}
                              </Text>
                            </Stack>
                          </Table.Td>
                          <Table.Td>
                            <Group gap={6} wrap="nowrap">
                              <ShieldCheck size={14} color={r.sha256Verified ? "#106B4C" : "#A02020"} />
                              <Mono size={11} c="#667085">
                                {`${r.sha256.slice(0, 8)}…${r.sha256.slice(-8)}`}
                              </Mono>
                            </Group>
                          </Table.Td>
                          <Table.Td>
                            <Group gap={6} wrap="nowrap">
                              <StatusBadge
                                dot={false}
                                tone={extractionLabels[r.extraction].tone}
                                label={extractionLabels[r.extraction].label}
                              />
                              <Text fz={11} c="#98A2B3" dir="ltr">
                                {r.pages}p · {r.spans} spans
                              </Text>
                            </Group>
                          </Table.Td>
                          <Table.Td>
                            <Text size="sm" c="#16202A">
                              {r.createdBy}
                            </Text>
                          </Table.Td>
                          <Table.Td>
                            <Mono size={11.5} c="#667085">
                              {r.createdAt}
                            </Mono>
                          </Table.Td>
                          <Table.Td>
                            <Menu position="bottom-end" withinPortal width={210} shadow="md">
                              <Menu.Target>
                                <Button variant="subtle" color="gray" size="compact-sm" aria-label={`إجراءات ${r.id}`}>
                                  <MoreHorizontal size={16} />
                                </Button>
                              </Menu.Target>
                              <Menu.Dropdown>
                                <Menu.Item
                                  leftSection={<FileText size={15} />}
                                  onClick={() =>
                                    navigate({
                                      to: "/sources/$sourceId/revisions/$revisionId",
                                      params: { sourceId: source.id, revisionId: r.id },
                                    })
                                  }
                                >
                                  عرض المستند
                                </Menu.Item>
                                <Menu.Item leftSection={<Search size={15} />} onClick={() => setTab("text")}>
                                  عرض النص
                                </Menu.Item>
                                <Menu.Item leftSection={<Landmark size={15} />} onClick={() => setTab("spans")}>
                                  عرض Source Spans
                                </Menu.Item>
                                <Menu.Divider />
                                {r.state === "DRAFT" && (
                                  <Menu.Item leftSection={<ClipboardCheck size={15} />}>مراجعة</Menu.Item>
                                )}
                                {r.state === "IN_REVIEW" && (
                                  <Menu.Item leftSection={<Check size={15} />}>نشر (يتطلب تأكيدًا)</Menu.Item>
                                )}
                                <Menu.Item leftSection={<GitCompareArrows size={15} />}>مقارنة</Menu.Item>
                              </Menu.Dropdown>
                            </Menu>
                          </Table.Td>
                        </Table.Tr>
                      ))}
                    </Table.Tbody>
                  </Table>
                </ScrollArea>
              )}
            </Paper>
          </Stack>
        </Tabs.Panel>

        {/* --------------------------- ACQUISITION --------------------------- */}
        <Tabs.Panel value="acquisition">
          <Stack gap="md">
            {latestAttempt ? (
              <SectionCard
                title="آخر محاولة استحواذ"
                description={`${latestAttempt.id} — ${latestAttempt.startedAt}`}
                action={
                  <Button
                    size="xs"
                    variant="default"
                    component={Link}
                    to="/acquisition/$attemptId"
                    params={{ attemptId: latestAttempt.id } as never}
                  >
                    فتح تفاصيل المحاولة
                  </Button>
                }
              >
                <Stack gap="md">
                  <AcquisitionPipeline steps={latestAttempt.pipeline} />
                  <MetadataList
                    columns={3}
                    items={[
                      {
                        label: "الحالة",
                        value: (
                          <StatusBadge
                            tone={attemptStateLabels[latestAttempt.state].tone}
                            label={attemptStateLabels[latestAttempt.state].label}
                          />
                        ),
                      },
                      { label: "الطريقة", value: acquisitionMethodLabels[latestAttempt.method] },
                      { label: "HTTP / Upload", value: <Mono size={12}>{latestAttempt.transport}</Mono> },
                      { label: "المدة", value: <Mono size={12}>{latestAttempt.duration}</Mono> },
                      { label: "الطالب", value: latestAttempt.requestedBy },
                      { label: "النتيجة", value: latestAttempt.result },
                    ]}
                  />
                </Stack>
              </SectionCard>
            ) : null}

            <Paper>
              <Group px="md" py="sm" justify="space-between" style={{ borderBottom: "1px solid #E3E8EF" }}>
                <Text fw={650} c="#0B1F33">
                  محاولات الاستحواذ لهذا المصدر
                </Text>
                <Badge variant="default">{attempts.length}</Badge>
              </Group>
              {attempts.length === 0 ? (
                <EmptyState
                  icon={DownloadCloud}
                  title="لا توجد محاولات استحواذ."
                  description="ابدأ عملية استحواذ أو استخدم الإدخال الرسمي اليدوي لإنشاء أول نسخة."
                />
              ) : (
                <ScrollArea type="auto" offsetScrollbars>
                  <Table highlightOnHover style={{ minWidth: 900 }}>
                    <Table.Thead style={{ background: "#F7F9FB", boxShadow: "inset 0 -1px 0 #E3E8EF" }}>
                      <Table.Tr>
                        {["Attempt ID", "الطريقة", "Authorization", "HTTP / Upload", "الحالة", "بدأ", "المدة", "النتيجة"].map(
                          (h) => (
                            <Table.Th key={h}>
                              <Text fz={11.5} fw={650} c="#3F5B7E" style={{ whiteSpace: "nowrap" }}>
                                {h}
                              </Text>
                            </Table.Th>
                          ),
                        )}
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {attempts.map((a) => (
                        <Table.Tr key={a.id}>
                          <Table.Td>
                            <Anchor
                              component={Link}
                              to="/acquisition/$attemptId"
                              params={{ attemptId: a.id } as never}
                              underline="never"
                            >
                              <Mono size={12} c="#102A43" weight={650}>
                                {a.id}
                              </Mono>
                            </Anchor>
                          </Table.Td>
                          <Table.Td>
                            <Text fz={12.5}>{acquisitionMethodLabels[a.method].split(" — ")[1]}</Text>
                          </Table.Td>
                          <Table.Td>
                            <StatusBadge
                              dot={false}
                              tone={authorizationLabels[a.authorization].tone}
                              label={authorizationLabels[a.authorization].label}
                            />
                          </Table.Td>
                          <Table.Td>
                            <Mono size={11.5} c="#667085">
                              {a.transport}
                            </Mono>
                          </Table.Td>
                          <Table.Td>
                            <StatusBadge
                              tone={attemptStateLabels[a.state].tone}
                              label={attemptStateLabels[a.state].label}
                            />
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
                            <Text fz={12.5} c="#667085">
                              {a.result}
                            </Text>
                          </Table.Td>
                        </Table.Tr>
                      ))}
                    </Table.Tbody>
                  </Table>
                </ScrollArea>
              )}
            </Paper>
          </Stack>
        </Tabs.Panel>

        {/* ------------------------- EXTRACTED TEXT ------------------------- */}
        <Tabs.Panel value="text">
          {articles.length === 0 ? (
            <Paper>
              <EmptyState
                icon={FileText}
                title="لا يوجد نص مستخرج لهذه النسخة."
                description="يتوفر النص المستخرج بعد اكتمال عملية الاستخراج وإنشاء الأسانيد المصدرية."
              />
            </Paper>
          ) : (
            <Grid gutter="md">
              <Grid.Col span={{ base: 12, lg: 3 }}>
                <SectionCard title="تنقّل المواد" description={`${articles.length} مادة في ${currentRevision?.pages} صفحة`}>
                  <Stack gap={4}>
                    {articles.map((a) => (
                      <Box
                        key={a.spanId}
                        component="button"
                        onClick={() => setActiveArticle(a.spanId)}
                        style={{
                          textAlign: "start",
                          background: activeArticle === a.spanId ? "#EDF2F7" : "transparent",
                          border: "1px solid",
                          borderColor: activeArticle === a.spanId ? "#D3DEE9" : "transparent",
                          borderRadius: 6,
                          padding: "7px 9px",
                          cursor: "pointer",
                        }}
                      >
                        <Text fz={13} fw={600} c="#16202A">
                          {a.article}
                        </Text>
                        <Text fz={11} c="#98A2B3" dir="ltr">
                          p.{a.page} · {a.spanId}
                        </Text>
                      </Box>
                    ))}
                  </Stack>
                </SectionCard>
              </Grid.Col>
              <Grid.Col span={{ base: 12, lg: 9 }}>
                <SectionCard
                  title="النص المستخرج الرسمي"
                  description={`${currentRevision?.id} — قراءة فقط. لا يمكن تعديل نص النسخ المنشورة.`}
                  action={
                    <TextInput
                      size="xs"
                      w={230}
                      value={textQuery}
                      onChange={(e) => setTextQuery(e.currentTarget.value)}
                      placeholder="بحث داخل المصدر…"
                      leftSection={<Search size={14} />}
                      aria-label="بحث داخل النص المستخرج"
                    />
                  }
                >
                  <Stack gap="sm">
                    {filteredArticles.length === 0 ? (
                      <EmptyState
                        icon={Search}
                        title="لا توجد نتائج مطابقة داخل المصدر."
                        description="جرّب مصطلحًا آخر أو تنقّل عبر قائمة المواد."
                      />
                    ) : (
                      filteredArticles.map((a) => (
                        <Paper
                          key={a.spanId}
                          p="sm"
                          radius="sm"
                          style={{
                            borderColor: activeArticle === a.spanId ? "#93A7C0" : "#E3E8EF",
                            background: activeArticle === a.spanId ? "#F7F9FB" : "#FFFFFF",
                          }}
                        >
                          <Group justify="space-between" gap="xs" wrap="wrap" mb={6}>
                            <Text fz={13.5} fw={650} c="#0B1F33">
                              {a.article}
                            </Text>
                            <Group gap={8}>
                              <Text fz={11} c="#98A2B3" dir="ltr">
                                صفحة {a.page} · {a.range}
                              </Text>
                              <Badge variant="default" size="sm">
                                <Mono size={10.5} c="#3F5B7E">
                                  {a.spanId}
                                </Mono>
                              </Badge>
                            </Group>
                          </Group>
                          <Text
                            size="sm"
                            c="#16202A"
                            style={{ lineHeight: 1.9, cursor: "pointer" }}
                            onClick={() => {
                              setActiveArticle(a.spanId);
                              const s = spans.find((x) => x.id === a.spanId);
                              if (s) setSpan(s);
                            }}
                          >
                            {a.text}
                          </Text>
                        </Paper>
                      ))
                    )}
                  </Stack>
                </SectionCard>
              </Grid.Col>
            </Grid>
          )}
        </Tabs.Panel>

        {/* ----------------------------- SPANS ----------------------------- */}
        <Tabs.Panel value="spans">
          <Paper>
            <Group px="md" py="sm" justify="space-between" style={{ borderBottom: "1px solid #E3E8EF" }}>
              <Stack gap={2}>
                <Text fw={650} c="#0B1F33">
                  الأسانيد المصدرية — Source Spans
                </Text>
                <Text fz={11.5} c="#667085">
                  كل سند يمثل مقطعًا نصيًا محددًا بإزاحات دقيقة داخل النسخة، ويُستخدم كمرجع للوقائع والأسانيد
                  التحليلية.
                </Text>
              </Stack>
              {currentRevision && (
                <Badge variant="default">
                  <Mono size={11} c="#3F5B7E">
                    {currentRevision.id} · {currentRevision.spans}
                  </Mono>
                </Badge>
              )}
            </Group>
            {spans.length === 0 ? (
              <EmptyState
                icon={Landmark}
                title="لا توجد أسانيد مصدرية لهذه النسخة."
                description="تُنشأ الأسانيد المصدرية تلقائيًا عند اكتمال استخراج النص."
              />
            ) : (
              <ScrollArea type="auto" offsetScrollbars>
                <Table highlightOnHover style={{ minWidth: 920 }}>
                  <Table.Thead style={{ background: "#F7F9FB", boxShadow: "inset 0 -1px 0 #E3E8EF" }}>
                    <Table.Tr>
                      {["Span ID", "Page", "Start", "End", "Text Preview", "Linked Facts", "Linked Citations"].map(
                        (h) => (
                          <Table.Th key={h}>
                            <Text fz={11.5} fw={650} c="#3F5B7E" style={{ whiteSpace: "nowrap" }}>
                              {h}
                            </Text>
                          </Table.Th>
                        ),
                      )}
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {spans.map((s) => (
                      <Table.Tr key={s.id} style={{ cursor: "pointer" }} onClick={() => setSpan(s)}>
                        <Table.Td>
                          <Mono size={11.5} c="#102A43" weight={600}>
                            {s.id}
                          </Mono>
                        </Table.Td>
                        <Table.Td>
                          <Mono size={12}>{String(s.page)}</Mono>
                        </Table.Td>
                        <Table.Td>
                          <Mono size={12} c="#667085">
                            {String(s.start)}
                          </Mono>
                        </Table.Td>
                        <Table.Td>
                          <Mono size={12} c="#667085">
                            {String(s.end)}
                          </Mono>
                        </Table.Td>
                        <Table.Td style={{ maxWidth: 380 }}>
                          <Text fz={12.5} c="#16202A" lineClamp={2}>
                            <Text component="span" fw={650} c="#0B1F33">
                              {s.article}:{" "}
                            </Text>
                            {s.text}
                          </Text>
                        </Table.Td>
                        <Table.Td>
                          {s.linkedFacts.length === 0 ? (
                            <Text fz={12} c="#98A2B3">
                              —
                            </Text>
                          ) : (
                            <Group gap={4}>
                              {s.linkedFacts.map((f) => (
                                <Badge key={f} variant="default" size="sm">
                                  <Mono size={10.5} c="#3F5B7E">
                                    {f}
                                  </Mono>
                                </Badge>
                              ))}
                            </Group>
                          )}
                        </Table.Td>
                        <Table.Td>
                          {s.linkedCitations.length === 0 ? (
                            <Text fz={12} c="#98A2B3">
                              —
                            </Text>
                          ) : (
                            <Group gap={4}>
                              {s.linkedCitations.map((c) => (
                                <Badge key={c} variant="light" color="navy" size="sm">
                                  <Mono size={10.5} c="#0B1F33">
                                    {c}
                                  </Mono>
                                </Badge>
                              ))}
                            </Group>
                          )}
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </ScrollArea>
            )}
          </Paper>
        </Tabs.Panel>

        {/* --------------------------- KNOWLEDGE --------------------------- */}
        <Tabs.Panel value="knowledge">
          <Stack gap="md">
            {currentRevision?.knowledge === "not_published" && (
              <Alert color="gray" variant="light" icon={<BookOpenCheck size={16} />} title="غير منشور">
                لم يتم نشر هذه النسخة إلى غرفة المعرفة بعد.
              </Alert>
            )}
            <SimpleGrid cols={{ base: 1, xs: 2, lg: 3 }} spacing="md">
              <StatCard
                label="حالة المعرفة"
                value={knowledgeStateLabels[source.knowledge].label}
                delta={`المصدر: ${source.id}`}
                deltaTone={knowledgeStateLabels[source.knowledge].tone}
              />
              <StatCard
                label="النسخة المفهرسة"
                value={
                  source.revisions.find((r) => r.knowledge === "published")?.id ??
                  currentRevision?.knowledge === "indexing"
                    ? currentRevision?.id ?? "—"
                    : source.revisions.find((r) => r.knowledge === "published")?.id ?? "—"
                }
                delta="آخر فهرسة معتمدة"
                deltaTone="info"
              />
              <StatCard
                label="تاريخ الفهرسة"
                value={
                  source.revisions.find((r) => r.indexedAt)?.indexedAt ?? "—"
                }
                delta="Indexed at"
                deltaTone="neutral"
              />
              <StatCard
                label="عدد المقاطع (Chunks)"
                value={String(source.revisions.find((r) => r.chunks)?.chunks ?? 0)}
                delta="مقاطع قابلة للاستدعاء"
                deltaTone="neutral"
              />
              <StatCard
                label="الأسانيد التحليلية"
                value={String(source.revisions.find((r) => r.citations)?.citations ?? 0)}
                delta="استُخدمت في تحليلات قانونية"
                deltaTone="success"
              />
              <StatCard
                label="الصلاحيات"
                value="قراءة: جميع مساحات العمل"
                delta="نشر: مدير المصادر القانونية فقط"
                deltaTone="brand"
              />
            </SimpleGrid>
            <Group>
              <Button variant="default" leftSection={<BookOpenCheck size={15} />} component={Link} to="/knowledge">
                فتح في غرفة المعرفة
              </Button>
            </Group>
          </Stack>
        </Tabs.Panel>

        {/* ----------------------------- AUDIT ----------------------------- */}
        <Tabs.Panel value="audit">
          <Stack gap="md">
            <Alert color="gray" variant="light" icon={<Lock size={16} />}>
              سجل تدقيق غير قابل للتعديل — تُسجَّل كل عملية استحواذ وتحقق ونشر مع معرّف تتبّع مستقل.
            </Alert>
            <Grid gutter="md">
              <Grid.Col span={{ base: 12, lg: 5 }}>
                <SectionCard title="التسلسل الزمني" description="أحداث المصدر بترتيب زمني عكسي">
                  <Timeline bulletSize={16} lineWidth={1.5} color="navy">
                    {sourceAuditEvents.slice(0, 6).map((e) => (
                      <Timeline.Item
                        key={e.id}
                        title={
                          <Text fz={13} fw={600} c="#16202A">
                            {e.action}
                          </Text>
                        }
                      >
                        <Group gap={8} wrap="wrap">
                          <Text fz={12} c="#667085">
                            {e.actor}
                          </Text>
                          <Mono size={11} c="#98A2B3">
                            {e.timestamp}
                          </Mono>
                          <Mono size={11} c="#3F5B7E">
                            {e.resource}
                          </Mono>
                        </Group>
                      </Timeline.Item>
                    ))}
                  </Timeline>
                </SectionCard>
              </Grid.Col>
              <Grid.Col span={{ base: 12, lg: 7 }}>
                <Paper>
                  <ScrollArea type="auto" offsetScrollbars>
                    <Table highlightOnHover style={{ minWidth: 720 }}>
                      <Table.Thead style={{ background: "#F7F9FB", boxShadow: "inset 0 -1px 0 #E3E8EF" }}>
                        <Table.Tr>
                          {["Actor", "Action", "Resource", "Timestamp", "Trace ID", "Result"].map((h) => (
                            <Table.Th key={h}>
                              <Text fz={11.5} fw={650} c="#3F5B7E" style={{ whiteSpace: "nowrap" }}>
                                {h}
                              </Text>
                            </Table.Th>
                          ))}
                        </Table.Tr>
                      </Table.Thead>
                      <Table.Tbody>
                        {sourceAuditEvents.map((e) => (
                          <Table.Tr key={e.id}>
                            <Table.Td>
                              <Text fz={12.5} c="#16202A">
                                {e.actor}
                              </Text>
                            </Table.Td>
                            <Table.Td>
                              <Text fz={12.5} c="#16202A">
                                {e.action}
                              </Text>
                            </Table.Td>
                            <Table.Td>
                              <Mono size={11.5} c="#3F5B7E">
                                {e.resource}
                              </Mono>
                            </Table.Td>
                            <Table.Td>
                              <Mono size={11} c="#667085">
                                {e.timestamp}
                              </Mono>
                            </Table.Td>
                            <Table.Td>
                              <Mono size={11} c="#667085">
                                {e.traceId}
                              </Mono>
                            </Table.Td>
                            <Table.Td>
                              <StatusBadge
                                tone={e.result === "success" ? "success" : e.result === "warning" ? "warning" : "error"}
                                label={e.result === "success" ? "ناجح" : e.result === "warning" ? "تحذير" : "فاشل"}
                              />
                            </Table.Td>
                          </Table.Tr>
                        ))}
                      </Table.Tbody>
                    </Table>
                  </ScrollArea>
                </Paper>
              </Grid.Col>
            </Grid>
          </Stack>
        </Tabs.Panel>
      </Tabs>

      {/* ------------------------- SPAN DETAIL DRAWER ------------------------- */}
      <Drawer
        opened={span !== null}
        onClose={() => setSpan(null)}
        position="left"
        size={460}
        title={
          <Group gap={8}>
            <Text fw={650} c="#0B1F33">
              سند مصدري
            </Text>
            {span && <Mono size={12} c="#3F5B7E">{span.id}</Mono>}
          </Group>
        }
      >
        {span && (
          <Stack gap="md">
            <MetadataList
              columns={2}
              items={[
                { label: "Span ID", value: <Mono size={12}>{span.id}</Mono> },
                { label: "Revision", value: <Mono size={12}>{span.revisionId}</Mono> },
                { label: "الصفحة", value: <Mono size={12}>{String(span.page)}</Mono> },
                { label: "المادة", value: span.article },
                {
                  label: "إزاحات الأحرف",
                  value: <Mono size={12}>{`${span.start} – ${span.end}`}</Mono>,
                },
                { label: "عدد الأحرف", value: <Mono size={12}>{String(span.end - span.start)}</Mono> },
              ]}
            />
            <Paper p="sm" radius="sm" style={{ background: "#F7F9FB" }}>
              <Text fz={11.5} c="#98A2B3" fw={600} mb={6}>
                المقطع المستخرج حرفيًا
              </Text>
              <Text size="sm" c="#16202A" style={{ lineHeight: 1.95 }}>
                {span.text}
              </Text>
            </Paper>
            <Stack gap={6}>
              <Text fz={11.5} c="#98A2B3" fw={600}>
                الوقائع المرتبطة
              </Text>
              {span.linkedFacts.length === 0 ? (
                <Text fz={12.5} c="#667085">
                  لا توجد وقائع مرتبطة بهذا السند.
                </Text>
              ) : (
                <Group gap={6}>
                  {span.linkedFacts.map((f) => (
                    <Badge key={f} variant="default" size="sm" component={Link} to="/facts" style={{ cursor: "pointer" }}>
                      <Mono size={10.5} c="#3F5B7E">
                        {f}
                      </Mono>
                    </Badge>
                  ))}
                </Group>
              )}
            </Stack>
            <Stack gap={6}>
              <Text fz={11.5} c="#98A2B3" fw={600}>
                أسانيد التحليل المرتبطة
              </Text>
              {span.linkedCitations.length === 0 ? (
                <Text fz={12.5} c="#667085">
                  لم يُستخدم هذا السند في أي تحليل حتى الآن.
                </Text>
              ) : (
                <Group gap={6}>
                  {span.linkedCitations.map((c) => (
                    <Badge key={c} variant="light" color="navy" size="sm">
                      <Mono size={10.5} c="#0B1F33">
                        {c}
                      </Mono>
                    </Badge>
                  ))}
                </Group>
              )}
            </Stack>
            <Group>
              <Button
                variant="default"
                size="sm"
                leftSection={<Upload size={14} />}
                onClick={() => {
                  setTab("text");
                  setActiveArticle(span.id);
                  setSpan(null);
                }}
              >
                إظهار داخل النص المستخرج
              </Button>
            </Group>
          </Stack>
        )}
      </Drawer>
    </Box>
  );
}
