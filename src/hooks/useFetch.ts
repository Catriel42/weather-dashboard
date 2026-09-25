import { useState, useEffect } from 'react'

export interface UseFetchResult<T> {
  data: T | null
  isLoading: boolean
  error: string | null
}

export const useFetch = <T>(url: string | null): UseFetchResult<T> => {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!url) return

    const controller = new AbortController()

    const fetchData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(url, { signal: controller.signal })

        if (!response.ok) {
          throw new Error(
            `Error ${response.status}: ${response.statusText || 'Fetch failed'}`,
          )
        }

        const json: T = await response.json()
        setData(json)
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return
        }
        setError(err instanceof Error ? err.message : 'Unknown error occurred')
        setData(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()

    return () => {
      controller.abort()
    }
  }, [url])

  return { data, isLoading, error }
}
