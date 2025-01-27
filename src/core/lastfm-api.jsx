const key = '2e585f0565f08854e15fae838aeb7196'
const rootUrl = 'http://ws.audioscrobbler.com/2.0/'

export async function getAlbums(tagName) {
  const finalUrl = `${rootUrl}?api_key=${key}&format=json&method=tag.getTopAlbums&tag=${tagName}`
  const response = await fetch(finalUrl, { method: 'GET' })
  return response.json()
}
