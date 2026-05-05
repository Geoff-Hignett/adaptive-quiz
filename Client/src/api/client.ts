import { supabase } from "../lib/supabase";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;

    const res = await fetch(`${BASE_URL}${path}`, {
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
            ...(options?.headers || {}),
        },
        ...options,
    });

    if (!res.ok) {
        let message = "Request failed";

        try {
            // support JSON errors
            const data = await res.json();
            message = data.message || message;
        } catch {
            message = await res.text();
        }

        throw new Error(message);
    }

    return res.json();
}
