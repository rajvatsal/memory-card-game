export function createCache() {
  const memory = {}

  function fetch(key) {
    return memory[key.toLowerCase()] || null
  }

  function set(key, item) {
    memory[key.toLowerCase()] = item
  }

  return { fetch, set }
}
