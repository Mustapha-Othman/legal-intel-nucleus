import {
  ActionIcon,
  Box,
  Checkbox,
  Group,
  Menu,
  Pagination,
  Paper,
  ScrollArea,
  SegmentedControl,
  Skeleton,
  Table,
  Text,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { ChevronDown, ChevronUp, MoreHorizontal, Search } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";

export type Column<T> = {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  sortValue?: (row: T) => string | number;
  width?: number | string;
  align?: "start" | "end" | "center";
};

export type RowAction<T> = {
  label: string;
  icon?: ReactNode;
  onClick?: (row: T) => void;
  color?: string;
  danger?: boolean;
};

export function DataTable<T extends { id: string }>({
  data,
  columns,
  rowActions,
  searchable = true,
  searchPlaceholder = "بحث…",
  searchFields,
  selectable = false,
  pageSize: initialPageSize = 8,
  toolbar,
  emptyState,
  loading = false,
  onRowClick,
  densityControl = true,
}: {
  data: T[];
  columns: Column<T>[];
  rowActions?: RowAction<T>[];
  searchable?: boolean;
  searchPlaceholder?: string;
  searchFields?: (row: T) => string;
  selectable?: boolean;
  pageSize?: number;
  toolbar?: ReactNode;
  emptyState?: ReactNode;
  loading?: boolean;
  onRowClick?: (row: T) => void;
  densityControl?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [density, setDensity] = useState<"compact" | "comfortable">("comfortable");
  const [sort, setSort] = useState<{ key: string; dir: "asc" | "desc" } | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const pageSize = density === "compact" ? initialPageSize + 4 : initialPageSize;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter((row) =>
      (searchFields ? searchFields(row) : JSON.stringify(row)).toLowerCase().includes(q),
    );
  }, [data, query, searchFields]);

  const sorted = useMemo(() => {
    if (!sort) return filtered;
    const col = columns.find((c) => c.key === sort.key);
    if (!col?.sortValue) return filtered;
    const rows = [...filtered].sort((a, b) => {
      const av = col.sortValue!(a);
      const bv = col.sortValue!(b);
      if (typeof av === "number" && typeof bv === "number") return av - bv;
      return String(av).localeCompare(String(bv), "ar");
    });
    return sort.dir === "asc" ? rows : rows.reverse();
  }, [filtered, sort, columns]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const current = Math.min(page, totalPages);
  const rows = sorted.slice((current - 1) * pageSize, current * pageSize);
  const cellPad = density === "compact" ? "6px 12px" : "11px 12px";

  const toggleSort = (key: string) => {
    setSort((prev) =>
      prev?.key === key ? { key, dir: prev.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" },
    );
  };

  return (
    <Paper>
      <Group
        justify="space-between"
        align="center"
        px="md"
        py="sm"
        gap="sm"
        wrap="wrap"
        style={{ borderBottom: "1px solid #E3E8EF" }}
      >
        <Group gap="sm" wrap="wrap">
          {searchable && (
            <TextInput
              value={query}
              onChange={(e) => {
                setQuery(e.currentTarget.value);
                setPage(1);
              }}
              placeholder={searchPlaceholder}
              leftSection={<Search size={15} strokeWidth={1.8} />}
              w={260}
              size="sm"
            />
          )}
          {toolbar}
        </Group>
        <Group gap="sm">
          {selected.length > 0 && (
            <Text size="xs" c="#3F5B7E" fw={600}>
              تم تحديد {selected.length}
            </Text>
          )}
          {densityControl && (
            <SegmentedControl
              size="xs"
              value={density}
              onChange={(v) => setDensity(v as "compact" | "comfortable")}
              data={[
                { value: "comfortable", label: "مريح" },
                { value: "compact", label: "مكثّف" },
              ]}
            />
          )}
        </Group>
      </Group>

      {loading ? (
        <Box p="md">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} height={22} mb="sm" radius="sm" />
          ))}
        </Box>
      ) : rows.length === 0 ? (
        emptyState ?? (
          <Text size="sm" c="#667085" ta="center" py={40}>
            لا توجد نتائج مطابقة.
          </Text>
        )
      ) : (
        <ScrollArea type="auto" offsetScrollbars>
          <Table
            highlightOnHover={Boolean(onRowClick)}
            striped={false}
            withColumnBorders={false}
            style={{ minWidth: 860 }}
          >
            <Table.Thead
              style={{
                position: "sticky",
                top: 0,
                zIndex: 2,
                background: "#F7F9FB",
                boxShadow: "inset 0 -1px 0 #E3E8EF",
              }}
            >
              <Table.Tr>
                {selectable && (
                  <Table.Th style={{ width: 40, padding: cellPad }}>
                    <Checkbox
                      size="xs"
                      checked={selected.length === rows.length && rows.length > 0}
                      indeterminate={selected.length > 0 && selected.length < rows.length}
                      onChange={(e) =>
                        setSelected(e.currentTarget.checked ? rows.map((r) => r.id) : [])
                      }
                    />
                  </Table.Th>
                )}
                {columns.map((col) => (
                  <Table.Th
                    key={col.key}
                    style={{
                      width: col.width,
                      padding: cellPad,
                      textAlign: col.align ?? "start",
                      cursor: col.sortValue ? "pointer" : "default",
                      whiteSpace: "nowrap",
                    }}
                    onClick={() => col.sortValue && toggleSort(col.key)}
                  >
                    <Group gap={4} wrap="nowrap" justify={col.align === "end" ? "flex-end" : undefined}>
                      <Text size="xs" fw={650} c="#3F5B7E">
                        {col.header}
                      </Text>
                      {col.sortValue &&
                        sort?.key === col.key &&
                        (sort.dir === "asc" ? (
                          <ChevronUp size={13} color="#667085" />
                        ) : (
                          <ChevronDown size={13} color="#667085" />
                        ))}
                    </Group>
                  </Table.Th>
                ))}
                {rowActions && <Table.Th style={{ width: 48, padding: cellPad }} />}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {rows.map((row) => (
                <Table.Tr
                  key={row.id}
                  style={{ cursor: onRowClick ? "pointer" : undefined }}
                  onClick={() => onRowClick?.(row)}
                >
                  {selectable && (
                    <Table.Td style={{ padding: cellPad }} onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        size="xs"
                        checked={selected.includes(row.id)}
                        onChange={(e) =>
                          setSelected((prev) =>
                            e.currentTarget.checked
                              ? [...prev, row.id]
                              : prev.filter((id) => id !== row.id),
                          )
                        }
                      />
                    </Table.Td>
                  )}
                  {columns.map((col) => (
                    <Table.Td
                      key={col.key}
                      style={{ padding: cellPad, textAlign: col.align ?? "start", fontSize: 13.5 }}
                    >
                      {col.render(row)}
                    </Table.Td>
                  ))}
                  {rowActions && (
                    <Table.Td style={{ padding: cellPad }} onClick={(e) => e.stopPropagation()}>
                      <Menu position="bottom-end" withinPortal shadow="md" width={200}>
                        <Menu.Target>
                          <Tooltip label="إجراءات" withArrow>
                            <ActionIcon variant="subtle" color="gray" size="sm">
                              <MoreHorizontal size={16} />
                            </ActionIcon>
                          </Tooltip>
                        </Menu.Target>
                        <Menu.Dropdown>
                          {rowActions.map((action) => (
                            <Menu.Item
                              key={action.label}
                              leftSection={action.icon}
                              color={action.danger ? "red" : undefined}
                              onClick={() => action.onClick?.(row)}
                            >
                              {action.label}
                            </Menu.Item>
                          ))}
                        </Menu.Dropdown>
                      </Menu>
                    </Table.Td>
                  )}
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </ScrollArea>
      )}

      {rows.length > 0 && (
        <Group
          justify="space-between"
          px="md"
          py="sm"
          style={{ borderTop: "1px solid #E3E8EF" }}
          wrap="wrap"
          gap="sm"
        >
          <Text size="xs" c="#667085">
            عرض {(current - 1) * pageSize + 1}–{Math.min(current * pageSize, sorted.length)} من{" "}
            {sorted.length}
          </Text>
          <Pagination
            size="sm"
            value={current}
            onChange={setPage}
            total={totalPages}
            color="navy"
            withEdges={false}
          />
        </Group>
      )}
    </Paper>
  );
}
