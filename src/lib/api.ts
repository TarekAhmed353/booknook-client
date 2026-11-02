const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getToken() {
  const response = await fetch("/api/auth/token");
  if (!response.ok) return null;
  const data = await response.json();
  return data.token as string;
}

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = await getToken();
  const headers = new Headers(options.headers);

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_URL}${path}`, { ...options, headers });
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message ?? "Something went wrong. Please try again.");
  }

  return data as T;
}