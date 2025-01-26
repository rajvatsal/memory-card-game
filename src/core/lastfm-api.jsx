const key = '2e585f0565f08854e15fae838aeb7196'
const rootUrl = 'http://ws.audioscrobbler.com/2.0/'

export async function makeRequest(queryComponent) {
  let finalUrl = `${rootUrl}?api_key=${key}&format=json`
  for (const query in queryComponent) {
    finalUrl = finalUrl.concat(`&${query}=${queryComponent[query]}`)
  }

  return await fetch(finalUrl, { method: 'GET' })
}
