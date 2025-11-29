import { getApiDocs } from "@/lib/swagger";
import SwaggerClient from "@/components/swagger/SwaggerClient";

// Metadata buat SEO/Tab Browser
export const metadata = {
  title: "Internal API Documentation",
  description: "Dokumentasi teknis untuk tim Frontend",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function ApiDocsPage() {
  // Server Side Logic: Generate JSON Spec
  const spec = getApiDocs();

  // Render Component (Data passed as props)
  return <SwaggerClient spec={spec} />;
}
