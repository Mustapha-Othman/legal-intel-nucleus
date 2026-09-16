export type StatusTone = "success" | "warning" | "error" | "info" | "neutral" | "brand";

export type Kpi = {
  id: string;
  label: string;
  value: string;
  delta?: string;
  deltaTone?: StatusTone;
  hint?: string;
};

export const kpis: Kpi[] = [
  { id: "cases", label: "القضايا النشطة", value: "24", delta: "+4 هذا الأسبوع", deltaTone: "success" },
  {
    id: "documents",
    label: "المستندات القانونية",
    value: "1,248",
    delta: "+37 هذا الأسبوع",
    deltaTone: "success",
  },
  { id: "sources", label: "المصادر الرسمية", value: "68", delta: "+2 نسخة جديدة", deltaTone: "info" },
  { id: "analyses", label: "التحليلات", value: "342", delta: "+18 هذا الأسبوع", deltaTone: "success" },
  { id: "reviews", label: "مراجعات معلقة", value: "7", delta: "3 عالية الأولوية", deltaTone: "warning" },
  {
    id: "success",
    label: "نجاح عمليات المعالجة",
    value: "98.7%",
    delta: "خلال 30 يومًا",
    deltaTone: "neutral",
  },
];

export type HealthState = "operational" | "degraded" | "authorization" | "down";

export type HealthItem = {
  id: string;
  name: string;
  nameEn: string;
  state: HealthState;
  metric: string;
  metricLabel: string;
};

export const systemHealth: HealthItem[] = [
  { id: "api", name: "واجهة API", nameEn: "API", state: "operational", metric: "142ms", metricLabel: "زمن الاستجابة" },
  { id: "db", name: "قاعدة البيانات", nameEn: "Database", state: "operational", metric: "27", metricLabel: "اتصالات نشطة" },
  { id: "worker", name: "معالج المهام", nameEn: "Worker", state: "operational", metric: "6", metricLabel: "مهام قيد التنفيذ" },
  { id: "auth", name: "المصادقة", nameEn: "Authentication", state: "operational", metric: "0.02%", metricLabel: "نسبة الأخطاء" },
  {
    id: "knowledge",
    name: "محرك المعرفة",
    nameEn: "Knowledge Engine",
    state: "operational",
    metric: "18,402",
    metricLabel: "مقاطع مفهرسة",
  },
  {
    id: "acquisition",
    name: "الاستحواذ الرسمي",
    nameEn: "Source Acquisition",
    state: "authorization",
    metric: "1",
    metricLabel: "بانتظار التصريح",
  },
  {
    id: "analysis",
    name: "محرك التحليل",
    nameEn: "Analysis Engine",
    state: "degraded",
    metric: "3.4s",
    metricLabel: "متوسط زمن التنفيذ",
  },
  { id: "queue", name: "قائمة الانتظار", nameEn: "Queue", state: "operational", metric: "12", metricLabel: "حجم القائمة" },
];

export const caseActivitySeries = [
  { month: "يناير", cases: 12, analyses: 22, documents: 74 },
  { month: "فبراير", cases: 15, analyses: 28, documents: 88 },
  { month: "مارس", cases: 14, analyses: 31, documents: 96 },
  { month: "أبريل", cases: 18, analyses: 37, documents: 104 },
  { month: "مايو", cases: 21, analyses: 44, documents: 121 },
  { month: "يونيو", cases: 24, analyses: 51, documents: 137 },
];

export const processingSeries = [
  { day: "الأحد", success: 128, failed: 2 },
  { day: "الاثنين", success: 164, failed: 3 },
  { day: "الثلاثاء", success: 151, failed: 1 },
  { day: "الأربعاء", success: 172, failed: 4 },
  { day: "الخميس", success: 148, failed: 2 },
];

export type ActivityEvent = {
  id: string;
  actor: string;
  action: string;
  resource: string;
  resourceId?: string;
  timestamp: string;
  status: StatusTone;
  statusLabel: string;
};

export const recentActivity: ActivityEvent[] = [
  {
    id: "EVT-9014",
    actor: "نورة الحربي",
    action: "أضافت نسخة جديدة من",
    resource: "نظام الأحوال الشخصية",
    resourceId: "SRC-001 / REV-14",
    timestamp: "قبل 6 دقائق",
    status: "success",
    statusLabel: "مكتمل",
  },
  {
    id: "EVT-9013",
    actor: "محرك التحليل",
    action: "أكمل التحليل للقضية",
    resource: "نزاع تنفيذ عقد توريد",
    resourceId: "CASE-2026-0142",
    timestamp: "قبل 21 دقيقة",
    status: "success",
    statusLabel: "مكتمل",
  },
  {
    id: "EVT-9012",
    actor: "خالد العتيبي",
    action: "راجع 3 وقائع في",
    resource: "مطالبة تعويض عمالي",
    resourceId: "CASE-2026-0138",
    timestamp: "قبل 48 دقيقة",
    status: "info",
    statusLabel: "بانتظار الاعتماد",
  },
  {
    id: "EVT-9011",
    actor: "سارة القحطاني",
    action: "رفعت مستندًا جديدًا",
    resource: "لائحة اعتراضية.pdf",
    resourceId: "DOC-4471",
    timestamp: "قبل ساعة",
    status: "neutral",
    statusLabel: "قيد المعالجة",
  },
  {
    id: "EVT-9010",
    actor: "عبدالله الشمري",
    action: "أنشأ مساحة عمل",
    resource: "الإدارة القانونية — الالتزام",
    resourceId: "WS-0007",
    timestamp: "قبل 3 ساعات",
    status: "success",
    statusLabel: "نشط",
  },
  {
    id: "EVT-9009",
    actor: "خدمة الاستحواذ",
    action: "فشل جلب المصدر",
    resource: "الجريدة الرسمية — أم القرى",
    resourceId: "SRC-032",
    timestamp: "قبل 5 ساعات",
    status: "error",
    statusLabel: "يتطلب تصريحًا",
  },
];

export type AttentionItem = {
  id: string;
  title: string;
  description: string;
  tone: StatusTone;
  to: string;
  cta: string;
};

export const attentionItems: AttentionItem[] = [
  {
    id: "att-1",
    title: "3 مراجعات قانونية معلقة",
    description: "وقائع بانتظار اعتماد المراجع القانوني في قضيتين نشطتين.",
    tone: "warning",
    to: "/reviews",
    cta: "فتح قائمة المراجعات",
  },
  {
    id: "att-2",
    title: "مصدر واحد يحتاج إلى تصريح",
    description: "الجريدة الرسمية — أم القرى: سياسة الاستحواذ تتطلب تصريحًا ساريًا.",
    tone: "error",
    to: "/sources",
    cta: "مراجعة المصدر",
  },
  {
    id: "att-3",
    title: "عمليتا معالجة فشلتا",
    description: "فشل استخراج النص لمستندين ممسوحين ضوئيًا (OCR).",
    tone: "error",
    to: "/documents",
    cta: "عرض المستندات",
  },
  {
    id: "att-4",
    title: "نسخة مصدر جاهزة للمراجعة",
    description: "نظام المعاملات المدنية — REV-08 بحالة مسودة (DRAFT).",
    tone: "info",
    to: "/sources",
    cta: "مراجعة النسخة",
  },
];

export type CaseStatus = "active" | "review" | "analysis" | "archived" | "draft";

export type LegalCase = {
  id: string;
  title: string;
  type: string;
  court: string;
  client: string;
  status: CaseStatus;
  documents: number;
  lastAnalysis: string;
  reviewer: string;
  updatedAt: string;
};

export const cases: LegalCase[] = [
  {
    id: "CASE-2026-0142",
    title: "نزاع تنفيذ عقد توريد",
    type: "تجاري",
    court: "المحكمة التجارية بالرياض",
    client: "شركة الأفق الصناعية",
    status: "analysis",
    documents: 34,
    lastAnalysis: "RUN-92F7",
    reviewer: "نورة الحربي",
    updatedAt: "2026-09-16 14:12",
  },
  {
    id: "CASE-2026-0141",
    title: "طلب فسخ عقد إيجار تجاري",
    type: "تجاري",
    court: "المحكمة التجارية بجدة",
    client: "مجموعة نماء العقارية",
    status: "active",
    documents: 18,
    lastAnalysis: "RUN-91C2",
    reviewer: "خالد العتيبي",
    updatedAt: "2026-09-16 11:40",
  },
  {
    id: "CASE-2026-0138",
    title: "مطالبة تعويض عمالي",
    type: "عمالي",
    court: "المحكمة العمالية بالدمام",
    client: "شركة البناء المتقدم",
    status: "review",
    documents: 12,
    lastAnalysis: "RUN-90A4",
    reviewer: "سارة القحطاني",
    updatedAt: "2026-09-15 16:05",
  },
  {
    id: "CASE-2026-0133",
    title: "دعوى حضانة وزيارة",
    type: "أحوال شخصية",
    court: "محكمة الأحوال الشخصية بالرياض",
    client: "موكل فرد — م. الغامدي",
    status: "active",
    documents: 9,
    lastAnalysis: "RUN-8FD1",
    reviewer: "نورة الحربي",
    updatedAt: "2026-09-15 09:22",
  },
  {
    id: "CASE-2026-0127",
    title: "اعتراض على قرار إداري",
    type: "إداري",
    court: "المحكمة الإدارية بالرياض",
    client: "مؤسسة مسار للخدمات",
    status: "analysis",
    documents: 21,
    lastAnalysis: "RUN-8EB9",
    reviewer: "عبدالله الشمري",
    updatedAt: "2026-09-14 18:31",
  },
  {
    id: "CASE-2026-0119",
    title: "نزاع ملكية فكرية — علامة تجارية",
    type: "ملكية فكرية",
    court: "المحكمة التجارية بالرياض",
    client: "شركة رقم للتقنية",
    status: "review",
    documents: 27,
    lastAnalysis: "RUN-8D02",
    reviewer: "خالد العتيبي",
    updatedAt: "2026-09-13 13:58",
  },
  {
    id: "CASE-2025-0904",
    title: "تحصيل مديونية تجارية",
    type: "تنفيذ",
    court: "محكمة التنفيذ بالرياض",
    client: "بنك المشرق التجاري",
    status: "archived",
    documents: 41,
    lastAnalysis: "RUN-7B44",
    reviewer: "سارة القحطاني",
    updatedAt: "2026-08-29 10:02",
  },
  {
    id: "CASE-2026-0145",
    title: "مراجعة عقد شراكة استراتيجية",
    type: "عقود",
    court: "—",
    client: "شركة الأفق الصناعية",
    status: "draft",
    documents: 3,
    lastAnalysis: "—",
    reviewer: "غير معيّن",
    updatedAt: "2026-09-16 15:44",
  },
];

export const caseStatusLabels: Record<CaseStatus, { label: string; tone: StatusTone }> = {
  active: { label: "نشطة", tone: "success" },
  review: { label: "قيد المراجعة", tone: "warning" },
  analysis: { label: "قيد التحليل", tone: "info" },
  archived: { label: "مؤرشفة", tone: "neutral" },
  draft: { label: "مسودة", tone: "neutral" },
};

export type DocStatus = "ready" | "processing" | "failed" | "reviewed" | "archived";

export type LegalDocument = {
  id: string;
  name: string;
  caseId: string;
  type: string;
  revision: string;
  uploadSource: string;
  pages: number;
  extraction: DocStatus;
  ocr: "completed" | "not_required" | "failed" | "running";
  sha256: string;
  uploadedBy: string;
  uploadedAt: string;
  status: DocStatus;
};

export const documents: LegalDocument[] = [
  {
    id: "DOC-4471",
    name: "لائحة اعتراضية.pdf",
    caseId: "CASE-2026-0142",
    type: "لائحة",
    revision: "REV-02",
    uploadSource: "رفع يدوي",
    pages: 24,
    extraction: "processing",
    ocr: "running",
    sha256: "9f2b41c7de08a3f5",
    uploadedBy: "سارة القحطاني",
    uploadedAt: "2026-09-16 14:58",
    status: "processing",
  },
  {
    id: "DOC-4468",
    name: "عقد التوريد الأصلي.pdf",
    caseId: "CASE-2026-0142",
    type: "عقد",
    revision: "REV-01",
    uploadSource: "رفع يدوي",
    pages: 18,
    extraction: "ready",
    ocr: "not_required",
    sha256: "b71c0ad39e5f2c84",
    uploadedBy: "نورة الحربي",
    uploadedAt: "2026-09-15 10:12",
    status: "reviewed",
  },
  {
    id: "DOC-4462",
    name: "محضر جلسة أولى.pdf",
    caseId: "CASE-2026-0142",
    type: "محضر",
    revision: "REV-01",
    uploadSource: "تكامل المحكمة",
    pages: 6,
    extraction: "ready",
    ocr: "completed",
    sha256: "3ac8e91b7d420f16",
    uploadedBy: "تكامل ناجز",
    uploadedAt: "2026-09-14 09:03",
    status: "ready",
  },
  {
    id: "DOC-4455",
    name: "كشف حساب مصرفي ممسوح.pdf",
    caseId: "CASE-2026-0141",
    type: "مستند إثبات",
    revision: "REV-03",
    uploadSource: "رفع يدوي",
    pages: 52,
    extraction: "failed",
    ocr: "failed",
    sha256: "7e4d2f80ba91c635",
    uploadedBy: "خالد العتيبي",
    uploadedAt: "2026-09-13 17:41",
    status: "failed",
  },
  {
    id: "DOC-4450",
    name: "عقد عمل موحد.pdf",
    caseId: "CASE-2026-0138",
    type: "عقد",
    revision: "REV-01",
    uploadSource: "رفع يدوي",
    pages: 11,
    extraction: "ready",
    ocr: "not_required",
    sha256: "c209ab74e13f8d55",
    uploadedBy: "سارة القحطاني",
    uploadedAt: "2026-09-12 12:20",
    status: "reviewed",
  },
  {
    id: "DOC-4441",
    name: "إشعار إنهاء خدمة.pdf",
    caseId: "CASE-2026-0138",
    type: "إشعار",
    revision: "REV-01",
    uploadSource: "بريد رسمي",
    pages: 2,
    extraction: "ready",
    ocr: "completed",
    sha256: "51f7c3d9082ba4e7",
    uploadedBy: "خالد العتيبي",
    uploadedAt: "2026-09-11 08:47",
    status: "ready",
  },
  {
    id: "DOC-4432",
    name: "صحيفة دعوى إدارية.pdf",
    caseId: "CASE-2026-0127",
    type: "صحيفة دعوى",
    revision: "REV-02",
    uploadSource: "رفع يدوي",
    pages: 15,
    extraction: "ready",
    ocr: "not_required",
    sha256: "a48e70cb2915df63",
    uploadedBy: "عبدالله الشمري",
    uploadedAt: "2026-09-09 15:33",
    status: "archived",
  },
];

export const docStatusLabels: Record<DocStatus, { label: string; tone: StatusTone }> = {
  ready: { label: "جاهز", tone: "success" },
  processing: { label: "قيد المعالجة", tone: "info" },
  failed: { label: "فشل الاستخراج", tone: "error" },
  reviewed: { label: "تم مراجعته", tone: "brand" },
  archived: { label: "مؤرشف", tone: "neutral" },
};

export type FactState = "confirmed" | "unknown" | "disputed" | "rejected" | "needs_review";

export type Fact = {
  id: string;
  caseId: string;
  statement: string;
  state: FactState;
  confidence: number;
  evidence: string;
  source: string;
  reviewer: string;
  revision: string;
  createdAt: string;
};

export const facts: Fact[] = [
  {
    id: "FACT-0311",
    caseId: "CASE-2026-0142",
    statement: "تم توقيع عقد التوريد بتاريخ 12 مارس 2025 بين الطرفين بقيمة 4,200,000 ريال.",
    state: "confirmed",
    confidence: 0.96,
    evidence: "DOC-4468 ص. 1–2",
    source: "نظام المعاملات المدنية — م. 95",
    reviewer: "نورة الحربي",
    revision: "REV-03",
    createdAt: "2026-09-15 10:41",
  },
  {
    id: "FACT-0312",
    caseId: "CASE-2026-0142",
    statement: "تأخر المورد في تسليم الدفعة الثانية 47 يومًا عن الموعد التعاقدي.",
    state: "needs_review",
    confidence: 0.78,
    evidence: "DOC-4462 ص. 3",
    source: "نظام المعاملات المدنية — م. 108",
    reviewer: "بانتظار مراجع",
    revision: "REV-01",
    createdAt: "2026-09-16 09:15",
  },
  {
    id: "FACT-0313",
    caseId: "CASE-2026-0142",
    statement: "أرسل المدعي إشعار إعذار رسمي قبل رفع الدعوى.",
    state: "disputed",
    confidence: 0.54,
    evidence: "DOC-4471 ص. 8",
    source: "—",
    reviewer: "خالد العتيبي",
    revision: "REV-02",
    createdAt: "2026-09-16 12:02",
  },
  {
    id: "FACT-0314",
    caseId: "CASE-2026-0142",
    statement: "وجود شرط جزائي بنسبة 5% من قيمة الدفعة المتأخرة.",
    state: "confirmed",
    confidence: 0.91,
    evidence: "DOC-4468 ص. 9",
    source: "نظام المعاملات المدنية — م. 179",
    reviewer: "نورة الحربي",
    revision: "REV-01",
    createdAt: "2026-09-15 11:20",
  },
  {
    id: "FACT-0315",
    caseId: "CASE-2026-0142",
    statement: "قيمة الأضرار غير المباشرة المطالب بها غير محددة في المستندات المرفقة.",
    state: "unknown",
    confidence: 0.32,
    evidence: "—",
    source: "—",
    reviewer: "غير معيّن",
    revision: "REV-01",
    createdAt: "2026-09-16 09:44",
  },
];

export const factStateLabels: Record<FactState, { label: string; tone: StatusTone }> = {
  confirmed: { label: "مؤكدة", tone: "success" },
  unknown: { label: "غير معروفة", tone: "neutral" },
  disputed: { label: "متنازع عليها", tone: "warning" },
  rejected: { label: "مرفوضة", tone: "error" },
  needs_review: { label: "تحتاج مراجعة", tone: "info" },
};

export type AnalysisRun = {
  id: string;
  caseId: string;
  revision: string;
  status: "queued" | "processing" | "completed" | "failed" | "requires_review";
  provider: string;
  duration: string;
  citations: number;
  factsUsed: number;
  startedBy: string;
  createdAt: string;
};

export const analysisRuns: AnalysisRun[] = [
  {
    id: "RUN-92F7",
    caseId: "CASE-2026-0142",
    revision: "CASE-REV-07",
    status: "completed",
    provider: "LEGINT Analysis v3 / نموذج قانوني",
    duration: "3m 12s",
    citations: 14,
    factsUsed: 12,
    startedBy: "نورة الحربي",
    createdAt: "2026-09-16 13:51",
  },
  {
    id: "RUN-92E1",
    caseId: "CASE-2026-0142",
    revision: "CASE-REV-06",
    status: "requires_review",
    provider: "LEGINT Analysis v3 / نموذج قانوني",
    duration: "2m 58s",
    citations: 11,
    factsUsed: 10,
    startedBy: "خالد العتيبي",
    createdAt: "2026-09-14 17:22",
  },
  {
    id: "RUN-91C2",
    caseId: "CASE-2026-0141",
    revision: "CASE-REV-04",
    status: "processing",
    provider: "LEGINT Analysis v3 / نموذج قانوني",
    duration: "—",
    citations: 0,
    factsUsed: 8,
    startedBy: "خالد العتيبي",
    createdAt: "2026-09-16 15:02",
  },
  {
    id: "RUN-90A4",
    caseId: "CASE-2026-0138",
    revision: "CASE-REV-03",
    status: "failed",
    provider: "LEGINT Analysis v3 / نموذج قانوني",
    duration: "0m 41s",
    citations: 0,
    factsUsed: 0,
    startedBy: "سارة القحطاني",
    createdAt: "2026-09-15 16:00",
  },
];

export const analysisStatusLabels: Record<AnalysisRun["status"], { label: string; tone: StatusTone }> = {
  queued: { label: "في الانتظار", tone: "neutral" },
  processing: { label: "قيد التنفيذ", tone: "info" },
  completed: { label: "مكتمل", tone: "success" },
  failed: { label: "فشل", tone: "error" },
  requires_review: { label: "يتطلب مراجعة", tone: "warning" },
};

export type CaseAuditEvent = {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  resourceType: string;
  resourceId: string;
  result: "success" | "denied" | "error";
  traceId: string;
};

export const caseAuditEvents: CaseAuditEvent[] = [
  {
    id: "AUD-77120",
    timestamp: "2026-09-16 13:51:08",
    actor: "نورة الحربي",
    action: "analysis.run.create",
    resourceType: "AnalysisRun",
    resourceId: "RUN-92F7",
    result: "success",
    traceId: "trc-4f19c8a2",
  },
  {
    id: "AUD-77118",
    timestamp: "2026-09-16 12:02:44",
    actor: "خالد العتيبي",
    action: "fact.dispute",
    resourceType: "Fact",
    resourceId: "FACT-0313",
    result: "success",
    traceId: "trc-4f19b7d0",
  },
  {
    id: "AUD-77115",
    timestamp: "2026-09-16 09:15:31",
    actor: "خدمة الاستخراج",
    action: "fact.extract",
    resourceType: "Document",
    resourceId: "DOC-4462",
    result: "success",
    traceId: "trc-4f18ea55",
  },
  {
    id: "AUD-77109",
    timestamp: "2026-09-15 17:44:02",
    actor: "سارة القحطاني",
    action: "document.download",
    resourceType: "Document",
    resourceId: "DOC-4455",
    result: "denied",
    traceId: "trc-4f17cc91",
  },
];

export const caseParties = [
  { role: "المدعي", name: "شركة الأفق الصناعية", identifier: "س.ت 1010455872", counsel: "نورة الحربي" },
  { role: "المدعى عليه", name: "مؤسسة الإمداد الحديث", identifier: "س.ت 4030277901", counsel: "—" },
];

export const caseLinkedSources = [
  { id: "SRC-001", title: "نظام المعاملات المدنية", article: "المواد 95، 108، 179", revision: "REV-06" },
  { id: "SRC-014", title: "نظام المحاكم التجارية", article: "المادة 22", revision: "REV-03" },
  { id: "SRC-021", title: "اللائحة التنفيذية لنظام المحاكم التجارية", article: "المادة 15", revision: "REV-02" },
];

export const notifications = [
  {
    id: "NTF-501",
    title: "اكتمل التحليل للقضية CASE-2026-0142",
    time: "قبل 21 دقيقة",
    tone: "success" as StatusTone,
    read: false,
    to: "/analysis",
  },
  {
    id: "NTF-500",
    title: "مراجعة مطلوبة: 3 وقائع في CASE-2026-0138",
    time: "قبل 48 دقيقة",
    tone: "warning" as StatusTone,
    read: false,
    to: "/reviews",
  },
  {
    id: "NTF-499",
    title: "فشل استحواذ المصدر SRC-032",
    time: "قبل 5 ساعات",
    tone: "error" as StatusTone,
    read: false,
    to: "/sources",
  },
  {
    id: "NTF-498",
    title: "نسخة مصدر جاهزة: نظام المعاملات المدنية REV-08",
    time: "أمس",
    tone: "info" as StatusTone,
    read: true,
    to: "/sources",
  },
  {
    id: "NTF-497",
    title: "تصريح استحواذ ينتهي بعد 6 أيام",
    time: "أمس",
    tone: "warning" as StatusTone,
    read: true,
    to: "/sources",
  },
];
