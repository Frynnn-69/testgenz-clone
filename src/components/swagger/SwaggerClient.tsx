"use client";

import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";
import "./swagger-custom.css";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), {
  ssr: false,
  loading: () => (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 font-medium">Memuat Dokumentasi API...</p>
      </div>
    </div>
  ),
});

interface Props {
  spec: Record<string, unknown>; // OpenAPI spec object
}

export default function SwaggerClient({ spec }: Props) {
  return (
    <div className="swagger-container bg-white min-h-screen w-full">
      <SwaggerUI spec={spec} />
    </div>
  );
}
