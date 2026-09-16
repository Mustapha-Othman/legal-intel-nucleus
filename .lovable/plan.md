# LEGINT Core — Admin Control Center

An Arabic-first (RTL) enterprise admin dashboard for a legal intelligence platform, built with Mantine UI on realistic sample data, delivered in phases.

## Design foundation

- Palette: Deep Navy `#0B1F33` (dark `#071827`, hover `#102A43`, soft `#EDF2F7`), Legal Green `#16805C` (dark `#106B4C`, light `#E9F7F1`), app background `#F7F9FB`, surfaces white, borders `#E3E8EF`, text `#16202A` / `#667085` / `#98A2B3`. Status colors only where semantically needed.
- Typography: IBM Plex Sans Arabic for Arabic and Latin UI text, tabular figures for tables, JetBrains Mono for identifiers, hashes and JSON.
- Direction: Arabic RTL is the default; a language toggle switches to English LTR. Identifiers (CASE-2026-0142, RUN-92F7, SHA-256 values) always render left-to-right.
- Visual rules: 8–12px radius, 1px borders, restrained shadows, compact enterprise spacing, no gradients or glass effects, line icons only.

## Phase 1 — Shell and core screens (this round)

1. Install and configure Mantine (theme, RTL provider, fonts, notifications, dropzone, charts, dates).
2. App shell: right-side sidebar (260–280px, collapsible to icons), LEGINT Core mark, workspace selector, grouped navigation with section labels, footer with system status / docs / settings / profile. Top bar: global search (⌘K), notifications drawer, workspace selector, user menu.
3. Shared primitives: PageHeader, StatCard, StatusBadge, DataTable (sticky headers, sort, filter, pagination, row menus, density, selection), FilterBar, DetailDrawer, Timeline, MetadataList, EmptyState, ErrorState, AuditEvent, SourceCitation, RevisionBadge, PermissionBadge, JobStatus, AnalysisStatus.
4. Screens: Overview dashboard (KPIs, case-activity chart, system health, recent operations, items needing attention), Cases list, Case Workbench with its nine tabs and Case Intelligence panel, Documents list plus split-screen document viewer.

## Phase 2 — Legal knowledge and analysis

Facts, Official Legal Sources, Source Detail, Source Acquisition control center, Manual Official Intake wizard, Knowledge Room with global knowledge search, Legal Analysis, Analysis Result reader with citation side panel.

## Phase 3 — Governance and operations

Reviews & Corrections (queue plus three-pane review screen), Replay & Comparison, API Sandbox, Identity & Access with authentication settings and permission matrix, Workspace management, Operations Center, Job Inspector, Audit Log, System page, AI/model configuration, System Settings.

## Data and states

Realistic Saudi legal-tech sample data (cases, courts, documents, facts, official sources such as نظام الأحوال الشخصية, analysis runs, audit events) in typed fixture modules, so real data can replace them later without UI changes. Every screen ships empty, loading (skeletons), and error/permission-denied states, plus confirmation dialogs on destructive, publishing, role and session actions.

## Technical notes

- Mantine 8 with `@mantine/core`, `hooks`, `notifications`, `dropzone`, `dates`, `charts`, `spotlight`, `code-highlight`, plus `postcss-preset-mantine`.
- MantineProvider wraps the app in `src/routes/__root.tsx`; `dir="rtl"` on the html element driven by a language store, with `DirectionProvider`.
- One route file per screen under `src/routes/`, each with its own head metadata; navigation uses TanStack `Link`.
- Charts via `@mantine/charts` (Recharts already present). No backend, auth, or database in this build.

## Out of scope for now

Real authentication, live API, persistence, and document/PDF processing — sample data represents them.
