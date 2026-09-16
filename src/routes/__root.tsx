import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { DirectionProvider, MantineProvider, Button, Stack, Text, Title } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import mantineCss from "@mantine/core/styles.css?url";
import mantineNotificationsCss from "@mantine/notifications/styles.css?url";
import mantineDropzoneCss from "@mantine/dropzone/styles.css?url";
import mantineDatesCss from "@mantine/dates/styles.css?url";
import mantineChartsCss from "@mantine/charts/styles.css?url";
import mantineSpotlightCss from "@mantine/spotlight/styles.css?url";
import mantineCodeCss from "@mantine/code-highlight/styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { theme } from "../theme";
import { LangProvider } from "../lib/lang";
import { AppShellLayout } from "../components/shell/AppShellLayout";

function NotFoundComponent() {
  return (
    <Stack align="center" justify="center" mih="70vh" gap="xs" px="md">
      <Title order={1} c="#0B1F33">
        404
      </Title>
      <Text fw={600} c="#16202A">
        الصفحة غير موجودة
      </Text>
      <Text size="sm" c="#667085" ta="center" maw={420}>
        الصفحة التي تحاول الوصول إليها غير متوفرة أو تم نقلها.
      </Text>
      <Button component={Link} to="/" mt="sm" color="navy">
        العودة إلى لوحة المراقبة
      </Button>
    </Stack>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <Stack align="center" justify="center" mih="70vh" gap="xs" px="md">
      <Title order={2} c="#0B1F33">
        تعذّر تحميل هذه الصفحة
      </Title>
      <Text size="sm" c="#667085" ta="center" maw={460}>
        حدث خطأ غير متوقع أثناء تحميل الواجهة. يمكنك المحاولة مرة أخرى أو العودة إلى لوحة المراقبة.
      </Text>
      <Stack gap="xs" mt="sm" w={240}>
        <Button
          color="navy"
          onClick={() => {
            router.invalidate();
            reset();
          }}
        >
          إعادة المحاولة
        </Button>
        <Button variant="default" component="a" href="/">
          لوحة المراقبة
        </Button>
      </Stack>
    </Stack>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "LEGINT Core — مركز التحكم" },
      {
        name: "description",
        content: "منصة الذكاء القانوني LEGINT Core: القضايا، المصادر الرسمية، التحليل والعمليات.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "stylesheet", href: mantineCss },
      { rel: "stylesheet", href: mantineNotificationsCss },
      { rel: "stylesheet", href: mantineDropzoneCss },
      { rel: "stylesheet", href: mantineDatesCss },
      { rel: "stylesheet", href: mantineChartsCss },
      { rel: "stylesheet", href: mantineSpotlightCss },
      { rel: "stylesheet", href: mantineCodeCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <DirectionProvider initialDirection="rtl" detectDirection={false}>
        <MantineProvider theme={theme} defaultColorScheme="light" forceColorScheme="light">
          <LangProvider>
            <Notifications position="top-center" />
            <AppShellLayout>
              {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
              <Outlet />
            </AppShellLayout>
          </LangProvider>
        </MantineProvider>
      </DirectionProvider>
    </QueryClientProvider>
  );
}
