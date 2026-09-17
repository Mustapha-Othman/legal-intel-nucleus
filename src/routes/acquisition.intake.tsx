import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Alert,
  Badge,
  Box,
  Button,
  Grid,
  Group,
  Paper,
  Progress,
  Radio,
  SimpleGrid,
  Stack,
  Stepper,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { useState } from "react";
import { Check, CheckCircle2, FileText, FileUp, Trash2, Upload } from "lucide-react";
import { PageHeader } from "@/components/legint/PageHeader";
import { MetadataList, Mono, SectionCard, StatusBadge } from "@/components/legint/primitives";
import { extractedArticles, legalSources } from "@/data/sources";

export const Route = createFileRoute("/acquisition/intake")({
  head: () => ({
    meta: [
      { title: "إدخال مصدر رسمي يدويًا — LEGINT Core" },
      {
        name: "description",
        content: "رفع نسخة رسمية موثوقة وربطها بالمصدر القانوني مع الحفاظ على سجل التحقق الكامل.",
      },
      { property: "og:title", content: "إدخال مصدر رسمي يدويًا — LEGINT Core" },
      { property: "og:description", content: "معالج الإدخال الرسمي اليدوي في LEGINT Core." },
    ],
  }),
  component: ManualIntake,
});

const SOURCE = legalSources[0]!;

function ManualIntake() {
  const [step, setStep] = useState(0);
  const [sourceId, setSourceId] = useState(SOURCE.id);
  const [uploaded, setUploaded] = useState(false);
  const [activeSpan, setActiveSpan] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const selected = legalSources.find((s) => s.id === sourceId) ?? SOURCE;

  if (done) {
    return (
      <Box>
        <PageHeader
          crumbs={[
            { label: "المصادر القانونية", to: "/sources" },
            { label: "الاستحواذ", to: "/acquisition" },
            { label: "إدخال رسمي يدوي" },
          ]}
          title="إدخال مصدر رسمي يدويًا"
        />
        <Paper p="xl">
          <Stack gap="md" align="center" py="lg">
            <ThemeIcon size={52} radius="md" variant="light" color="legalGreen">
              <CheckCircle2 size={26} />
            </ThemeIcon>
            <Text fz={20} fw={650} c="#0B1F33">
              تم إنشاء نسخة المصدر بنجاح
            </Text>
            <Group gap="xs">
              <Mono size={13} c="#3F5B7E" weight={650}>
                REV-2026-003
              </Mono>
              <StatusBadge tone="neutral" label="DRAFT — مسودة" />
            </Group>
            <Text size="sm" c="#667085" maw={560} ta="center">
              تم حفظ النسخة والنص المستخرج والأسانيد المصدرية. تحتاج النسخة إلى المراجعة قبل النشر.
            </Text>
            <Group gap="xs" mt="sm">
              <Button
                color="navy"
                component={Link}
                to="/sources/$sourceId/revisions/$revisionId"
                params={{ sourceId: selected.id, revisionId: "REV-2026-003" } as never}
              >
                فتح النسخة
              </Button>
              <Button variant="default">بدء المراجعة</Button>
              <Button variant="default" component={Link} to="/sources/$sourceId" params={{ sourceId: selected.id } as never}>
                العودة إلى المصدر
              </Button>
            </Group>
          </Stack>
        </Paper>
      </Box>
    );
  }

  return (
    <Box>
      <PageHeader
        crumbs={[
          { label: "المصادر القانونية", to: "/sources" },
          { label: "الاستحواذ", to: "/acquisition" },
          { label: "إدخال رسمي يدوي" },
        ]}
        title="إدخال مصدر رسمي يدويًا"
        description="رفع نسخة رسمية موثوقة وربطها بالمصدر القانوني مع الحفاظ على سجل التحقق الكامل."
      />

      <Paper p="lg">
        <Stepper active={step} onStepClick={setStep} size="sm" color="navy" mb="lg" allowNextStepsSelect={false}>
          <Stepper.Step label="اختيار المصدر" description="Select source" />
          <Stepper.Step label="رفع الملف" description="Upload" />
          <Stepper.Step label="التحقق" description="Validation" />
          <Stepper.Step label="الاستخراج" description="Extraction" />
          <Stepper.Step label="مراجعة المحتوى" description="Review" />
          <Stepper.Step label="إنشاء النسخة" description="Create revision" />
        </Stepper>

        {step === 0 && (
          <Stack gap="md">
            <Radio.Group value={sourceId} onChange={setSourceId} label="اختر المصدر القانوني الرسمي" description="لا يتم الربط التلقائي الغامض — يجب تحديد المصدر صراحة.">
              <Stack gap="xs" mt="sm">
                {legalSources.slice(0, 5).map((s) => (
                  <Paper key={s.id} p="sm" radius="sm" style={{ borderColor: sourceId === s.id ? "#93A7C0" : "#E3E8EF" }}>
                    <Radio
                      value={s.id}
                      label={
                        <Stack gap={2}>
                          <Text fz={13.5} fw={600} c="#16202A">
                            {s.name}
                          </Text>
                          <Text fz={11.5} c="#667085">
                            {s.authority} · {s.type} · {s.jurisdiction}
                          </Text>
                          <Mono size={11} c="#98A2B3">
                            {s.id}
                          </Mono>
                        </Stack>
                      }
                    />
                  </Paper>
                ))}
              </Stack>
            </Radio.Group>
          </Stack>
        )}

        {step === 1 && (
          <Stack gap="md">
            {!uploaded ? (
              <Paper
                p="xl"
                radius="md"
                style={{ borderStyle: "dashed", borderColor: "#B9C7D8", background: "#F7F9FB", textAlign: "center" }}
              >
                <Stack gap="sm" align="center">
                  <ThemeIcon size={46} radius="md" variant="light" color="navy">
                    <Upload size={22} />
                  </ThemeIcon>
                  <Text fw={650} c="#0B1F33">
                    اسحب الملف الرسمي هنا أو اخترْه من جهازك
                  </Text>
                  <Text fz={12.5} c="#667085">
                    النوع المقبول: <Mono size={12}>application/pdf</Mono> — نسخة رسمية صادرة عن الجهة المختصة.
                  </Text>
                  <Button color="navy" leftSection={<FileUp size={15} />} onClick={() => setUploaded(true)}>
                    اختيار ملف PDF
                  </Button>
                </Stack>
              </Paper>
            ) : (
              <Paper p="md">
                <Group justify="space-between" wrap="wrap" gap="md">
                  <Group gap="sm">
                    <ThemeIcon size={38} radius="sm" variant="light" color="navy">
                      <FileText size={18} />
                    </ThemeIcon>
                    <Stack gap={2}>
                      <Mono size={12.5} c="#102A43" weight={650}>
                        personal-status-law.pdf
                      </Mono>
                      <Text fz={11.5} c="#667085">
                        application/pdf · 3.4 MB · 42 صفحة
                      </Text>
                    </Stack>
                  </Group>
                  <Group gap="xs">
                    <Button variant="default" size="xs" leftSection={<Upload size={13} />}>
                      استبدال
                    </Button>
                    <Button variant="subtle" color="red" size="xs" leftSection={<Trash2 size={13} />} onClick={() => setUploaded(false)}>
                      إزالة
                    </Button>
                  </Group>
                </Group>
                <Progress value={100} color="legalGreen" size="sm" mt="md" />
                <Text fz={11.5} c="#106B4C" mt={6}>
                  تم الرفع بنجاح — 100%
                </Text>
              </Paper>
            )}
          </Stack>
        )}

        {step === 2 && (
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
            {[
              { t: "Media Type", v: "application/pdf", s: "✓ Valid — نوع صالح", tone: "success" as const },
              { t: "SHA-256", v: "c4b52e7a…98af7412", s: "✓ Calculated — تم الحساب", tone: "success" as const },
              { t: "Duplicate Check", v: "لا توجد نسخة مطابقة", s: "✓ لا تكرار", tone: "success" as const },
              { t: "Source Match", v: selected.name, s: "✓ Confirmed — مطابق", tone: "success" as const },
              { t: "File Integrity", v: "Valid PDF structure", s: "✓ سليم", tone: "success" as const },
              { t: "Pages", v: "42", s: "قابلة للفهرسة", tone: "neutral" as const },
            ].map((c) => (
              <Paper key={c.t} p="md">
                <Text fz={11.5} c="#98A2B3" fw={600} mb={6} dir="ltr" style={{ textAlign: "start" }}>
                  {c.t}
                </Text>
                <Mono size={12.5} c="#16202A" weight={600}>
                  {c.v}
                </Mono>
                <Box mt={8}>
                  <StatusBadge tone={c.tone} label={c.s} />
                </Box>
              </Paper>
            ))}
          </SimpleGrid>
        )}

        {step === 3 && (
          <Stack gap="md">
            <SectionCard title="مسار الاستخراج" description="نص رقمي قابل للاستخراج — لا حاجة إلى OCR">
              <Stack gap={8}>
                {[
                  "Document loaded — تم تحميل المستند",
                  "Digital text detected — تم اكتشاف نص رقمي",
                  "Text normalized — تم توحيد النص",
                  "Pages indexed — تمت فهرسة الصفحات",
                  "Source spans generated — تم إنشاء الأسانيد المصدرية",
                ].map((s) => (
                  <Group key={s} gap={8}>
                    <ThemeIcon size={18} radius="sm" variant="light" color="legalGreen">
                      <Check size={11} />
                    </ThemeIcon>
                    <Text fz={13} c="#16202A">
                      {s}
                    </Text>
                  </Group>
                ))}
              </Stack>
            </SectionCard>
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md">
              <Paper p="md">
                <Text fz={11.5} c="#98A2B3">
                  الصفحات
                </Text>
                <Mono size={17} c="#0B1F33" weight={650}>
                  42
                </Mono>
              </Paper>
              <Paper p="md">
                <Text fz={11.5} c="#98A2B3">
                  عدد الأحرف
                </Text>
                <Mono size={17} c="#0B1F33" weight={650}>
                  28,491
                </Mono>
              </Paper>
              <Paper p="md">
                <Text fz={11.5} c="#98A2B3">
                  Source Spans
                </Text>
                <Mono size={17} c="#0B1F33" weight={650}>
                  318
                </Mono>
              </Paper>
              <Paper p="md">
                <Text fz={11.5} c="#98A2B3">
                  OCR
                </Text>
                <Box mt={6}>
                  <StatusBadge tone="neutral" label="Disabled — غير مطلوب" />
                </Box>
              </Paper>
            </SimpleGrid>
          </Stack>
        )}

        {step === 4 && (
          <Grid gutter="md">
            <Grid.Col span={{ base: 12, lg: 6 }}>
              <SectionCard title="معاينة الملف الرسمي" description="personal-status-law.pdf — صفحة 3 من 42">
                <Paper p="lg" radius="sm" style={{ background: "#FFFFFF" }}>
                  <Stack gap="sm">
                    {extractedArticles.slice(0, 4).map((a) => (
                      <Box key={a.spanId}>
                        <Text fz={13} fw={650} c="#0B1F33" mb={4}>
                          {a.article}
                        </Text>
                        <Text fz={12.5} c="#3F5B7E" style={{ lineHeight: 1.95 }}>
                          {a.text}
                        </Text>
                      </Box>
                    ))}
                  </Stack>
                </Paper>
              </SectionCard>
            </Grid.Col>
            <Grid.Col span={{ base: 12, lg: 6 }}>
              <SectionCard title="النص المستخرج" description="شاشة تحقق — لا يمكن تعديل النص">
                <Stack gap="sm">
                  {extractedArticles.map((a) => (
                    <Paper
                      key={a.spanId}
                      p="sm"
                      radius="sm"
                      style={{
                        cursor: "pointer",
                        borderColor: activeSpan === a.spanId ? "#93A7C0" : "#E3E8EF",
                        background: activeSpan === a.spanId ? "#F7F9FB" : "#FFFFFF",
                      }}
                      onClick={() => setActiveSpan(a.spanId)}
                    >
                      <Group justify="space-between" mb={4} wrap="wrap">
                        <Text fz={13} fw={650} c="#0B1F33">
                          {a.article}
                        </Text>
                        {activeSpan === a.spanId && (
                          <Group gap={6}>
                            <Badge variant="default" size="sm">
                              <Mono size={10.5}>صفحة {a.page}</Mono>
                            </Badge>
                            <Badge variant="default" size="sm">
                              <Mono size={10.5}>{a.range}</Mono>
                            </Badge>
                            <Badge variant="light" color="navy" size="sm">
                              <Mono size={10.5} c="#0B1F33">
                                {a.spanId}
                              </Mono>
                            </Badge>
                          </Group>
                        )}
                      </Group>
                      <Text fz={12.5} c="#16202A" style={{ lineHeight: 1.9 }}>
                        {a.text}
                      </Text>
                    </Paper>
                  ))}
                </Stack>
              </SectionCard>
            </Grid.Col>
          </Grid>
        )}

        {step === 5 && (
          <Stack gap="md">
            <SectionCard title="ملخص النسخة" description="راجع البيانات قبل إنشاء النسخة">
              <MetadataList
                columns={2}
                items={[
                  { label: "Source", value: selected.name },
                  { label: "Acquisition", value: "Manual Official Intake" },
                  { label: "Media", value: <Mono size={12}>PDF</Mono> },
                  { label: "SHA-256", value: <StatusBadge tone="success" label="Verified — مُتحقق منه" /> },
                  { label: "Extraction", value: <StatusBadge tone="success" label="Completed — مكتمل" /> },
                  { label: "Source Spans", value: <Mono size={12}>318</Mono> },
                ]}
              />
            </SectionCard>
            <Alert color="gray" variant="light" title="الحالة الابتدائية: DRAFT">
              ستُنشأ النسخة بحالة <Mono size={12}>DRAFT</Mono> ولن تُنشر إلى غرفة المعرفة قبل اكتمال المراجعة
              والاعتماد.
            </Alert>
          </Stack>
        )}

        <Group justify="space-between" mt="xl" pt="md" style={{ borderTop: "1px solid #E3E8EF" }}>
          <Button variant="default" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>
            {step === 5 ? "العودة للمراجعة" : "السابق"}
          </Button>
          {step < 5 ? (
            <Button color="navy" disabled={step === 1 && !uploaded} onClick={() => setStep((s) => s + 1)}>
              متابعة
            </Button>
          ) : (
            <Button color="legalGreen" onClick={() => setDone(true)}>
              إنشاء النسخة
            </Button>
          )}
        </Group>
      </Paper>
    </Box>
  );
}
