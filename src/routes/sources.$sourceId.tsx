import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/sources/$sourceId")({
  component: () => <Outlet />,
});
