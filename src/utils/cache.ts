import LRUCache from 'lru-cache'

export default new LRUCache({ max: 500, maxAge: 1000 * 60 * 60 })
