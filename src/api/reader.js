import http from './http'

// 新增读者 POST /readers
export function createReader(payload) {
  return http.post('/readers', payload).then(r => r.data)
}

// 读者信息 GET /readers/:id
export function getReader(id) {
  return http.get(`/readers/${id}`).then(r => r.data)
}

// 读者借阅情况 GET /readers/:id/loans?status=open|all
export function listReaderLoans(id, status = 'open') {
  return http.get(`/readers/${id}/loans`, { params: { status } }).then(r => r.data)
}

// 读者罚款汇总 GET /readers/:id/fines
export function getReaderFines(id) {
  return http.get(`/readers/${id}/fines`).then(r => r.data)
}
