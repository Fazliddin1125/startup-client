export function formUrlQuery({ key, value, params }: { key: string; value: string; params: string }) {
  const searchParams = new URLSearchParams(params)
  searchParams.set(key, value)
  return `?${searchParams.toString()}`
}
