export type ApiResponse = {
  ok?: boolean
  success?: boolean
  error?: string
  message?: string
}

export function getApiUrl() {
  return (import.meta.env.VITE_API_URL || 'http://localhost:5001').replace(
    /\/+$/,
    '',
  )
}

export async function postJson(path: string, body: unknown): Promise<ApiResponse> {
  const response = await fetch(`${getApiUrl()}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  const data = (await response.json().catch(() => null)) as ApiResponse | null

  if (!response.ok || data?.ok === false || data?.success === false) {
    throw new Error(data?.message || 'Something went wrong. Please try again.')
  }

  return data || { ok: true }
}
