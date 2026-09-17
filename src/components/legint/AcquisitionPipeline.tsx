import { Box, Group, Paper, Stack, Text, ThemeIcon, Tooltip } from "@mantine/core";
import { AlertTriangle, Check, Clock, Loader, MinusCircle } from "lucide-react";
import type { PipelineStep, PipelineStepState } from "@/data/sources";
import { pipelineStepLabels } from "@/data/sources";

const visual: Record<
  PipelineStepState,
  { bg: string; fg: string; border: string; icon: typeof Check }
> = {
  completed: { bg: "#E9F7F1", fg: "#106B4C", border: "#BFE6D6", icon: Check },
  processing: { bg: "#EEF4FF", fg: "#1F4B99", border: "#CFDDF7", icon: Loader },
  failed: { bg: "#FEF0F0", fg: "#A02020", border: "#F6CFCF", icon: AlertTriangle },
  waiting: { bg: "#FEF6E7", fg: "#93610C", border: "#F7DFB0", icon: Clock },
  skipped: { bg: "#F2F4F7", fg: "#667085", border: "#E3E8EF", icon: MinusCircle },
};

/** Operational pipeline: Request → Authorization → Fetch → Validate → Persist → Extract → Spans → Review → Revision */
export function AcquisitionPipeline({ steps }: { steps: PipelineStep[] }) {
  return (
    <Box
      style={{
        display: "flex",
        gap: 8,
        overflowX: "auto",
        paddingBottom: 4,
      }}
    >
      {steps.map((s, i) => {
        const v = visual[s.state];
        const Icon = v.icon;
        return (
          <Group key={s.key} gap={8} wrap="nowrap" style={{ flexShrink: 0 }}>
            <Tooltip label={`${s.labelEn} — ${pipelineStepLabels[s.state].label}`} withArrow>
              <Paper
                p="xs"
                radius="sm"
                withBorder
                style={{ borderColor: v.border, background: v.bg, minWidth: 132 }}
                tabIndex={0}
                aria-label={`${s.label} — ${pipelineStepLabels[s.state].label}`}
              >
                <Stack gap={6}>
                  <Group gap={6} wrap="nowrap">
                    <ThemeIcon size={20} radius="sm" variant="white" c={v.fg} style={{ border: `1px solid ${v.border}` }}>
                      <Icon size={12} strokeWidth={2.2} />
                    </ThemeIcon>
                    <Text fz={12.5} fw={650} c={v.fg} style={{ whiteSpace: "nowrap" }}>
                      {s.label}
                    </Text>
                  </Group>
                  <Text fz={10.5} c="#667085" dir="ltr" style={{ whiteSpace: "nowrap" }}>
                    {s.labelEn}
                  </Text>
                  <Text fz={11} fw={600} c={v.fg} style={{ whiteSpace: "nowrap" }}>
                    {pipelineStepLabels[s.state].label}
                    {s.note ? ` · ${s.note}` : ""}
                  </Text>
                </Stack>
              </Paper>
            </Tooltip>
            {i < steps.length - 1 && (
              <Box
                aria-hidden
                style={{ width: 14, height: 1, background: "#E3E8EF", flexShrink: 0 }}
              />
            )}
          </Group>
        );
      })}
    </Box>
  );
}
