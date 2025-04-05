interface CreateCache<T> {
  [key: string]: T
}

function createCache<T>() {
  const memory: CreateCache<T> = {}

  const fetch = (key: string) => {
    return memory[key.toLowerCase()] || null
  }

  const set = (key: string, item: T) => {
    memory[key.toLowerCase()] = item
  }

  return { fetch, set }
}

export { createCache };
