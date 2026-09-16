import { Anchor, Box, Group, Stack, Text, Title } from "@mantine/core";
import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";

export type Crumb = { label: string; to?: string };

export function PageHeader({
  title,
  description,
  eyebrow,
  crumbs,
  actions,
  meta,
}: {
  title: string;
  description?: string;
  eyebrow?: string;
  crumbs?: Crumb[];
  actions?: ReactNode;
  meta?: ReactNode;
}) {
  return (
    <Stack gap="sm" mb="lg">
      {crumbs && crumbs.length > 0 && (
        <Group gap={6} wrap="wrap">
          {crumbs.map((c, i) => (
            <Group gap={6} key={`${c.label}-${i}`} wrap="nowrap">
              {i > 0 && (
                <Box c="#98A2B3" style={{ display: "flex" }}>
                  <ChevronLeft size={13} className="legint-crumb-chevron" />
                </Box>
              )}
              {c.to ? (
                <Anchor component={Link} to={c.to} size="xs" c="#667085" fw={500} underline="never">
                  {c.label}
                </Anchor>
              ) : (
                <Text size="xs" c="#0B1F33" fw={600}>
                  {c.label}
                </Text>
              )}
            </Group>
          ))}
        </Group>
      )}
      <Group justify="space-between" align="flex-end" wrap="wrap" gap="md">
        <Stack gap={4} style={{ minWidth: 0 }}>
          {eyebrow && (
            <Text size="xs" c="#98A2B3" fw={600} tt="uppercase" style={{ letterSpacing: "0.06em" }}>
              {eyebrow}
            </Text>
          )}
          <Title order={1} c="#0B1F33">
            {title}
          </Title>
          {description && (
            <Text size="sm" c="#667085" maw={760}>
              {description}
            </Text>
          )}
          {meta}
        </Stack>
        {actions && (
          <Group gap="xs" wrap="wrap">
            {actions}
          </Group>
        )}
      </Group>
    </Stack>
  );
}
