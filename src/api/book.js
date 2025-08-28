import http from './http'

// 新书上架 POST /books
export function createBook(payload) {
  return http.post('/books', payload).then(r => r.data)
}

// 图书列表 GET /books?status=active|archived|all
export function listBooks(status = 'active') {
  const params = { status }
  return http.get('/books', { params }).then(r => r.data)
}

// 获取图书 GET /books/:id
export function getBook(id) {
  return http.get(`/books/${id}`).then(r => r.data)
}

// 旧书淘汰（软删除） DELETE /books/:id
export function archiveBook(id) {
  return http.delete(`/books/${id}`).then(r => r.data)
}
