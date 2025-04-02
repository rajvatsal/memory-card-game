interface CreateCache {
  [key: string]: unknown
}

function createCache() {
  const memory: CreateCache = {}

  const fetch = (key: string) => {
    return memory[key.toLowerCase()] || null
  }

  const set = (key: string, item: unknown) => {
    memory[key.toLowerCase()] = item
  }

  return { fetch, set }
}

export { createCache };
