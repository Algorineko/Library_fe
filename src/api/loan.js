import http from './http'

// 借书 POST /loans/borrow
export function borrowBook({ book_id, reader_id, days = 30 }) {
  return http.post('/loans/borrow', { book_id, reader_id, days }).then(r => r.data)
}

// 还书 POST /loans/:id/return
export function returnBook(loanId) {
  return http.post(`/loans/${loanId}/return`).then(r => r.data)
}
