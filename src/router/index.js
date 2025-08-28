import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import BookList from '../views/books/BookList.vue'
import BookNew from '../views/books/BookNew.vue'
import BookDetail from '../views/books/BookDetail.vue'
import ReaderNew from '../views/readers/ReaderNew.vue'
import ReaderFind from '../views/readers/ReaderFind.vue'
import ReaderDetail from '../views/readers/ReaderDetail.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/books', component: BookList },
  { path: '/books/new', component: BookNew },
  { path: '/books/:id', component: BookDetail, props: true },
  { path: '/readers/new', component: ReaderNew },
  { path: '/readers/find', component: ReaderFind },
  { path: '/readers/:id', component: ReaderDetail, props: true },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
