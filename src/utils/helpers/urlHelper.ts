
/**
 * create query string by object
 * @param searchObj query obj, e.g. {key1: 'value1', key2: 'value2'}
 * @returns query string, e.g. 'key1=value1&key2=value2'
 */
export const createQueryStr = (searchObj: any) => {
  return new URLSearchParams(searchObj).toString()
}

/**
 * get query string value by key
 * @param key query string's key
 * @returns query string's value (not found will return null)
 */
export const getQueryStrValue = (key: string) => {
  const params = new URLSearchParams(document.location.search)
  return params.get(key)
}

/**
 * append query string in current url
 * @param queryPairs key value pairs array
 * @returns current url with appending query string
 */
export const appendQueryStrInCurrentUrl = (queryPairs: { key: string, value: string }[]) => {
  const url = new URL(document.location.href)
  const params = new URLSearchParams(document.location.search)

  if (queryPairs && queryPairs.length > 0) {
    queryPairs.forEach(q => params.append(q.key, q.value))
  }

  url.search = params.toString()
  return url.toString()
}
