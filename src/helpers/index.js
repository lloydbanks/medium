import { parse } from 'query-string'

export const LIMIT = 10

export const range = (start, end) => {
  return [...Array(end).keys()].map(n => n + start)
}

export const getPaginator = (search, limit = LIMIT) => {
  const parsedSearch = parse(search)
  const current = parsedSearch.page ? +parsedSearch.page : 1
  const offset = current * limit - limit

  return { current, offset }
}

export const dateFormat = date => {
  const newDate = new Date(date)
  const locale = 'us-US'
  const options = { year: 'numeric', month: 'long', day: 'numeric' }

  return newDate.toLocaleDateString(locale, options)
}
