export type PortalUser = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  accountType: "retail" | "wholesale";
  customer: {
    id: number;
    code: string;
    name: string;
    type: string;
    priceTier: string;
    creditLimit: number;
    creditUsed: number;
    availableCredit: number;
    paymentTermsDays: number;
  } | null;
};

export type AuthResponse = {
  token: string;
  user: PortalUser;
};

export type PortalDashboard = {
  stats: {
    orders: number;
    quotations: number;
    invoices: number;
    openOrders: number;
  };
  recentOrders: Array<{
    id: number;
    number: string;
    status: string;
    total: string | number | null;
    order_date: string | null;
    created_at: string;
  }>;
  recentQuotations: Array<{
    id: number;
    number: string;
    status: string;
    total: string | number | null;
    valid_until: string | null;
    created_at: string;
  }>;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api";
const TOKEN_KEY = "ff_portal_token";

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setAuthToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

async function parseError(res: Response): Promise<string> {
  try {
    const data = (await res.json()) as {
      message?: string;
      errors?: Record<string, string[]>;
    };
    if (data.errors) {
      const first = Object.values(data.errors)[0]?.[0];
      if (first) return first;
    }
    if (data.message) return data.message;
  } catch {
    /* ignore */
  }
  return `คำขอไม่สำเร็จ (${res.status})`;
}

async function authFetch<T>(
  path: string,
  init?: RequestInit & { token?: string | null }
): Promise<T> {
  const { token, ...rest } = init ?? {};
  const headers: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(rest.headers as Record<string, string> | undefined),
  };
  const bearer = token === undefined ? getAuthToken() : token;
  if (bearer) headers.Authorization = `Bearer ${bearer}`;

  const res = await fetch(`${API_URL}${path}`, {
    ...rest,
    headers,
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(await parseError(res));
  }

  return res.json() as Promise<T>;
}

export const authApi = {
  login: (body: { email: string; password: string }) =>
    authFetch<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(body),
      token: null,
    }),
  register: (body: {
    name: string;
    email: string;
    phone?: string;
    password: string;
    password_confirmation: string;
    account_type?: "retail" | "wholesale";
  }) =>
    authFetch<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(body),
      token: null,
    }),
  me: () => authFetch<{ user: PortalUser }>("/auth/me"),
  logout: () => authFetch<{ ok: boolean }>("/auth/logout", { method: "POST" }),
  updateProfile: (body: { name: string; phone?: string }) =>
    authFetch<{ user: PortalUser }>("/auth/profile", {
      method: "PUT",
      body: JSON.stringify(body),
    }),
  dashboard: () => authFetch<PortalDashboard>("/portal/dashboard"),
  orders: () => authFetch<unknown[]>("/portal/orders"),
  quotations: () => authFetch<unknown[]>("/portal/quotations"),
  invoices: () => authFetch<unknown[]>("/portal/invoices"),
};
