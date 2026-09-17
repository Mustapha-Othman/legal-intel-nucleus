import type { StatusTone } from "./legint";

/* ------------------------------------------------------------------ *
 * Domain vocabularies — each concept stays distinct:
 * Official Source ▸ Source Revision ▸ Acquisition Attempt ▸
 * Original Document ▸ Extraction ▸ Source Span ▸ Knowledge ▸ Audit
 * ------------------------------------------------------------------ */

export type SourceStatus =
  | "active"
  | "draft"
  | "needs_review"
  | "needs_authorization"
  | "acquisition_failed"
  | "unavailable";

export const sourceStatusLabels: Record<SourceStatus, { label: string; tone: StatusTone }> = {
  active: { label: "نشط", tone: "success" },
  draft: { label: "مسودة", tone: "neutral" },
  needs_review: { label: "يحتاج إلى مراجعة", tone: "warning" },
  needs_authorization: { label: "يحتاج إلى تصريح", tone: "info" },
  acquisition_failed: { label: "فشل الاستحواذ", tone: "error" },
  unavailable: { label: "غير متاح", tone: "neutral" },
};

export type RevisionState = "DRAFT" | "IN_REVIEW" | "PUBLISHED" | "SUPERSEDED";

export const revisionStateLabels: Record<RevisionState, { label: string; tone: StatusTone }> = {
  DRAFT: { label: "DRAFT — مسودة", tone: "neutral" },
  IN_REVIEW: { label: "IN_REVIEW — قيد المراجعة", tone: "warning" },
  PUBLISHED: { label: "PUBLISHED — منشورة", tone: "success" },
  SUPERSEDED: { label: "SUPERSEDED — مستبدلة", tone: "info" },
};

export type KnowledgeState = "published" | "indexing" | "not_published" | "blocked";

export const knowledgeStateLabels: Record<KnowledgeState, { label: string; tone: StatusTone }> = {
  published: { label: "منشور في المعرفة", tone: "success" },
  indexing: { label: "قيد الفهرسة", tone: "info" },
  not_published: { label: "غير منشور", tone: "neutral" },
  blocked: { label: "محجوب", tone: "error" },
};

export type AcquisitionMethod = "auto_fetch" | "manual_intake" | "pdf_upload" | "html_discovery";

export const acquisitionMethodLabels: Record<AcquisitionMethod, string> = {
  auto_fetch: "Automatic Fetch — جلب آلي",
  manual_intake: "Manual Official Intake — إدخال رسمي يدوي",
  pdf_upload: "Official PDF Upload — رفع ملف رسمي",
  html_discovery: "HTML Discovery — استكشاف HTML",
};

export const acquisitionMethodShort: Record<AcquisitionMethod, string> = {
  auto_fetch: "جلب آلي",
  manual_intake: "إدخال يدوي رسمي",
  pdf_upload: "رفع ملف رسمي",
  html_discovery: "استكشاف HTML",
};

export type AuthorizationState = "not_required" | "authorized" | "required" | "expired" | "blocked";

export const authorizationLabels: Record<AuthorizationState, { label: string; tone: StatusTone }> = {
  not_required: { label: "غير مطلوب", tone: "neutral" },
  authorized: { label: "مصرّح", tone: "success" },
  required: { label: "يحتاج إلى تصريح", tone: "info" },
  expired: { label: "تصريح منتهٍ", tone: "warning" },
  blocked: { label: "محجوب", tone: "error" },
};

export type ExtractionState = "completed" | "processing" | "failed" | "pending";

export const extractionLabels: Record<ExtractionState, { label: string; tone: StatusTone }> = {
  completed: { label: "مكتمل", tone: "success" },
  processing: { label: "قيد الاستخراج", tone: "info" },
  failed: { label: "فشل الاستخراج", tone: "error" },
  pending: { label: "لم يبدأ", tone: "neutral" },
};

/* ------------------------------- revisions ------------------------------- */

export type SourceRevision = {
  id: string;
  sourceId: string;
  sourceName: string;
  state: RevisionState;
  effectiveDate: string;
  publicationDate: string;
  method: AcquisitionMethod;
  attemptId: string;
  fileName: string;
  mediaType: string;
  fileSize: string;
  sha256: string;
  sha256Verified: boolean;
  extraction: ExtractionState;
  pages: number;
  chars: number;
  spans: number;
  ocr: string;
  knowledge: KnowledgeState;
  indexedAt?: string;
  chunks?: number;
  citations?: number;
  createdBy: string;
  createdAt: string;
};

export type LegalSource = {
  id: string;
  name: string;
  nameEn: string;
  authority: string;
  type: string;
  jurisdiction: string;
  url: string;
  effectiveDate: string;
  publicationDate: string;
  lastVerified: string;
  currentRevision: string;
  revisionState: RevisionState;
  knowledge: KnowledgeState;
  method: AcquisitionMethod;
  authorization: AuthorizationState;
  status: SourceStatus;
  acquisitionPolicy: string;
  lastSuccess: string;
  lastFailure: string;
  revisions: SourceRevision[];
};

const rev = (r: SourceRevision) => r;

export const legalSources: LegalSource[] = [
  {
    id: "SRC-PERSONAL-STATUS-001",
    name: "نظام الأحوال الشخصية",
    nameEn: "Personal Status Law",
    authority: "هيئة الخبراء بمجلس الوزراء",
    type: "نظام",
    jurisdiction: "المملكة العربية السعودية — اتحادي",
    url: "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/personal-status",
    effectiveDate: "1445/09/18هـ — 2024/03/28م",
    publicationDate: "2024/03/08م",
    lastVerified: "2026/09/16 08:41",
    currentRevision: "REV-2026-003",
    revisionState: "DRAFT",
    knowledge: "not_published",
    method: "manual_intake",
    authorization: "not_required",
    status: "needs_review",
    acquisitionPolicy: "إدخال رسمي يدوي — المصدر لا يسمح بالجلب الآلي المتكرر",
    lastSuccess: "2026/09/16 09:31 — ACQ-2026-00941",
    lastFailure: "2026/09/14 22:04 — ACQ-2026-00930",
    revisions: [
      rev({
        id: "REV-2026-003",
        sourceId: "SRC-PERSONAL-STATUS-001",
        sourceName: "نظام الأحوال الشخصية",
        state: "DRAFT",
        effectiveDate: "2026/01/01م",
        publicationDate: "2025/12/18م",
        method: "manual_intake",
        attemptId: "ACQ-2026-00941",
        fileName: "personal-status-law.pdf",
        mediaType: "application/pdf",
        fileSize: "2.4 MB",
        sha256: "c4b52e7a9d1f4c83b07e6a5518d3f2c1a9e04b76d5c8137f2ab6e91c98af7412",
        sha256Verified: true,
        extraction: "completed",
        pages: 42,
        chars: 28491,
        spans: 318,
        ocr: "معطّل — غير مطلوب (نص رقمي)",
        knowledge: "not_published",
        createdBy: "نورة الحربي",
        createdAt: "2026/09/16 09:31",
      }),
      rev({
        id: "REV-2025-002",
        sourceId: "SRC-PERSONAL-STATUS-001",
        sourceName: "نظام الأحوال الشخصية",
        state: "PUBLISHED",
        effectiveDate: "2025/03/01م",
        publicationDate: "2025/02/14م",
        method: "pdf_upload",
        attemptId: "ACQ-2025-00712",
        fileName: "personal-status-law-2025.pdf",
        mediaType: "application/pdf",
        fileSize: "2.2 MB",
        sha256: "8f31ad0c62b74e19c5d80a1e77b4f6329c0de5817a24b93f6ce15d0b73aa9c58",
        sha256Verified: true,
        extraction: "completed",
        pages: 40,
        chars: 27110,
        spans: 302,
        ocr: "معطّل",
        knowledge: "published",
        indexedAt: "2025/02/16 11:22",
        chunks: 412,
        citations: 186,
        createdBy: "خالد العتيبي",
        createdAt: "2025/02/15 10:07",
      }),
      rev({
        id: "REV-2024-001",
        sourceId: "SRC-PERSONAL-STATUS-001",
        sourceName: "نظام الأحوال الشخصية",
        state: "SUPERSEDED",
        effectiveDate: "2024/03/28م",
        publicationDate: "2024/03/08م",
        method: "auto_fetch",
        attemptId: "ACQ-2024-00104",
        fileName: "personal-status-law-1445.pdf",
        mediaType: "application/pdf",
        fileSize: "2.0 MB",
        sha256: "1b7c94ef03a2586d4f1c7ba8093e25d7106fc4b93825ae7fd0c61b48e92f7a03",
        sha256Verified: true,
        extraction: "completed",
        pages: 38,
        chars: 25984,
        spans: 288,
        ocr: "معطّل",
        knowledge: "not_published",
        createdBy: "النظام — عملية آلية",
        createdAt: "2024/03/12 04:00",
      }),
    ],
  },
  {
    id: "SRC-PERSONAL-STATUS-IR-002",
    name: "اللائحة التنفيذية لنظام الأحوال الشخصية",
    nameEn: "Personal Status Law — Implementing Regulation",
    authority: "وزارة العدل",
    type: "لائحة تنفيذية",
    jurisdiction: "المملكة العربية السعودية — اتحادي",
    url: "https://www.moj.gov.sa/ar/regulations/personal-status-ir",
    effectiveDate: "2024/06/12م",
    publicationDate: "2024/06/01م",
    lastVerified: "2026/09/15 23:10",
    currentRevision: "REV-2025-004",
    revisionState: "PUBLISHED",
    knowledge: "published",
    method: "auto_fetch",
    authorization: "authorized",
    status: "active",
    acquisitionPolicy: "جلب آلي كل 7 أيام — مسموح وفق سياسة robots",
    lastSuccess: "2026/09/15 23:10 — ACQ-2026-00938",
    lastFailure: "2026/08/30 23:10 — ACQ-2026-00811",
    revisions: [
      rev({
        id: "REV-2025-004",
        sourceId: "SRC-PERSONAL-STATUS-IR-002",
        sourceName: "اللائحة التنفيذية لنظام الأحوال الشخصية",
        state: "PUBLISHED",
        effectiveDate: "2025/07/01م",
        publicationDate: "2025/06/20م",
        method: "auto_fetch",
        attemptId: "ACQ-2026-00938",
        fileName: "personal-status-ir-2025.pdf",
        mediaType: "application/pdf",
        fileSize: "1.6 MB",
        sha256: "5a09d7c1be3f428a97140dc6e2b5713f8ad0c46927be531fa08c7d24e6109b37",
        sha256Verified: true,
        extraction: "completed",
        pages: 26,
        chars: 18422,
        spans: 214,
        ocr: "معطّل",
        knowledge: "published",
        indexedAt: "2025/06/21 03:12",
        chunks: 288,
        citations: 97,
        createdBy: "النظام — عملية آلية",
        createdAt: "2025/06/21 02:58",
      }),
      rev({
        id: "REV-2024-003",
        sourceId: "SRC-PERSONAL-STATUS-IR-002",
        sourceName: "اللائحة التنفيذية لنظام الأحوال الشخصية",
        state: "SUPERSEDED",
        effectiveDate: "2024/06/12م",
        publicationDate: "2024/06/01م",
        method: "auto_fetch",
        attemptId: "ACQ-2024-00220",
        fileName: "personal-status-ir-2024.pdf",
        mediaType: "application/pdf",
        fileSize: "1.5 MB",
        sha256: "b2e7413fa8d05c69371e0b4d8c92a5f17edc06b3491f78a2cd50e6317b904fa1",
        sha256Verified: true,
        extraction: "completed",
        pages: 24,
        chars: 17004,
        spans: 198,
        ocr: "معطّل",
        knowledge: "not_published",
        createdBy: "النظام — عملية آلية",
        createdAt: "2024/06/04 04:00",
      }),
    ],
  },
  {
    id: "SRC-EVIDENCE-LAW-003",
    name: "نظام الإثبات",
    nameEn: "Law of Evidence",
    authority: "هيئة الخبراء بمجلس الوزراء",
    type: "نظام",
    jurisdiction: "المملكة العربية السعودية — اتحادي",
    url: "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/evidence-law",
    effectiveDate: "2022/12/28م",
    publicationDate: "2021/12/29م",
    lastVerified: "2026/09/16 04:00",
    currentRevision: "REV-2025-002",
    revisionState: "PUBLISHED",
    knowledge: "published",
    method: "auto_fetch",
    authorization: "authorized",
    status: "active",
    acquisitionPolicy: "جلب آلي يومي 04:00 — مسموح",
    lastSuccess: "2026/09/16 04:00 — ACQ-2026-00940",
    lastFailure: "—",
    revisions: [
      rev({
        id: "REV-2025-002",
        sourceId: "SRC-EVIDENCE-LAW-003",
        sourceName: "نظام الإثبات",
        state: "PUBLISHED",
        effectiveDate: "2025/01/15م",
        publicationDate: "2024/12/27م",
        method: "auto_fetch",
        attemptId: "ACQ-2026-00940",
        fileName: "evidence-law-2025.pdf",
        mediaType: "application/pdf",
        fileSize: "1.1 MB",
        sha256: "7d41c05be92a63f814ad70c2e5b1937f0ac6d84139be5720cf18a3d6e04b7215",
        sha256Verified: true,
        extraction: "completed",
        pages: 19,
        chars: 13980,
        spans: 165,
        ocr: "معطّل",
        knowledge: "published",
        indexedAt: "2024/12/28 04:26",
        chunks: 201,
        citations: 143,
        createdBy: "النظام — عملية آلية",
        createdAt: "2024/12/28 04:12",
      }),
    ],
  },
  {
    id: "SRC-CIVIL-TRANSACTIONS-004",
    name: "نظام المعاملات المدنية",
    nameEn: "Civil Transactions Law",
    authority: "هيئة الخبراء بمجلس الوزراء",
    type: "نظام",
    jurisdiction: "المملكة العربية السعودية — اتحادي",
    url: "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/civil-transactions",
    effectiveDate: "2023/12/16م",
    publicationDate: "2023/06/19م",
    lastVerified: "2026/09/16 04:02",
    currentRevision: "REV-2026-001",
    revisionState: "IN_REVIEW",
    knowledge: "indexing",
    method: "html_discovery",
    authorization: "authorized",
    status: "needs_review",
    acquisitionPolicy: "استكشاف HTML ثم جلب الملف الرسمي — مسموح",
    lastSuccess: "2026/09/16 04:02 — ACQ-2026-00942",
    lastFailure: "2026/09/02 04:02 — ACQ-2026-00860",
    revisions: [
      rev({
        id: "REV-2026-001",
        sourceId: "SRC-CIVIL-TRANSACTIONS-004",
        sourceName: "نظام المعاملات المدنية",
        state: "IN_REVIEW",
        effectiveDate: "2026/01/10م",
        publicationDate: "2025/12/29م",
        method: "html_discovery",
        attemptId: "ACQ-2026-00942",
        fileName: "civil-transactions-2026.pdf",
        mediaType: "application/pdf",
        fileSize: "3.8 MB",
        sha256: "9c2f710ade834b06c15f9d47e0b3862a71cd05f4938ba7e21c0d6f5348a91b7e",
        sha256Verified: true,
        extraction: "completed",
        pages: 74,
        chars: 52310,
        spans: 604,
        ocr: "معطّل",
        knowledge: "indexing",
        indexedAt: "قيد التنفيذ",
        chunks: 318,
        citations: 0,
        createdBy: "سارة القحطاني",
        createdAt: "2026/09/16 04:09",
      }),
    ],
  },
  {
    id: "SRC-SHARIA-PROCEDURE-005",
    name: "نظام المرافعات الشرعية",
    nameEn: "Law of Sharia Procedure",
    authority: "وزارة العدل",
    type: "نظام",
    jurisdiction: "المملكة العربية السعودية — اتحادي",
    url: "https://www.moj.gov.sa/ar/regulations/sharia-procedure",
    effectiveDate: "2013/11/25م",
    publicationDate: "2013/11/08م",
    lastVerified: "2026/09/14 22:04",
    currentRevision: "REV-2024-002",
    revisionState: "PUBLISHED",
    knowledge: "published",
    method: "auto_fetch",
    authorization: "expired",
    status: "needs_authorization",
    acquisitionPolicy: "جلب آلي — التصريح التشغيلي منتهٍ بتاريخ 2026/09/10",
    lastSuccess: "2026/08/29 22:04 — ACQ-2026-00799",
    lastFailure: "2026/09/14 22:04 — ACQ-2026-00939",
    revisions: [
      rev({
        id: "REV-2024-002",
        sourceId: "SRC-SHARIA-PROCEDURE-005",
        sourceName: "نظام المرافعات الشرعية",
        state: "PUBLISHED",
        effectiveDate: "2024/02/01م",
        publicationDate: "2024/01/19م",
        method: "auto_fetch",
        attemptId: "ACQ-2026-00799",
        fileName: "sharia-procedure-2024.pdf",
        mediaType: "application/pdf",
        fileSize: "2.9 MB",
        sha256: "3ea6b91d47c05f28a731de604b9c8153f0ad72c69be4813f5c0a9d2e76b41058",
        sha256Verified: true,
        extraction: "completed",
        pages: 58,
        chars: 41220,
        spans: 471,
        ocr: "معطّل",
        knowledge: "published",
        indexedAt: "2024/01/20 05:03",
        chunks: 502,
        citations: 221,
        createdBy: "النظام — عملية آلية",
        createdAt: "2024/01/20 04:48",
      }),
    ],
  },
  {
    id: "SRC-OFFICIAL-GAZETTE-006",
    name: "أم القرى — الجريدة الرسمية (العدد 5072)",
    nameEn: "Umm Al-Qura Official Gazette No. 5072",
    authority: "وزارة الإعلام — الجريدة الرسمية",
    type: "جريدة رسمية",
    jurisdiction: "المملكة العربية السعودية — اتحادي",
    url: "https://www.uqn.gov.sa/issues/5072",
    effectiveDate: "2026/08/21م",
    publicationDate: "2026/08/21م",
    lastVerified: "2026/09/16 06:15",
    currentRevision: "REV-2026-002",
    revisionState: "DRAFT",
    knowledge: "not_published",
    method: "pdf_upload",
    authorization: "not_required",
    status: "draft",
    acquisitionPolicy: "رفع ملف رسمي من قِبل مشغّل معتمد",
    lastSuccess: "2026/09/16 06:15 — ACQ-2026-00943",
    lastFailure: "—",
    revisions: [
      rev({
        id: "REV-2026-002",
        sourceId: "SRC-OFFICIAL-GAZETTE-006",
        sourceName: "أم القرى — الجريدة الرسمية (العدد 5072)",
        state: "DRAFT",
        effectiveDate: "2026/08/21م",
        publicationDate: "2026/08/21م",
        method: "pdf_upload",
        attemptId: "ACQ-2026-00943",
        fileName: "uqn-issue-5072.pdf",
        mediaType: "application/pdf",
        fileSize: "6.1 MB",
        sha256: "e10b58cd7942a3f6015c8bd4e73a29f60cd815b47239ae60f1c7d5b83094a627",
        sha256Verified: true,
        extraction: "completed",
        pages: 96,
        chars: 71440,
        spans: 812,
        ocr: "مفعّل — صفحات ممسوحة (12 صفحة)",
        knowledge: "not_published",
        createdBy: "عبدالله الشمري",
        createdAt: "2026/09/16 06:22",
      }),
    ],
  },
  {
    id: "SRC-MOJ-DECISION-007",
    name: "قرار وزاري رقم 1442/ت — تنظيم التوثيق",
    nameEn: "Ministerial Decision 1442/T",
    authority: "وزارة العدل",
    type: "قرار وزاري",
    jurisdiction: "المملكة العربية السعودية — اتحادي",
    url: "https://www.moj.gov.sa/ar/decisions/1442-t",
    effectiveDate: "2021/05/03م",
    publicationDate: "2021/04/22م",
    lastVerified: "2026/09/13 19:44",
    currentRevision: "REV-2023-001",
    revisionState: "PUBLISHED",
    knowledge: "published",
    method: "auto_fetch",
    authorization: "blocked",
    status: "acquisition_failed",
    acquisitionPolicy: "جلب آلي — الموقع الرسمي يمنع الوصول الآلي وفق سياسة robots",
    lastSuccess: "2026/06/11 19:44 — ACQ-2026-00512",
    lastFailure: "2026/09/16 09:12 — ACQ-2026-00944",
    revisions: [
      rev({
        id: "REV-2023-001",
        sourceId: "SRC-MOJ-DECISION-007",
        sourceName: "قرار وزاري رقم 1442/ت — تنظيم التوثيق",
        state: "PUBLISHED",
        effectiveDate: "2023/01/09م",
        publicationDate: "2022/12/28م",
        method: "auto_fetch",
        attemptId: "ACQ-2026-00512",
        fileName: "moj-decision-1442-t.pdf",
        mediaType: "application/pdf",
        fileSize: "480 KB",
        sha256: "42c8de19b07a5f36e1c94d087b3a62150fdc7e8b394a6021cf5d8b7e60931a4c",
        sha256Verified: true,
        extraction: "completed",
        pages: 8,
        chars: 5120,
        spans: 61,
        ocr: "معطّل",
        knowledge: "published",
        indexedAt: "2023/01/02 06:40",
        chunks: 64,
        citations: 38,
        createdBy: "النظام — عملية آلية",
        createdAt: "2023/01/02 06:31",
      }),
    ],
  },
  {
    id: "SRC-COURT-PUBLICATION-008",
    name: "مدونة الأحكام القضائية — المجموعة الثامنة",
    nameEn: "Judicial Rulings Compendium — Vol. 8",
    authority: "المركز الوطني للوثائق القضائية",
    type: "نشر قضائي",
    jurisdiction: "المملكة العربية السعودية — اتحادي",
    url: "https://sjp.moj.gov.sa/compendium/vol-8",
    effectiveDate: "—",
    publicationDate: "2026/02/11م",
    lastVerified: "2026/09/10 14:02",
    currentRevision: "—",
    revisionState: "DRAFT",
    knowledge: "not_published",
    method: "manual_intake",
    authorization: "required",
    status: "needs_authorization",
    acquisitionPolicy: "يتطلب تصريح نشر من الجهة قبل الاستحواذ",
    lastSuccess: "—",
    lastFailure: "2026/09/10 14:02 — ACQ-2026-00921",
    revisions: [],
  },
];

export const sourceById = (id: string) => legalSources.find((s) => s.id === id);

export const revisionById = (sourceId: string, revisionId: string) =>
  sourceById(sourceId)?.revisions.find((r) => r.id === revisionId);

/* ------------------------------ source spans ----------------------------- */

export type SourceSpan = {
  id: string;
  revisionId: string;
  page: number;
  start: number;
  end: number;
  article: string;
  text: string;
  linkedFacts: string[];
  linkedCitations: string[];
};

export const sourceSpans: SourceSpan[] = [
  {
    id: "SPAN-REV003-0146",
    revisionId: "REV-2026-003",
    page: 3,
    start: 1204,
    end: 1418,
    article: "المادة الأولى",
    text: "يُقصد بالألفاظ والعبارات الآتية — أينما وردت في هذا النظام — المعاني المبينة أمام كل منها، ما لم يقتضِ السياق خلاف ذلك.",
    linkedFacts: ["FACT-0411"],
    linkedCitations: ["RUN-92F7#C-04"],
  },
  {
    id: "SPAN-REV003-0147",
    revisionId: "REV-2026-003",
    page: 3,
    start: 1419,
    end: 1702,
    article: "المادة الثانية",
    text: "تُطبَّق أحكام هذا النظام على مسائل الأحوال الشخصية، ويُرجع فيما لم يرد فيه نص إلى القواعد الشرعية الأكثر ملاءمة لموضوع النزاع.",
    linkedFacts: ["FACT-0411", "FACT-0417"],
    linkedCitations: ["RUN-92F7#C-05", "RUN-A413#C-11"],
  },
  {
    id: "SPAN-REV003-0148",
    revisionId: "REV-2026-003",
    page: 4,
    start: 1703,
    end: 1996,
    article: "المادة الثالثة",
    text: "يُشترط لصحة عقد الزواج رضا الزوجين، وأن يكون كل منهما خاليًا من الموانع الشرعية، وأن يُوثَّق العقد وفقًا للإجراءات النظامية المقررة.",
    linkedFacts: ["FACT-0418"],
    linkedCitations: ["RUN-A413#C-12"],
  },
  {
    id: "SPAN-REV003-0149",
    revisionId: "REV-2026-003",
    page: 5,
    start: 1997,
    end: 2240,
    article: "المادة الرابعة",
    text: "لا يُعتد بأي شرط في عقد الزواج يخالف مقتضى العقد أو يتعارض مع أحكام هذا النظام، ويبقى العقد صحيحًا ويسقط الشرط.",
    linkedFacts: [],
    linkedCitations: ["RUN-92F7#C-07"],
  },
  {
    id: "SPAN-REV003-0150",
    revisionId: "REV-2026-003",
    page: 6,
    start: 2241,
    end: 2508,
    article: "المادة الخامسة",
    text: "تُقدَّر النفقة بحسب حال المنفق يُسرًا وعُسرًا، وحاجة المنفق عليه، ومع مراعاة الأسعار السائدة في مكان الإقامة وزمانها.",
    linkedFacts: ["FACT-0422"],
    linkedCitations: ["RUN-A413#C-18"],
  },
  {
    id: "SPAN-REV003-0151",
    revisionId: "REV-2026-003",
    page: 7,
    start: 2509,
    end: 2744,
    article: "المادة السادسة",
    text: "للمحكمة أن تأمر بنفقة مؤقتة بناءً على طلب صاحب الشأن، ويكون أمرها واجب النفاذ ولا يخل بما تصدره من حكم نهائي.",
    linkedFacts: ["FACT-0423"],
    linkedCitations: [],
  },
  {
    id: "SPAN-REV003-0152",
    revisionId: "REV-2026-003",
    page: 9,
    start: 3010,
    end: 3288,
    article: "المادة السابعة",
    text: "يثبت النسب بالفراش أو بالإقرار أو بالبينة، ويُستعان عند الاقتضاء بالوسائل الطبية المعتمدة وفق ما تقرره اللائحة التنفيذية.",
    linkedFacts: [],
    linkedCitations: ["RUN-92F7#C-21"],
  },
  {
    id: "SPAN-REV003-0153",
    revisionId: "REV-2026-003",
    page: 11,
    start: 3502,
    end: 3760,
    article: "المادة الثامنة",
    text: "الحضانة حق للمحضون، ويُراعى في تقديرها مصلحته الفضلى، ولا تسقط إلا بحكم قضائي مسبب.",
    linkedFacts: ["FACT-0431"],
    linkedCitations: ["RUN-A413#C-24"],
  },
];

/* ----------------------------- extracted text ---------------------------- */

export const extractedArticles = sourceSpans
  .filter((s) => s.revisionId === "REV-2026-003")
  .map((s) => ({ spanId: s.id, article: s.article, page: s.page, text: s.text, range: `${s.start}–${s.end}` }));

/* --------------------------- acquisition domain -------------------------- */

export type AttemptState =
  | "completed"
  | "processing"
  | "failed"
  | "authorization_required"
  | "expired"
  | "blocked"
  | "validation_failed";

export const attemptStateLabels: Record<AttemptState, { label: string; tone: StatusTone }> = {
  completed: { label: "Completed — مكتملة", tone: "success" },
  processing: { label: "Processing — قيد التنفيذ", tone: "info" },
  failed: { label: "Failed — فاشلة", tone: "error" },
  authorization_required: { label: "Authorization Required — يحتاج تصريح", tone: "info" },
  expired: { label: "Expired — تصريح منتهٍ", tone: "warning" },
  blocked: { label: "Blocked — محجوب", tone: "error" },
  validation_failed: { label: "Validation Failed — فشل التحقق", tone: "error" },
};

export type PipelineStepState = "completed" | "processing" | "failed" | "waiting" | "skipped";

export const pipelineStepLabels: Record<PipelineStepState, { label: string; tone: StatusTone }> = {
  completed: { label: "مكتملة", tone: "success" },
  processing: { label: "قيد التنفيذ", tone: "info" },
  failed: { label: "فاشلة", tone: "error" },
  waiting: { label: "بالانتظار", tone: "warning" },
  skipped: { label: "متجاوزة", tone: "neutral" },
};

export type PipelineStep = { key: string; label: string; labelEn: string; state: PipelineStepState; note?: string };

export const acquisitionPipelineTemplate: { key: string; label: string; labelEn: string }[] = [
  { key: "request", label: "الطلب", labelEn: "Request" },
  { key: "authorization", label: "التصريح", labelEn: "Authorization" },
  { key: "fetch", label: "الجلب / الرفع", labelEn: "Fetch / Upload" },
  { key: "validate", label: "التحقق", labelEn: "Validate" },
  { key: "persist", label: "الحفظ", labelEn: "Persist" },
  { key: "extract", label: "الاستخراج", labelEn: "Extract" },
  { key: "spans", label: "الأسانيد المصدرية", labelEn: "Source Spans" },
  { key: "review", label: "المراجعة", labelEn: "Review" },
  { key: "revision", label: "النسخة", labelEn: "Revision" },
];

export type AcquisitionAttempt = {
  id: string;
  sourceId: string;
  sourceName: string;
  docType: string;
  method: AcquisitionMethod;
  authorization: AuthorizationState;
  transport: string;
  state: AttemptState;
  startedAt: string;
  completedAt: string;
  duration: string;
  result: string;
  requestedBy: string;
  url: string;
  finalUrl: string;
  contentType: string;
  redirects: number;
  robots: string;
  fileSize: string;
  sha256: string;
  extractionMethod: string;
  ocr: string;
  pages: number | string;
  chars: number | string;
  spans: number | string;
  revisionId?: string;
  errorCode?: string;
  errorCategory?: string;
  lastResponse?: string;
  pipeline: PipelineStep[];
  timeline: { time: string; label: string; tone: StatusTone }[];
};

const step = (
  key: string,
  state: PipelineStepState,
  note?: string,
): PipelineStep => {
  const base = acquisitionPipelineTemplate.find((s) => s.key === key)!;
  return note === undefined
    ? { ...base, state }
    : { ...base, state, note };
};

export const acquisitionAttempts: AcquisitionAttempt[] = [
  {
    id: "ACQ-2026-00941",
    sourceId: "SRC-PERSONAL-STATUS-001",
    sourceName: "نظام الأحوال الشخصية",
    docType: "PDF",
    method: "manual_intake",
    authorization: "not_required",
    transport: "Upload 201",
    state: "completed",
    startedAt: "2026/09/16 09:31:04",
    completedAt: "2026/09/16 09:31:13",
    duration: "9.4s",
    result: "REV-2026-003 (DRAFT)",
    requestedBy: "نورة الحربي",
    url: "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/personal-status",
    finalUrl: "https://laws.boe.gov.sa/Files/personal-status-law.pdf",
    contentType: "application/pdf",
    redirects: 1,
    robots: "مسموح — لا توجد قيود على المسار",
    fileSize: "2.4 MB",
    sha256: "c4b52e7a9d1f4c83b07e6a5518d3f2c1a9e04b76d5c8137f2ab6e91c98af7412",
    extractionMethod: "استخراج نص رقمي (PDF text layer)",
    ocr: "معطّل — غير مطلوب",
    pages: 42,
    chars: 28491,
    spans: 318,
    revisionId: "REV-2026-003",
    pipeline: [
      step("request", "completed"),
      step("authorization", "completed", "غير مطلوب"),
      step("fetch", "completed", "رفع رسمي"),
      step("validate", "completed"),
      step("persist", "completed"),
      step("extract", "completed"),
      step("spans", "completed", "318 سندًا"),
      step("review", "waiting", "بانتظار المراجع"),
      step("revision", "completed", "DRAFT"),
    ],
    timeline: [
      { time: "09:31:04", label: "Request created — إنشاء طلب الاستحواذ", tone: "brand" },
      { time: "09:31:04", label: "Authorization policy evaluated — تقييم سياسة التصريح", tone: "success" },
      { time: "09:31:05", label: "Official URL requested — طلب الرابط الرسمي", tone: "info" },
      { time: "09:31:06", label: "HTML response received — استلام استجابة HTML", tone: "info" },
      { time: "09:31:06", label: "Official PDF link discovered — العثور على رابط الملف الرسمي", tone: "info" },
      { time: "09:31:07", label: "PDF fetch initiated — بدء جلب الملف", tone: "info" },
      { time: "09:31:08", label: "PDF received — استلام الملف", tone: "success" },
      { time: "09:31:08", label: "Media type validated — التحقق من نوع الوسيط", tone: "success" },
      { time: "09:31:09", label: "SHA-256 calculated — حساب البصمة", tone: "success" },
      { time: "09:31:09", label: "Duplicate check completed — لا توجد نسخة مطابقة", tone: "success" },
      { time: "09:31:10", label: "Text extraction started — بدء استخراج النص", tone: "info" },
      { time: "09:31:12", label: "318 Source Spans persisted — حفظ الأسانيد المصدرية", tone: "success" },
      { time: "09:31:13", label: "Revision created as DRAFT — إنشاء النسخة كمسودة", tone: "brand" },
    ],
  },
  {
    id: "ACQ-2026-00942",
    sourceId: "SRC-CIVIL-TRANSACTIONS-004",
    sourceName: "نظام المعاملات المدنية",
    docType: "HTML → PDF",
    method: "html_discovery",
    authorization: "authorized",
    transport: "HTTP 200",
    state: "processing",
    startedAt: "2026/09/16 04:02:11",
    completedAt: "—",
    duration: "قيد التنفيذ — 42s",
    result: "قيد الفهرسة",
    requestedBy: "النظام — جدولة آلية",
    url: "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/civil-transactions",
    finalUrl: "https://laws.boe.gov.sa/Files/civil-transactions-2026.pdf",
    contentType: "application/pdf",
    redirects: 2,
    robots: "مسموح",
    fileSize: "3.8 MB",
    sha256: "9c2f710ade834b06c15f9d47e0b3862a71cd05f4938ba7e21c0d6f5348a91b7e",
    extractionMethod: "استخراج نص رقمي",
    ocr: "معطّل",
    pages: 74,
    chars: 52310,
    spans: 604,
    revisionId: "REV-2026-001",
    pipeline: [
      step("request", "completed"),
      step("authorization", "completed", "مصرّح"),
      step("fetch", "completed"),
      step("validate", "completed"),
      step("persist", "completed"),
      step("extract", "completed"),
      step("spans", "completed", "604 سندًا"),
      step("review", "processing", "قيد المراجعة"),
      step("revision", "completed", "IN_REVIEW"),
    ],
    timeline: [
      { time: "04:02:11", label: "Request created — طلب مجدول", tone: "brand" },
      { time: "04:02:11", label: "Authorization verified — تصريح ساري", tone: "success" },
      { time: "04:02:13", label: "HTML page fetched — جلب الصفحة الرسمية", tone: "info" },
      { time: "04:02:15", label: "Official PDF link discovered", tone: "info" },
      { time: "04:02:26", label: "PDF received — 3.8 MB", tone: "success" },
      { time: "04:02:28", label: "SHA-256 calculated", tone: "success" },
      { time: "04:02:31", label: "Text extraction completed — 52,310 حرفًا", tone: "success" },
      { time: "04:02:44", label: "604 Source Spans persisted", tone: "success" },
      { time: "04:02:53", label: "Knowledge indexing in progress — قيد الفهرسة", tone: "info" },
    ],
  },
  {
    id: "ACQ-2026-00944",
    sourceId: "SRC-MOJ-DECISION-007",
    sourceName: "قرار وزاري رقم 1442/ت — تنظيم التوثيق",
    docType: "PDF",
    method: "auto_fetch",
    authorization: "blocked",
    transport: "HTTP 403",
    state: "blocked",
    startedAt: "2026/09/16 09:12:38",
    completedAt: "2026/09/16 09:12:40",
    duration: "1.9s",
    result: "لم تُنشأ نسخة",
    requestedBy: "النظام — جدولة آلية",
    url: "https://www.moj.gov.sa/ar/decisions/1442-t",
    finalUrl: "—",
    contentType: "text/html",
    redirects: 0,
    robots: "غير مسموح — المسار مستثنى في robots.txt",
    fileSize: "—",
    sha256: "—",
    extractionMethod: "—",
    ocr: "—",
    pages: "—",
    chars: "—",
    spans: "—",
    errorCode: "SOURCE_FETCH_BLOCKED",
    errorCategory: "قيود وصول لدى الجهة الرسمية",
    lastResponse: "HTTP 403 Forbidden",
    pipeline: [
      step("request", "completed"),
      step("authorization", "failed", "محجوب وفق سياسة الموقع"),
      step("fetch", "skipped"),
      step("validate", "skipped"),
      step("persist", "skipped"),
      step("extract", "skipped"),
      step("spans", "skipped"),
      step("review", "skipped"),
      step("revision", "skipped"),
    ],
    timeline: [
      { time: "09:12:38", label: "Request created — طلب مجدول", tone: "brand" },
      { time: "09:12:39", label: "Robots policy evaluated — المسار غير مسموح", tone: "warning" },
      { time: "09:12:40", label: "HTTP 403 Forbidden — تعذر الوصول إلى المصدر الرسمي", tone: "error" },
      { time: "09:12:40", label: "Attempt closed as BLOCKED — إيقاف المحاولة دون إنشاء نسخة", tone: "error" },
    ],
  },
  {
    id: "ACQ-2026-00943",
    sourceId: "SRC-OFFICIAL-GAZETTE-006",
    sourceName: "أم القرى — الجريدة الرسمية (العدد 5072)",
    docType: "PDF",
    method: "pdf_upload",
    authorization: "not_required",
    transport: "Upload 201",
    state: "completed",
    startedAt: "2026/09/16 06:15:02",
    completedAt: "2026/09/16 06:22:41",
    duration: "7m 39s",
    result: "REV-2026-002 (DRAFT)",
    requestedBy: "عبدالله الشمري",
    url: "https://www.uqn.gov.sa/issues/5072",
    finalUrl: "رفع محلي — uqn-issue-5072.pdf",
    contentType: "application/pdf",
    redirects: 0,
    robots: "غير مطبق — رفع يدوي",
    fileSize: "6.1 MB",
    sha256: "e10b58cd7942a3f6015c8bd4e73a29f60cd815b47239ae60f1c7d5b83094a627",
    extractionMethod: "نص رقمي + OCR للصفحات الممسوحة",
    ocr: "مفعّل — 12 صفحة",
    pages: 96,
    chars: 71440,
    spans: 812,
    revisionId: "REV-2026-002",
    pipeline: [
      step("request", "completed"),
      step("authorization", "skipped", "غير مطلوب"),
      step("fetch", "completed", "رفع يدوي"),
      step("validate", "completed"),
      step("persist", "completed"),
      step("extract", "completed", "OCR جزئي"),
      step("spans", "completed", "812 سندًا"),
      step("review", "waiting"),
      step("revision", "completed", "DRAFT"),
    ],
    timeline: [
      { time: "06:15:02", label: "Official PDF uploaded — رفع ملف رسمي", tone: "brand" },
      { time: "06:15:04", label: "Media type validated — application/pdf", tone: "success" },
      { time: "06:15:06", label: "SHA-256 calculated", tone: "success" },
      { time: "06:16:12", label: "OCR started for 12 scanned pages", tone: "info" },
      { time: "06:21:55", label: "Text extraction completed — 71,440 حرفًا", tone: "success" },
      { time: "06:22:30", label: "812 Source Spans persisted", tone: "success" },
      { time: "06:22:41", label: "Revision created as DRAFT", tone: "brand" },
    ],
  },
  {
    id: "ACQ-2026-00939",
    sourceId: "SRC-SHARIA-PROCEDURE-005",
    sourceName: "نظام المرافعات الشرعية",
    docType: "PDF",
    method: "auto_fetch",
    authorization: "expired",
    transport: "HTTP 401",
    state: "expired",
    startedAt: "2026/09/14 22:04:09",
    completedAt: "2026/09/14 22:04:11",
    duration: "2.1s",
    result: "لم تُنشأ نسخة",
    requestedBy: "النظام — جدولة آلية",
    url: "https://www.moj.gov.sa/ar/regulations/sharia-procedure",
    finalUrl: "—",
    contentType: "application/json",
    redirects: 0,
    robots: "مسموح",
    fileSize: "—",
    sha256: "—",
    extractionMethod: "—",
    ocr: "—",
    pages: "—",
    chars: "—",
    spans: "—",
    errorCode: "SOURCE_AUTHORIZATION_EXPIRED",
    errorCategory: "تصريح تشغيلي منتهٍ",
    lastResponse: "HTTP 401 Unauthorized",
    pipeline: [
      step("request", "completed"),
      step("authorization", "failed", "انتهى التصريح 2026/09/10"),
      step("fetch", "skipped"),
      step("validate", "skipped"),
      step("persist", "skipped"),
      step("extract", "skipped"),
      step("spans", "skipped"),
      step("review", "skipped"),
      step("revision", "skipped"),
    ],
    timeline: [
      { time: "22:04:09", label: "Request created", tone: "brand" },
      { time: "22:04:10", label: "Authorization expired — التصريح منتهٍ بتاريخ 2026/09/10", tone: "warning" },
      { time: "22:04:11", label: "Attempt closed — بحاجة إلى تجديد التصريح", tone: "error" },
    ],
  },
  {
    id: "ACQ-2026-00921",
    sourceId: "SRC-COURT-PUBLICATION-008",
    sourceName: "مدونة الأحكام القضائية — المجموعة الثامنة",
    docType: "PDF",
    method: "manual_intake",
    authorization: "required",
    transport: "—",
    state: "authorization_required",
    startedAt: "2026/09/10 14:02:00",
    completedAt: "—",
    duration: "—",
    result: "بانتظار تصريح النشر",
    requestedBy: "سارة القحطاني",
    url: "https://sjp.moj.gov.sa/compendium/vol-8",
    finalUrl: "—",
    contentType: "—",
    redirects: 0,
    robots: "غير مطبق",
    fileSize: "—",
    sha256: "—",
    extractionMethod: "—",
    ocr: "—",
    pages: "—",
    chars: "—",
    spans: "—",
    pipeline: [
      step("request", "completed"),
      step("authorization", "waiting", "بانتظار موافقة الجهة"),
      step("fetch", "waiting"),
      step("validate", "waiting"),
      step("persist", "waiting"),
      step("extract", "waiting"),
      step("spans", "waiting"),
      step("review", "waiting"),
      step("revision", "waiting"),
    ],
    timeline: [
      { time: "14:02:00", label: "Request created — طلب استحواذ يدوي", tone: "brand" },
      { time: "14:02:01", label: "Authorization required — يتطلب تصريح نشر من الجهة", tone: "info" },
    ],
  },
  {
    id: "ACQ-2026-00940",
    sourceId: "SRC-EVIDENCE-LAW-003",
    sourceName: "نظام الإثبات",
    docType: "PDF",
    method: "auto_fetch",
    authorization: "authorized",
    transport: "HTTP 200",
    state: "completed",
    startedAt: "2026/09/16 04:00:02",
    completedAt: "2026/09/16 04:00:14",
    duration: "11.6s",
    result: "لا تغيير — نفس البصمة",
    requestedBy: "النظام — جدولة آلية",
    url: "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/evidence-law",
    finalUrl: "https://laws.boe.gov.sa/Files/evidence-law-2025.pdf",
    contentType: "application/pdf",
    redirects: 1,
    robots: "مسموح",
    fileSize: "1.1 MB",
    sha256: "7d41c05be92a63f814ad70c2e5b1937f0ac6d84139be5720cf18a3d6e04b7215",
    extractionMethod: "تم التخطي — بصمة مطابقة",
    ocr: "معطّل",
    pages: 19,
    chars: 13980,
    spans: 165,
    revisionId: "REV-2025-002",
    pipeline: [
      step("request", "completed"),
      step("authorization", "completed"),
      step("fetch", "completed"),
      step("validate", "completed", "بصمة مطابقة"),
      step("persist", "skipped", "لا حاجة"),
      step("extract", "skipped"),
      step("spans", "skipped"),
      step("review", "skipped"),
      step("revision", "skipped", "لا نسخة جديدة"),
    ],
    timeline: [
      { time: "04:00:02", label: "Request created", tone: "brand" },
      { time: "04:00:05", label: "PDF received — 1.1 MB", tone: "info" },
      { time: "04:00:11", label: "SHA-256 matches active revision — لا تغيير في المصدر", tone: "success" },
      { time: "04:00:14", label: "Attempt completed without new revision", tone: "success" },
    ],
  },
  {
    id: "ACQ-2026-00938",
    sourceId: "SRC-PERSONAL-STATUS-IR-002",
    sourceName: "اللائحة التنفيذية لنظام الأحوال الشخصية",
    docType: "PDF",
    method: "auto_fetch",
    authorization: "authorized",
    transport: "HTTP 200",
    state: "validation_failed",
    startedAt: "2026/09/15 23:10:07",
    completedAt: "2026/09/15 23:10:19",
    duration: "12.4s",
    result: "رُفض الملف — نوع وسيط غير مطابق",
    requestedBy: "النظام — جدولة آلية",
    url: "https://www.moj.gov.sa/ar/regulations/personal-status-ir",
    finalUrl: "https://www.moj.gov.sa/files/ir-preview.html",
    contentType: "text/html",
    redirects: 3,
    robots: "مسموح",
    fileSize: "84 KB",
    sha256: "0af7c31d5b8e264970c1ad3fe58b7204c9d16be3872a05f4ce9b7d1608a34f52",
    extractionMethod: "—",
    ocr: "—",
    pages: "—",
    chars: "—",
    spans: "—",
    errorCode: "MEDIA_TYPE_MISMATCH",
    errorCategory: "فشل التحقق من نوع الوسيط",
    lastResponse: "HTTP 200 — text/html",
    pipeline: [
      step("request", "completed"),
      step("authorization", "completed"),
      step("fetch", "completed"),
      step("validate", "failed", "المتوقع application/pdf"),
      step("persist", "skipped"),
      step("extract", "skipped"),
      step("spans", "skipped"),
      step("review", "skipped"),
      step("revision", "skipped"),
    ],
    timeline: [
      { time: "23:10:07", label: "Request created", tone: "brand" },
      { time: "23:10:12", label: "Response received — text/html", tone: "info" },
      { time: "23:10:19", label: "Media type validation failed — رُفض الملف", tone: "error" },
    ],
  },
];

export const attemptById = (id: string) => acquisitionAttempts.find((a) => a.id === id);

/* ------------------------------ audit events ----------------------------- */

export type SourceAuditEvent = {
  id: string;
  actor: string;
  action: string;
  resource: string;
  timestamp: string;
  traceId: string;
  result: "success" | "warning" | "failure";
};

export const sourceAuditEvents: SourceAuditEvent[] = [
  {
    id: "EVT-10041",
    actor: "نورة الحربي",
    action: "Revision created — إنشاء نسخة كمسودة",
    resource: "REV-2026-003",
    timestamp: "2026/09/16 09:31:13",
    traceId: "TRC-8F41A2",
    result: "success",
  },
  {
    id: "EVT-10040",
    actor: "النظام — عملية استخراج",
    action: "Extraction completed — 318 Source Spans",
    resource: "REV-2026-003",
    timestamp: "2026/09/16 09:31:12",
    traceId: "TRC-8F41A2",
    result: "success",
  },
  {
    id: "EVT-10039",
    actor: "النظام — عملية تحقق",
    action: "SHA-256 calculated — حساب البصمة",
    resource: "ACQ-2026-00941",
    timestamp: "2026/09/16 09:31:09",
    traceId: "TRC-8F41A2",
    result: "success",
  },
  {
    id: "EVT-10038",
    actor: "نورة الحربي",
    action: "Official PDF uploaded — personal-status-law.pdf",
    resource: "ACQ-2026-00941",
    timestamp: "2026/09/16 09:31:05",
    traceId: "TRC-8F41A2",
    result: "success",
  },
  {
    id: "EVT-10037",
    actor: "نورة الحربي",
    action: "Acquisition requested — إدخال رسمي يدوي",
    resource: "SRC-PERSONAL-STATUS-001",
    timestamp: "2026/09/16 09:31:04",
    traceId: "TRC-8F41A2",
    result: "success",
  },
  {
    id: "EVT-09902",
    actor: "النظام — جدولة آلية",
    action: "Acquisition failed — تعذر الوصول",
    resource: "ACQ-2026-00930",
    timestamp: "2026/09/14 22:04:11",
    traceId: "TRC-7C0B19",
    result: "failure",
  },
  {
    id: "EVT-08120",
    actor: "خالد العتيبي",
    action: "Revision published — نشر النسخة إلى المعرفة",
    resource: "REV-2025-002",
    timestamp: "2025/02/16 11:22:40",
    traceId: "TRC-5A9E07",
    result: "success",
  },
  {
    id: "EVT-08118",
    actor: "خالد العتيبي",
    action: "Review started — بدء مراجعة النسخة",
    resource: "REV-2025-002",
    timestamp: "2025/02/15 13:04:22",
    traceId: "TRC-5A9E07",
    result: "success",
  },
  {
    id: "EVT-06001",
    actor: "عبدالله الشمري",
    action: "Source created — إنشاء المصدر الرسمي",
    resource: "SRC-PERSONAL-STATUS-001",
    timestamp: "2024/03/10 08:12:03",
    traceId: "TRC-1188B4",
    result: "success",
  },
];

/* ------------------------------ list summary ----------------------------- */

export const sourceSummary = {
  total: "68",
  active: "51",
  drafts: "6",
  needsReview: "4",
  needsAuthorization: "3",
  lastSuccess: "09:31",
};

export const acquisitionSummary = {
  today: "34",
  processing: "2",
  succeeded: "27",
  failed: "3",
  authorization: "2",
};
