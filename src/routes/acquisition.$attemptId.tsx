import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Alert, Box, Button, Grid, Group, Stack, Text, Timeline } from "@mantine/core";
import { AlertTriangle, FileUp, RotateCcw, ScrollText } from "lucide-react";
import { PageHeader } from "@/components/legint/PageHeader";
import { AcquisitionPipeline } from "@/components/legint/AcquisitionPipeline";
import { MetadataList, Mono, SectionCard, StatusBadge } from "@/components/legint/primitives";
import {
  acquisitionMethodLabels,
  attemptById,
  attemptStateLabels,
  authorizationLabels,
} from "@/data/sources";

export const Route = createFileRoute("/acquisition/$attemptId")({
  loader: ({ params }) => {
    const attempt = attemptById(params.attemptId);
    if (!attempt) throw notFound();
    return { attempt };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "المحاولة غير متوفرة — LEGINT Core" }, { name: "robots", content: "noindex" }] };
    }
    const title = `محاولة استحواذ ${loaderData.attempt.id} — LEGINT Core`;
    return {
      meta: [
        { title },
        { name: "description", content: `تفاصيل محاولة الاستحواذ على ${loaderData.attempt.sourceName} مع التسلسل الزمني والتفاصيل الفنية.` },
        { property: "og:title", content: title },
        { property: "og:description", content: "تفاصيل تشغيلية كاملة لمحاولة استحواذ على مصدر رسمي." },
      ],
    };
  },
  component: AttemptDetail,
});

function AttemptDetail() {
  const { attempt } = Route.useLoaderData();
  const failed = attempt.state === "failed" || attempt.state === "blocked" || attempt.state === "validation_failed";

  return (
    <Box>
      <PageHeader
        crumbs={[
          { label: "المصادر القانونية", to: "/sources" },
          { label: "الاستحواذ", to: "/acquisition" },
          { label: attempt.id },
        ]}
        title={`محاولة استحواذ — ${attempt.sourceName}`}
        description={`${acquisitionMethodLabels[attempt.method]} · بدأت ${attempt.startedAt}`}
        meta={
          <Group gap="xs" mt={6} wrap="wrap">
            <Mono size={12} c="#3F5B7E" weight={600}>
              {attempt.id}
            </Mono>
            <StatusBadge tone={attemptStateLabels[attempt.state].tone} label={attemptStateLabels[attempt.state].label} />
            <StatusBadge
              dot={false}
              tone={authorizationLabels[attempt.authorization].tone}
              label={`التصريح: ${authorizationLabels[attempt.authorization].label}`}
            />
          </Group>
        }
        actions={
          <>
            <Button variant="default" leftSection={<RotateCcw size={15} />}>
              إعادة المحاولة
            </Button>
            <Button variant="default" leftSection={<FileUp size={15} />} component={Link} to="/acquisition/intake">
              استخدام الإدخال اليدوي الرسمي
            </Button>
            <Button variant="default" leftSection={<ScrollText size={15} />} component={Link} to="/audit">
              عرض السجل
            </Button>
          </>
        }
      />

      {failed && (
        <Alert
          color="red"
          variant="light"
          icon={<AlertTriangle size={16} />}
          title="تعذر الوصول إلى المصدر الرسمي"
          mb="lg"
        >
          <Stack gap={6}>
            <Text fz={12.5} c="#16202A">
              {attempt.result}
            </Text>
            <MetadataList
              columns={3}
              items={[
                { label: "رمز الخطأ", value: <Mono size={12}>{attempt.errorCode ?? "—"}</Mono> },
                { label: "معرّف المحاولة", value: <Mono size={12}>{attempt.id}</Mono> },
                { label: "الرابط الأصلي", value: <Mono size={11.5}>{attempt.url}</Mono> },
                { label: "آخر استجابة", value: <Mono size={12}>{attempt.lastResponse ?? attempt.transport}</Mono> },
                { label: "تصنيف الخطأ", value: attempt.errorCategory ?? "—" },
                { label: "التوقيت", value: <Mono size={12}>{attempt.completedAt}</Mono> },
              ]}
            />
            <Text fz={11.5} c="#667085">
              لا يقوم النظام بتجاوز قيود حماية المواقع الرسمية؛ الإجراء الآمن هو طلب تصريح من الجهة أو رفع نسخة
              رسمية يدويًا.
            </Text>
          </Stack>
        </Alert>
      )}

      <Stack gap="md">
        <SectionCard title="مسار العملية" description="حالة كل مرحلة من مراحل الاستحواذ">
          <AcquisitionPipeline steps={attempt.pipeline} />
        </SectionCard>

        <Grid gutter="md">
          <Grid.Col span={{ base: 12, lg: 6 }}>
            <SectionCard title="بيانات المحاولة" description="طرف الطلب والتوقيتات والحالة">
              <MetadataList
                columns={2}
                items={[
                  { label: "معرّف المحاولة", value: <Mono size={12}>{attempt.id}</Mono> },
                  { label: "المصدر", value: attempt.sourceName },
                  { label: "رابط المصدر", value: <Mono size={11.5} c="#1F4B99">{attempt.url}</Mono> },
                  { label: "الطالب", value: attempt.requestedBy },
                  { label: "بدأت", value: <Mono size={12}>{attempt.startedAt}</Mono> },
                  { label: "انتهت", value: <Mono size={12}>{attempt.completedAt}</Mono> },
                  { label: "المدة", value: <Mono size={12}>{attempt.duration}</Mono> },
                  {
                    label: "الحالة الحالية",
                    value: (
                      <StatusBadge tone={attemptStateLabels[attempt.state].tone} label={attemptStateLabels[attempt.state].label} />
                    ),
                  },
                  {
                    label: "حالة التصريح",
                    value: (
                      <StatusBadge
                        tone={authorizationLabels[attempt.authorization].tone}
                        label={authorizationLabels[attempt.authorization].label}
                      />
                    ),
                  },
                  {
                    label: "النسخة الناتجة",
                    value: attempt.revisionId ? <Mono size={12}>{attempt.revisionId}</Mono> : "—",
                  },
                ]}
              />
            </SectionCard>
          </Grid.Col>

          <Grid.Col span={{ base: 12, lg: 6 }}>
            <SectionCard title="التفاصيل الفنية" description="لا تُعرض أي بيانات اعتماد أو مفاتيح سرية">
              <MetadataList
                columns={2}
                items={[
                  { label: "نوع الطلب", value: <Mono size={12}>{attempt.transport}</Mono> },
                  { label: "Content-Type", value: <Mono size={12}>{attempt.contentType}</Mono> },
                  { label: "عدد التحويلات", value: <Mono size={12}>{String(attempt.redirects)}</Mono> },
                  { label: "سياسة robots", value: <Mono size={12}>{attempt.robots}</Mono> },
                  { label: "الرابط النهائي", value: <Mono size={11.5}>{attempt.finalUrl}</Mono> },
                  { label: "حجم الملف", value: <Mono size={12}>{attempt.fileSize}</Mono> },
                  { label: "SHA-256", value: <Mono size={11}>{attempt.sha256}</Mono> },
                  { label: "طريقة الاستخراج", value: attempt.extractionMethod },
                  { label: "حالة OCR", value: attempt.ocr },
                  { label: "الصفحات", value: <Mono size={12}>{String(attempt.pages)}</Mono> },
                  { label: "عدد الأحرف", value: <Mono size={12}>{attempt.chars.toLocaleString("en-US")}</Mono> },
                  { label: "Source Spans", value: <Mono size={12}>{String(attempt.spans)}</Mono> },
                ]}
              />
            </SectionCard>
          </Grid.Col>
        </Grid>

        <SectionCard title="التسلسل الزمني للعملية" description="أحداث المحاولة بالتوقيت الدقيق">
          <Timeline bulletSize={15} lineWidth={1.5} color="navy">
            {attempt.timeline.map((t, i) => (
              <Timeline.Item
                key={`${t.time}-${i}`}
                title={
                  <Group gap={8} wrap="wrap">
                    <Mono size={11.5} c="#3F5B7E" weight={600}>
                      {t.time}
                    </Mono>
                    <Text fz={13} fw={600} c="#16202A">
                      {t.label}
                    </Text>
                  </Group>
                }
              >
                <Text fz={12} c="#667085" dir="ltr" style={{ textAlign: "start" }}>
                  {t.labelEn}
                </Text>
              </Timeline.Item>
            ))}
          </Timeline>
        </SectionCard>
      </Stack>
    </Box>
  );
}
