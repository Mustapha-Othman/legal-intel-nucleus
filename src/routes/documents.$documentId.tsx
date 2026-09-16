import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ActionIcon,
  Alert,
  Badge,
  Box,
  Button,
  Divider,
  Grid,
  Group,
  Paper,
  ScrollArea,
  SegmentedControl,
  Stack,
  Text,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { useState } from "react";
import {
  AlertOctagon,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  Link2,
  RefreshCw,
  Search,
  ShieldCheck,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { PageHeader } from "@/components/legint/PageHeader";
import {
  ErrorState,
  MetadataList,
  Mono,
  RevisionBadge,
  SectionCard,
  StatusBadge,
} from "@/components/legint/primitives";
import { docStatusLabels, documents } from "@/data/legint";

export const Route = createFileRoute("/documents/$documentId")({
  loader: ({ params }) => {
    const document = documents.find((d) => d.id === params.documentId);
    if (!document) throw notFound();
    return { document };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "المستند غير متوفر — LEGINT Core" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.document.name} — LEGINT Core`;
    return {
      meta: [
        { title },
        {
          name: "description",
          content: `عارض المستند القانوني ${loaderData.document.id}: النص المستخرج، النطاقات المصدرية والوقائع المرتبطة.`,
        },
        { property: "og:title", content: title },
        { property: "og:description", content: "عارض المستندات القانونية في LEGINT Core." },
      ],
    };
  },
  component: DocumentViewer,
});

const extractedPages: Record<number, { heading: string; paragraphs: { id: string; text: string; linked?: string }[] }> = {
  1: {
    heading: "عقد توريد — الأطراف والتعريفات",
    paragraphs: [
      {
        id: "SPAN-0001",
        text: "أُبرم هذا العقد بتاريخ 12/03/2025م في مدينة الرياض بين شركة الأفق الصناعية (الطرف الأول) ومؤسسة الإمداد الحديث (الطرف الثاني).",
        linked: "FACT-0311",
      },
      {
        id: "SPAN-0002",
        text: "يقصد بـ«المواد الموردة» جميع المكونات الصناعية الموضحة في الملحق (أ) من هذا العقد، ويعد الملحق جزءًا لا يتجزأ منه.",
      },
      {
        id: "SPAN-0003",
        text: "قيمة العقد الإجمالية أربعة ملايين ومئتا ألف ريال سعودي (4,200,000) تُسدَّد على ثلاث دفعات وفق الجدول الزمني المرفق.",
        linked: "FACT-0311",
      },
    ],
  },
  2: {
    heading: "الالتزامات والجدول الزمني",
    paragraphs: [
      {
        id: "SPAN-0011",
        text: "يلتزم الطرف الثاني بتسليم الدفعة الثانية من المواد الموردة في موعد لا يتجاوز 30/06/2025م بمقر المصنع.",
        linked: "FACT-0312",
      },
      {
        id: "SPAN-0012",
        text: "في حال التأخر عن المواعيد المحددة، يستحق الطرف الأول شرطًا جزائيًا بنسبة (5%) من قيمة الدفعة المتأخرة عن كل شهر تأخير.",
        linked: "FACT-0314",
      },
    ],
  },
  9: {
    heading: "الشرط الجزائي وتسوية النزاعات",
    paragraphs: [
      {
        id: "SPAN-0041",
        text: "يُطبَّق الشرط الجزائي دون حاجة إلى إثبات الضرر، ولا يخل ذلك بحق الطرف الأول في المطالبة بالتعويض عن الأضرار المباشرة.",
        linked: "FACT-0314",
      },
      {
        id: "SPAN-0042",
        text: "يخضع هذا العقد لأحكام نظام المعاملات المدنية، وتختص المحكمة التجارية بالرياض بالنظر في أي نزاع ينشأ عنه.",
      },
    ],
  },
};

function DocumentViewer() {
  const { document } = Route.useLoaderData();
  const status = docStatusLabels[document.status];
  const pageKeys = Object.keys(extractedPages).map(Number);
  const [page, setPage] = useState<number>(pageKeys[0] ?? 1);
  const [zoom, setZoom] = useState(100);
  const [activeSpan, setActiveSpan] = useState<string | null>(null);
  const [view, setView] = useState<"split" | "text">("split");
  const content = extractedPages[page] ?? extractedPages[1]!;

  const failed = document.status === "failed";

  return (
    <Box>
      <PageHeader
        crumbs={[
          { label: "لوحة المراقبة", to: "/" },
          { label: "المستندات", to: "/documents" },
          { label: document.id },
        ]}
        eyebrow={document.type}
        title={document.name}
        meta={
          <Group gap="xs" mt={6} wrap="wrap">
            <Mono size={12.5} c="#102A43" weight={600}>
              {document.id}
            </Mono>
            <StatusBadge tone={status.tone} label={status.label} />
            <RevisionBadge revision={document.revision} />
            <Badge variant="light" color="legalGreen" size="sm" leftSection={<ShieldCheck size={12} />}>
              SHA-256 مطابق
            </Badge>
          </Group>
        }
        actions={
          <>
            <Button variant="default" leftSection={<Download size={15} />}>
              تنزيل
            </Button>
            <Button variant="default" leftSection={<RefreshCw size={15} />}>
              إعادة المعالجة
            </Button>
            <Button color="navy" component={Link} to="/cases/$caseId" params={{ caseId: document.caseId } as never}>
              فتح القضية
            </Button>
          </>
        }
      />

      {failed && (
        <Alert
          color="red"
          variant="light"
          icon={<AlertOctagon size={16} />}
          title="فشل استخراج النص لهذا المستند"
          mb="md"
        >
          تعذّر إتمام المسح الضوئي (OCR) بسبب جودة الصفحات الممسوحة. أعد المعالجة بدقة أعلى أو ارفع نسخة
          أصلية بجودة أفضل.
        </Alert>
      )}

      <Grid gutter="md">
        <Grid.Col span={{ base: 12, xl: 9 }}>
          <Paper>
            <Group
              justify="space-between"
              px="md"
              py="sm"
              wrap="wrap"
              gap="sm"
              style={{ borderBottom: "1px solid #E3E8EF" }}
            >
              <Group gap="xs">
                <Tooltip label="الصفحة السابقة" withArrow>
                  <ActionIcon
                    variant="default"
                    onClick={() => setPage(pageKeys[Math.max(0, pageKeys.indexOf(page) - 1)]!)}
                    aria-label="الصفحة السابقة"
                  >
                    <ChevronRight size={16} />
                  </ActionIcon>
                </Tooltip>
                <Mono size={12.5} weight={600}>
                  {`${page} / ${document.pages}`}
                </Mono>
                <Tooltip label="الصفحة التالية" withArrow>
                  <ActionIcon
                    variant="default"
                    onClick={() =>
                      setPage(pageKeys[Math.min(pageKeys.length - 1, pageKeys.indexOf(page) + 1)]!)
                    }
                    aria-label="الصفحة التالية"
                  >
                    <ChevronLeft size={16} />
                  </ActionIcon>
                </Tooltip>
                <Divider orientation="vertical" mx={4} />
                <ActionIcon
                  variant="default"
                  onClick={() => setZoom((z) => Math.max(70, z - 10))}
                  aria-label="تصغير"
                >
                  <ZoomOut size={16} />
                </ActionIcon>
                <Mono size={12}>{`${zoom}%`}</Mono>
                <ActionIcon
                  variant="default"
                  onClick={() => setZoom((z) => Math.min(160, z + 10))}
                  aria-label="تكبير"
                >
                  <ZoomIn size={16} />
                </ActionIcon>
              </Group>
              <Group gap="xs">
                <TextInput
                  size="sm"
                  w={200}
                  placeholder="بحث في المستند…"
                  leftSection={<Search size={15} strokeWidth={1.8} />}
                />
                <SegmentedControl
                  size="xs"
                  value={view}
                  onChange={(v) => setView(v as "split" | "text")}
                  data={[
                    { value: "split", label: "مقسّم" },
                    { value: "text", label: "النص فقط" },
                  ]}
                />
              </Group>
            </Group>

            <Grid gutter={0}>
              {view === "split" && (
                <Grid.Col span={{ base: 12, md: 6 }} style={{ borderInlineEnd: "1px solid #E3E8EF" }}>
                  <ScrollArea h={620} type="auto">
                    <Box p="lg" style={{ background: "#F7F9FB", minHeight: 620 }}>
                      <Paper
                        shadow="xs"
                        radius="sm"
                        p="xl"
                        mx="auto"
                        style={{
                          width: `${zoom}%`,
                          maxWidth: "100%",
                          aspectRatio: "1 / 1.414",
                          background: "#FFFFFF",
                        }}
                      >
                        <Stack gap="md">
                          <Text ta="center" fw={700} fz={13} c="#0B1F33">
                            {content.heading}
                          </Text>
                          <Divider color="#E3E8EF" />
                          {content.paragraphs.map((p: { id: string; text: string; linked?: string }) => (
                            <Box
                              key={p.id}
                              onClick={() => setActiveSpan(p.id)}
                              style={{
                                cursor: "pointer",
                                background: activeSpan === p.id ? "#FEF6E7" : "transparent",
                                borderInlineStart:
                                  activeSpan === p.id ? "2px solid #93610C" : "2px solid transparent",
                                paddingInlineStart: 8,
                                borderRadius: 4,
                              }}
                            >
                              <Text fz={12.5} c="#16202A" lh={1.9}>
                                {p.text}
                              </Text>
                            </Box>
                          ))}
                          <Text fz={10.5} c="#98A2B3" ta="center" mt="lg">
                            صفحة {page} — {document.name}
                          </Text>
                        </Stack>
                      </Paper>
                    </Box>
                  </ScrollArea>
                </Grid.Col>
              )}
              <Grid.Col span={{ base: 12, md: view === "split" ? 6 : 12 }}>
                <ScrollArea h={620} type="auto">
                  {failed ? (
                    <ErrorState
                      icon={AlertOctagon}
                      title="لا يوجد نص مستخرج"
                      description="فشلت عملية الاستخراج، لذا لا تتوفر نطاقات مصدرية أو وقائع مرتبطة لهذا المستند."
                      action={
                        <Button color="navy" leftSection={<RefreshCw size={15} />}>
                          إعادة المعالجة
                        </Button>
                      }
                    />
                  ) : (
                    <Box p="md">
                      <Group justify="space-between" mb="sm">
                        <Text fw={650} c="#0B1F33">
                          النص المستخرج المهيكل
                        </Text>
                        <Badge variant="light" color="navy" size="sm">
                          {content.paragraphs.length} نطاق مصدري
                        </Badge>
                      </Group>
                      <Stack gap="sm">
                        {content.paragraphs.map((p: { id: string; text: string; linked?: string }) => (
                          <Paper
                            key={p.id}
                            p="sm"
                            onClick={() => setActiveSpan(p.id)}
                            style={{
                              cursor: "pointer",
                              background: activeSpan === p.id ? "#EDF2F7" : "#FFFFFF",
                              borderColor: activeSpan === p.id ? "#93A7C0" : "#E3E8EF",
                            }}
                          >
                            <Group justify="space-between" mb={6} gap="xs">
                              <Mono size={11} c="#3F5B7E" weight={600}>
                                {p.id}
                              </Mono>
                              {p.linked && (
                                <Badge
                                  size="sm"
                                  variant="light"
                                  color="legalGreen"
                                  leftSection={<Link2 size={11} />}
                                >
                                  <Mono size={10.5} c="#106B4C">
                                    {p.linked}
                                  </Mono>
                                </Badge>
                              )}
                            </Group>
                            <Text fz={12.5} c="#16202A" lh={1.85}>
                              {p.text}
                            </Text>
                          </Paper>
                        ))}
                      </Stack>
                    </Box>
                  )}
                </ScrollArea>
              </Grid.Col>
            </Grid>
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, xl: 3 }}>
          <Stack gap="md">
            <SectionCard title="بيانات المستند" description="المعلومات التقنية والتحقق">
              <MetadataList
                items={[
                  { label: "المعرّف", value: <Mono>{document.id}</Mono> },
                  {
                    label: "القضية",
                    value: <Mono size={12}>{document.caseId}</Mono>,
                  },
                  { label: "نوع المستند", value: document.type },
                  { label: "عدد الصفحات", value: <Mono>{String(document.pages)}</Mono> },
                  { label: "مصدر الرفع", value: document.uploadSource },
                  { label: "رفع بواسطة", value: document.uploadedBy },
                  { label: "وقت الرفع", value: <Mono size={12}>{document.uploadedAt}</Mono> },
                  {
                    label: "بصمة SHA-256",
                    value: (
                      <Mono size={11.5} c="#3F5B7E">
                        {`${document.sha256}…c41d`}
                      </Mono>
                    ),
                  },
                ]}
              />
            </SectionCard>

            <SectionCard title="الوقائع المرتبطة" description="وقائع مستخرجة من نطاقات هذا المستند">
              <Stack gap="xs">
                {["FACT-0311", "FACT-0312", "FACT-0314"].map((f) => (
                  <Group
                    key={f}
                    justify="space-between"
                    p="xs"
                    style={{ border: "1px solid #E3E8EF", borderRadius: 8, background: "#F7F9FB" }}
                  >
                    <Mono size={12} c="#102A43" weight={600}>
                      {f}
                    </Mono>
                    <StatusBadge tone={f === "FACT-0312" ? "info" : "success"} label={f === "FACT-0312" ? "تحتاج مراجعة" : "مؤكدة"} />
                  </Group>
                ))}
                <Button variant="subtle" color="navy" size="compact-sm" component={Link} to="/facts">
                  عرض كل الوقائع
                </Button>
              </Stack>
            </SectionCard>

            <SectionCard title="سلسلة المعالجة" description="حالة خطوات المعالجة">
              <Stack gap={8}>
                {[
                  { label: "الرفع والتحقق", tone: "success" as const, value: "مكتمل" },
                  {
                    label: "المسح الضوئي (OCR)",
                    tone: document.ocr === "failed" ? ("error" as const) : ("success" as const),
                    value: document.ocr === "failed" ? "فشل" : "مكتمل",
                  },
                  {
                    label: "استخراج النص",
                    tone: document.extraction === "failed" ? ("error" as const) : ("success" as const),
                    value: document.extraction === "failed" ? "فشل" : "مكتمل",
                  },
                  { label: "ربط الوقائع", tone: "info" as const, value: "قيد التنفيذ" },
                  { label: "الفهرسة المعرفية", tone: "neutral" as const, value: "في الانتظار" },
                ].map((step) => (
                  <Group key={step.label} justify="space-between">
                    <Group gap={8}>
                      <FileText size={14} color="#98A2B3" />
                      <Text fz={12.5} c="#16202A">
                        {step.label}
                      </Text>
                    </Group>
                    <StatusBadge tone={step.tone} label={step.value} />
                  </Group>
                ))}
              </Stack>
            </SectionCard>
          </Stack>
        </Grid.Col>
      </Grid>
    </Box>
  );
}
