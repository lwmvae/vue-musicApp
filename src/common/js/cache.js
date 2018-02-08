import storage from 'good-storage'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LEN = 15

function insertArray(arr, val, compara, maxLen) {
  const index = arr.findIndex(compara)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

export function saveSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  insertArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LEN)
  return searches
}

function deleteFormArray(arr, compara) {
  const index = arr.findIndex(compara)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

export function deleteSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  deleteFormArray(searches, (item) => {
    return item === query
  })
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function clearSearch(){
	storage.remove(SEARCH_KEY)
	return []
}

export function loadSearch() {
  return storage.get(SEARCH_KEY, [])
}
