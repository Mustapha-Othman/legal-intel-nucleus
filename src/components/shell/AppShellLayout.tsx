import {
  ActionIcon,
  AppShell,
  Avatar,
  Badge,
  Box,
  Burger,
  Divider,
  Drawer,
  Group,
  Indicator,
  Menu,
  NavLink,
  ScrollArea,
  Select,
  Stack,
  Text,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure, useHotkeys } from "@mantine/hooks";
import { Spotlight, spotlight } from "@mantine/spotlight";
import { Link, useLocation, useRouter } from "@tanstack/react-router";
import {
  Bell,
  BookOpenCheck,
  Briefcase,
  ChevronsLeftRight,
  CircleUserRound,
  FileText,
  Landmark,
  LifeBuoy,
  LogOut,
  Languages,
  PanelsTopLeft,
  Scale,
  Search,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";
import type { ReactNode } from "react";
import { navGroups, workspaces } from "@/data/navigation";
import { notifications as notificationItems } from "@/data/legint";
import { StatusBadge, Mono } from "@/components/legint/primitives";
import { useLang } from "@/lib/lang";

const SIDEBAR = 272;
const SIDEBAR_COLLAPSED = 76;

function BrandMark({ collapsed }: { collapsed: boolean }) {
  return (
    <Group gap="sm" wrap="nowrap" px={collapsed ? 0 : "xs"} justify={collapsed ? "center" : undefined}>
      <Box
        style={{
          width: 34,
          height: 34,
          borderRadius: 9,
          background: "#0B1F33",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Scale size={18} strokeWidth={1.9} />
      </Box>
      {!collapsed && (
        <Stack gap={0} style={{ minWidth: 0 }}>
          <Text fw={700} fz={15} c="#0B1F33" style={{ letterSpacing: "-0.01em" }}>
            LEGINT Core
          </Text>
          <Text fz={10.5} c="#98A2B3" fw={600}>
            Legal Intelligence Core
          </Text>
        </Stack>
      )}
    </Group>
  );
}

export function AppShellLayout({ children }: { children: ReactNode }) {
  const [collapsed, { toggle: toggleCollapse }] = useDisclosure(false);
  const [mobileOpen, { toggle: toggleMobile, close: closeMobile }] = useDisclosure(false);
  const [notifOpen, { open: openNotif, close: closeNotif }] = useDisclosure(false);
  const { pathname } = useLocation();
  const router = useRouter();
  const { lang, setLang, t } = useLang();

  useHotkeys([["mod+K", () => spotlight.open()]]);

  const unread = notificationItems.filter((n) => !n.read).length;
  const navWidth = collapsed ? SIDEBAR_COLLAPSED : SIDEBAR;

  const spotlightActions = [
    {
      group: "القضايا",
      actions: [
        { id: "c1", label: "CASE-2026-0142 — نزاع تنفيذ عقد توريد", to: "/cases/CASE-2026-0142" },
        { id: "c2", label: "CASE-2026-0141 — طلب فسخ عقد إيجار تجاري", to: "/cases/CASE-2026-0141" },
        { id: "c3", label: "CASE-2026-0138 — مطالبة تعويض عمالي", to: "/cases/CASE-2026-0138" },
      ],
      icon: <Briefcase size={16} strokeWidth={1.8} />,
    },
    {
      group: "المستندات",
      actions: [
        { id: "d1", label: "DOC-4471 — لائحة اعتراضية.pdf", to: "/documents/DOC-4471" },
        { id: "d2", label: "DOC-4468 — عقد التوريد الأصلي.pdf", to: "/documents/DOC-4468" },
      ],
      icon: <FileText size={16} strokeWidth={1.8} />,
    },
    {
      group: "المصادر القانونية",
      actions: [
        { id: "s1", label: "SRC-001 — نظام المعاملات المدنية", to: "/sources" },
        { id: "s2", label: "SRC-014 — نظام المحاكم التجارية", to: "/sources" },
      ],
      icon: <Landmark size={16} strokeWidth={1.8} />,
    },
    {
      group: "المعرفة والتحليل",
      actions: [
        { id: "k1", label: "غرفة المعرفة", to: "/knowledge" },
        { id: "a1", label: "التحليل القانوني", to: "/analysis" },
        { id: "r1", label: "المراجعات والتصحيحات", to: "/reviews" },
      ],
      icon: <BookOpenCheck size={16} strokeWidth={1.8} />,
    },
    {
      group: "الإدارة",
      actions: [
        { id: "u1", label: "المستخدمون والصلاحيات", to: "/access" },
        { id: "w1", label: "مساحات العمل", to: "/workspaces" },
        { id: "au1", label: "سجل التدقيق", to: "/audit" },
      ],
      icon: <Users size={16} strokeWidth={1.8} />,
    },
  ];

  return (
    <AppShell
      layout="alt"
      header={{ height: 60 }}
      navbar={{ width: navWidth, breakpoint: "md", collapsed: { mobile: !mobileOpen } }}
      padding={0}
      styles={{
        main: { background: "#F7F9FB" },
        header: { borderColor: "#E3E8EF", background: "#FFFFFF" },
        navbar: { borderColor: "#E3E8EF", background: "#FFFFFF" },
      }}
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between" wrap="nowrap" gap="sm">
          <Group gap="sm" wrap="nowrap" style={{ flex: 1, minWidth: 0 }}>
            <Burger opened={mobileOpen} onClick={toggleMobile} hiddenFrom="md" size="sm" />
            <UnstyledButton
              onClick={() => spotlight.open()}
              style={{
                border: "1px solid #E3E8EF",
                background: "#F7F9FB",
                borderRadius: 8,
                padding: "7px 10px",
                display: "flex",
                alignItems: "center",
                gap: 8,
                width: 360,
                maxWidth: "100%",
              }}
            >
              <Search size={15} strokeWidth={1.8} color="#98A2B3" />
              <Text size="sm" c="#98A2B3" style={{ flex: 1 }}>
                بحث شامل في القضايا، المستندات، المصادر…
              </Text>
              <Badge variant="default" size="sm">
                <Mono size={10.5} c="#667085">
                  ⌘K
                </Mono>
              </Badge>
            </UnstyledButton>
          </Group>

          <Group gap="xs" wrap="nowrap">
            <Select
              data={workspaces}
              defaultValue={workspaces[0]?.value}
              size="sm"
              w={230}
              visibleFrom="lg"
              allowDeselect={false}
              leftSection={<PanelsTopLeft size={15} strokeWidth={1.8} />}
              aria-label="مساحة العمل"
            />
            <Tooltip label={lang === "ar" ? "English interface" : "الواجهة العربية"} withArrow>
              <ActionIcon
                variant="default"
                size="lg"
                onClick={() => setLang(lang === "ar" ? "en" : "ar")}
                aria-label="تبديل اللغة"
              >
                <Languages size={17} strokeWidth={1.8} />
              </ActionIcon>
            </Tooltip>
            <Indicator disabled={unread === 0} color="red" size={7} offset={6}>
              <ActionIcon variant="default" size="lg" onClick={openNotif} aria-label="الإشعارات">
                <Bell size={17} strokeWidth={1.8} />
              </ActionIcon>
            </Indicator>
            <Menu position="bottom-end" width={240} shadow="md" withinPortal>
              <Menu.Target>
                <UnstyledButton>
                  <Group gap={8} wrap="nowrap">
                    <Avatar color="navy" radius="sm" size={32}>
                      ن ح
                    </Avatar>
                    <Stack gap={0} visibleFrom="sm">
                      <Text size="sm" fw={600} c="#16202A">
                        نورة الحربي
                      </Text>
                      <Text fz={10.5} c="#98A2B3">
                        مسؤول قانوني
                      </Text>
                    </Stack>
                  </Group>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>الحساب</Menu.Label>
                <Menu.Item leftSection={<CircleUserRound size={15} />}>الملف الشخصي</Menu.Item>
                <Menu.Item leftSection={<PanelsTopLeft size={15} />}>
                  مساحة العمل الحالية
                </Menu.Item>
                <Menu.Item
                  leftSection={<Languages size={15} />}
                  onClick={() => setLang(lang === "ar" ? "en" : "ar")}
                >
                  {lang === "ar" ? "English" : "العربية"}
                </Menu.Item>
                <Menu.Divider />
                <Menu.Label>الأمان</Menu.Label>
                <Menu.Item leftSection={<ShieldCheck size={15} />}>المصادقة والجلسات</Menu.Item>
                <Menu.Divider />
                <Menu.Item color="red" leftSection={<LogOut size={15} />}>
                  تسجيل الخروج
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p={0}>
        <Group
          h={60}
          px="sm"
          justify="space-between"
          wrap="nowrap"
          style={{ borderBottom: "1px solid #E3E8EF" }}
        >
          <BrandMark collapsed={collapsed} />
          <Tooltip label={collapsed ? "توسيع القائمة" : "تصغير القائمة"} withArrow>
            <ActionIcon
              variant="subtle"
              color="gray"
              onClick={toggleCollapse}
              visibleFrom="md"
              aria-label="تصغير القائمة"
            >
              <ChevronsLeftRight size={16} />
            </ActionIcon>
          </Tooltip>
        </Group>

        <AppShell.Section grow component={ScrollArea} type="scroll">
          <Stack gap={2} p="sm">
            {navGroups.map((group, gi) => (
              <Box key={group.label.en} mt={gi === 0 ? 0 : 10}>
                {!collapsed ? (
                  <Text
                    fz={10.5}
                    fw={700}
                    c="#98A2B3"
                    px="sm"
                    mb={6}
                    tt="uppercase"
                    style={{ letterSpacing: "0.07em" }}
                  >
                    {t(group.label)}
                  </Text>
                ) : (
                  <Divider my={8} color="#E3E8EF" />
                )}
                {group.items.map((item) => {
                  const active =
                    item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
                  const Icon = item.icon;
                  const node = (
                    <NavLink
                      key={item.to}
                      component={Link}
                      to={item.to}
                      onClick={closeMobile}
                      active={active}
                      label={collapsed ? undefined : t(item.label)}
                      leftSection={<Icon size={17} strokeWidth={1.8} />}
                      rightSection={
                        !collapsed && item.badge ? (
                          <Badge size="sm" variant="light" color={active ? "navy" : "gray"}>
                            <Mono size={10.5} c={active ? "#0B1F33" : "#667085"}>
                              {item.badge}
                            </Mono>
                          </Badge>
                        ) : undefined
                      }
                      styles={{
                        root: {
                          borderRadius: 8,
                          padding: collapsed ? "9px 0" : "8px 10px",
                          justifyContent: collapsed ? "center" : undefined,
                          background: active ? "#EDF2F7" : undefined,
                        },
                        label: { fontSize: 13.5, fontWeight: active ? 650 : 500 },
                        section: { marginInlineEnd: collapsed ? 0 : 10, color: active ? "#0B1F33" : "#667085" },
                      }}
                    />
                  );
                  return collapsed ? (
                    <Tooltip key={item.to} label={t(item.label)} position="left" withArrow>
                      <Box>{node}</Box>
                    </Tooltip>
                  ) : (
                    node
                  );
                })}
              </Box>
            ))}
          </Stack>
        </AppShell.Section>

        <AppShell.Section p="sm" style={{ borderTop: "1px solid #E3E8EF" }}>
          <Stack gap={8}>
            {!collapsed && (
              <Box
                p="xs"
                style={{ background: "#F7F9FB", border: "1px solid #E3E8EF", borderRadius: 8 }}
              >
                <Group justify="space-between" mb={6}>
                  <Text fz={11} fw={700} c="#3F5B7E">
                    حالة النظام
                  </Text>
                  <StatusBadge tone="warning" label="تدهور جزئي" />
                </Group>
                <Text fz={11} c="#667085">
                  محرك التحليل أبطأ من المعتاد · مصدر واحد يتطلب تصريحًا
                </Text>
              </Box>
            )}
            <Group gap={6} justify={collapsed ? "center" : "flex-start"} wrap="nowrap">
              <Tooltip label="الوثائق" withArrow>
                <ActionIcon variant="subtle" color="gray" aria-label="الوثائق">
                  <LifeBuoy size={16} />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="الإعدادات" withArrow>
                <ActionIcon
                  variant="subtle"
                  color="gray"
                  component={Link}
                  to="/settings"
                  aria-label="الإعدادات"
                >
                  <Settings size={16} />
                </ActionIcon>
              </Tooltip>
              {!collapsed && (
                <Text fz={10.5} c="#98A2B3" ms="auto">
                  <Mono size={10.5} c="#98A2B3">
                    v3.4.1
                  </Mono>
                </Text>
              )}
            </Group>
          </Stack>
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>
        <Box px={{ base: "md", md: "xl" }} py="lg" maw={1680} mx="auto">
          {children}
        </Box>
      </AppShell.Main>

      <Drawer
        opened={notifOpen}
        onClose={closeNotif}
        position="right"
        size={420}
        title={
          <Group gap="xs">
            <Text fw={650} c="#0B1F33">
              مركز الإشعارات
            </Text>
            <Badge size="sm" variant="light" color="red">
              {unread} جديد
            </Badge>
          </Group>
        }
      >
        <Stack gap="xs">
          {notificationItems.map((n) => (
            <UnstyledButton
              key={n.id}
              onClick={() => {
                closeNotif();
                router.navigate({ to: n.to });
              }}
              style={{
                border: "1px solid #E3E8EF",
                borderRadius: 8,
                padding: 12,
                background: n.read ? "#FFFFFF" : "#F7F9FB",
              }}
            >
              <Group justify="space-between" align="flex-start" wrap="nowrap" gap="sm">
                <Stack gap={4} style={{ minWidth: 0 }}>
                  <Text size="sm" fw={n.read ? 500 : 650} c="#16202A">
                    {n.title}
                  </Text>
                  <Text fz={11} c="#98A2B3">
                    {n.time}
                  </Text>
                </Stack>
                <StatusBadge
                  tone={n.tone}
                  dot={false}
                  label={n.read ? "مقروء" : "جديد"}
                />
              </Group>
            </UnstyledButton>
          ))}
        </Stack>
      </Drawer>

      <Spotlight
        shortcut={["mod + K"]}
        nothingFound="لا توجد نتائج مطابقة."
        searchProps={{
          leftSection: <Search size={17} strokeWidth={1.8} />,
          placeholder: "ابحث في القضايا، المستندات، الوقائع، المصادر، التحليلات…",
        }}
        actions={spotlightActions.map((group) => ({
          group: group.group,
          actions: group.actions.map((a) => ({
            id: a.id,
            label: a.label,
            leftSection: group.icon,
            onClick: () => router.navigate({ to: a.to }),
          })),
        }))}
      />
    </AppShell>
  );
}
