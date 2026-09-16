import { Badge, Box, Group, Paper, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import type { ReactNode } from "react";
import type { StatusTone } from "@/data/legint";
import type { LucideIcon } from "lucide-react";

export const toneColor: Record<StatusTone, string> = {
  success: "legalGreen",
  warning: "amber",
  error: "red",
  info: "blue",
  neutral: "gray",
  brand: "navy",
};

const toneStyles: Record<StatusTone, { bg: string; fg: string; border: string }> = {
  success: { bg: "#E9F7F1", fg: "#106B4C", border: "#BFE6D6" },
  warning: { bg: "#FEF6E7", fg: "#93610C", border: "#F7DFB0" },
  error: { bg: "#FEF0F0", fg: "#A02020", border: "#F6CFCF" },
  info: { bg: "#EEF4FF", fg: "#1F4B99", border: "#CFDDF7" },
  neutral: { bg: "#F2F4F7", fg: "#667085", border: "#E3E8EF" },
  brand: { bg: "#EDF2F7", fg: "#0B1F33", border: "#D3DEE9" },
};

export function StatusBadge({
  tone,
  label,
  dot = true,
}: {
  tone: StatusTone;
  label: string;
  dot?: boolean;
}) {
  const s = toneStyles[tone];
  return (
    <Box
      component="span"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        background: s.bg,
        color: s.fg,
        border: `1px solid ${s.border}`,
        borderRadius: 6,
        padding: "2px 8px",
        fontSize: 12,
        fontWeight: 600,
        lineHeight: 1.6,
        whiteSpace: "nowrap",
      }}
    >
      {dot && (
        <Box
          component="span"
          style={{ width: 6, height: 6, borderRadius: 999, background: s.fg, flexShrink: 0 }}
        />
      )}
      {label}
    </Box>
  );
}

/** Identifiers, hashes and codes always render left-to-right, even inside Arabic screens. */
export function Mono({
  children,
  size = 12.5,
  c = "#16202A",
  weight = 500,
}: {
  children: ReactNode;
  size?: number;
  c?: string;
  weight?: number;
}) {
  return (
    <Box
      component="span"
      dir="ltr"
      style={{
        fontFamily: "var(--mantine-font-family-monospace)",
        fontSize: size,
        fontWeight: weight,
        color: c,
        unicodeBidi: "isolate",
        letterSpacing: "-0.01em",
        display: "inline-block",
      }}
    >
      {children}
    </Box>
  );
}

export function RevisionBadge({ revision }: { revision: string }) {
  return (
    <Badge variant="default" size="sm" styles={{ label: { fontWeight: 600 } }}>
      <Mono size={11.5} c="#3F5B7E">
        {revision}
      </Mono>
    </Badge>
  );
}

export function StatCard({
  label,
  value,
  delta,
  deltaTone = "neutral",
  icon: Icon,
}: {
  label: string;
  value: string;
  delta?: string;
  deltaTone?: StatusTone;
  icon?: LucideIcon;
}) {
  return (
    <Paper p="md" h="100%">
      <Group justify="space-between" align="flex-start" wrap="nowrap" gap="xs">
        <Stack gap={6} style={{ minWidth: 0 }}>
          <Text size="xs" c="#667085" fw={600}>
            {label}
          </Text>
          <Text fz={26} fw={650} c="#0B1F33" style={{ fontVariantNumeric: "tabular-nums" }}>
            <span dir="ltr">{value}</span>
          </Text>
          {delta && (
            <Text size="xs" c={toneStyles[deltaTone].fg} fw={600}>
              {delta}
            </Text>
          )}
        </Stack>
        {Icon && (
          <ThemeIcon variant="light" color="navy" size={34} radius="sm">
            <Icon size={17} strokeWidth={1.75} />
          </ThemeIcon>
        )}
      </Group>
    </Paper>
  );
}

export function SectionCard({
  title,
  description,
  action,
  children,
  padding = "md",
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  padding?: string;
}) {
  return (
    <Paper h="100%">
      <Group
        justify="space-between"
        align="center"
        px="md"
        py="sm"
        wrap="nowrap"
        style={{ borderBottom: "1px solid #E3E8EF" }}
      >
        <Stack gap={2} style={{ minWidth: 0 }}>
          <Title order={4} c="#0B1F33">
            {title}
          </Title>
          {description && (
            <Text size="xs" c="#667085">
              {description}
            </Text>
          )}
        </Stack>
        {action}
      </Group>
      <Box p={padding}>{children}</Box>
    </Paper>
  );
}

export function MetadataList({
  items,
  columns = 1,
}: {
  items: { label: string; value: ReactNode }[];
  columns?: number;
}) {
  return (
    <Box
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gap: "14px 24px",
      }}
    >
      {items.map((item) => (
        <Stack key={item.label} gap={3} style={{ minWidth: 0 }}>
          <Text size="xs" c="#98A2B3" fw={600}>
            {item.label}
          </Text>
          <Text size="sm" c="#16202A" fw={500} style={{ wordBreak: "break-word" }}>
            {item.value}
          </Text>
        </Stack>
      ))}
    </Box>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <Stack align="center" gap="xs" py={48} px="md">
      <ThemeIcon variant="light" color="gray" size={44} radius="md">
        <Icon size={20} strokeWidth={1.6} />
      </ThemeIcon>
      <Text fw={600} c="#0B1F33" mt={4}>
        {title}
      </Text>
      {description && (
        <Text size="sm" c="#667085" ta="center" maw={420}>
          {description}
        </Text>
      )}
      {action && <Box mt="sm">{action}</Box>}
    </Stack>
  );
}

export function ErrorState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <Stack align="center" gap="xs" py={40} px="md">
      <ThemeIcon variant="light" color="red" size={44} radius="md">
        <Icon size={20} strokeWidth={1.6} />
      </ThemeIcon>
      <Text fw={600} c="#0B1F33" mt={4}>
        {title}
      </Text>
      {description && (
        <Text size="sm" c="#667085" ta="center" maw={440}>
          {description}
        </Text>
      )}
      {action && <Box mt="sm">{action}</Box>}
    </Stack>
  );
}
