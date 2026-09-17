import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Alert, Badge, Box, Button, Grid, Group, Paper, Stack, Text, Timeline } from "@mantine/core";
import { ClipboardCheck, FileText, Lock } from "lucide-react";
import { PageHeader } from "@/components/legint/PageHeader";
import { MetadataList, Mono, SectionCard, StatusBadge } from "@/components/legint/primitives";
import {
  acquisitionMethodLabels,
  extractedArticles,
  extractionLabels,
  knowledgeStateLabels,
  revisionById,
  revisionStateLabels,
  sourceAuditEvents,
  sourceById,
  sourceSpans,
} from "@/data/sources";

export const Route = createFileRoute("/sources/$sourceId/revisions/$revisionId")({
  loader: ({ params }) => {
    const source = sourceById(params.sourceId);
    const revision = revisionById(params.sourceId, params.revisionId);
    if (!source || !revision) throw notFound();
    return { source, revision };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "النسخة غير متوفرة — LEGINT Core" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.revision.id} — ${loaderData.source.name} — LEGINT Core`;
    return {
      meta: [
        { title },
        { name: "description", content: "تفاصيل نسخة المصدر الرسمي: الملف الأصلي، النص المستخرج، البيانات الوصفية والأسانيد." },
        { property: "og:title", content: title },
        { property: "og:description", content: "نسخة مصدر رسمي مع سجل تحقق وسلامة كامل." },
      ],
    };
  },
  component: RevisionDetail,
});

function RevisionDetail() {
  const { source, revision } = Route.useLoaderData();
  const spans = sourceSpans.filter((s) => s.revisionId === revision.id);
  const articles = revision.id === "REV-2026-003" ? extractedArticles : [];
  const published = revision.state === "PUBLISHED";

  return (
    <Box>
      <PageHeader
        crumbs={[
          { label: "المصادر القانونية", to: "/sources" },
          { label: source.name, to: `/sources/${source.id}` },
          { label: revision.id },
        ]}
        title={`نسخة المصدر — ${revision.id}`}
        description={`${source.name} · ${source.authority}`}
        meta={
          <Group gap="xs" mt={6} wrap="wrap">
            <StatusBadge tone={revisionStateLabels[revision.state].tone} label={revisionStateLabels[revision.state].label} />
            <StatusBadge tone={extractionLabels[revision.extraction].tone} label={`الاستخراج: ${extractionLabels[revision.extraction].label}`} />
            <StatusBadge tone={knowledgeStateLabels[revision.knowledge].tone} label={knowledgeStateLabels[revision.knowledge].label} />
          </Group>
        }
        actions={
          revision.state === "DRAFT" ? (
            <Button color="navy" leftSection={<ClipboardCheck size={15} />}>
              بدء المراجعة
            </Button>
          ) : (
            <Button variant="default" component={Link} to="/sources/$sourceId" params={{ sourceId: source.id } as never}>
              العودة إلى المصدر
            </Button>
          )
        }
      />

      {published && (
        <Alert color="gray" variant="light" icon={<Lock size={16} />} mb="lg">
          نسخة منشورة — غير قابلة للتعديل. أي تحديث يتطلب إنشاء نسخة جديدة.
        </Alert>
      )}

      <Grid gutter="md">
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <SectionCard title="الملف الأصلي" description="الملف الرسمي كما تم استلامه">
            <MetadataList
              columns={2}
              items={[
                { label: "اسم الملف", value: <Mono size={11.5}>{revision.fileName}</Mono> },
                { label: "نوع الوسائط", value: <Mono size={12}>{revision.mediaType}</Mono> },
                { label: "حجم الملف", value: <Mono size={12}>{revision.fileSize}</Mono> },
                { label: "SHA-256", value: <Mono size={11}>{revision.sha256}</Mono> },
                {
                  label: "سلامة الملف",
                  value: (
                    <StatusBadge
                      tone={revision.sha256Verified ? "success" : "error"}
                      label={revision.sha256Verified ? "Verified — مُتحقق منه" : "غير مُتحقق"}
                    />
                  ),
                },
                { label: "طريقة الاستحواذ", value: acquisitionMethodLabels[revision.method] },
              ]}
            />
          </SectionCard>
        </Grid.Col>

        <Grid.Col span={{ base: 12, lg: 6 }}>
          <SectionCard title="البيانات الوصفية" description="بيانات النسخة والتدقيق">
            <MetadataList
              columns={2}
              items={[
                { label: "المعرّف", value: <Mono size={12}>{revision.id}</Mono> },
                { label: "المصدر", value: <Mono size={11.5}>{source.id}</Mono> },
                { label: "الحالة", value: revisionStateLabels[revision.state].label },
                { label: "تاريخ النفاذ", value: revision.effectiveDate },
                { label: "تاريخ النشر", value: revision.publicationDate },
                { label: "محاولة الاستحواذ", value: <Mono size={12}>{revision.attemptId}</Mono> },
                { label: "أنشأها", value: revision.createdBy },
                { label: "تاريخ الإنشاء", value: <Mono size={12}>{revision.createdAt}</Mono> },
                { label: "الصفحات", value: <Mono size={12}>{String(revision.pages)}</Mono> },
                { label: "عدد الأحرف", value: <Mono size={12}>{revision.chars.toLocaleString("en-US")}</Mono> },
                { label: "Source Spans", value: <Mono size={12}>{String(revision.spans)}</Mono> },
                { label: "OCR", value: revision.ocr },
              ]}
            />
          </SectionCard>
        </Grid.Col>

        <Grid.Col span={{ base: 12, lg: 7 }}>
          <SectionCard title="النص المستخرج" description="قراءة فقط — مطابق للملف الرسمي">
            {articles.length === 0 ? (
              <Text size="sm" c="#667085">
                لا يتوفر عرض نصي لهذه النسخة في هذه البيئة التجريبية.
              </Text>
            ) : (
              <Stack gap="sm">
                {articles.slice(0, 5).map((a) => (
                  <Paper key={a.spanId} p="sm" radius="sm" style={{ background: "#F7F9FB" }}>
                    <Group justify="space-between" mb={4}>
                      <Text fz={13} fw={650} c="#0B1F33">
                        {a.article}
                      </Text>
                      <Badge variant="default" size="sm">
                        <Mono size={10.5} c="#3F5B7E">
                          {a.spanId}
                        </Mono>
                      </Badge>
                    </Group>
                    <Text size="sm" c="#16202A" style={{ lineHeight: 1.9 }}>
                      {a.text}
                    </Text>
                  </Paper>
                ))}
              </Stack>
            )}
          </SectionCard>
        </Grid.Col>

        <Grid.Col span={{ base: 12, lg: 5 }}>
          <Stack gap="md">
            <SectionCard title="الأسانيد المصدرية" description={`${revision.spans} سند مصدري في هذه النسخة`}>
              <Stack gap={6}>
                {spans.slice(0, 6).map((s) => (
                  <Group key={s.id} justify="space-between" wrap="nowrap">
                    <Mono size={11.5} c="#3F5B7E">
                      {s.id}
                    </Mono>
                    <Text fz={11.5} c="#98A2B3" dir="ltr">
                      p.{s.page} · {s.start}–{s.end}
                    </Text>
                  </Group>
                ))}
                <Button
                  variant="default"
                  size="xs"
                  mt={6}
                  leftSection={<FileText size={14} />}
                  component={Link}
                  to="/sources/$sourceId"
                  params={{ sourceId: source.id } as never}
                >
                  عرض جميع الأسانيد
                </Button>
              </Stack>
            </SectionCard>

            <SectionCard title="سجل التدقيق" description="أحداث مرتبطة بهذه النسخة">
              <Timeline bulletSize={14} lineWidth={1.5} color="navy">
                {sourceAuditEvents.slice(0, 5).map((e) => (
                  <Timeline.Item
                    key={e.id}
                    title={
                      <Text fz={12.5} fw={600} c="#16202A">
                        {e.action}
                      </Text>
                    }
                  >
                    <Group gap={8}>
                      <Text fz={11.5} c="#667085">
                        {e.actor}
                      </Text>
                      <Mono size={10.5} c="#98A2B3">
                        {e.timestamp}
                      </Mono>
                    </Group>
                  </Timeline.Item>
                ))}
              </Timeline>
            </SectionCard>
          </Stack>
        </Grid.Col>
      </Grid>
    </Box>
  );
}
