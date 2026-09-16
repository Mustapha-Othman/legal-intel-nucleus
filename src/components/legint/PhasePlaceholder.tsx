import { Badge, Box, Group, List, Paper, SimpleGrid, Stack, Text } from "@mantine/core";
import { CircleDashed } from "lucide-react";
import { PageHeader } from "@/components/legint/PageHeader";
import { Mono } from "@/components/legint/primitives";

export function PhasePlaceholder({
  title,
  titleEn,
  description,
  crumb,
  phase,
  capabilities,
  primitives,
}: {
  title: string;
  titleEn: string;
  description: string;
  crumb: string;
  phase: string;
  capabilities: string[];
  primitives: string[];
}) {
  return (
    <Box>
      <PageHeader
        crumbs={[{ label: "لوحة المراقبة", to: "/" }, { label: crumb }]}
        eyebrow={titleEn}
        title={title}
        description={description}
        actions={
          <Badge variant="light" color="navy" size="lg">
            {phase}
          </Badge>
        }
      />

      <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="md">
        <Paper p="lg">
          <Group gap="xs" mb="sm">
            <CircleDashed size={17} color="#3F5B7E" />
            <Text fw={650} c="#0B1F33">
              نطاق هذه الشاشة
            </Text>
          </Group>
          <List spacing={8} size="sm" c="#16202A" listStyleType="none">
            {capabilities.map((c) => (
              <List.Item key={c}>
                <Group gap={8} wrap="nowrap" align="flex-start">
                  <Box
                    mt={7}
                    style={{ width: 5, height: 5, borderRadius: 999, background: "#16805C", flexShrink: 0 }}
                  />
                  <Text size="sm" c="#16202A">
                    {c}
                  </Text>
                </Group>
              </List.Item>
            ))}
          </List>
        </Paper>

        <Paper p="lg">
          <Text fw={650} c="#0B1F33" mb="sm">
            العناصر المشتركة المستخدمة
          </Text>
          <Group gap={8} wrap="wrap">
            {primitives.map((p) => (
              <Badge key={p} variant="default" size="sm">
                <Mono size={11} c="#3F5B7E">
                  {p}
                </Mono>
              </Badge>
            ))}
          </Group>
          <Stack gap={4} mt="lg">
            <Text fz={12} c="#667085">
              تستخدم هذه الشاشة نفس نظام التصميم المعتمد في LEGINT Core: الأزرق الداكن والأخضر القانوني،
              حدود رقيقة، جداول مكثفة قابلة للقراءة، وحالات فراغ وخطأ وتحميل موحّدة.
            </Text>
            <Text fz={12} c="#98A2B3">
              سيتم بناؤها بالتفصيل الكامل في المرحلة التالية من التنفيذ.
            </Text>
          </Stack>
        </Paper>
      </SimpleGrid>
    </Box>
  );
}
