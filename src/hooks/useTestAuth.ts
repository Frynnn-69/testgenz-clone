import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { isUserAuthenticated } from "@/lib/userAuth";

interface UseTestAuthReturn {
  isAuthenticated: boolean | null;
}

// handle authentication check & redirect
export function useTestAuth(): UseTestAuthReturn {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const authenticated = isUserAuthenticated();
    setIsAuthenticated(authenticated);

    if (!authenticated) {
      router.replace("/?error=auth_required");
    }
  }, [router]);

  return { isAuthenticated };
}
