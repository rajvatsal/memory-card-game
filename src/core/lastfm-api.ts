const key = '2e585f0565f08854e15fae838aeb7196'
const rootUrl = 'https://ws.audioscrobbler.com/2.0/'

interface GetUrlParams {
  [key: string]: string
}

async function getAlbums(tagName: string) {
  const finalUrl = `${rootUrl}?api_key=${key}&format=json&method=tag.getTopAlbums&tag=${tagName}`
  const response = await fetch(finalUrl, { method: 'GET', })
  return response.json()
}

function getUrl(queries: GetUrlParams) {
  let finalUrl = `${rootUrl}?api_key=${key}&format=json`
  for (const query in queries) {
    finalUrl = finalUrl.concat(`&${query}=${queries[query]}`)
  }

  return finalUrl
}

export { getAlbums, getUrl }
