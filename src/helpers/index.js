import { parse } from 'query-string'

export const LIMIT = 10

export const range = (start, end) => {
  return [...Array(end).keys()].map(n => n + start)
}

export const getPaginator = search => {
  const parsedSearch = parse(search)
  const current = parsedSearch.page ? +parsedSearch.page : 1
  const offset = current * LIMIT - LIMIT

  return { current, offset, limit: LIMIT }
}
