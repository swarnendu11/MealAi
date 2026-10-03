/**
 * API Client Utility
 * Derives user authentication from verified Clerk tokens.
 * Never passes arbitrary unverified user IDs or fake tokens.
 */

export async function getAuthHeaders(): Promise<Record<string, string>> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (typeof window !== 'undefined') {
    try {
      const clerk = (window as any).Clerk;
      if (clerk?.session) {
        const token = await clerk.session.getToken();
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
      }
    } catch (err) {
      console.warn('[API] Could not retrieve Clerk session token:', err);
    }
  }

  return headers;
}

/**
 * Wrapper for fetch that automatically attaches the Clerk session token
 * and handles standard JSON error responses.
 */
export async function apiFetch<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const authHeaders = await getAuthHeaders();
  const mergedHeaders = {
    ...authHeaders,
    ...((options.headers as Record<string, string>) || {}),
  };

  const response = await fetch(endpoint, {
    ...options,
    headers: mergedHeaders,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const errorMsg = data?.error || data?.message || `Request failed with status ${response.status}`;
    throw new Error(errorMsg);
  }

  return data as T;
}
