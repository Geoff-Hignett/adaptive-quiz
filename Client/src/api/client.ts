import { supabase } from "../lib/supabase";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;

    const requestId = Math.random().toString(36).slice(2, 7);

    console.log(`[API START ${requestId}] ${options?.method || "GET"} ${path}`);

    const res = await fetch(`${BASE_URL}${path}`, {
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
            ...(options?.headers || {}),
        },
        ...options,
    });

    console.log(`[API END ${requestId}] ${options?.method || "GET"} ${path} → ${res.status}`);

    if (!res.ok) {
        let message = "Request failed";

        try {
            const text = await res.text();
            try {
                const json = JSON.parse(text);
                message = json.message || message;
            } catch {
                message = text;
            }
        } catch {}

        console.error(`[API ERROR ${requestId}] ${path}:`, message);

        throw new Error(message);
    }

    return res.json();
}
