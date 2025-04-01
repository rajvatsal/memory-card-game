function createCache() {
  const memory = {}

  const fetch = (key: string) => {
    return memory[key.toLowerCase()] || null
  }

  const set = (key: string, item: unknown) => {
    memory[key.toLowerCase()] = item
  }

  return { fetch, set }
}

export { createCache };
