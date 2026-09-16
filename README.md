# Legal Insight Hub

Design a complete, production-quality Admin Dashboard / Control Center for LEGINT Core, an enterprise-grade AI-powered legal intelligence platform.

This is NOT a generic SaaS dashboard.

The interface should feel like a professional Legal Intelligence Operating System used by legal teams, administrators, reviewers, analysts, and system operators to manage legal knowledge, cases, official sources, evidence, AI analysis, reviews, authentication, audit history, and platform operations.

PRODUCT NAME

LEGINT Core

Optional product descriptor:

Legal Intelligence Core

The product identity should communicate:

Legal authority

Trust

Precision

Intelligence

Security

Professionalism

Enterprise-grade operations

1. DESIGN DIRECTION

Create a premium enterprise dashboard with a visual quality comparable to high-end legal-tech, fintech, cybersecurity, and intelligence platforms.

Do NOT create:

a playful startup dashboard

excessive gradients

colorful SaaS cards

cartoon illustrations

oversized rounded components

excessive glassmorphism

visually noisy pages

The UI should be:

Clean

Minimal

Dense but readable

Serious

Precise

Elegant

Modern

Professional

Data-focused

Highly structured

Use generous whitespace and strong information hierarchy.

The design should be realistic enough to become the actual production UI.

2. MAIN COLOR SYSTEM

The main application background must be:

White / Off-white

Primary color:

Deep Navy Blue

Suggested range:

Primary Navy: #0B1F33

Dark Navy: #071827

Navy Hover: #102A43

Navy Soft Background: #EDF2F7

Secondary / success / trusted-state color:

Professional Legal Green

Suggested range:

Primary Green: #16805C

Dark Green: #106B4C

Light Green Background: #E9F7F1

Neutral colors:

Main Background: #F7F9FB

Surface: #FFFFFF

Borders: #E3E8EF

Main Text: #16202A

Secondary Text: #667085

Muted Text: #98A2B3

Status colors should exist only when semantically necessary:

Success: Green

Warning: Amber

Error: Red

Information: Blue

Neutral / Pending: Gray

Avoid random accent colors.

Navy and green must dominate the visual identity.

3. TYPOGRAPHY

The dashboard will primarily support Arabic RTL.

Use Arabic-friendly professional typography.

Preferred feeling:

modern

highly readable

governmental/legal

clean

Arabic interface examples should look natural and not like translated English UI.

Support both:

Arabic RTL

English LTR

Use consistent number alignment and readable tables.

4. COMPONENT DESIGN SYSTEM

Design the UI so it can later be implemented using Mantine UI.

Use component patterns compatible with:

AppShell

NavLink

Card

Paper

Table

DataTable-style layouts

Badge

Tabs

Drawer

Modal

Menu

Select

MultiSelect

DatePicker

TextInput

Textarea

FileInput

Dropzone

SegmentedControl

Accordion

Timeline

Stepper

Notification

Alert

Tooltip

Pagination

Skeleton

Progress

RingProgress

Code

ScrollArea

ActionIcon

Maintain a coherent reusable component system across every screen.

Use approximately:

8–12px card radius

subtle borders

restrained shadows

compact enterprise spacing

clear hover/focus states

Avoid excessively rounded "bubble UI."

5. GLOBAL APP SHELL

Create a professional full-screen application shell.

Left / Right Sidebar

Because Arabic is the default interface, place the primary navigation sidebar on the right side in RTL mode.

Desktop sidebar width around 260–280px.

Include:

LEGINT Core logo

Workspace selector

Search

Navigation groups

Bottom area:

System status

Documentation

Settings

User profile

Allow sidebar collapse into icon-only mode.

6. MAIN NAVIGATION

Organize the dashboard into logical enterprise modules.

Navigation should include:

الرئيسية

Overview

القضايا

Cases

المستندات

Documents

الوقائع

Facts

المصادر القانونية

Legal Sources

غرفة المعرفة

Knowledge Room

التحليل القانوني

Legal Analysis

المراجعات والتصحيحات

Reviews & Corrections

Replay & Comparison

إعادة التحليل والمقارنة

API Sandbox

مختبر API

المستخدمون والصلاحيات

Identity & Access

Workspaces

مساحات العمل

العمليات

Operations

Audit Logs

سجل التدقيق

النظام

System

الإعدادات

Settings

Use section labels and separators rather than showing one enormous flat navigation menu.

7. MAIN DASHBOARD / OVERVIEW

Create an executive operations dashboard.

Header:

لوحة المراقبة

Subtitle:

"نظرة شاملة على حالة LEGINT Core والعمليات القانونية"

Top actions:

إنشاء قضية

رفع مستند

إضافة مصدر رسمي

تشغيل تحليل

Open API Sandbox

Include KPI cards such as:

القضايا النشطة

24

with:

+4 هذا الأسبوع

المستندات القانونية

1,248

المصادر الرسمية

68

التحليلات

342

مراجعات معلقة

7

نجاح عمليات المعالجة

98.7%

Use elegant icons and subtle visual indicators.

8. SYSTEM HEALTH SECTION

Add a production operations area showing:

API

Database

Worker

Authentication

Knowledge Engine

Source Acquisition

Analysis Engine

Queue

Example states:

● Operational

● Degraded

● Waiting Authorization

Use compact status cards.

Also include:

response time

active jobs

queue size

error rate

last successful processing job

9. RECENT ACTIVITY

Create a professional activity timeline.

Examples:

"تمت إضافة نسخة جديدة من نظام الأحوال الشخصية"

"اكتمل التحليل للقضية #CASE-2026-0142"

"تمت مراجعة 3 وقائع"

"تم رفع مستند جديد"

"تم إنشاء Workspace"

Show:

actor

action

resource

timestamp

status

10. CASE MANAGEMENT

Create a complete Cases module.

Cases listing table fields:

Case ID

اسم القضية

نوع القضية

المحكمة

العميل

الحالة

عدد المستندات

آخر تحليل

المراجع

تاريخ التحديث

Filtering:

Status

Case type

Court

Date

Assigned reviewer

Analysis state

Search bar.

Views:

Table

Compact

Saved views

Actions:

Create Case

Open

Archive

Assign

Run Analysis

11. CASE WORKBENCH

This should be one of the most important screens.

Create a detailed Case Workbench.

Top:

Case number

Case title

Status

Assigned users

Last update

Actions.

Tabs:

نظرة عامة

المستندات

الوقائع

الأدلة

التحليل

المراجعات

الأسانيد

Replay

Audit

12. CASE OVERVIEW

Show:

Case metadata

parties

court information

timeline

case description

relevant laws

analysis status

linked legal sources

recent operations

Add a right-side contextual panel for:

Case Intelligence

containing:

Facts extracted

Evidence linked

Legal sources

Analysis runs

Warnings

13. DOCUMENT MANAGEMENT

Create a complete documents page.

Document cards/table should show:

file name

case

document type

revision

upload source

pages

extraction status

OCR status

SHA-256 verification

uploaded by

timestamp

Statuses:

Ready

Processing

Extraction Failed

Reviewed

Archived

Actions:

Preview

Download

Reprocess

Compare revisions

View extracted text

14. DOCUMENT VIEWER

Design a split-screen legal document viewer.

Left:

PDF page viewer.

Right:

Extracted structured text.

Features:

page navigation

search

zoom

source spans

highlighting

citations

linked facts

linked evidence

Clicking a source span should highlight the corresponding document location.

15. FACTS MODULE

Create a structured legal facts interface.

Each Fact should contain:

Fact ID

statement

state

confidence

evidence

source

reviewer

revision

created date

Fact states:

Confirmed

Unknown

Disputed

Rejected

Needs Review

Use semantic badges.

Allow:

Add Fact

Edit

Link evidence

Dispute

Confirm

Review history

16. OFFICIAL LEGAL SOURCES

Create an advanced Official Sources Management module.

This is a critical LEGINT Core feature.

Sources table:

المصدر

نوع المصدر

jurisdiction

URL

latest revision

acquisition method

authorization state

extraction status

knowledge status

last checked

actions

Examples of source categories:

Laws

Regulations

Royal Decrees

Ministry Decisions

Official Gazettes

Court publications

Actions:

Add source

Manual upload

Acquire source

Validate

Parse

Publish revision

View revision history

17. SOURCE DETAIL PAGE

Header:

Source title.

Example:

نظام الأحوال الشخصية

Information:

official URL

jurisdiction

authority

document type

effective date

publication date

acquisition policy

authorization status

Tabs:

Overview

Revisions

Acquisition

Extracted Text

Source Spans

Knowledge

Audit

18. SOURCE ACQUISITION

Create a Source Acquisition Control Center.

Show acquisition pipeline:

Request

Authorization

Fetch

Validate

Persist

Extract

Index

Review

For each acquisition attempt show:

request ID

source

URL

acquisition type

state

response code

redirect count

robots policy

SHA-256

start time

completion time

Support:

Automatic acquisition

Manual official intake

PDF upload

HTML extraction

Show authorization states clearly.

Examples:

Authorized

Authorization Required

Expired

Blocked

19. MANUAL OFFICIAL SOURCE INTAKE

Create a dedicated wizard.

Step 1:

Choose legal source.

Step 2:

Upload official PDF.

Large professional dropzone.

Step 3:

Validate file.

Show:

media type

file size

SHA-256

duplicate status

source match

Step 4:

Extract.

Show extraction progress.

Step 5:

Review extracted content.

Step 6:

Create source revision.

Final state:

DRAFT

until reviewed/published.

20. KNOWLEDGE ROOM

Create a legal knowledge management interface.

Page title:

غرفة المعرفة

Show:

knowledge sources

revisions

status

permissions

indexing state

chunk count

citations

activation state

Include global knowledge search.

Search result cards should show:

source title

legal article

matched passage

source revision

jurisdiction

confidence

exact citation

Filters:

source

legal domain

jurisdiction

publication date

revision

21. LEGAL ANALYSIS

Create an advanced analysis dashboard.

Run new analysis button.

Input selectors:

Workspace

Case

Case Revision

Analysis Package

Knowledge Revision

Show analysis pipeline:

Case Revision
→ Facts
→ Evidence
→ Knowledge
→ Legal Analysis
→ Citations
→ Conclusion

Analysis run cards should show:

Run ID

case

revision

status

model/provider

duration

citation count

facts used

started by

created date

Statuses:

Queued

Processing

Completed

Failed

Requires Review

22. ANALYSIS RESULT VIEWER

Design a premium legal analysis reader.

Sections:

الملخص

الوقائع المعتمدة

المسائل القانونية

التحليل

الأسانيد القانونية

النتائج

التحفظات

Each legal statement should support citation indicators.

Clicking citations opens a side panel showing:

source

source revision

article

exact text span

evidence information

23. REVIEWS & CORRECTIONS

Create a review queue.

Columns:

Review ID

Case

Item type

Requested by

Reason

Priority

Reviewer

Status

Created date

Types:

Fact Review

Document Review

Analysis Correction

Evidence Correction

Statuses:

Pending

In Review

Accepted

Rejected

Corrected

Create an item review screen with:

Left:

Original content.

Center:

Evidence / legal sources.

Right:

Review decision panel.

Actions:

Accept

Correct

Reject

Request more information

Require a review reason.

24. REPLAY & COMPARISON

Create a specialized legal analysis Replay interface.

Allow selecting:

Original Analysis Run

vs

Replay Analysis Run

Comparison layout should show:

original conclusion

replay conclusion

changed facts

changed evidence

changed sources

changed analysis

changed citations

Highlight differences professionally.

Create sections:

Causes

Conclusion Changes

Citation Changes

Facts Changes

Knowledge Revision Changes

Original result must appear immutable.

25. API SANDBOX

Create a highly polished developer API Sandbox inside the dashboard.

Title:

API Sandbox

Purpose:

Allow administrators to simulate how LEGINT Core clients use the API.

Layout:

Left:

API request builder.

Fields:

Endpoint

HTTP method

Workspace

Case

Authentication

Parameters

Large JSON / text editor.

File upload area.

Request headers panel.

Button:

تشغيل الطلب

Right:

Live response viewer.

Tabs:

Response

JSON

Headers

Logs

Execution Details

Show:

HTTP code

latency

request ID

timestamp.

Include example API calls for:

create case

upload document

extract facts

run analysis

query knowledge

26. IDENTITY & ACCESS

Create a full enterprise Identity & Access page.

Tabs:

Users

Roles

Workspace Access

Sessions

Authentication

Security

Users table:

user

email

workspace

role

MFA

passkey

status

last login

Actions:

Add user

Suspend

Change role

Revoke sessions

Require MFA

27. AUTHENTICATION SETTINGS

Show supported authentication methods:

Password

Enabled

TOTP

Enabled

Passkeys

Enabled

OIDC

Configuration status

Add identity provider configuration cards.

Fields such as:

issuer

client ID

redirect URI

PKCE

session duration

Do NOT display actual secrets.

28. WORKSPACES

Create Workspace management.

Cards/table:

workspace name

ID

owner

users

cases

sources

knowledge access

status

Workspace detail screen:

Overview

Members

Roles

Cases

Sources

Knowledge

API Access

Audit

29. PERMISSIONS

Build a professional permission matrix.

Rows:

Capabilities.

Columns:

Roles.

Examples:

View cases

Create cases

Upload documents

Review facts

Run analysis

Manage legal sources

Publish revisions

Manage users

View audit log

System administration

Use check states carefully and clearly.

30. OPERATIONS CENTER

Create a production operations dashboard.

Show:

Worker jobs

Queues

Scheduled jobs

Processing tasks

Failed operations

Retries

Queue cards:

Acquisition Queue

Document Processing

Analysis

Replay

Knowledge Indexing

For each:

queued

running

success

failed

average execution time

31. JOB INSPECTOR

Create detailed job page.

Show:

Job ID

Type

State

Worker

Attempts

Created

Started

Finished

Timeline:

Queued
→ Claimed
→ Processing
→ Completed

Logs area.

Input metadata.

Output summary.

Retry button for authorized operators.

32. AUDIT LOG

Design an enterprise immutable audit log.

Columns:

timestamp

actor

action

resource type

resource ID

workspace

result

IP / session

trace ID

Filters:

user

action

resource

workspace

date

result

Audit detail drawer showing structured event JSON.

Make the interface visually communicate immutability and traceability.

33. SYSTEM PAGE

Create a system administration page.

Sections:

Platform

API

Database

Workers

Storage

Authentication

Knowledge

AI Providers

Feature Flags

Integrations

Each card shows:

Status

Version

Configuration state

Last health check

34. AI / MODEL CONFIGURATION

Create provider management without exposing secrets.

Show:

provider

model

purpose

status

rate limits

environment

last request

failure rate

Purposes could include:

extraction

legal analysis

review

classification

Allow admins to select default models using controlled settings.

35. SYSTEM SETTINGS

Create structured settings sections.

General

Platform name

Locale

Arabic / English

Timezone

Legal

Default jurisdiction

Citation formatting

Revision policy

Documents

File size limits

allowed media types

OCR

Sources

acquisition policies

authorization rules

refresh schedule

Analysis

analysis packages

replay rules

review requirements

Security

session policies

MFA

audit retention

36. GLOBAL SEARCH

Add a powerful command/search interface.

Keyboard shortcut:

⌘ K / Ctrl K

Search across:

Cases

Documents

Facts

Legal Sources

Knowledge

Analysis Runs

Users

Workspaces

Use grouped search results.

37. NOTIFICATION CENTER

Top navbar notification icon.

Notification drawer examples:

Analysis completed

Review required

Acquisition failed

Source revision ready

Worker error

Authorization expiring

Allow:

mark read

navigate to resource

38. USER PROFILE MENU

Include:

profile

current workspace

language

theme

security

sessions

logout

39. RESPONSIVE DESIGN

Prioritize desktop because this is an operations dashboard.

Desktop target:

1440px+

Also produce sensible:

laptop

tablet

layouts.

Mobile only needs basic responsive support; do not compromise desktop information density.

40. TABLE DESIGN

Tables are a major part of this system.

Create excellent enterprise data tables with:

sticky headers

sorting

filters

search

pagination

row actions

selectable rows

density controls

empty states

loading states

saved filters where appropriate

Do not overload every table with unnecessary buttons.

Use contextual row menus.

41. EMPTY STATES

Create useful professional empty states.

Examples:

"No cases have been created yet."

"No official legal sources have been added."

"No analyses have been run for this case."

Provide one contextual CTA.

Do not use cartoon illustrations.

42. ERROR STATES

Create realistic operational states:

Permission denied

Source unavailable

Authentication expired

Acquisition blocked

Document processing failed

Analysis failed

No workspace access

Explain the issue and provide an appropriate next action.

43. LOADING STATES

Use:

Skeleton rows

Skeleton cards

Progress indicators

Avoid excessive full-screen spinners.

44. SECURITY UX

Legal information can be sensitive.

Visually distinguish:

destructive actions

security actions

publishing

role changes

source activation

session revocation

Require confirmation dialogs for dangerous operations.

45. VISUAL DETAILS

Use:

thin borders

subtle shadows

navy typography

white surfaces

green for trusted/success states

compact badges

restrained radius

professional line icons

Charts should look sophisticated and minimal.

Suggested charts:

case activity

analysis volume

acquisition success

document processing

review workload

Do NOT create decorative charts without operational meaning.

46. DASHBOARD HEADER

Example Arabic header:

مساء الخير

لوحة المراقبة

"تابع القضايا، المصادر القانونية، التحليلات، وعمليات النظام من مكان واحد."

Right/left depending on RTL:

Search

Notifications

Workspace selector

User menu

47. SAMPLE HOME PAGE CONTENT

Hero heading:

نظرة عامة على النظام

Supporting text:

"مراقبة القضايا والمصادر والتحليلات والعمليات القانونية في LEGINT Core."

Statistics:

24
القضايا النشطة

1,248
المستندات

68
المصادر القانونية

342
التحليلات

7
مراجعات معلقة

98.7%
نجاح المعالجة

Below:

نشاط القضايا

Chart.

حالة النظام

API — يعمل

Database — يعمل

Worker — يعمل

Authentication — يعمل

Knowledge Engine — يعمل

Official Acquisition — يتطلب تصريحًا

Then:

آخر العمليات

Activity table.

Then:

المهام التي تحتاج إلى انتباه

Examples:

3 مراجعات قانونية معلقة

1 مصدر يحتاج إلى تصريح

2 عمليات معالجة فشلت

1 نسخة مصدر جاهزة للمراجعة

48. UX PRINCIPLE

Every screen should answer three questions immediately:

Where am I?

What is the current state?

What action can I perform next?

Do not hide critical operational information behind decorative UI.

49. INFORMATION ARCHITECTURE

Think of LEGINT Core as containing these connected domains:

Identity
→ Workspace
→ Cases
→ Documents
→ Facts
→ Evidence
→ Legal Sources
→ Knowledge
→ Analysis
→ Review
→ Replay
→ Audit

The UI should visually reinforce this relationship.

50. DESIGN CONSISTENCY

Create reusable design primitives for:

PageHeader

StatCard

StatusBadge

DataTable

FilterBar

DetailDrawer

Timeline

MetadataList

EmptyState

ErrorState

AuditEvent

SourceCitation

RevisionBadge

PermissionBadge

JobStatus

AnalysisStatus

Do not redesign the component style between pages.

51. RTL QUALITY

RTL support is extremely important.

Arabic should be the initial interface language.

Make sure:

sidebar position is correct

breadcrumb direction is correct

icons align correctly

tables remain readable

pagination works naturally

form layouts work naturally

mixed Arabic/English identifiers are visually stable

IDs such as:

CASE-2026-0142

RUN-92F7

SRC-001

should remain LTR even inside Arabic screens.

52. FINAL VISUAL STYLE

Imagine a combination of:

Enterprise legal software

Intelligence operations platform

Secure administrative system

Modern financial dashboard

But create an original LEGINT Core identity.

The final impression should be:

Authoritative, intelligent, calm, secure, precise and premium.

The interface should look credible for lawyers, legal departments, enterprise clients, government organizations, and administrators.

53. FIRST DESIGN OUTPUT

Start by building these screens with full visual fidelity:

Main Dashboard

Cases List

Case Workbench

Documents

Facts

Official Legal Sources

Source Detail

Source Acquisition

Knowledge Room

Legal Analysis

Analysis Result

Reviews

Replay Comparison

API Sandbox

Users & Access

Workspace Management

Operations Center

Audit Log

System Settings

Create realistic navigation between all screens.

Use realistic legal-tech sample data instead of lorem ipsum.

Keep all screens consistent with the same LEGINT Core design system.

54. IMPORTANT IMPLEMENTATION RULE

Do not treat this as a static Dribbble concept.

Build it as a coherent, realistic, reusable admin product interface.

Prioritize:

Information architecture

Usability

Legal data readability

Operational visibility

Security

Accessibility

Visual consistency

Premium appearance

The visual hierarchy should rely primarily on typography, spacing, borders, and information structure — not decorative effects.

The primary brand palette is:

Deep Navy + Professional Green + White.

Make LEGINT Core feel like a serious legal intelligence platform ready for production.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://legal-intel-nucleus.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/9ddf7704-17f7-4c18-99bb-70643c36edcb).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
