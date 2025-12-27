import { getApiDocs } from "@/lib/swagger";
import SwaggerClient from "@/components/swagger/SwaggerClient";

export const metadata = {
  title: "Internal API Documentation",
  description: "Dokumentasi teknis untuk tim Frontend",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function ApiDocsPage() {
  const spec = getApiDocs();
  return <SwaggerClient spec={spec} />;
}
